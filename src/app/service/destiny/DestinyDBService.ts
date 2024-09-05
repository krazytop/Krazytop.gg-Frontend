import { Injectable } from '@angular/core';
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";

@Injectable({ providedIn: 'root' })
export class DestinyDBService {

  private db!: IDBDatabase;
  private dbName = 'Destiny';
  private itemStoreName = 'ItemNomenclature';

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
    const request = indexedDB.open(this.dbName, 2);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(this.itemStoreName, { keyPath: 'hash' });
    }

    return new Promise<void>((resolve, reject) => {
      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };
      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  async addObjects(objects: any[], storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const requests = objects.map(object => objectStore.add(object));
      Promise.all(requests)
        .then(() => resolve())
        .catch(reject);
    });
  }

  async getAllObjects(objectIds: number[]): Promise<DestinyItemNomenclature[]> {
    const transaction = this.db.transaction(this.itemStoreName, 'readonly');
    const objectStore = transaction.objectStore(this.itemStoreName);
    const requests = objectIds.map(id => objectStore.get(id));
    const results = await Promise.all(requests);
    return results.map(result => result.result);
  }
}
