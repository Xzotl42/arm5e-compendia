import { FileTools } from "./FileTools.js";

export class SanitizationTool extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object = {
      outputFolder: "Sanitized Documents"
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "sourcebooks-filters-config",
      template: "modules/arm5e-compendia/templates/sanitization.html",
      height: "auto",
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      height: "303px",
      submitOnClose: false,
      title: game.i18n.localize("Sanitizer"),
      width: 400,
      resizable: false,
      dragDrop: [{ dragSelector: null, dropSelector: ".drop-document" }]
    });
  }

  ItemToSanitize = [
    "weapon",
    "armor",
    "item",
    "spell",
    "book",
    "virtue",
    "flaw",
    "diaryEntry",
    "ability",
    "magicalEffect",
    "laboratoryText",
    "enchantment"
  ];
  async _onDrop(event) {
    const target = this.object.outputFolder;

    const dropData = TextEditor.getDragEventData(event);
    switch (dropData.type) {
      case "Item": {
        const item = await fromUuid(dropData.uuid);
        let rootFolder = game.items.folders.getName(target);
        if (!rootFolder) {
          rootFolder = await this._createFolder(target, "Item", null);
        }
        const itemData = await this._sanitizeItemData(item, rootFolder._id);
        await Item.create(itemData);
        break;
      }
      case "Actor": {
        const actor = await fromUuid(dropData.uuid);
        let rootFolder = game.actors.folders.getName(target);
        if (!rootFolder) {
          rootFolder = await this._createFolder(target, "Actor", null);
        }
        const actorData = await this._sanitizeActorData(actor, rootFolder._id);
        await Actor.create(actorData);
        break;
      }
      case "Folder": {
        const folder = await fromUuid(dropData.uuid);
        let rootFolder;
        if (folder.type == "Actor") {
          rootFolder = game.actors.folders.getName(target);
        } else if (folder.type == "Item") {
          rootFolder = game.items.folders.getName(target);
        } else {
          break;
        }
        if (!rootFolder) {
          rootFolder = await this._createFolder(target, folder.type, null);
        }
        await this._sanitizeFolder(folder, rootFolder._id);
        break;
      }
      default:
        console.log("Nothing to sanitize");
    }
  }
  async _sanitizeFolder(folder, parentId) {
    if (folder.type === "Item") {
      let subFolder = await this._createFolder(folder.name, "Item", parentId);
      for (let f of folder.getSubfolders()) {
        this._sanitizeFolder(f, subFolder._id);
      }
      const droppedItems = await Promise.all(
        folder.contents.map(async (item) => {
          if (!(document instanceof Item)) item = await fromUuid(item.uuid);
          return await this._sanitizeItemData(item, subFolder._id);
        })
      );
      await Item.createDocuments(droppedItems);
    } else if (folder.type === "Actor") {
      let subFolder = await this._createFolder(folder.name, "Actor", parentId);
      for (let f of folder.getSubfolders()) {
        this._sanitizeFolder(f, subFolder._id);
      }
      const droppedActors = await Promise.all(
        folder.contents.map(async (actor) => {
          if (!(document instanceof Actor)) actor = await fromUuid(actor.uuid);
          return await this._sanitizeActorData(actor, subFolder._id);
        })
      );
      await Actor.createDocuments(droppedActors);
    }
  }
  async _sanitizeActorData(actor, parentId) {
    let actorData;
    if (CONFIG.ARM5E.ActorDataModels[actor.type]) {
      actorData = actor.system.toObject();
    } else {
      actorData = deepClone(actor.system);
    }
    let items = [];
    for (const item of actor.items) {
      items.push(await this._sanitizeItemData(item));
    }

    return {
      name: actor.name,
      type: actor.type,
      img: actor.img,
      folder: parentId,
      system: actorData,
      items: items
    };
  }

  async _sanitizeItemData(item, parentId) {
    const res = {
      name: item.name,
      type: item.type,
      img: item.img,
      folder: parentId
    };

    let itemData;
    if (this.ItemToSanitize.includes(item.type)) {
      // Special cleanup handling
      if (CONFIG.ARM5E.ItemDataModels[item.type] && item.system.sanitize) {
        itemData = item.system.sanitize();
      } else {
        if (CONFIG.ARM5E.ItemDataModels[item.type]) {
          itemData = item.system.toObject();
        } else {
          itemData = deepClone(item.system);
        }
        itemData.description = "";
      }
    } else {
      if (CONFIG.ARM5E.ItemDataModels[item.type]) {
        itemData = item.system.toObject();
      } else {
        itemData = deepClone(item.system);
      }
    }

    res.system = itemData;
    return res;
  }

  async getData() {
    const context = super.getData().object;

    console.log(context);
    return context;
  }

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    this.render();
  }

  async _createFolder(name, collection, parentId) {
    return await Folder.create({ name: name, type: collection, parent: parentId });
  }
}
