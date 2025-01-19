export class FixItYourself extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object.selected = { actor: null, item: null, field: null, newVal: null };
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "fiy",
      template: "modules/arm5e-compendia/templates/fix-it-yourself.html",
      height: 820,
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      submitOnClose: false,
      submitOnChange: true,
      title: game.i18n.localize("Fix it yourself!"),
      width: 600,
      resizable: true
    });
  }

  async getData() {
    const context = super.getData().object;
    context.items = {};
    context.actors = {};
    context.invalidActorsCnt = 0;
    for (let id of game.actors.invalidDocumentIds) {
      context.invalidActorsCnt++;
      const actor = game.actors.getInvalid(id);
      context.actors[id] = { doc: actor, errors: this.listErrors(actor) };
    }

    context.invalidItemsCnt = 0;
    for (let id of game.items.invalidDocumentIds) {
      context.invalidItemsCnt++;
      const item = game.items.getInvalid(id);
      context.items[id] = { doc: item, errors: this.listErrors(item) };
    }
    context.embeddedItemIds = {};
    context.invalidEmbItems = 0;
    for (let a of game.actors) {
      const invalidIds = a.items.invalidDocumentIds;
      if (invalidIds.size) {
        context.invalidEmbItems += invalidIds.size;
        context.embeddedItemIds[a._id] = { actor: a, invalidItems: {} };
        for (let ei of a.items.invalidDocumentIds) {
          const item = game.actors.get(a._id).items.getInvalid(ei);
          context.embeddedItemIds[a._id].invalidItems[ei] = { doc: item, errors: this.listErrors(item) };
        }
      }
    }

    return context;
  }

  listErrors(doc) {
    const validationErrors = doc.validationFailures;
    let res = {};
    this.listFieldsWithError(res, validationErrors.fields.fields);
    return res;
  }

  listFieldsWithError(res, fields, fieldname = "") {
    if (fields == null) return;

    for (let [k, v] of Object.entries(fields)) {
      if (foundry.utils.isEmpty(v.fields)) {
        res[`${fieldname}.${k}`] = { msg: v.message, val: v.invalidValue };
      } else {
        return this.listFieldsWithError(res, v.fields, `${fieldname === "" ? k : fieldname + "." + k}`);
      }
    }
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".select-actor").click(async (ev) => {
      ev.preventDefault();
      const dataset = ev.currentTarget.dataset;
      this.object.selected.actor = dataset.actorId;
      this.object.selected.item = null;
      this.object.selected.field = dataset.field;
      this.object.selected.newVal = dataset.value;

      await this.submit({ preventClose: true });
    });

    html.find(".select-item").click(async (ev) => {
      ev.preventDefault();
      const dataset = ev.currentTarget.dataset;
      this.object.selected.actor = null;
      this.object.selected.item = dataset.itemId;
      this.object.selected.field = dataset.field;
      this.object.selected.newVal = dataset.value;

      await this.submit({ preventClose: true });
    });

    html.find(".select-embedded").click(async (ev) => {
      ev.preventDefault();
      const dataset = ev.currentTarget.dataset;
      this.object.selected.actor = dataset.actorId;
      this.object.selected.item = dataset.itemId;
      this.object.selected.field = dataset.field;
      this.object.selected.newVal = dataset.value;

      await this.submit({ preventClose: true });
    });
    html.find(".update-document").click(async (ev) => {
      ev.preventDefault();

      if (this.object.selected.actor === null) {
        if (this.object.selected.item === null) {
          ui.notifications.warn("No field selected, click on one.");
        } else {
          // invalid item
          const item = game.items.getInvalid(this.object.selected.item);
          const res = await item.update({ [this.object.selected.field]: this.object.selected.newVal }, { diff: false });
        }
      } else {
        if (this.object.selected.item === null) {
          // invalid actor
          const actor = game.actors.getInvalid(this.object.selected.actor);
          await actor.update({ [this.object.selected.field]: this.object.selected.newVal }, { diff: false });
        } else {
          // invalid embedded item
          const item = game.actors.get(this.object.selected.actor).items.getInvalid(this.object.selected.item);
          await item.update({ [this.object.selected.field]: this.object.selected.newVal }, { diff: false });
        }
      }
    });
  }

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    this.render();
  }
}
