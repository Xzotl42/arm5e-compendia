import { CompendiaUtils } from "./compendia.js";
import { FileTools } from "./FileTools.js";

export class DocumentEnricher extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object.toEnrich = null;
    this.object.updateData = {};
    this.object.overwrite = false;
    this.object.process = {
      abilities: true,
      virtues: true,
      flaws: true,
      equipment: true,
      spells: true,
      metadata: true
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "doc-enricher",
      template: "modules/arm5e-compendia/templates/doc-enricher.html",
      height: 700,
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      submitOnClose: false,
      submitOnChange: true,
      title: game.i18n.localize("Document enricher"),
      width: 600,
      resizable: true,
      dragDrop: [{ dragSelector: null, dropSelector: ".drop-document" }]
    });
  }

  async _onDrop(event) {
    const target = this.object.outputFolder;

    const dropData = TextEditor.getDragEventData(event);
    if (dropData.type === "Actor") {
      this.object.toEnrich = await fromUuid(dropData.uuid);

      if (!this.object.toEnrich._isCharacter()) {
        this.object.toEnrich = null;
        return;
      }
      this.object.updateData = [];
      const actor = this.object.toEnrich;

      this.object.report = `<h2>Name: ${actor.name}</h2>`;

      // abilities:
      this.object.report += `<h3>Abilities</h3>`;
      this.object.report += `<label>Number of abilities: ${actor.system.abilities.length}</label>`;
      // virtues :
      this.object.report += `<h3>Virtues</h3>`;
      this.object.report += `<label>Number of virtues: ${actor.system.virtues.length}</label>`;
      // flaws
      this.object.report += `<h3>Flaws</h3>`;
      this.object.report += `<label>Number of flaws: ${actor.system.flaws.length}</label>`;
      // equipment
      this.object.report += `<h3>Equipment</h3>`;
      this.object.report += `<label>Number of pieces of equipment: ${
        actor.system.weapons.length + actor.system.armor.length
      }</label>`;
      // spells
      this.object.report += `<h3>Spells</h3>`;
      this.object.report += `<label>Number of spells: ${actor.system.spells.length}</label>`;
      // } else if (dropData.type === "Folder") {
      //   const folder = await fromUuid(dropData.uuid);
      //   let rootFolder;
      //   if (folder.type == "Actor") {
      //     rootFolder = game.actors.folders.getName(target);
      //   } else if (folder.type == "Item") {
      //     rootFolder = game.items.folders.getName(target);
      //   }
      //   if (!rootFolder) {
      //     rootFolder = await this._createFolder(target, folder.type, null);
      //   }
      //   await this._enrichFolderContents(folder, rootFolder._id);
    } else {
      console.log("Not an actor");
    }
    this.render();
  }

  async _enrichFolderContents(folder, parentId) {
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

  async getData() {
    const context = super.getData().object;
    context.analyzed = context.updateData.length == 0 ? "disabled" : "";
    context.devMode = game.modules.get("_dev-mode")?.api?.getPackageDebugValue(CONFIG.ARM5E.SYSTEM_ID);
    context.enrichedReport = await TextEditor.enrichHTML(context.report, {
      // Whether to show secret blocks in the finished html
      secrets: true,
      // Necessary in v11, can be removed in v12
      async: true,
      // Data to fill in for inline rolls
      rollData: {}
      // Relative UUID resolution
      // relativeTo: this.actor
    });
    console.log(context);
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    // html.find(".indexing").click(async (ev) => {
    //   ev.preventDefault();
    //   if (this.object.comp === null) return;
    //   await CompendiaUtils.createIndexKeys(this.object.comp, true);
    // });

    html.find(".analysis").click(async (ev) => {
      ev.preventDefault();
      if (this.object.toEnrich === null) return;
      await this.analyzeDocuments(this.object.toEnrich);
    });
    html.find(".enrich").click(async (ev) => {
      ev.preventDefault();
      if (this.object.toEnrich === null) return;
      await this.enrichDocuments(this.object.toEnrich, false);
    });
  }
  async analyzeDocuments(actor) {
    const toProcess = this.object.process;
    this.object.report = `<h2>Name: ${actor.name}</h2>`;
    const updateData = this.object.updateData;
    if (toProcess.abilities) {
      // abilities:

      this.object.report += `<h3>Abilities</h3>`;
      this.object.report += `<label>Number of abilities: ${actor.system.abilities.length}</label><ul>`;
      const abilities = {
        emptyDesc: [],
        missingIndexKey: [],
        refNotFound: []
      };
      for (let ab of actor.system.abilities) {
        let reportLine = ``;
        let itemData = {};
        const ref = await CompendiaUtils.getAbilityFromCompendium(ab.system.key, ab.system.option);
        if (ab.system.description == "" || this.object.overwrite) {
          if (ab.system.description == "") {
            abilities.emptyDesc.push(ab);
          }
          if (ref) {
            itemData["system.description"] = ref.system.description;
            if (toProcess.metadata) {
              itemData["system.source"] = ref.system.source;
              itemData["system.page"] = ref.system.page;
              itemData["system.review_status"] = ref.system.review_status;
              itemData["system.reviewer"] = ref.system.reviewer;
            }
          } else {
            abilities.refNotFound.push(ab);
            reportLine = `@UUID[${ab.uuid}]{${ab.name}} - reference not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
          reportLine += `@UUID[${ab.uuid}]{${ab.name}} - desc update`;
        }
        if (ab.system.indexKey === "") {
          abilities.missingIndexKey.push(ab);
          // try to guess it.
          let indexKeyCandidate = FileTools.slugify(ab.name);
          const test = await CompendiaUtils.getItemFromCompendium("abilities", indexKeyCandidate);
          if (reportLine == "") {
            reportLine = `@UUID[${ab.uuid}]{${ab.name}}`;
          }
          if (test) {
            reportLine += `- guessed indexKey: ${test.system.indexKey}`;
            itemData["system.indexKey"] = test.system.indexKey;
            if (toProcess.metadata) {
              itemData["system.source"] = test.system.source;
              itemData["system.page"] = test.system.page;
              itemData["system.review_status"] = test.system.review_status;
              itemData["system.reviewer"] = test.system.reviewer;
            }
          } else {
            reportLine += `- indexKey not found`;
          }
        }
        if (!foundry.utils.isEmpty(itemData)) {
          itemData["_id"] = ab._id;
          updateData.push(itemData);
        }
        if (reportLine !== "") this.object.report += `<li>${reportLine}</li>`;
      }
      this.object.report += `</ul>`;
    }

    if (toProcess.virtues) {
      // virtues :
      this.object.report += `<h3>Virtues</h3>`;
      this.object.report += `<label>Number of virtues: ${actor.system.virtues.length}</label><ul>`;
      const virtues = {
        emptyDesc: [],
        missingIndexKey: [],
        refNotFound: []
      };
      for (let virtue of actor.system.virtues) {
        let reportLine = ``;
        let itemData = {};
        let ref;
        if (virtue.system.indexKey === "") {
          virtues.missingIndexKey.push(virtue);
          // try to guess it.
          let indexKeyCandidate = FileTools.slugify(virtue.name);
          ref = await CompendiaUtils.getItemFromCompendium("virtues", indexKeyCandidate);

          if (ref) {
            reportLine = `@UUID[${virtue.uuid}]{${virtue.name}} - guessed indexKey: ${ref.system.indexKey}`;
            itemData["system.indexKey"] = ref.system.indexKey;
          } else {
            reportLine = `@UUID[${virtue.uuid}]{${virtue.name}} - indexKey not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        } else {
          ref = await CompendiaUtils.getItemFromCompendium("virtues", virtue.system.indexKey);
        }

        if (virtue.system.description == "" || this.object.overwrite) {
          if (virtue.system.description == "") {
            virtues.emptyDesc.push(virtue);
          }
          if (reportLine == "") {
            reportLine = `@UUID[${virtue.uuid}]{${virtue.name}}`;
          }
          if (ref) {
            itemData["system.description"] = ref.system.description;

            reportLine += ` - desc update`;
          } else {
            virtues.refNotFound.push(virtue);
            reportLine += ` - reference ${virtue.system.indexKey} not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        }

        if (!foundry.utils.isEmpty(itemData)) {
          itemData["_id"] = virtue._id;
          if (toProcess.metadata) {
            itemData["system.source"] = ref.system.source;
            itemData["system.page"] = ref.system.page;
            itemData["system.review_status"] = ref.system.review_status;
            itemData["system.reviewer"] = ref.system.reviewer;
          }
          updateData.push(itemData);
        }
        if (reportLine !== "") this.object.report += `<li>${reportLine}</li>`;
      }
      this.object.report += `</ul>`;
    }

    if (toProcess.flaws) {
      // flaws
      this.object.report += `<h3>Flaws</h3>`;
      this.object.report += `<label>Number of flaws: ${actor.system.flaws.length}</label><ul>`;
      const flaws = {
        emptyDesc: [],
        missingIndexKey: [],
        refNotFound: []
      };
      for (let flaw of actor.system.flaws) {
        let reportLine = ``;
        let itemData = {};
        let ref;
        if (flaw.system.indexKey === "") {
          flaws.missingIndexKey.push(flaw);
          // try to guess it.
          let indexKeyCandidate = FileTools.slugify(flaw.name);
          ref = await CompendiaUtils.getItemFromCompendium("flaws", indexKeyCandidate);

          if (ref) {
            reportLine = `@UUID[${flaw.uuid}]{${flaw.name}} - guessed indexKey: ${ref.system.indexKey}`;
            itemData["system.indexKey"] = ref.system.indexKey;
          } else {
            reportLine = `@UUID[${flaw.uuid}]{${flaw.name}} - indexKey not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        } else {
          ref = await CompendiaUtils.getItemFromCompendium("flaws", flaw.system.indexKey);
        }

        if (flaw.system.description == "" || this.object.overwrite) {
          if (flaw.system.description == "") {
            flaws.emptyDesc.push(flaw);
          }
          if (reportLine == "") {
            reportLine = `@UUID[${flaw.uuid}]{${flaw.name}}`;
          }
          if (ref) {
            itemData["system.description"] = ref.system.description;

            reportLine += ` - desc update`;
          } else {
            flaws.refNotFound.push(flaw);
            reportLine += ` - reference ${flaw.system.indexKey} not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        }

        if (!foundry.utils.isEmpty(itemData)) {
          itemData["_id"] = flaw._id;
          if (toProcess.metadata) {
            itemData["system.source"] = ref.system.source;
            itemData["system.page"] = ref.system.page;
            itemData["system.review_status"] = ref.system.review_status;
            itemData["system.reviewer"] = ref.system.reviewer;
          }
          updateData.push(itemData);
        }
        if (reportLine !== "") this.object.report += `<li>${reportLine}</li>`;
      }
      this.object.report += `</ul>`;
    }

    if (toProcess.equipment) {
      // weapons
      this.object.report += `<h3>Weapons</h3>`;
      this.object.report += `<label>Number of weapons: ${actor.system.weapons.length}</label><ul>`;
      const weapons = {
        emptyDesc: [],
        missingIndexKey: [],
        refNotFound: []
      };
      for (let w of actor.system.weapons) {
        let reportLine = ``;
        let itemData = {};
        let ref;
        if (w.system.indexKey === "") {
          weapons.missingIndexKey.push(w);
          // try to guess it.
          let indexKeyCandidate = FileTools.slugify(w.name);
          ref = await CompendiaUtils.getItemFromCompendium("equipment", indexKeyCandidate);

          if (ref) {
            reportLine = `@UUID[${w.uuid}]{${w.name}} - guessed indexKey: ${ref.system.indexKey}`;
            itemData["system.indexKey"] = ref.system.indexKey;
          } else {
            reportLine = `@UUID[${w.uuid}]{${w.name}} - indexKey not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        } else {
          ref = await CompendiaUtils.getItemFromCompendium("equipment", w.system.indexKey);
        }

        if (w.system.description == "" || this.object.overwrite) {
          if (w.system.description == "") {
            weapons.emptyDesc.push(w);
          }
          if (reportLine == "") {
            reportLine = `@UUID[${w.uuid}]{${w.name}}`;
          }
          if (ref) {
            itemData["system.description"] = ref.system.description;

            reportLine += ` - desc update`;
          } else {
            weapons.refNotFound.push(w);
            reportLine += ` - reference ${w.system.indexKey} not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        }

        if (!foundry.utils.isEmpty(itemData)) {
          itemData["_id"] = w._id;
          if (toProcess.metadata) {
            itemData["system.source"] = ref.system.source;
            itemData["system.page"] = ref.system.page;
            itemData["system.review_status"] = ref.system.review_status;
            itemData["system.reviewer"] = ref.system.reviewer;
          }
          updateData.push(itemData);
        }
        if (reportLine !== "") this.object.report += `<li>${reportLine}</li>`;
      }
      this.object.report += `</ul>`;
      // armor
      this.object.report += `<h3>Armor</h3>`;
      this.object.report += `<label>Number of armor pieces: ${actor.system.armor.length}</label><ul>`;
      const armor = {
        emptyDesc: [],
        missingIndexKey: [],
        refNotFound: []
      };
      for (let a of actor.system.armor) {
        let reportLine = ``;
        let itemData = {};
        let ref;
        if (a.system.indexKey === "") {
          armor.missingIndexKey.push(a);
          // try to guess it.
          let indexKeyCandidate = FileTools.slugify(a.name);
          ref = await CompendiaUtils.getItemFromCompendium("equipment", indexKeyCandidate);

          if (ref) {
            reportLine = `@UUID[${a.uuid}]{${a.name}} - guessed indexKey: ${ref.system.indexKey}`;
            itemData["system.indexKey"] = ref.system.indexKey;
          } else {
            reportLine = `@UUID[${a.uuid}]{${a.name}} - indexKey not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        } else {
          ref = await CompendiaUtils.getItemFromCompendium("equipment", a.system.indexKey);
        }

        if (a.system.description == "" || this.object.overwrite) {
          if (a.system.description == "") {
            armor.emptyDesc.push(a);
          }
          if (reportLine == "") {
            reportLine = `@UUID[${a.uuid}]{${a.name}}`;
          }
          if (ref) {
            itemData["system.description"] = ref.system.description;

            reportLine += ` - desc update`;
          } else {
            armor.refNotFound.push(virtue);
            reportLine += ` - reference ${s.system.indexKey} not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        }

        if (!foundry.utils.isEmpty(itemData)) {
          itemData["_id"] = a._id;
          if (toProcess.metadata) {
            itemData["system.source"] = ref.system.source;
            itemData["system.page"] = ref.system.page;
            itemData["system.review_status"] = ref.system.review_status;
            itemData["system.reviewer"] = ref.system.reviewer;
          }
          updateData.push(itemData);
        }
        if (reportLine !== "") this.object.report += `<li>${reportLine}</li>`;
      }
      this.object.report += `</ul>`;
    }

    if (toProcess.spells) {
      // spells
      this.object.report += `<h3>Spells</h3>`;
      this.object.report += `<label>Number of spells: ${actor.system.spells.length}</label><ul>`;
      const spells = {
        emptyDesc: [],
        missingIndexKey: [],
        refNotFound: []
      };
      for (let s of actor.system.spells) {
        let reportLine = ``;
        let itemData = {};
        let ref;
        if (s.system.indexKey === "") {
          spells.missingIndexKey.push(s);
          // try to guess it.
          let indexKeyCandidate = FileTools.slugify(s.name);
          ref = await CompendiaUtils.getItemFromCompendium("spells", indexKeyCandidate);

          if (ref) {
            reportLine = `@UUID[${s.uuid}]{${s.name}} - guessed indexKey: ${ref.system.indexKey}`;
            itemData["system.indexKey"] = ref.system.indexKey;
          } else {
            reportLine = `@UUID[${s.uuid}]{${s.name}} - indexKey not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        } else {
          ref = await CompendiaUtils.getItemFromCompendium("spells", s.system.indexKey);
        }

        if (s.system.description == "" || this.object.overwrite) {
          if (s.system.description == "") {
            spells.emptyDesc.push(s);
          }
          if (reportLine == "") {
            reportLine = `@UUID[${s.uuid}]{${s.name}}`;
          }
          if (ref) {
            itemData["system.description"] = ref.system.description;

            reportLine += ` - desc update`;
          } else {
            spells.refNotFound.push(s);
            reportLine += ` - reference ${s.system.indexKey} not found`;
            this.object.report += `<li>${reportLine}</li>`;
            continue;
          }
        }

        if (!foundry.utils.isEmpty(itemData)) {
          itemData["_id"] = s._id;
          if (toProcess.metadata) {
            itemData["system.source"] = ref.system.source;
            itemData["system.page"] = ref.system.page;
            itemData["system.review_status"] = ref.system.review_status;
            itemData["system.reviewer"] = ref.system.reviewer;
          }
          updateData.push(itemData);
        }
        if (reportLine !== "") this.object.report += `<li>${reportLine}</li>`;
      }
      this.object.report += `</ul>`;
    }
    this.render();
  }

  async enrichDocuments(actor, dryrun = true) {
    await actor.updateEmbeddedDocuments("Item", this.object.updateData, { render: true });
  }

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    this.render();
  }
}
