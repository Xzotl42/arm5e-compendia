import { FileTools } from "./FileTools.js";

export class CompendiumStats extends FormApplication {
  constructor(data, options) {
    super(data, options);
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
    if (dropData.type === "Compendium") {
      this.object.comp = await game.packs.get(dropData.id);
      let docs = await comp.getDocuments();
      const stats = { reviewed: [], toreview: [], needAE: [], todo: [], missingIndexKey: [], ready: [] };
      this.object.report = `<h1>Compendium stats</h1>`;
      this.object.report += `<h2>${comp.metadata.label}</h2><ul>`;
      this.object.report += `<li>Name: ${comp.metadata.name}</li>`;
      this.object.report += `<li>Number of documents: ${docs.length}</li>`;

      for (let d of docs) {
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
      this.object.report += `<li>Missing index-key: ${stats.missingIndexKey.length}</li>`;
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
    } else {
      console.log("Not a compendium");
    }
    this.render();
  }

  async getData() {
    const context = super.getData().object;
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

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    this.render();
  }

  async _createFolder(name, collection, parentId) {
    return await Folder.create({ name: name, type: collection, parent: parentId });
  }
}
