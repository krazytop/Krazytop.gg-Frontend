import {Injectable} from "@angular/core";
import {BungieAuthService} from "../../component/destiny/bungie-authentification/bungie-auth.service";
import {DestinyDatabaseApi} from "./destiny-database.api";
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyObjectiveNomenclature} from "../../model/destiny/nomenclature/destiny-objective.nomenclature";
import {DestinyCollectibleNomenclature} from "../../model/destiny/nomenclature/destiny-collectible.nomenclature";
import {DestinyMetricNomenclature} from "../../model/destiny/nomenclature/destiny-metric.nomenclature";
import {DestinyProgressionNomenclature} from "../../model/destiny/nomenclature/destiny-progression.nomenclature";
import {DestinyProgressionStepModel} from "../../model/destiny/destiny-progression-step.model";
import {DestinyRecordNomenclature} from "../../model/destiny/nomenclature/destiny-record.nomenclature";
import {getAllPresentationTrees} from "../../model/destiny/enum/DestinyPresentationTreeEnum";
import {DestinyPresentationTreeNomenclature} from "../../model/destiny/destiny-presentation-tree.model";
import {DestinyPresentationNodeNomenclature} from "../../model/destiny/nomenclature/destiny-presentation-node.nomenclature";
import {DestinyVendorNomenclature} from "../../model/destiny/nomenclature/destiny-vendor.nomenclature";
import {DestinyVendorGroupNomenclature} from "../../model/destiny/nomenclature/destiny-vendor-group.nomenclature";
import {DestinyVendorModel} from "../../model/destiny/destiny-vendor.model";

@Injectable({
  providedIn: 'root',
})
export class DestinyDatabaseUpdateService {

  constructor(private bungieAuthService: BungieAuthService, private databaseApi: DestinyDatabaseApi) {
  }

  async manageDatabase(): Promise<void> {
    console.log("manage database");
    const manifest = await this.downloadJson("/Platform/Destiny2/Manifest", true);
    const manifestVersion: string = manifest.get('Response')['version'];
    if (await this.checkIfDatabaseNeedToBeUpdate(manifestVersion)) {
      await this.databaseApi.initDb(true);
      await this.updateDatabase(manifest.get('Response')['jsonWorldComponentContentPaths']['fr'], manifestVersion);
    } else {
      await this.databaseApi.initDb(false);
    }
    console.log("database is ready");
  }

  async checkIfDatabaseNeedToBeUpdate(manifestVersion: string): Promise<boolean> {
    const currentVersion: string | null = localStorage.getItem(DestinyDatabaseApi.MANIFEST_VERSION);
    return currentVersion == null || currentVersion != manifestVersion;
  }

  async updateDatabase(definitions: any, manifestVersion: string) {
    console.log("update database")
    const objectives = await this.updateObjectives(definitions['DestinyObjectiveDefinition']);
    const presentationNodes = await this.updatePresentationNodes(definitions['DestinyPresentationNodeDefinition']);
    const collectibles = await this.updateCollectibles(definitions['DestinyCollectibleDefinition']);
    const metrics = await this.updateMetrics(definitions['DestinyMetricDefinition']);
    await this.updateProgressions(definitions['DestinyProgressionDefinition']);
    const records = await this.updateRecords(definitions['DestinyRecordDefinition'], objectives);
    const vendors = await this.updateVendors(definitions['DestinyVendorDefinition']);
    await this.updateVendorGroups(definitions['DestinyVendorGroupDefinition'], vendors);
    await this.updateItems(definitions['DestinyInventoryItemDefinition']);
    await this.updatePresentationTrees(collectibles, metrics, objectives, records, presentationNodes);
    localStorage.setItem(DestinyDatabaseApi.MANIFEST_VERSION, manifestVersion)
  }

  async downloadJson(definition: string, header: boolean = false): Promise<Map<string,any>> {
    const response = await fetch(`https://www.bungie.net${definition}`, {headers: header ? this.bungieAuthService.getAPIKeyHeader() : {}});
    const json = await response.json();
    return new Map(Object.entries(json));
  }

