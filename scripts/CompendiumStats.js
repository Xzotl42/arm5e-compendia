import { CompendiaUtils } from "./compendia.js";
import { FileTools } from "./FileTools.js";

export class CompendiumStats extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object.comp = null;
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "compendium-stats",
      template: "modules/arm5e-compendia/templates/compendium-stats.html",
      height: 700,
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      submitOnClose: false,
      title: game.i18n.localize("Compendium stats"),
      width: 600,
      resizable: true,
      dragDrop: [{ dragSelector: null, dropSelector: ".drop-document" }]
    });
  }

  async _onDrop(event) {
    const target = this.object.outputFolder;

    const dropData = TextEditor.getDragEventData(event);
    if (dropData.type === "Compendium") {
      this.object.comp = await game.packs.get(dropData.id);
      let docs = await this.object.comp.getDocuments();
      const stats = {
        reviewed: [],
        toreview: [],
        needAE: [],
        todo: [],
        ready: [],
        missingIndexKey: [],
        missingDescription: [],
        hasPageRef: [],
        duplicateName: [],
        duplicateIndex: [],
        homebrewOrCore: [],
        customList: []
      };
      let nameSet = new Set();
      let indexKeySet = new Set();

      this.object.report = `<h1>Compendium stats</h1>`;
      this.object.report += `<h2>${this.object.comp.metadata.label}</h2><ul>`;
      this.object.report += `<li>Name: ${this.object.comp.metadata.name}</li>`;
      this.object.report += `<li>Number of documents: ${docs.length}</li>`;

      for (let d of docs) {
        if (nameSet.has(d.name)) {
          stats.duplicateName.push(d);
        } else {
          nameSet.add(d.name);
        }

        if (indexKeySet.has(FileTools.slugify(d.name))) {
          stats.duplicateIndex.push(d);
        } else {
          indexKeySet.add(FileTools.slugify(d.name));
        }

        switch (d.system.review_status) {
          case "toReview":
            stats.toreview.push(d);
            break;
          case "none":
            stats.todo.push(d);
            break;
          case "reviewed":
            stats.reviewed.push(d);
            break;
          case "needAE":
            stats.needAE.push(d);

            break;
          case "definitiveReady":
            stats.ready.push(d);
        }
        if (d.system.indexKey == "") {
          stats.missingIndexKey.push(d);
        }
        if (d.system.description == "") {
          stats.missingDescription.push(d);
        }
        if (d.system.description.includes("@@")) {
          stats.hasPageRef.push(d);
        }

        if (d.system.source === "ArM5" || d.system.source === "custom") {
          stats.homebrewOrCore.push(d);
        }
        if (d.type === "spell" && d.system.source !== "ArM5Def" && d.system.general) {
          // CUSTOM
          stats.customList.push(d);
        }

        // CUSTOM END
      }
      this.object.report += `<li>To review: ${stats.toreview.length}</li>`;
      this.object.report += "<ul>";
      // for (let d of stats.toreview) {
      //   this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      // }
      this.object.report += "</ul>";
      this.object.report += `<li>To do: ${stats.todo.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.todo) {
        this.object.report += `<li>${d.uuid}</li>`;
      }
      this.object.report += "</ul>";
      this.object.report += `<li>Reviewed: ${stats.reviewed.length}</li>`;
      this.object.report += "<ul>";
      // for (let d of stats.reviewed) {
      //   this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      // }
      this.object.report += "</ul>";

      this.object.report += `<li>Need AE: ${stats.needAE.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.needAE) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";
      this.object.report += `<li>DE Ready: ${stats.ready.length}</li>`;
      this.object.report += "</ul>";
      this.object.report += "</ul>";

      this.object.report += `<h2>Documents lists</h2>`;
      this.object.report += "<ul>";

      this.object.report += `<li>Is a duplicate: ${stats.duplicateName.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.duplicateName) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";

      this.object.report += `<li>Has a duplicate index: ${stats.duplicateIndex.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.duplicateIndex) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";

      this.object.report += `<li>Missing index-key: ${stats.missingIndexKey.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.missingIndexKey) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";
      this.object.report += `<li>Missing description: ${stats.missingDescription.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.missingDescription) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";
      this.object.report += `<li>To review: ${stats.toreview.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.toreview) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";
      this.object.report += "</ul>";
      this.object.report += `<li>Has missing page references: ${stats.hasPageRef.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.hasPageRef) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";
      // Homebrew or corebook
      this.object.report += `<li>Still homebrew or Corebook: ${stats.homebrewOrCore.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.homebrewOrCore) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";
      // CUSTOM
      this.object.report += `<li>Custom list: ${stats.customList.length}</li>`;
      this.object.report += "<ul>";
      for (let d of stats.customList) {
        this.object.report += `<li>@UUID[${d.uuid}]{${d.name}}</li>`;
      }
      this.object.report += "</ul>";
      // CUSTOM END

      this.object.report += "</ul>";
    } else {
      console.log("Not a compendium");
    }
    this.render();
  }

  async getData() {
    const context = super.getData().object;

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
    html.find(".indexing").click(async (ev) => {
      ev.preventDefault();
      if (this.object.comp === null) return;
      await CompendiaUtils.createIndexKeys(this.object.comp, true);
    });

    html.find(".process").click(async (ev) => {
      ev.preventDefault();
      if (this.object.comp === null) return;
      await this.processDocuments(this.object.comp, false);
    });
  }

  async processDocuments(pack, dryrun = true) {
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

      const updateData = {};
      const parser = new DOMParser();
      let res = document.createElement("p");
      const desc = $.parseHTML(doc.system.description);
      let cleaned = this.cleanHTML(desc);

      console.log(cleaned);
      updateData["system.description"] = cleaned;
      if (!dryrun) await doc.update(updateData);
      count++;
    }
    console.log(`${count} document processed.`);
    if (wasLocked) {
      await pack.configure({
        locked: true
      });
    }
  }

  cleanHTML(element) {
    let output = "";
    if (element) {
      for (let e of element) {
        if (e.id === "WACViewPanel_ClipboardElement") {
          output += this.cleanHTML(e.children);
        } else if (e.classList.contains("OutlineElement")) {
          output += this.cleanHTML(e.children);
        } else if (e.classList.contains("Paragraph")) {
          output += this.cleanHTML(e.children);
        } else if (e.classList.contains("NormalTextRun")) {
          output += this.cleanHTML(e.children);
        } else {
          output += `<p>${e.innerHTML}</p>`;
        }
      }
    }
    return output;
  }

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    this.render();
  }
}
