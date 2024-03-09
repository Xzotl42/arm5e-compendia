import { FileTools } from "./FileTools.js";

export class ModuleGenerator extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object = {
      moduleName: "My own Ars Magica reference module",
      description: "Name of the module as you want it to appear in FoundryVTT",
      author: "me",
      prefix: "My own"
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "sourcebooks-filters-config",
      template: "modules/arm5e-compendia/templates/creation.html",
      height: "auto",
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      height: "303px",
      submitOnChange: true,
      submitOnClose: false,
      title: game.i18n.localize("Reference compendia module generator"),
      width: 600,
      resizable: true
    });
  }

  MODULE_PATH = `modules/${CONFIG.ARM5E.REF_MODULE_ID}/`;

  async getData() {
    const context = super.getData().object;

    context.id = FileTools.slugify(context.moduleName);
    console.log(context);
    return context;
  }

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    this.render();
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".change-name").click(async (ev) => {});
    html.find(".createModule").click(async (ev) => {
      ev.preventDefault();
      const newModuleFolder = `modules/${this.object.id}`;
      if (await FileTools.directoryExists(newModuleFolder)) {
        console.log("A module of this name already exists!");
        return;
      }

      FileTools.createFolderIfMissing("modules", this.object.id);
      console.log("Folder created");

      // create the module.json
      const moduleJson = await FileTools.fetchFile("modules/arm5e-compendia/module.json", `module.json`);
      let text = await readTextFromFile(moduleJson);
      const manifest = JSON.parse(text);
      console.log(`module.json : ${manifest}`);
      manifest.id = this.object.id;
      manifest.title = this.object.description;
      manifest.authors.push({ name: this.object.author });
      delete manifest.manifest;
      delete manifest.download;
      for (let p of manifest.packs) {
        p.label = `${this.object.prefix} - ${p.name}`;
      }

      FileTools.uploadDataToServer(JSON.stringify(manifest, null, 2), `module.json`, "text/json", newModuleFolder);
    });
  }
}