  private async updateVendors(definition: any) {
    const json = await this.downloadJson(definition);
    const vendorNomenclatures: DestinyVendorNomenclature[] = [];
    for (let [, entryData] of json) {
      const vendorNomenclature = new DestinyVendorNomenclature();
      const displayProperties = entryData["displayProperties"];
      const groups: any[] = entryData["groups"];
      if (displayProperties["name"] && displayProperties["smallTransparentIcon"] && displayProperties["icon"] != ""
        && groups && groups.length > 0) {
        vendorNomenclature.hash = Number(entryData["hash"]);
        vendorNomenclature.name = String(displayProperties["name"]);
        vendorNomenclature.icon = String(displayProperties["smallTransparentIcon"]);
        vendorNomenclature.iconBackground = String(displayProperties["icon"]);
        vendorNomenclature.groupHash = Number(groups[0]["vendorGroupHash"]);
        vendorNomenclatures.push(vendorNomenclature);
      }
    }
    console.log(`${vendorNomenclatures.length} vendors added`)
    return vendorNomenclatures;
  }

  private async updateVendorGroups(definition: any, vendors: DestinyVendorNomenclature[]) {
    const json = await this.downloadJson(definition);
    const vendorNomenclatures: DestinyVendorGroupNomenclature[] = [];
    for (let [, entryData] of json) {
      const vendorGroupNomenclature = new DestinyVendorGroupNomenclature();
      vendorGroupNomenclature.hash = Number(entryData["hash"]);
      vendorGroupNomenclature.name = String(entryData["categoryName"]);
      vendorGroupNomenclature.vendors = [];
      vendorGroupNomenclature.vendors = vendors.filter(vendor => vendor.groupHash == vendorGroupNomenclature.hash).map(vendor => new DestinyVendorModel(vendor));
      vendorNomenclatures.push(vendorGroupNomenclature);
    }
    console.log(`${vendorNomenclatures.length} vendors added`)
    await this.databaseApi.addObjects(vendorNomenclatures, DestinyDatabaseApi.VENDOR_STORE);
    return vendorNomenclatures;
  }

  private async updateItems(definition: any) {
    const json = await this.downloadJson(definition);
    const itemNomenclatures: DestinyItemNomenclature[] = [];
    for (let [key, entryData] of json) {
      const itemNomenclature = new DestinyItemNomenclature();
      itemNomenclature.hash = Number(key);

      const displayProperties = entryData['displayProperties'];
      itemNomenclature.name = String(displayProperties['name'])!;
      itemNomenclature.description = String(displayProperties['description'])!;
      itemNomenclature.icon = String(displayProperties['icon']);

      const inventory = entryData['inventory'];
      itemNomenclature.maxStackSize = Number(inventory['maxStackSize']);
      itemNomenclature.bucketTypeHash = Number(inventory['bucketTypeHash']);
      itemNomenclature.recoveryBucketTypeHash = Number(inventory['recoveryBucketTypeHash']);
      itemNomenclature.tierTypeHash = Number(inventory['tierTypeHash']);
      itemNomenclature.isInstanceItem = Boolean(inventory['isInstanceItem']);
      itemNomenclature.tierTypeName = String(inventory['tierTypeName']);

      let equippingBlock = entryData['equippingBlock'];
      itemNomenclature.equipmentSlotTypeHash = equippingBlock ? Number(equippingBlock['equipmentSlotTypeHash']) : undefined;

      itemNomenclature.summaryItemHash = Number(entryData['summaryItemHash']);
      itemNomenclature.iconWatermark = entryData['iconWatermark']?.toString();
      itemNomenclature.nonTransferrable = Boolean(entryData['nonTransferrable']);
      itemNomenclature.specialItemType = Number(entryData['specialItemType']);
      itemNomenclature.itemType = Number(entryData['itemType']);
      itemNomenclature.itemSubType = Number(entryData['itemSubType']);
      itemNomenclature.classType = Number(entryData['classType']);
      itemNomenclature.defaultDamageType = Number(entryData['defaultDamageType']);
      itemNomenclature.equippable = Boolean(entryData['equippable']);
      itemNomenclature.itemTypeDisplayName = String(entryData['itemTypeDisplayName']);

      itemNomenclatures.push(itemNomenclature);
    }
    console.log(`${itemNomenclatures.length} items added`)
    await this.databaseApi.addObjects(itemNomenclatures, DestinyDatabaseApi.ITEM_STORE);
  }

