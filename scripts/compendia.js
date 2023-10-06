import { CompendiaUi } from "./toolsUi.js";

export class CompendiaUtils {
  static async createIndexKeys(compendium) {
    let pack = game.packs.get(compendium);
    if (pack == undefined) {
      return;
    }

    if (pack.documentName != "Item") {
      return;
    }
    // Unlock the pack for editing
    const wasLocked = pack.locked;
    await pack.configure({
      locked: false
    });

    const documents = await pack.getDocuments();

    for (let doc of documents) {
      // skip Compendium Folders documents
      if (doc.name.startsWith("#[CF")) continue;

      await doc.update({ "system.indexKey": slugify(doc.name) });
    }
  }

  static async showUI() {
    const ui = new CompendiaUi({}, {});
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

  static slugify(str) {
    return String(str)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "") // remove all accents.
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove consecutive hyphens
  }
}
