import { MergeTool } from "../../arm5e-compendia/scripts/MergeTool.js";
import { ModuleGenerator } from "../../arm5e-compendia/scripts/ModuleGenerator.js";
import { SanitizationTool } from "../../arm5e-compendia/scripts/SanitizationTool.js";
import { CompendiumStats } from "../../arm5e-compendia/scripts/CompendiumStats.js";
import { FileTools } from "./FileTools.js";
import { DocumentEnricher } from "./DocumentEnricher.js";
import { ActorImporter } from "./ActorImporter.js";

export class CompendiaUtils {
  static async createIndexKeys(pack, onlyMissingOnes = false) {
    // let pack = game.packs.get(compendium);
    // if (pack == undefined) {
    //   return;
    // }

    if (pack.documentName != "Item") {
      return;
    }
    // Unlock the pack for editing
    const wasLocked = pack.locked;
    await pack.configure({
      locked: false
    });

    const documents = await pack.getDocuments();
    let count = 0;
    for (let doc of documents) {
      // skip Compendium Folders documents
      if (doc.name.startsWith("#[CF")) continue;
      if (doc.system.indexKey !== "" && onlyMissingOnes) continue;
      await doc.update({ "system.indexKey": FileTools.slugify(doc.name) });
      count++;
    }
    console.log(`${count} index keys added.`);
    await pack.configure({
      locked: true
    });
  }

  static async showMergeDialog() {
    if (!game.user.isGM) {
      console.log("Only GMs can do this operation");
      return;
    }
    const ui = new MergeTool({}, {});
    const res = await ui.render(true);
  }

  static async showSanitizationTool() {
    if (!game.user.isGM) {
      console.log("Only GMs can do this operation");
      return;
    }
    const ui = new SanitizationTool({}, {});
    const res = await ui.render(true);
  }

  static async showCompendiumStatsUI() {
    if (!game.user.isGM) {
      console.log("Only GMs can do this operation");
      return;
    }
    const ui = new CompendiumStats({}, {});
    const res = await ui.render(true);
  }

  static async showDocumentEnricherUI() {
    if (!game.user.isGM) {
      console.log("Only GMs can do this operation");
      return;
    }
    const ui = new DocumentEnricher();
    const res = await ui.render(true);
  }

  static async showGeneratorDialog() {
    if (!game.user.isGM) {
      console.log("Only GMs can do this operation");
      return;
    }
    const ui = new ModuleGenerator({}, {});
    const res = await ui.render(true);
  }

  static async showImporter() {
    if (!game.user.isGM) {
      console.log("Only GMs can do this operation");
      return;
    }
    const ui = new ActorImporter({}, {});
    const res = await ui.render(true);
  }

  static async mergeAbilitiesIntoReference(source, reference, dryRun = true) {
    let refPack = game.packs.get(reference);
    if (refPack == undefined) return null;

    // Unlock the pack for editing
    const wasLocked = refPack.locked;
    await refPack.configure({
      locked: false
    });

    const sourcePack = game.packs.get(source);
    if (sourcePack == undefined) return null;
    // add index if not present
    if (!refPack.indexFields.has("system.key")) {
      await refPack.getIndex({ fields: ["system.key", "system.option"] });
    }

    const sourceDocuments = await sourcePack.getDocuments();
    const missingRefDocuments = [];
    let foundCnt = 0;
    let unknownCnt = 0;
    for (let src of sourceDocuments) {
      if (src.type != "ability") continue;
      if (src.name.startsWith("#[CF")) continue;

      console.log(`Attempt to merge ${src.name} with key: ${src.system.key} and option: ${src.system.option}`);
      const res = refPack.index.find((i) => i.system.key == src.system.key && i.system.option == src.system.option);
      if (res) {
        if (res.name != game.i18n.localize("arm5e.skill.general.awareness") && res.system.key == "awareness") {
          unknownCnt++;
          // ui.notifications.info(`Not found ${src.name} with key: ${src.system.key} and option: ${src.system.option}`);
          console.log(`Not found ${src.name} with key: ${src.system.key} and option: ${src.system.option}`);
          missingRefDocuments.push(src.name);
          continue;
        }
        // log(false, `Found ${JSON.stringify(res)}`);

        if (!dryRun) {
          const ability = await fromUuid(res.uuid);
          await ability.update({
            name: src.name,
            "system.description": src.system.description
          });
        }
        foundCnt++;
      } else {
        unknownCnt++;
        console.log(`Not found ${src.name} with key: ${src.system.key} and option: ${src.system.option}`);
        // ui.notifications.info(`Not found ${src.name} with key: ${src.system.key} and option: ${src.system.option}`);
        missingRefDocuments.push(src.name);
      }
    }
    console.log(`Found: ${foundCnt}, unknown: ${unknownCnt}`);
    console.log(`List of missing entries in reference module: ${missingRefDocuments}`);
    ui.notifications.info(`List of missing entries in reference module: ${missingRefDocuments}`);
    if (wasLocked) {
      await refPack.configure({
        locked: true
      });
    }
  }