  private async updateObjectives(definition: any) {
    const json = await this.downloadJson(definition);
    const objectiveNomenclatures: Map<number,DestinyObjectiveNomenclature> = new Map<number, DestinyObjectiveNomenclature>();
    for (let [key, entryData] of json) {
      const objectiveNomenclature = new DestinyObjectiveNomenclature();
      objectiveNomenclature.hash = Number(entryData["hash"]);

      const displayProperties = entryData["displayProperties"];
      objectiveNomenclature.name = String(displayProperties["name"]);
      objectiveNomenclature.description = String(displayProperties["description"]);
      objectiveNomenclature.icon = String(displayProperties["icon"]);

      objectiveNomenclature.completionValue = Number(entryData["completionValue"]);
      objectiveNomenclature.progressDescription = String(entryData["progressDescription"]);
      objectiveNomenclature.scope = Number(entryData["scope"]); //location
      objectiveNomenclature.allowValueChangeWhenCompleted = Boolean(entryData["allowValueChangeWhenCompleted"]);
      objectiveNomenclature.isCountingDownward = Boolean(entryData["isCountingDownward"]);
      objectiveNomenclature.allowNegativeValue = Boolean(entryData["allowNegativeValue"]);
      objectiveNomenclature.allowValueChangeWhenCompleted = Boolean(entryData["allowValueChangeWhenCompleted"]);
      objectiveNomenclature.allowOvercompletion = Boolean(entryData["allowOvercompletion"]);
      objectiveNomenclature.isDisplayOnlyObjective = Boolean(entryData["isDisplayOnlyObjective"]);

      objectiveNomenclatures.set(Number(key), objectiveNomenclature);
    }
    console.log(`${objectiveNomenclatures.size} objectives added`)
    return objectiveNomenclatures;
  }

  private async updateCollectibles(definition: any) {
    const json = await this.downloadJson(definition);
    const collectibleNomenclatures: Map<number,DestinyCollectibleNomenclature> = new Map<number, DestinyCollectibleNomenclature>();
    for (let [key, entryData] of json) {
      const collectibleNomenclature = new DestinyCollectibleNomenclature();
      collectibleNomenclature.hash = Number(entryData["hash"]);
      collectibleNomenclature.sourceString = String(entryData["sourceString"]);
      collectibleNomenclature.sourceHash = Number(entryData["sourceHash"]);
      collectibleNomenclature.nodeType = Number(entryData["presentationNodeType"]);
      collectibleNomenclatures.set(Number(key), collectibleNomenclature);
    }
    console.log(`${collectibleNomenclatures.size} collectibles added`)
    return collectibleNomenclatures;
  }

  private async updateMetrics(definition: any) {
    const json = await this.downloadJson(definition);
    const metricNomenclatures: Map<number,DestinyMetricNomenclature> = new Map<number, DestinyMetricNomenclature>();
    for (let [key, entryData] of json) {
      const metricNomenclature = new DestinyMetricNomenclature();
      metricNomenclature.hash = Number(entryData["hash"]);

      const displayProperties = entryData["displayProperties"];
      metricNomenclature.name = String(displayProperties["name"]);
      metricNomenclature.description = String(displayProperties["description"]);
      metricNomenclature.icon = String(displayProperties["icon"]);

      metricNomenclature.nodeType = Number(entryData["presentationNodeType"]);
      metricNomenclatures.set(Number(key),metricNomenclature);
    }
    console.log(`${metricNomenclatures.size} metrics added`)
    return metricNomenclatures;
  }

