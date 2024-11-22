import { CompendiaUtils } from "./compendia.js";
import { ARTS, CHARACTERISTICS, MODEL } from "./DataModel.js";
import { FileTools } from "./FileTools.js";

// to import the parsed characters and creatures

export class ActorImporter extends FormApplication {
  constructor(data, options) {
    super(data, options);
    this.object.original = null;
    this.object.imports = [];
    this.object.stats = {
      // reviewed: [],
      // toreview: [],
      // needAE: [],
      // todo: [],
      // ready: [],
      // missingIndexKey: [],
      // missingDescription: [],
      // hasPageRef: [],
      // duplicateName: [],
      // duplicateIndex: [],
      // homebrewOrCore: [],
      // customList: []
    };
    this.object.process = {
      abilities: true,
      virtuesAndFlaws: true,
      equipment: true,
      spells: true,
      metadata: true
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "actor-importer",
      template: "modules/arm5e-compendia/templates/ActorImporter.html",
      height: 700,
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      submitOnClose: false,
      submitOnChange: true,
      title: game.i18n.localize("Actor Importer"),
      width: 600,
      resizable: true
    });
  }

  async getData() {
    const context = super.getData().object;
    // context.analyzed = context.updateData.length == 0 ? "disabled" : "";
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

  preprocessing(json) {
    //abilities
    if (json.system.Abilities) {
      const newAb = {};
      let res = json.system.Abilities.reduce((previous, current) => {
        const [e] = Object.entries(current);
        previous[e[0]] = e[1];
        return previous;
      }, newAb);
      json.system.Abilities = res;
    } else if (json.system.Pretenses) {
      const newAb = {};
      let res = json.system.Pretenses.reduce((previous, current) => {
        const [e] = Object.entries(current);
        previous[e[0]] = e[1];
        return previous;
      }, newAb);
      json.system.Abilities = res;
    }
  }

  async pickFiles() {
    const files = await FileTools.filepickerPromise("./pdf2compendia/defed_actors");
    this.object.stats.actors = { count: 0 };
    this.object.stats.abilities = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.virtuesAndFlaws = { found: 0, unknown: 0, no_field: 0 };
    this.actorsWithProblems = new Set();
    this.problems = new Set();
    for (let file of files) {
      let json = await foundry.utils.fetchJsonWithTimeout(file);
      this.currentFile = file;
      this.preprocessing(json);
      const imported = await this.importCharacter(json);
      this.object.stats.actors.count++;
      this.object.imports.push(imported);
      // break;
    }
    this.object.stats.actors.withProblem = this.actorsWithProblems.size;
    console.log(this.object.stats);
  }

  async importCharacter(json) {
    console.log(`Importing "${json.name}"`);
    this.object.tmp = { name: json.name, type: this.guessType(json), system: {}, items: [] };
    const root = this.object.tmp.system;
    this.current = json;

    root.CharType = { value: this.guessCharType(json) };
    this.importCharacteristics(json.system);
    if (this.object.process.abilities) await this.importAbilities(json.system);
    if (this.object.process.virtuesAndFlaws) await this.importVirtuesAndFlaws(json.system);
  }

  importCharacteristics(src) {
    const root = this.object.tmp.system;
    root.characteristics = MODEL.characteristics;
    const char = src.Characteristics;
    if (char.Cun) {
      root.characteristics.cun.value = char.Cun;
    }
    if (char.Int) {
      root.characteristics.int.value = char.Int;
    }
    root.characteristics.per.value = char.Per;
    root.characteristics.sta.value = char.Sta;
    root.characteristics.str.value = char.Str;
    root.characteristics.dex.value = char.Dex;
    root.characteristics.qik.value = char.Qik;
    root.characteristics.pre.value = char.Pre;
    root.characteristics.com.value = char.Com;
  }

  importTraits(src) {
    const root = this.object.tmp.system;
    // age
    if (src.Age) {
      root.description.born = 1220 - Number(src.Age.actual);
      root.apparent = Number(src.Age.apparent);
    }
    // description

    //size
    if (src.Size) {
    } else {
    }

    if (src["Twilight Scars"]) {
    }
  }

  async importAbilities(src) {
    const stats = this.object.stats;
    if (!src.Abilities) {
      stats.abilities.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.problems.add(`${this.current.name} - ${this.currentFile} - no Ability field`);
      return;
    }
    const items = this.object.tmp.items;

    for (let [k, v] of Object.entries(src.Abilities)) {
      const slug = FileTools.slugify(k);
      // console.log(`Find ability with key : "${slug}"`);
      const item = await CompendiaUtils.getItemFromCompendium("abilities", slug);
      if (item) {
        item.system.xp = (v.score * (v.score + 1) * 5) / 2;
        item.system.speciality = v.specializtion;
        stats.abilities.found++;
        items.push(item);
      } else {
        if (["Living Language", "Native Language", "Faerie Speech", "Language", "German"].includes(k)) {
          await this.addSpecialCaseAbility(k, v, "language-generic");
        } else if ("Latin" === k) {
          await this.addSpecialCaseAbility(k, v, "language-latin");
        } else if ("Arabic" === k) {
          await this.addSpecialCaseAbility(k, v, "language-arabic");
        } else if ("Hermes Lore" === k) {
          await this.addSpecialCaseAbility(k, v, "order-of-hermes-lore");
        } else if ("Civil and Canon Law" === k) {
          await this.addSpecialCaseAbility(k, v, "civil-canon-law");
        } else if ("Sense Holiness and Unholiness" === k) {
          await this.addSpecialCaseAbility(k, v, "sense-holiness-unholiness");
        } else if ("Single Weapons" === k) {
          await this.addSpecialCaseAbility(k, v, "single-weapon");
        } else if ("Thrown Weapons" === k) {
          await this.addSpecialCaseAbility(k, v, "thrown-weapon");
        } else if ("Great Weapons" === k) {
          await this.addSpecialCaseAbility(k, v, "great-weapon");
        } else if ("Divine Lore" === k) {
          await this.addSpecialCaseAbility(k, v, "dominion-lore");
        } else if (/.*Area.+Lore/.test(k)) {
          await this.addSpecialCaseAbility(k, v, "area-lore");
        } else {
          console.log(`Ability "${k}" with key : "${slug}" not found`);
          this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
          this.problems.add(`${this.current.name} - ${this.currentFile} - Ability not found: "${k}"`);
          stats.abilities.unknown++;
        }
      }
    }
  }

  async importVirtuesAndFlaws(src) {
    const stats = this.object.stats;
    if (!src["Virtues and Flaws"]) {
      stats.virtuesAndFlaws.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.problems.add(`${this.current.name} - ${this.currentFile} - no "Virtues and Flaws" field`);
      return;
    }
    const items = this.object.tmp.items;

    for (let v of src["Virtues and Flaws"]) {
      const slug = FileTools.slugify(v);
      // console.log(`Find ability with key : "${slug}"`);
      const virtue = await CompendiaUtils.getItemFromCompendium("virtues", slug);
      if (virtue) {
        stats.virtuesAndFlaws.found++;
        items.push(virtue);
      } else {
        const flaw = await CompendiaUtils.getItemFromCompendium("flaws", slug);
        if (flaw) {
          stats.virtuesAndFlaws.found++;
          items.push(flaw);
        } else {
          if (v.toLowerCase() == "none") {
            break;
          } else if (v.startsWith("Plagued by")) {
            await this.addSpecialCaseVnF("flaws", v, "plagued-by-supernatural-entity");
          } else if (v.startsWith("Social Contacts ")) {
            await this.addSpecialCaseVnF("virtues", v, "social-contacts");
          } else if (v.startsWith("Lesser Immunity ")) {
            await this.addSpecialCaseVnF("virtues", v, "lesser-immunity");
          } else if (v.startsWith("Minor Magical Focus ")) {
            await this.addSpecialCaseVnF("virtues", v, "minor-magical-focus");
          } else if (v.startsWith("Major Magical Focus ")) {
            await this.addSpecialCaseVnF("virtues", v, "major-magical-focus");
          } else if (v.startsWith("Ferocity")) {
            await this.addSpecialCaseVnF("virtues", v, "ferocity");
          } else if (v.startsWith("Compulsion ")) {
            if (v.match(/Major/)) {
              await this.addSpecialCaseVnF("flaws", v, "compulsion-major");
            } else await this.addSpecialCaseVnF("flaws", v, "compulsion-minor");
          } else if (v.startsWith("Social Handicap ")) {
            await this.addSpecialCaseVnF("flaws", v, "social-handicap");
          } else if (v.startsWith("Proud")) {
            if (v.match(/Major/)) {
              await this.addSpecialCaseVnF("flaws", v, "proud-major");
            } else await this.addSpecialCaseVnF("flaws", v, "proud-minor");
          } else if (v.startsWith("Driven")) {
            if (v.match(/Major/)) {
              await this.addSpecialCaseVnF("flaws", v, "driven-major");
            } else await this.addSpecialCaseVnF("flaws", v, "driven-minor");
          } else if (v.startsWith("Higher Purpose ")) {
            await this.addSpecialCaseVnF("flaws", v, "higher-purpose");
          } else if (v.startsWith("Greater Immunity ")) {
            await this.addSpecialCaseVnF("virtues", v, "greater-immunity");
          } else if (v.toLowerCase().startsWith("student of ")) {
            await this.addSpecialCaseVnF("virtues", v, "student-of-realm");
          } else if (v.toLowerCase().startsWith("ways of the ")) {
            await this.addSpecialCaseVnF("virtues", v, "ways-of-the-land");
          } else if (v.startsWith("Improved Characteristics ")) {
            let re = /Improved Characteristics x(\d)/;

            let match = v.match(re);
            if (match) {
              for (let n = 1; n <= Number(match[1]); n++) {
                // TODO effect
                await this.addSpecialCaseVnF("virtues", v, "improved-characteristics");
              }
              continue;
            }
            re = /Improved Characteristics/;
            match = v.match(re);
            if (match) {
              // TODO effect
              await this.addSpecialCaseVnF("virtues", v, "great-characteristic");
            }
          } else if (v.startsWith("Great ")) {
            let re = /Great (.+) (\d)x/;

            let match = v.match(re);
            if (match) {
              if (CHARACTERISTICS.includes(match[1])) {
                for (let n = 1; n <= Number(match[2]); n++) {
                  // TODO effect
                  await this.addSpecialCaseVnF("virtues", v, "great-characteristic");
                }
              } else {
                console.log("Unknown characteristic: " + match[1]);
                this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
                this.problems.add(`${this.current.name} - ${this.currentFile} - Virtue or Flaw not found: "${v}"`);
              }
              continue;
            }

            re = /Great (.+) x(\d)/;
            match = v.match(re);
            if (match) {
              if (CHARACTERISTICS.includes(match[1])) {
                for (let n = 1; n <= Number(match[2]); n++) {
                  // TODO effect
                  await this.addSpecialCaseVnF("virtues", v, "great-characteristic");
                }
              } else {
                console.log("Unknown characteristic: " + match[1]);
                this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
                this.problems.add(`${this.current.name} - ${this.currentFile} - Virtue or Flaw not found: "${v}"`);
              }
              continue;
            }

            re = /Great (.+)/;
            match = v.match(re);
            if (match) {
              if (CHARACTERISTICS.includes(match[1])) {
                // TODO effect
                await this.addSpecialCaseVnF("virtues", v, "great-characteristic");
              } else {
                console.log("Unknown characteristic: " + match[1]);
                this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
                this.problems.add(`${this.current.name} - ${this.currentFile} - Virtue or Flaw not found: "${v}"`);
              }
            }
          } else if (v.startsWith("Puissant")) {
            const m = v.match(/Puissant (.+)/);
            if (ARTS.includes(m[1].trim())) {
              // puissant art
              const virtue = await this.addSpecialCaseVnF("virtues", v, "puissant-art");
              // TODO effect
              // virtue.effects[0].changes[].key = `system.arts.techniques.cr.bonus`
            } else {
              // puissant ability
              // TODO effect
              const virtue = await this.addSpecialCaseVnF("virtues", v, "puissant-ability");
            }
          } else if (v.startsWith("Affinity with ")) {
            const m = v.match(/Affinity with (.+)/);
            if (ARTS.includes(m[1].trim())) {
              // puissant art
              const virtue = await this.addSpecialCaseVnF("virtues", v, "affinity-with-art");
              // TODO effect
              // virtue.effects[0].changes[].key = `system.arts.techniques.cr.bonus`
            } else {
              // puissant ability
              // TODO effect
              const virtue = await this.addSpecialCaseVnF("virtues", v, "affinity-with-ability");
            }
          } else {
            console.log(`Virtue or Flaw "${v}" with key : "${slug}" not found`);
            this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
            this.problems.add(`${this.current.name} - ${this.currentFile} - Virtue or Flaw not found: "${v}"`);
            stats.virtuesAndFlaws.unknown++;
          }
        }
      }
    }
  }

  async addSpecialCaseAbility(name, attributes, key) {
    const item = await CompendiaUtils.getItemFromCompendium("abilities", key);
    item.name = name;
    item.system.xp = (attributes.score * (attributes.score + 1) * 5) / 2;
    item.system.speciality = attributes.specializtion;
    if (item.system.option !== "") {
      item.system.option = FileTools.slugify(name);
    }
    this.object.tmp.items.push(item);
    this.object.stats.abilities.found++;
  }

  async addSpecialCaseVnF(compendium, name, key) {
    const item = await CompendiaUtils.getItemFromCompendium(compendium, key);
    item.name = name;
    this.object.tmp.items.push(item);
    this.object.stats.virtuesAndFlaws.found++;
    return item;
  }

  guessType(json) {
    if (json.system.Characteristics.Cun) {
      return "beast";
    }
    if (this.guessRealm(json)) {
      return "npc";
    }

    return "player";
  }

  guessCharType(json) {
    if (json.system.Arts) {
      return "magus";
    }
    if (this.guessRealm(json)) {
      return "entity";
    }
  }

  guessRealm(json) {
    if (json.system["Faery Might"]) {
      return "faeric";
    }
    if (json.system["Magic Might"]) {
      return "magic";
    }
    if (json.system["Infernal Might"]) {
      return "infernal";
    }
    if (json.system["Divine Might"]) {
      return "divine";
    }
    return null; // mundane
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".pick-files").click(async (ev) => {
      ev.preventDefault();

      await this.pickFiles();
    });

    html.find(".analysis").click(async (ev) => {
      ev.preventDefault();
      if (this.object.toEnrich === null) return;
      await this.analyzeDocuments(this.object.toEnrich);
    });
    html.find(".import").click(async (ev) => {
      ev.preventDefault();
      if (this.object.toEnrich === null) return;
      await this.importDocuments(this.object.toEnrich, false);
    });
  }
  async analyzeDocuments(actor) {
    this.render();
  }

  async importDocuments(actor, dryrun = true) {
    await actor.updateEmbeddedDocuments("Item", this.object.updateData, { render: true });
  }

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    this.render();
  }
}