  static async mergeItemsIntoReference(source, reference, type, dryRun = true) {
    let refPack = game.packs.get(reference);
    if (refPack == undefined) return null;

    // Unlock the pack for editing
    const wasLocked = refPack.locked;
    await refPack.configure({
      locked: false
    });

    const sourcePack = game.packs.get(source);
    if (sourcePack == undefined) return null;
    // add index if not present
    if (!refPack.indexFields.has("system.indexKey")) {
      await refPack.getIndex({ fields: ["system.indexKey"] });
    }

    const sourceDocuments = await sourcePack.getDocuments();
    const missingRefDocuments = [];
    let foundCnt = 0;
    let unknownCnt = 0;
    for (let src of sourceDocuments) {
      if (src.type != type) continue;
      if (src.name.startsWith("#[CF")) continue;
      // does the item has an index key?
      let indexKey = src.system.indexKey;
      if (indexKey === "") {
        indexKey = this.slugify(src.name);
      }

      console.log(`Attempt to merge "${src.name}" with key: ${indexKey}`);
      const res = refPack.index.find((i) => i.system.indexKey == indexKey);
      if (res) {
        // log(false, `Found ${JSON.stringify(res)}`);

        if (!dryRun) {
          const item = await fromUuid(res.uuid);
          await item.update({
            name: src.name,
            "system.description": src.system.description
          });
        }
        foundCnt++;
      } else {
        unknownCnt++;
        console.log(`Not found: "${src.name}" with key: ${indexKey} `);
        missingRefDocuments.push(src.name);
      }
    }
    console.log(`Found: ${foundCnt}, unknown: ${unknownCnt}`);
    console.log(`List of missing entries in reference module: ${missingRefDocuments}`);
    ui.notifications.info(`List of missing entries in reference module: ${missingRefDocuments}`);
    if (wasLocked) {
      await refPack.configure({
        locked: true
      });
    }
  }

  static async getAbilityFromCompendium(key, option = "") {
    const ref = game.settings.get(CONFIG.ARM5E.SYSTEM_ID, "compendiaRef");

    let res = await getAbilityInternal(ref, key, option);
    if (!res) {
      if (game.settings.get(CONFIG.ARM5E.SYSTEM_ID, "notifyMissingRef") == "true") {
        ui.notifications.info(`Unknown ability key (${key}) in ${ref} compendium`);
      }
      res = await getAbilityInternal(CONFIG.ARM5E.REF_MODULE_ID, key, option);
    }
    return res;
  }

  /**
   *
   * @param compendium
   * @param indexkey
   */
  static async getItemFromCompendium(compendium, indexkey) {
    const ref = game.settings.get(CONFIG.ARM5E.SYSTEM_ID, "compendiaRef");

    let res = await this.getItemInternal(ref, compendium, indexkey);
    if (!res) {
      if (game.settings.get(CONFIG.ARM5E.SYSTEM_ID, "notifyMissingRef") == "true") {
        ui.notifications.info(`Unknown item key (${indexkey}) in ${ref} compendium`);
      }
      res = await this.getItemInternal(CONFIG.ARM5E.REF_MODULE_ID, indexkey);
    }
    return res;
  }

  /**
   *
   * @param moduleRef
   * @param compendium
   * @param indexkey
   */
  static async getItemInternal(moduleRef, compendium, indexkey) {
    let pack = game.packs.get(`${moduleRef}.${compendium}`);

    if (pack == undefined) return undefined;

    if (!pack.indexFields.has("system.indexKey")) {
      await pack.getIndex({ fields: ["system.indexKey"] });
    }
    let res = pack.index.find((i) => i.system.indexKey == indexkey);
    if (res) {
      return await fromUuid(res.uuid);
    }
    return null;
  }
  /**
   *
   * @param key
   * @param option
   */
  static async getAbilityFromCompendium(key, option = "") {
    const ref = game.settings.get(CONFIG.ARM5E.SYSTEM_ID, "compendiaRef");

    let res = await this.getAbilityInternal(ref, key, option);
    if (!res) {
      res = await this.getAbilityInternal(CONFIG.ARM5E.REF_MODULE_ID, key, option);
    }
    return res;
  }

  /**
   *
   * @param moduleRef
   * @param key
   * @param option
   */
  static async getAbilityInternal(moduleRef, key, option = "") {
    let abilitiesPack = game.packs.get(`${moduleRef}.abilities`);

    if (abilitiesPack == undefined) return undefined;

    if (!abilitiesPack.indexFields.has("system.key")) {
      await abilitiesPack.getIndex({ fields: ["system.key", "system.option"] });
    }
    let res = abilitiesPack.index.find((i) => i.system.key == key && i.system.option == option);
    if (res) {
      let genericAb = await fromUuid(res.uuid);
      return genericAb.toObject();
    } else if (option !== "" && CONFIG.ARM5E.ALL_ABILITIES[key].option) {
      // Try to get without specifying the option:
      let optionDefault = game.i18n.localize(CONFIG.ARM5E.ALL_ABILITIES[key].optionDefault);

      res = abilitiesPack.index.find((i) => i.system.key == key && i.system.option == optionDefault);
      if (res) {
        let genericAb = await fromUuid(res.uuid);
        // Update the option
        genericAb = genericAb.toObject();
        genericAb.system.option = option;
        return genericAb;
      }
    }
    return null;
  }

  static CloneReferenceCompendia(name, description, author, prefix = "My -") {
    // first check if the name already exists
    // if (prefix)
  }
}
