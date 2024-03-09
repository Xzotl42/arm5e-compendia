import { FileTools } from "./FileTools.js";

export class SanitizationTool extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object = {
      outputFolder: "Output"
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
      title: game.i18n.localize("Sanitize documents"),
      width: 400,
      resizable: false,
      dragDrop: [{ dragSelector: null, dropSelector: ".drop-document" }]
    });
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
}
