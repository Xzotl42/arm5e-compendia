export class WorldFolderImporter extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object = {
      docType: "Item",
      sourceFolder: "",
      targetPack: "",
      dryRun: true,
      report: ""
    };
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "world-folder-importer",
      template: "modules/arm5e-compendia/templates/world-folder-importer.html",
      height: "auto",
      width: 450,
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: false,
      title: "World Folder Importer",
      resizable: true
    });
  }

  async getData() {
    const context = super.getData().object;

    context.docTypes = [
      { value: "Item", label: "Items" },
      { value: "Actor", label: "Actors" },
      { value: "JournalEntry", label: "Journal Entries" }
    ];

    // Resolve world collection based on selected document type
    let collection;
    if (context.docType === "Actor") {
      collection = game.actors;
    } else if (context.docType === "JournalEntry") {
      collection = game.journal;
    } else {
      collection = game.items;
    }

    context.sourceFolders = collection.folders.contents.map((f) => ({ id: f.id, name: f.name }));

    context.targetPacks = game.packs
      .filter((p) => p.documentName === context.docType && p.metadata.packageType !== "world")
      .map((p) => ({ id: p.collection, name: `${p.metadata.label} (${p.metadata.id})` }));

    context.canImport = context.sourceFolder !== "" && context.targetPack !== "";

    if (context.report !== "") {
      context.enrichedReport = await TextEditor.enrichHTML(context.report, {
        secrets: true,
        async: true,
        rollData: {}
      });
    }

    return context;
  }

  async _updateObject(ev, formData) {
    const expanded = foundry.utils.expandObject(formData);
    // Reset folder/pack selections when the document type changes
    if (expanded.docType !== this.object.docType) {
      expanded.sourceFolder = "";
      expanded.targetPack = "";
    }
    foundry.utils.mergeObject(this.object, expanded);
    this.render();
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".import-btn").click(async (ev) => {
      ev.preventDefault();
      await this._doImport();
    });
  }

  async _doImport() {
    const { docType, sourceFolder, targetPack, dryRun } = this.object;
    const result = await game.arm5eCompendia.CompendiaUtils.importWorldFolderToCompendium(
      docType,
      sourceFolder,
      targetPack,
      dryRun
    );
    this.object.report = result.report;
    this.render();
  }
}
