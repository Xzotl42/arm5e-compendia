import { CompendiaUtils } from "./compendia.js";
import { FileTools } from "./FileTools.js";
export class MergeTool extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object = {
      dryRun: true,
      itemTypes: {
        abilities: { label: "Abilities", enabled: true },
        virtues: { label: "Virtues", enabled: true },
        flaws: { label: "Flaws", enabled: true }
      }
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "sourcebooks-filters-config",
      template: "modules/arm5e-compendia/templates/tools.html",
      height: "auto",
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      height: "303px",
      submitOnChange: true,
      submitOnClose: false,
      title: game.i18n.localize(`Compendia merging and tooling`),
      width: 400,
      resizable: true
    });
  }

  async getData() {
    const context = super.getData().object;
    // context.dryRun = true;
    context.referenceModule = game.settings.get(CONFIG.ARM5E.SYSTEM_ID, "compendiaRef");
    context.arsModules = game.packs.contents
      .filter((e) => {
        return (
          ![context.referenceModule, CONFIG.ARM5E.REF_MODULE_ID].includes(e.metadata.packageName) &&
          e.metadata.system == CONFIG.ARM5E.SYSTEM_ID &&
          e.metadata.type === "Item"
        );
      })
      .map((e) => {
        return { name: `${e.metadata.label} (${e.metadata.id})`, id: e.metadata.id, enabled: false };
      });
    if (context.arsModules.length == 0) {
      context.message = "No source Item compendium found.";
      context.merge = "disabled";
    } else {
      context.merge = "";
      context.source = context.arsModules[0].id;
    }

    console.log(context);
    return context;
  }

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".merge").click(async (ev) => {
      ev.preventDefault();
      await this.mergeCompendium();
    });
  }

  async mergeCompendium() {
    console.log(JSON.stringify(this.object));

    if (this.object.itemTypes.abilities.enabled) {
      await CompendiaUtils.mergeAbilitiesIntoReference(
        this.object.source,
        `${this.object.referenceModule}.abilities`,
        this.object.dryRun
      );
    }

    if (this.object.itemTypes.virtues.enabled) {
      await CompendiaUtils.mergeItemsIntoReference(
        this.object.source,
        `${this.object.referenceModule}.virtues`,
        "virtue",
        this.object.dryRun
      );
    }

    if (this.object.itemTypes.flaws.enabled) {
      await CompendiaUtils.mergeItemsIntoReference(
        this.object.source,
        `${this.object.referenceModule}.flaws`,
        "flaw",
        this.object.dryRun
      );
    }
  }
}