  private async updateProgressions(definition: any) {
    const json = await this.downloadJson(definition);
    const progressionNomenclatures: DestinyProgressionNomenclature[] = [];
    for (let [, entryData] of json) {
      const progressionNomenclature = new DestinyProgressionNomenclature();
      progressionNomenclature.hash = Number(entryData["hash"]);
      progressionNomenclature.repeatLastStep = Boolean(entryData["repeatLastStep"]);

      const steps: any[] | undefined = entryData["steps"];
      if (steps && steps.length > 0) {
        const displayProperties = entryData["displayProperties"];
        progressionNomenclature.name = String(displayProperties["name"]);
        progressionNomenclature.description = String(displayProperties["description"]);
        progressionNomenclature.icon = String(displayProperties["icon"]);

        const progressionSteps: DestinyProgressionStepModel[] = []
        steps.forEach(step => {
          let progressionStep = new DestinyProgressionStepModel();
          progressionStep.name = String(step["stepName"]);
          progressionStep.icon = String(step["icon"]);
          progressionStep.progressTotal = Number(step["progressTotal"]);
          progressionSteps.push(progressionStep)
        })
        progressionNomenclature.steps = progressionSteps;

        progressionNomenclatures.push(progressionNomenclature);
      }
    }
    await this.databaseApi.addObjects(progressionNomenclatures, DestinyDatabaseApi.PROGRESSION_STORE);
    console.log(`${progressionNomenclatures.length} progressions added`)
    return progressionNomenclatures;
  }

  private async updateRecords(definition: any, objectives: Map<number,DestinyObjectiveNomenclature>) {
    const json = await this.downloadJson(definition);
    const recordNomenclatures: Map<number,DestinyRecordNomenclature> = new Map<number, DestinyRecordNomenclature>();
    const recordNomenclaturesToSave: DestinyRecordNomenclature[] = [];
    for (let [key, entryData] of json) {
      const recordNomenclature: DestinyRecordNomenclature = new DestinyRecordNomenclature();

      recordNomenclature.hash = Number(entryData["hash"]);
      recordNomenclature.recordTypeName = String(["recordTypeName"]);

      const displayProperties = entryData["displayProperties"];
      recordNomenclature.name = String(displayProperties["name"]);
      recordNomenclature.description = String(displayProperties["description"]);
      recordNomenclature.icon = String(displayProperties["icon"]);

      const stateInfo = entryData["stateInfo"];
      recordNomenclature.obscuredDescription = stateInfo ? String(stateInfo["obscuredDescription"]) : undefined;

      const expirationInfo = entryData["expirationInfo"];
      recordNomenclature.hasExpiration = expirationInfo ? Boolean(expirationInfo["hasExpiration"]) : undefined;
      recordNomenclature.expirationDescription = expirationInfo ? String(expirationInfo["expirationDescription"]) : undefined;

      recordNomenclature.objectives = (entryData["objectiveHashes"] ?? []).map((hash: number) => objectives.get(hash)!);

      recordNomenclature.intervalObjectives = entryData["intervalInfo"]?.intervalObjectives?.map((intervalObjective: any, index: any) => ({
        rewardItems: entryData["intervalInfo"].intervalRewards[index].intervalRewardItems.map((reward: any) => ({
          hash: Number(reward.itemHash),
          quantity: Number(reward.quantity)
        })),
        objective: objectives.get(intervalObjective.intervalObjectiveHash),
        score: Number(intervalObjective.intervalScoreValue)
      }));

      recordNomenclature.rewardItems = (entryData["rewardItems"] ?? []).map((reward: any) => ({
        hash: Number(reward['itemHash']),
        quantity: Number(reward['quantity'])
      }));

      const titleInfo =  entryData["titleInfo"];
      if (titleInfo != null && Boolean(titleInfo["hasTitle"])) {
        recordNomenclature.titlesByGender = titleInfo["titlesByGenderHash"];
        recordNomenclaturesToSave.push(recordNomenclature);
      }
      await this.databaseApi.addObjects(recordNomenclaturesToSave, DestinyDatabaseApi.RECORD_STORE);
      recordNomenclatures.set(Number(key), recordNomenclature);
      }
    console.log(`${recordNomenclatures.size} records added`)
    return recordNomenclatures;
  }

