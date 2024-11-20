import { Injectable } from '@angular/core';
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";

@Injectable({ providedIn: 'root' })
export class DestinyDatabaseApi {

  private db!: IDBDatabase;
  static ITEM_STORE = 'ItemNomenclature';
  static RECORD_STORE = 'RecordNomenclature';
  static PRESENTATION_TREE_STORE = 'PresentationTreeNomenclature';
  static VENDOR_STORE = 'VendorNomenclature';
  static PROGRESSION_STORE = 'ProgressionNomenclature';
  static MANIFEST_VERSION = 'ManifestVersion';

  constructor() {}

  private async resetDB(): Promise<void> {
    const request = indexedDB.deleteDatabase('Destiny');
      return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject();
    });
  }

  async initDb(needToReset: boolean): Promise<void> {
    if (needToReset) {
      await this.resetDB();
    }
    const request = indexedDB.open('Destiny');
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(DestinyDatabaseApi.MANIFEST_VERSION, { keyPath: 'hash' });//TODO function select store
      db.createObjectStore(DestinyDatabaseApi.ITEM_STORE, { keyPath: 'hash' });
      db.createObjectStore(DestinyDatabaseApi.RECORD_STORE, { keyPath: 'hash' });
      db.createObjectStore(DestinyDatabaseApi.VENDOR_STORE, { keyPath: 'hash' });
      db.createObjectStore(DestinyDatabaseApi.PROGRESSION_STORE, { keyPath: 'hash' });
      db.createObjectStore(DestinyDatabaseApi.PRESENTATION_TREE_STORE, { keyPath: 'hash' });
    }
    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      request.onerror = async () => reject(await this.initDb(true));
    });
  }

  async addObjects(objects: any[], storeName: string) {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const requests = objects.map(object => objectStore.add(object));
      Promise.all(requests)
        .then(() => resolve())
        .catch(reject);
    });
  }

  async getAllObjectsByIds(objectIds: number[], storeName: string) {
    const transaction = this.db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const results = new Map();

    const requests = objectIds.map(id => {
      return new Promise((resolve, reject) => {
        const request = objectStore.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject()
      });
    });
    const foundObjects = await Promise.all(requests);
    foundObjects.forEach((result: any) => {
      if (result) {
        results.set(result.hash, result);
      }
    });
    return results;
  }

  async getItemNomenclature(hash: number): Promise<DestinyItemNomenclature | undefined> {
    const transaction = this.db.transaction(DestinyDatabaseApi.ITEM_STORE, 'readonly');
    const objectStore = transaction.objectStore(DestinyDatabaseApi.ITEM_STORE);

    return new Promise((resolve, reject) => {
      const request = objectStore.get(hash);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject();
    });
  }
}