  private async updatePresentationNodes(definition: any) {
    const json = await this.downloadJson(definition);
    const presentationNodeNomenclatures: Map<number,DestinyPresentationNodeNomenclature> = new Map();
    for (let [key, entryData] of json) {
      const presentationNodeNomenclature: DestinyPresentationNodeNomenclature = new DestinyPresentationNodeNomenclature();

      presentationNodeNomenclature.hash = Number(entryData["hash"]);

      const displayProperties = entryData["displayProperties"];
      presentationNodeNomenclature.name = String(displayProperties["name"]);
      presentationNodeNomenclature.description = String(displayProperties["description"]);
      presentationNodeNomenclature.icon = String(displayProperties["icon"]);

      presentationNodeNomenclature.nodeType = Number(entryData["nodeType"]);
      presentationNodeNomenclature.isSeasonal = Boolean(entryData["isSeasonal"]);
      presentationNodeNomenclature.objective = entryData["objectiveHash"];
      const children = entryData['children'];
      if (children) {
        presentationNodeNomenclature.childrenNode = (children["presentationNodes"] as any[]).map(collectible => Number(collectible["presentationNodeHash"]));
        presentationNodeNomenclature.childrenCollectible = (children["collectibles"] as any[]).map(collectible => Number(collectible["collectibleHash"]));
        presentationNodeNomenclature.childrenRecord = (children["records"] as any[]).map(collectible => Number(collectible["recordHash"]));
        presentationNodeNomenclature.childrenMetric = (children["metrics"] as any[]).map(collectible => Number(collectible["metricHash"]));
        presentationNodeNomenclature.childrenCraftable = (children["craftables"] as any[]).map(collectible => Number(collectible["craftableItemHash"]));
      }
      presentationNodeNomenclatures.set(Number(key), presentationNodeNomenclature);
    }
    console.log(`${presentationNodeNomenclatures.size} records added`)
    return presentationNodeNomenclatures;
  }

  private async updatePresentationTrees(collectibles: Map<number,DestinyCollectibleNomenclature>, metrics: Map<number,DestinyMetricNomenclature>, objectives: Map<number,DestinyObjectiveNomenclature>, records: Map<number,DestinyRecordNomenclature>, presentationNodes: Map<number,DestinyPresentationNodeNomenclature>) {
    const trees = getAllPresentationTrees().map(treeHash => this.buildPresentationTree(treeHash, collectibles, metrics, objectives, records, presentationNodes));
    console.log(`${trees.length} presentation trees added`)
    await this.databaseApi.addObjects(trees, DestinyDatabaseApi.PRESENTATION_TREE_STORE);
  }

  private buildPresentationTree(treeHash: number, collectibles: Map<number,DestinyCollectibleNomenclature>, metrics: Map<number,DestinyMetricNomenclature>, objectives: Map<number,DestinyObjectiveNomenclature>, records: Map<number,DestinyRecordNomenclature>, presentationNodes: Map<number,DestinyPresentationNodeNomenclature>) {
    const node: DestinyPresentationNodeNomenclature = presentationNodes.get(treeHash)!;
    const tree: DestinyPresentationTreeNomenclature = new DestinyPresentationTreeNomenclature();
    tree.hash = node.hash;
    tree.name = node.name;
    tree.nodeType = node.nodeType;
    tree.isSeasonal = node.isSeasonal;
    tree.icon = node.icon;
    tree.description = node.description;
    tree.childrenNode = node.childrenNode.map(node => this.buildPresentationTree(node, collectibles, metrics, objectives, records, presentationNodes));
    tree.childrenCollectible = node.childrenCollectible.map(collectible => collectibles.get(collectible)!);
    tree.childrenCraftable = node.childrenCraftable;
    tree.childrenRecord = node.childrenRecord.map(record => records.get(record)!);
    tree.childrenMetric = node.childrenMetric.map(metric => metrics.get(metric)!);
    tree.objective = objectives.get(node.objective)!;
    return tree;
  }

}
