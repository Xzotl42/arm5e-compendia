import { CompendiaUtils } from "./compendia.js";
import {
  AREAS,
  ARTS,
  ARTS_STRUCT,
  CHARACTERISTICS,
  EQUIPEMENT,
  FORMS,
  getShortCharac,
  MINOR_MAJOR,
  MODEL,
  TECHNIQUES,
  VnFToReview
} from "./DataModel.js";
import { FileTools } from "./FileTools.js";
import { ACTIVE_EFFECTS_TYPES } from "../../../systems/arm5e/module/constants/activeEffectsTypes.js";
// import ACTIVE_EFFECTS_TYPES from "../../../systems/arm5e/module/constants/activeEffectsTypes.js";

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
      personalityTraits: true,
      equipment: true,
      spells: true,
      arts: true,
      powers: true,
      reputations: true
    };
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "actor-importer",
      template: "modules/arm5e-compendia/templates/ActorImporter.html",
      height: 500,
      classes: ["arm5e", "arm5e-config"],
      closeOnSubmit: false,
      submitOnClose: false,
      submitOnChange: true,
      title: game.i18n.localize("Actor Importer"),
      width: 480,
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
    if (json.system.Pretenses) {
      json.system.Abilities = json.system.Pretenses;
    }

    if (json.system["Customization Notes"]) {
      json.system.description = json.system["Customization Notes"];
    }

    if (json.system["Appearance"]) {
      json.system.description = json.system["Appearance"];
    }

    if (json.system.Arts) {
      for (let [k, v] of Object.entries(json.system.Arts)) {
        json.system.Arts[k.toLowerCase()] = v;
      }
    }
  }

  async pickFiles() {
    const files = await FileTools.filepickerPromise("./pdf2compendia/defed_actors");
    this.object.stats.actors = { count: 0 };
    this.object.stats.abilities = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.virtuesAndFlaws = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.personalityTraits = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.spells = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.powers = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.equipment = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.qualities = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.reputations = { found: 0, unknown: 0, no_field: 0 };
    this.actorsWithProblems = new Set();
    this.problems = new Set();
    this.object.imports = [];
    this.object.currentItems = [];
    this.object.toReview = [];
    let counter = 1;

    for (let file of files) {
      let json = await foundry.utils.fetchJsonWithTimeout(file);
      this.currentFile = file;
      this.preprocessing(json);

      let type = this.guessType(json);
      let charType = this.guessCharType(type, json);
      // if (json.name === "The Hunter") {
      // if (["magus"].includes(charType)) {
      // if (type == "beast") {
      if (["entity"].includes(charType)) {
        // if (!json.system["Magic Might"]) continue;
        console.log(`Importing Actor "${json.name}"`);
        const imported = await this.importCharacter(json);

        //
        let [actor] = await Actor.createDocuments([imported], { folder: "test" });

        // imported.items = this.object.currentItems;

        await actor.createEmbeddedDocuments("Item", this.object.currentItems, {});
        this.object.stats.actors.count++;
        this.object.imports.push(imported);
      }
      // }
      // if (counter >= 24) {
      //   break;
      // }

      counter++;
    }
    // await Actor.createDocuments(this.object.imports);
    this.object.stats.actors.withProblem = this.actorsWithProblems.size;
    console.log(this.object.stats);
  }

  addReviewItem(txt) {
    this.object.toReview.push(txt);
  }

  async importCharacter(json) {
    // console.log(`Importing "${json.name}"`);
    this.object.currentActor = { name: json.name, type: this.guessType(json), system: {}, items: [] };
    const root = this.object.currentActor.system;
    this.current = json;
    this.object.currentItems = [];
    this.object.toReview = [];

    root.charType = { value: this.guessCharType(this.object.currentActor.type, json) };
    this.importCharacteristics(json.system);
    this.importTraits(json.system);
    this.importQualities(json.system);
    if (root.charType.value == "entity") {
      this.setMightAndRealm(json);
      this.importPowers(json.system);
    }
    // await this.importPersonalityTraits(json.system);
    await this.importReputations(json.system);
    if (root.charType.value == "magus") {
      if (this.object.process.spells) await this.importSpells(json.system);
      if (this.object.process.arts) this.importArts(json.system);
    }
    root.indexKey = FileTools.slugify(json.name);
    root.reviewer = "xzotl";
    root.source = "ArM5Def";
    if (this.object.process.abilities) await this.importAbilities(json.system);
    if (this.object.process.virtuesAndFlaws) await this.importVirtuesAndFlaws(json.system);
    if (this.object.process.personalityTraits) await this.importPersonalityTraits(json.system);
    if (this.object.process.equipment) {
      if (json.system.Equipement) {
        await this.importEquipment(json.system);
      }
      await this.importNaturalWeapons(json.system);
    }

    if (this.object.toReview.length) {
      let desc = "<h2>To review</h2><ul>";
      for (let it of this.object.toReview) {
        desc += `<li>${it}</li>`;
      }
      desc += "</ul>";
      this.object.currentActor.system.biography += desc;
    }

    return this.object.currentActor;
  }

  importCharacteristics(src) {
    const root = this.object.currentActor.system;
    root.characteristics = foundry.utils.deepClone(MODEL.characteristics);
    const char = src.Characteristics;
    if (char.Cun) {
      root.characteristics.cun.value = char.Cun.score;
      root.characteristics.cun.aging = char.Cun.agingPoints;
      delete root.characteristics.int;
    }
    if (char.Int) {
      root.characteristics.int.value = char.Int.score;
      root.characteristics.int.aging = char.Int.agingPoints;
      delete root.characteristics.cun;
    }
    root.characteristics.per.value = char.Per.score;
    root.characteristics.per.value = char.Per.agingPoints;
    root.characteristics.sta.value = char.Sta.score;
    root.characteristics.sta.aging = char.Sta.agingPoints;
    root.characteristics.str.value = char.Str.score;
    root.characteristics.str.aging = char.Str.agingPoints;
    root.characteristics.dex.value = char.Dex.score;
    root.characteristics.dex.aging = char.Dex.agingPoints;
    root.characteristics.qik.value = char.Qik.score;
    root.characteristics.qik.aging = char.Qik.agingPoints;
    root.characteristics.pre.value = char.Pre.score;
    root.characteristics.pre.aging = char.Pre.agingPoints;
    root.characteristics.com.value = char.Com.score;
    root.characteristics.com.aging = char.Com.agingPoints;
  }

  importArts(src) {
    const root = this.object.currentActor.system;
    root.arts = foundry.utils.deepClone(ARTS_STRUCT);
    for (let t of Object.keys(CONFIG.ARM5E.magic.techniques)) {
      root.arts.techniques[t].xp = src.Arts[t].xp;
    }

    for (let f of Object.keys(CONFIG.ARM5E.magic.forms)) {
      root.arts.forms[f].xp = src.Arts[f].xp;
    }
  }

  importTraits(src) {
    const root = this.object.currentActor.system;
    // age
    if (src.Age) {
      root.age = { value: Number(src.Age.actual) };
      // root.description.born = 1220 - Number(src.Age.actual);
      root.apparent = { value: Number(src.Age.apparent) };
    }
    // description

    if (root.charType.value == "magus") {
      if (Object.keys(MODEL.houses).includes(this.object.currentActor.name)) {
        root.house = { value: MODEL.houses[this.object.currentActor.name] };
      }
    }

    if (src.description) {
      root.biography = src.description;
    }
    //size
    if (src.Size) {
      if (this.object.currentActor.type == "beast") {
        root.vitals = { siz: { value: src.Size } };
      }
    }

    if (src["Twilight Scars"]) {
      root.laboratory = { longevityRitual: { twilightScars: src["Twilight Scars"] } };
    }

    if (src["Decrepitude"]) {
      let score = Number(src["Decrepitude"].score);
      root.decrepitude = { points: 5 * ((score * (score + 1)) / 2) + Number(src["Decrepitude"].points) };
    } else {
      root.decrepitude = { points: 0 };
    }
    if (src["Warping Score"]) {
      let score = Number(src["Warping Score"].score);
      root.warping = { points: 5 * ((score * (score + 1)) / 2) + Number(src["Warping Score"].points) };
    } else {
      root.warping = { points: 0 };
    }

    if (src["Confidence Score"]) {
      root.con = {
        score: src["Confidence Score"].score,
        points: src["Confidence Score"].points
      };
    }
    // "Warping Score": {
    //     "score": "6",
    //     "points": "19"
    // },
    // "Confidence Score": {
  }

  async getAbitilyIndexKey(k, v) {
    const slug = FileTools.slugify(k);
    let found = await CompendiaUtils.getItemFromCompendium("abilities", slug);

    if (found) {
      return slug;
    } else {
      if (["Living Language", "Native Language", "Faerie Speech", "Language", "German"].includes(k)) {
        return "language-generic";
      } else if ("Latin" === k) {
        return "language-latin";
      } else if ("Arabic" === k) {
        return "language-arabic";
      } else if ("Hermes Lore" === k) {
        return "order-of-hermes-lore";
      } else if ("Civil and Canon Law" === k) {
        return "civil-canon-law";
      } else if ("Sense Holiness and Unholiness" === k) {
        return "sense-holiness-unholiness";
      } else if ("Single Weapons" === k) {
        return "single-weapon";
      } else if ("Thrown Weapons" === k) {
        return "thrown-weapon";
      } else if ("Great Weapons" === k) {
        return "great-weapon";
      } else if ("Divine Lore" === k) {
        return "dominion-lore";
      } else if (k.startsWith("Craft")) {
        return "craft-generic";
      } else if (k.startsWith("Profession")) {
        return "profession-generic";
      } else if (/(.+) Resistance/.test(k)) {
        // TODO check if it is a Form
        let m = k.match(/(.+) Resistance/);
        if (FORMS.includes(m[1])) {
          return "form-resistance";
        } else {
          console.log(`Ability "${k}" with key : "${slug}" not found - ${this.current.name} in ${this.currentFile}`);
          this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
          this.addReviewItem(`Form resistance not found: "${k}"`);
          stats.abilities.unknown++;
        }
        // DE special cases of area lore
      } else if (/.*Area.+Lore/.test(k)) {
        return "area-lore";
      } else {
        for (let lore of AREAS) {
          if (k === lore) {
            return "area-lore";
          }
        }
        return null;
      }
    }
  }

  async importAbilities(src) {
    const stats = this.object.stats;
    if (!src.Abilities) {
      stats.abilities.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.addReviewItem(`No "Abilities" field`);
      return;
    }
    const items = this.object.currentItems;

    for (let [k, v] of Object.entries(src.Abilities)) {
      const indexKey = await this.getAbitilyIndexKey(k, v);

      // console.log(`Find ability with key : "${slug}"`);
      if (indexKey) {
        if (indexKey == "area-lore") {
          console.log(`Area lore "${k}"`);
          this.handleSpecialCasesAreaLore(k, v);
        } else {
          let found = await this.addSpecialCaseAbility(k, v, indexKey);
        }
      } else {
        const slug = FileTools.slugify(k);
        console.log(`Ability "${k}" with key : "${slug}" not found - ${this.current.name} in ${this.currentFile}`);
        this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
        this.addReviewItem(`Ability not found: "${k}"`);
        stats.abilities.unknown++;
      }
    }
  }

  async importVirtuesAndFlaws(src) {
    const stats = this.object.stats;
    if (!src["Virtues and Flaws"]) {
      stats.virtuesAndFlaws.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.addReviewItem(`No "Virtues and Flaws" field`);
      return;
    }
    const items = this.object.currentItems;

    for (let v of src["Virtues and Flaws"]) {
      v = v.trim();
      const slug = FileTools.slugify(v);
      // console.log(`Find ability with key : "${slug}"`);

      let found = await this.handleAbilitiesOddities(v);
      if (found) {
        continue;
      }
      const virtue = await CompendiaUtils.getItemFromCompendium("virtues", slug);
      if (virtue) {
        stats.virtuesAndFlaws.found++;
        if (VnFToReview.includes(slug)) {
          this.addReviewItem(`Review Active effects of : "${v}", they may have been applied twice`);
        }
        items.push(virtue);
      } else {
        const flaw = await CompendiaUtils.getItemFromCompendium("flaws", slug);
        if (flaw) {
          stats.virtuesAndFlaws.found++;
          items.push(flaw);
        } else {
          if (v.toLowerCase() == "none") {
            break;
          } else if (v.toLowerCase() == "latent magical ability") {
            await this.addSpecialCaseVnF("virtues", v, "latent-magic-ability");
          } else if (v.startsWith("Disfigured")) {
            await this.addSpecialCaseVnF("flaws", v, "disfigured");
          } else if (v.startsWith("Plagued by")) {
            await this.addSpecialCaseVnF("flaws", v, "plagued-by-supernatural-entity");
          } else if (v.startsWith("Enemies")) {
            await this.addSpecialCaseVnF("flaws", v, "enemies");
          } else if (v.startsWith("Afflicted Tongue")) {
            await this.addSpecialCaseVnF("flaws", v, "afflicted-tongue");
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
          } else if (v.startsWith("Fear")) {
            await this.addSpecialCaseVnF("flaws", v, "fear");
          } else if (v.startsWith("Dutybound")) {
            await this.addSpecialCaseVnF("flaws", v, "dutybound");
          } else if (v.startsWith("Restriction")) {
            await this.addSpecialCaseVnF("flaws", v, "restriction");
          } else if (v.startsWith("Vulnerable Magic ")) {
            await this.addSpecialCaseVnF("flaws", v, "vulnerable-magic");
          } else if (v.startsWith("Special Circumstances")) {
            await this.addSpecialCaseVnF("virtues", v, "special-circumstances");
          } else if (v.startsWith("Inoffensive to ")) {
            await this.addSpecialCaseVnF("virtues", v, "inoffensive-to-beings-general");
          } else if (v.startsWith("Side Effect ")) {
            await this.addSpecialCaseVnF("virtues", v, "side-effect");
          } else if (v.startsWith("Weakness")) {
            await this.addSpecialCaseVnF("flaws", v, "weakness");
          } else if (FileTools.slugify(v) === "non-combattant") {
            await this.addSpecialCaseVnF("flaws", v, "noncombattant");
          } else if (v.startsWith("Visions")) {
            await this.addSpecialCaseVnF("flaws", v, "visions");
          } else if (v.startsWith("Social Handicap")) {
            await this.addSpecialCaseVnF("flaws", v, "social-handicap");
          } else if (v.startsWith("Greater Malediction ")) {
            await this.addSpecialCaseVnF("flaws", v, "greater-malediction");
          } else if (v.startsWith("Necessary Condition")) {
            await this.addSpecialCaseVnF("flaws", v, "necessary-condition");
          } else if (v.startsWith("Cyclic Magic (Positive)")) {
            await this.addSpecialCaseVnF("virtues", v, "cyclic-magic-positive");
          } else if (v.startsWith("Cyclic Magic (Negative)")) {
            await this.addSpecialCaseVnF("flaws", v, "cyclic-magic-negative");
          } else if (v.startsWith("Quiet Magic")) {
            let n = v.replace("(", "").replace(")", "");
            if (/Quiet Magic x2/.test(n)) {
              await this.addSpecialCaseVnF("virtues", null, "silent-magic");
            } else if (v === "Quiet Magic") {
              await this.addSpecialCaseVnF("virtues", null, "quiet-magic");
            } else {
              this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
              this.addReviewItem(`Quiet Magic Virtue parsing error: "${v}"`);
              stats.virtuesAndFlaws.unknown++;
            }
          } else if (v.startsWith("Deft ")) {
            let m = v.match(/Deft (.+)/);
            if (FORMS.includes(m[1])) {
              const virtue = await this.addSpecialCaseVnF("virtues", v, "deft-form");
            } else {
              console.log(`Virtue or Flaw "${v}" with key : "${slug}" not found`);
              this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
              this.addReviewItem(`Deft Virtue not found: "${v}"`);
              stats.virtuesAndFlaws.unknown++;
            }
          } else if (v.startsWith("Deficient ")) {
            let m = v.match(/Deficient (.+)/);

            if (TECHNIQUES.includes(m[1])) {
              const virtue = await this.addSpecialCaseVnF("flaws", v, "deficient-technique");
              this.setActiveEffect(virtue, "deficiency", m[1].substring(0, 2).toLowerCase());
            } else if (FORMS.includes(m[1])) {
              await this.addSpecialCaseVnF("flaws", v, "deficient-form");
              this.setActiveEffect(virtue, "deficiency", m[1].substring(0, 2).toLowerCase());
            } else {
              let m = v.match(/Deficient (.+) \((.+)\)/);
              const art = m[1].toLowerCase();
              if ("technique" === art) {
                const virtue = await this.addSpecialCaseVnF("flaws", v, "deficient-technique");
                this.setActiveEffect(virtue, "deficiency", m[2].substring(0, 2).toLowerCase());
              } else if ("form" === art) {
                const virtue = await this.addSpecialCaseVnF("flaws", v, "deficient-form");
                this.setActiveEffect(virtue, "deficiency", m[2].substring(0, 2).toLowerCase());
              } else {
                console.log(`Virtue or Flaw "${v}" with key : "${slug}" not found`);
                this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
                tthis.addReviewItem(`Deficient X Flaw not found: "${v}"`);
                stats.virtuesAndFlaws.unknown++;
              }
            }
          } else if (v.startsWith("Vow ")) {
            await this.addSpecialCaseVnF("flaws", v, "vow");
          } else if (v.startsWith("Baneful Circumstances ")) {
            await this.addSpecialCaseVnF("flaws", v, "baneful-circumstances");
          } else if (v.startsWith("Sovereign Ward ")) {
            await this.addSpecialCaseVnF("flaws", v, "sovereign-ward");
          } else if (v.match(/Traditional Ward/)) {
            await this.addSpecialCaseVnF("flaws", v, "traditional-ward");
          } else if (v.startsWith("Overconfident ")) {
            if (v.match(/Major/)) {
              await this.addSpecialCaseVnF("flaws", v, "overconfident-major");
            } else await this.addSpecialCaseVnF("flaws", v, "overconfident-minor");
          } else if (v.match(/Greater .* Power/)) {
            await this.addSpecialCaseVnF("virtues", v, "greater-power");
          } else if (v.match(/Lesser .* Power/)) {
            await this.addSpecialCaseVnF("virtues", v, "lesser-power");
          } else if (v.startsWith("Greater Immunity")) {
            await this.addSpecialCaseVnF("virtues", v, "greater-immunity");
          } else if (v.startsWith("Faerie Blood")) {
            await this.addSpecialCaseVnF("virtues", v, "faerie-blood");
          } else if (v.startsWith("Strong Faerie Blood")) {
            await this.addSpecialCaseVnF("virtues", v, "strong-faerie-blood");
          } else if (v.toLowerCase().startsWith("student of ")) {
            await this.addSpecialCaseVnF("virtues", v, "student-of-realm");
          } else if (v.toLowerCase().startsWith("ways of the ")) {
            await this.addSpecialCaseVnF("virtues", v, "ways-of-the-land");
          } else if (v.toLowerCase().startsWith("Great Characteristics")) {
            await this.addSpecialCaseVnF("virtues", null, "improved-characteristics");

            // Improved Characteristics
          } else if (v.startsWith("Improved Characteristics ")) {
            let np = v.replace("(", "").replace(")", "");
            let re = /Improved Characteristics x(\d)/;

            let match = np.match(re);
            if (match) {
              for (let n = 1; n <= Number(match[1]); n++) {
                await this.addSpecialCaseVnF("virtues", null, "improved-characteristics");
              }

              continue;
            }
            re = /Improved Characteristics/;
            match = np.match(re);
            if (match) {
              const virtue = await this.addSpecialCaseVnF("virtues", v, "improved-characteristics");
            } else {
              console.log("Unknown improved characteristic: " + match[1]);
              this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
              this.addReviewItem(`Improved characteristics - Virtue or Flaw not found: "${v}"`);
            }
          } else if (v.startsWith("Poor ")) {
            let found = await this.handleExtremeChars(v, "poor-characteristic", "Poor", "flaws", -1);
            if (found) continue;
            this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
            this.addReviewItem(`Poor characteristic - Virtue or Flaw not found: "${v}"`);
            //Great characteristic
          } else if (v.startsWith("Great ")) {
            let found = await this.handleExtremeChars(v, "great-characteristic", "Great", "virtues", 1);
            if (found) continue;
            this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
            this.addReviewItem(`Great characteristic - Virtue or Flaw not found: "${v}"`);
          } else if (v.startsWith("Puissant")) {
            let np = v
              .trim()
              .replace("*", "")
              .replace("(", "")
              .replace(")", "")
              .replace("Art", "art")
              .replace("Ability", "ability");
            let containArt = np.match(/Puissant art (.+)/);
            if (containArt) np = np.replace(" art", "");

            let m = np.match(/Puissant (.+)/);
            if (ARTS.includes(m[1])) {
              // puissant art
              const virtue = await this.addSpecialCaseVnF("virtues", v, "puissant-art");
              // const art = Object.entries(CONFIG.ARM5E.magic.arts).find((k, v) => v.mnemonic == m[1]);
              this.setActiveEffect(virtue, "art", m[1].toLowerCase().substring(0, 2));
            } else {
              let containAb = np.match(/Puissant ability (.+)/);
              if (containAb) np = np.replace(" ability", "");
              m = np.match(/Puissant (.+)/);
              // puissant ability
              const virtue = await this.addSpecialCaseVnF("virtues", v, "puissant-ability");
              // find the corresponding ability.
              const key = await this.getAbitilyIndexKey(m[1]);
              if (key) {
                let item = await CompendiaUtils.getItemFromCompendium("abilities", key);
                let ability = CONFIG.ARM5E.LOCALIZED_ABILITIES_ENRICHED.find((e) => {
                  return e.system.key === item.system.key && e.system.option === item.system.option;
                });
                if (ability) {
                  const type = "bonus" + this.getAETypeFromCategory(ability.system.category);
                  this.setActiveEffect(virtue, type, ability.system.key, FileTools.slugify(item.name));
                } else {
                  console.log(`Unknown Puissant ability: ${m[1]} from ${v}`);
                  this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
                  this.addReviewItem(`Unknown Puissant ability: ${m[1]} "${v}"`);
                }
              } else {
                console.log(`Unknown Puissant ability: ${m[1]} from ${v}`);
                this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
                this.addReviewItem(`Unknown Puissant ability: ${m[1]} "${v}"`);
              }
            }
          } else if (v.startsWith("Affinity with ")) {
            let np = v.replace("*", "");
            const m = np.match(/Affinity with (.+)/);
            if (ARTS.includes(m[1].trim())) {
              // puissant art
              const virtue = await this.addSpecialCaseVnF("virtues", v, "affinity-with-art");

              this.setActiveEffect(virtue, "affinity", m[1].trim().substring(0, 2).toLowerCase());
            } else {
              // puissant ability
              const virtue = await this.addSpecialCaseVnF("virtues", v, "affinity-with-ability");
              // find the corresponding ability.
              const key = await this.getAbitilyIndexKey(m[1]);
              if (key) {
                let item = await CompendiaUtils.getItemFromCompendium("abilities", key);
                let ability = CONFIG.ARM5E.LOCALIZED_ABILITIES_ENRICHED.find((e) => {
                  return e.system.key === item.system.key && e.system.option === item.system.option;
                });
                if (ability) {
                  const type = "affinity" + this.getAETypeFromCategory(ability.system.category);
                  this.setActiveEffect(virtue, type, ability.system.key, FileTools.slugify(item.name));
                } else {
                  console.log(`Unknown affinity-with ability: ${m[1]} from ${v}`);
                  this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
                  this.addReviewItem(`Unknown affinity-with ability: ${m[1]} "${v}"`);
                }
              } else {
                console.log(`Unknown affinity-with ability: ${m[1]} from ${v}`);
                this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
                this.addReviewItem(`Unknown affinity-with ability: ${m[1]} "${v}"`);
              }
            }
          } else if (await this.handlePersonalityFlaws(v, slug)) {
            continue;
          } else {
            console.log(
              `Virtue or Flaw "${v}" with key : "${slug}" not found - ${this.current.name} in ${this.currentFile}`
            );
            this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
            this.addReviewItem(` Virtue or Flaw indexKey not found: "${v}"`);
            stats.virtuesAndFlaws.unknown++;
          }
        }
      }
    }
  }
  // Handle anything that doesn't follow any rule or too complex to automate
  async handleAbilitiesOddities(v) {
    switch (v) {
      case "Puissant Craft (metalsmith)": {
        const virtue = await this.addSpecialCaseVnF("virtues", v, "puissant-ability");
        // const art = Object.entries(CONFIG.ARM5E.magic.arts).find((k, v) => v.mnemonic == m[1]);
        this.setActiveEffect(virtue, "bonusGeneralAbility", "craft", "Metalsmith");
        return true;
      }
      case "Affinity with Craft (metalsmith)": {
        const virtue = await this.addSpecialCaseVnF("virtues", v, "affinity-with-ability");
        // const art = Object.entries(CONFIG.ARM5E.magic.arts).find((k, v) => v.mnemonic == m[1]);
        this.setActiveEffect(virtue, "affinityGeneralAbility", "craft", "Metalsmith");
        return true;
      }
      case "Puissant Art (Perdo) (free Virtue)": {
        const virtue = await this.addSpecialCaseVnF("virtues", v, "puissant-art");
        // const art = Object.entries(CONFIG.ARM5E.magic.arts).find((k, v) => v.mnemonic == m[1]);
        this.setActiveEffect(virtue, "art", "pe");
        return true;
      }
    }
  }

  getAETypeFromCategory(cat) {
    switch (cat) {
      case "general":
        return "GeneralAbility";
      case "arcane":
        return "ArcaneAbility";
      case "academic":
        return "AcademicAbility";
      case "martial":
        return "MartialAbility";
      case "mystery":
        return "MysteryAbility";
      case "supernaturalCat":
        return "SupernaturalAbility";
      default:
        return null;
    }
  }

  setActiveEffect(item, type, subtype, option = null, value = null, idx = 0) {
    if (!item) return;

    const cfg = ACTIVE_EFFECTS_TYPES[type].subtypes[subtype];

    const effect = item.effects[idx];
    let key = cfg.key;
    effect.flags.arm5e.type = [type];
    effect.flags.arm5e.subtype = [subtype];
    if (option) {
      effect.flags.arm5e.option = [option];
      key = key.replace("#OPTION#", option);
    }
    effect.name = item.name;
    if (effect.changes.length) {
      let newVal = value ? value : cfg.default;
      effect.changes[0] = { key: key, mode: cfg.mode, value: newVal };
    }
  }

  async handlePersonalityFlaws(name, key) {
    for (let f of MINOR_MAJOR) {
      if (name.startsWith(f)) {
        // console.log(`Personality flaw: ${name}`);
        if (name.match(/Major/)) {
          this.addSpecialCaseVnF("flaws", name, `${FileTools.slugify(f)}-major`);
        } else {
          this.addSpecialCaseVnF("flaws", name, `${FileTools.slugify(f)}-minor`);
        }
        return true;
      }
    }
    return false;
  }

  async handleExtremeChars(name, key, prefix, compendium, value) {
    let re = new RegExp(`${prefix} (.+) (\\d)x`);
    let np = name.replace("(", "").replace(")", "").replace("characteristic", "");
    let match = np.match(re);
    if (match) {
      if (CHARACTERISTICS.includes(match[1])) {
        for (let n = 1; n <= Number(match[2]); n++) {
          // TODO effect
          const virtue = await this.addSpecialCaseVnF(compendium, name, key, value);
          const shortChar = getShortCharac(match[1]);
          this.setActiveEffect(virtue, "characteristics", shortChar, null, value);
          this.object.currentActor.system.characteristics[shortChar].value =
            this.object.currentActor.system.characteristics[shortChar].value - value;
        }
        return true;
      } else {
        return false;
      }
    }

    re = new RegExp(`${prefix} (.+) x(\\d)`);
    match = np.match(re);
    if (match) {
      if (CHARACTERISTICS.includes(match[1])) {
        for (let n = 1; n <= Number(match[2]); n++) {
          const virtue = await this.addSpecialCaseVnF(compendium, name, key, value);
          const shortChar = getShortCharac(match[1]);
          this.setActiveEffect(virtue, "characteristics", shortChar, null, value);
          this.object.currentActor.system.characteristics[shortChar].value =
            this.object.currentActor.system.characteristics[shortChar].value - value;
        }
        return true;
      } else {
        return false;
      }
    }

    re = new RegExp(`${prefix} (.+)`);
    match = np.match(re);
    if (match) {
      if (CHARACTERISTICS.includes(match[1])) {
        const virtue = await this.addSpecialCaseVnF(compendium, name, key, value);
        const shortChar = getShortCharac(match[1]);
        this.setActiveEffect(virtue, "characteristics", shortChar, null, value);
        this.object.currentActor.system.characteristics[shortChar].value =
          this.object.currentActor.system.characteristics[shortChar].value - value;
        return true;
      } else {
        return false;
      }
    }
  }

  async importPersonalityTraits(src) {
    const stats = this.object.stats;
    if (!src["Personality Traits"]) {
      stats.personalityTraits.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.problems.add(`${this.current.name} - ${this.currentFile} - no "Personality traits?`);
      return;
    }
    const items = this.object.currentItems;

    for (let [k, v] of Object.entries(src["Personality Traits"])) {
      const trait = {
        name: k,
        type: "personalityTrait",
        img: "icons/skills/social/intimidation-impressing.webp",
        system: {}
      };
      let score = Number(v);
      trait.system.xp = ((score * (score + 1)) / 2) * 5;
      items.push(trait);
      stats.personalityTraits.found++;
    }
  }

  async importReputations(src) {
    const stats = this.object.stats;
    if (!src["Reputations"]) {
      stats.reputations.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.addReviewItem(`no "Reputation?`);
      return;
    }
    const items = this.object.currentItems;
    if (["none", "None"].includes(src["Reputations"])) return;

    for (let r of src["Reputations"]) {
      const trait = {
        name: r.name,
        type: "reputation",
        img: "icons/svg/angel.svg",
        system: {}
      };
      let score = Number(r.score);
      trait.system.xp = ((score * (score + 1)) / 2) * 5;
      trait.system.type = this.guessReputationType(r.type);
      items.push(trait);
      stats.reputations.found++;
    }
  }

  guessReputationType(type) {
    let t = type?.toLowerCase() ?? "";
    if (t.match(/local/)) {
      return "local";
    }
    if (t.match(/hermetic/)) {
      return "hermetic";
    }
    if (t.match(/local/)) {
      return "local";
    }
    if (t.match(/academic/)) {
      return "academic";
    }
    if (t.match(/persona/)) {
      return "persona";
    }
    // if (t.match(/infernal/)) {
    //   return "infernal";
    // }

    this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
    this.addReviewItem(`Unknown type of reputation: ${type}, "local" was used`);
  }

  async importSpells(src) {
    const stats = this.object.stats;
    if (!src["Spells Known"]) {
      stats.spells.no_field++;
      return;
    }
    const items = this.object.currentItems;

    for (let [k, v] of Object.entries(src["Spells Known"])) {
      k = k.trim();
      const slug = FileTools.slugify(k);
      // console.log(`Find spell with key : "${slug}"`);
      const item = await CompendiaUtils.getItemFromCompendium("spells", slug);
      if (item) {
        stats.spells.found++;
        items.push(item);
      } else {
        if ("Phantom of the Talking Head" === k.trim()) {
          // Typo in Criamon template
          await this.addSpecialCaseSpell("Phantasm of the Talking Head", v, "phantasm-of-the-talking-head");
        } else if (k.startsWith("Unraveling the Fabric of ")) {
          await this.addSpecialCaseSpell(k, v, "unravelling-the-fabric-of-form");
        } else if (k.startsWith("Mirror of Opposition ")) {
          await this.addSpecialCaseSpell(k, v, "mirror-of-opposition-form");
        } else if (k.startsWith("Wizard’s Boost ")) {
          await this.addSpecialCaseSpell(k, v, "wizards-boost-form");
        } else if (k.startsWith("Wizard’s Reach ")) {
          await this.addSpecialCaseSpell(k, v, "wizards-reach-form");
        } else if (k.startsWith("Wizard’s Expansion ")) {
          await this.addSpecialCaseSpell(k, v, "wizards-expansion-form");
        } else if (k.startsWith("Group Wizard’s Boost ")) {
          await this.addSpecialCaseSpell(k, v, "group-wizards-boost-form");
        } else if (k.startsWith("Facilitate the Stifled ")) {
          await this.addSpecialCaseSpell(k, v, "facilitate-the-stifled-form-spell");
        } else if (k.startsWith("Harnessing the Essential Power of ")) {
          await this.addSpecialCaseSpell(k, v, "harnessing-the-essential-power-of-form");
        } else if (k.startsWith("Sustain a Spell of ")) {
          await this.addSpecialCaseSpell(k, v, "sustain-a-spell-of-form");
        } else if (k.startsWith("The Lasting Synthemata of ")) {
          await this.addSpecialCaseSpell(k, v, "lasting-synthemata-of-x");
        } else if (k.startsWith("Synthemata of ")) {
          await this.addSpecialCaseSpell(k, v, "synthemata-of-x");
        } else if (k.startsWith("Revoke the Protection of ")) {
          let m = k.match(/Revoke the Protection of (.+)/);
          if (FORMS.includes(m[1])) {
            await this.addSpecialCaseSpell(k.trim(), v, "revoke-the-protection-of-form");
          } else {
            await this.addSpecialCaseSpell(k.trim(), v, "revoke-the-protection-of-realm");
          }
        } else {
          console.log(`Spell "${k}" with key : "${slug}" not found - ${this.current.name} in ${this.currentFile}`);
          this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
          this.addReviewItem(`Spell not found: "${k}"`);
          stats.spells.unknown++;
        }
      }
    }
  }

  async addSpecialCaseSpell(name, attributes, key) {
    let item = await CompendiaUtils.getItemFromCompendium("spells", key);
    if (item) {
      item = item.toObject();
      item.name = name;
      this.object.currentItems.push(item);
      this.object.stats.spells.found++;
    } else {
      console.error("Wrong special case");
    }
  }

  async handleSpecialCasesAreaLore(name, attributes) {
    if (/.*Area.+Lore/.test(name)) {
      await this.addSpecialCaseAbility(name, attributes, "area-lore");
      return true;
    }
    for (let lore of AREAS) {
      if (name === lore) {
        await this.addSpecialCaseAbility(name, attributes, "area-lore");
        return true;
      }
    }
    return false;
  }

  async addSpecialCaseAbility(name, attributes, key) {
    let item = await CompendiaUtils.getItemFromCompendium("abilities", key);

    if (item) {
      item = item.toObject();

      item.name = name;
      // item.system.xp = (attributes.score * (attributes.score + 1) * 5) / 2;
      item.system.xp = attributes.xp;
      item.system.speciality = attributes.specialization;
      if (item.system.option !== "") {
        item.system.option = FileTools.slugify(name);
      }
      this.object.currentItems.push(item);
      this.object.stats.abilities.found++;
      return true;
    } else {
      console.error("Wrong special case");
      return false;
    }
  }

  async addSpecialCaseVnF(compendium, name, key) {
    let item = await CompendiaUtils.getItemFromCompendium(compendium, key);
    if (item) {
      item = item.toObject();
      if (name) item.name = name;

      this.object.currentItems.push(item);
      this.object.stats.virtuesAndFlaws.found++;
      return item;
    } else {
      console.error("Wrong special case");
    }
  }

  guessType(json) {
    if (this.getMightFieldName(json)) {
      return "npc";
    }
    if (json.system.Characteristics.Cun) {
      return "beast";
    }

    return "player";
  }

  guessCharType(type, json) {
    if (type == "player") {
      if (!json.system["Confidence Score"]) {
        return "grog";
      }
      if (json.system.Arts) {
        return "magus";
      } else {
        return "companion";
      }
    }

    const realm = this.getMightFieldName(json);
    if (realm) {
      json.system.realm = {
        magic: {
          aligned: false
        },
        faeric: {
          aligned: false
        },
        divine: {
          aligned: false
        },
        infernal: {
          aligned: false
        }
      };
      return "entity";
    } else {
      return "mundane";
    }
  }

  getMightFieldName(json) {
    if (json.system["Faerie Might"]) return "Faerie Might";
    if (json.system["Magic Might"]) return "Magic Might";
    if (json.system["Divine Might"]) return "Divine Might";
    if (json.system["Infernal Might"]) return "Infernal Might";
    return "";
  }

  setMightAndRealm(json) {
    this.object.currentActor.system.realms = {
      magic: {
        aligned: false
      },
      faeric: {
        aligned: false
      },
      divine: {
        aligned: false
      },
      infernal: {
        aligned: false
      }
    };
    let mightField = this.getMightFieldName(json);

    let might = String(json.system[mightField]);
    let m = might.match(/(\d+) \((.+)\)/);
    if (m) {
      let form = m[2];
      if (FORMS.includes(form)) {
        this.object.currentActor.system.might = {
          form: form.substring(0, 2).toLowerCase(),
          value: m[1],
          points: m[1]
        };
      } else {
        this.addReviewItem(`Might problem: ${might}`);
      }
    } else {
      this.addReviewItem(`Might problem: ${might}`);
    }
    switch (mightField) {
      case "Faerie Might":
        this.object.currentActor.system.realm = "faeric";
        this.object.currentActor.system.realms.faeric.aligned = true;
        return;
      case "Magic Might":
        this.object.currentActor.system.realm = "magic";
        this.object.currentActor.system.realms.magic.aligned = true;
        return;
      case "Divine Might":
        this.object.currentActor.system.realm = "divine";
        this.object.currentActor.system.realms.divine.aligned = true;
        return;
      case "Infernal Might":
        this.object.currentActor.system.realm = "infernal";
        this.object.currentActor.system.realms.infernal.aligned = true;
        return;
      default:
        this.object.currentActor.system.realm = "mundane";
        return;
    }
  }

  async importNaturalWeapons(src) {
    const stats = this.object.stats;
    if (!src.Combat) {
      // this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      if (this.object.currentActor.type != "beast") {
        stats.equipment.no_field++;
        this.addReviewItem(`no "Natural Weapons"?`);
      }
      return;
    }

    for (let [k, v] of Object.entries(src.Combat)) {
      let slug = FileTools.slugify(k);
      slug = FileTools.slugify(slug.replace("dismounted", "").replace("unmounted", "")).replace(/^-+|-+$/g, "");
      let mounted = false;
      if (slug.includes("mounted")) {
        mounted = true;
        slug = FileTools.slugify(slug.replace("mounted", "").replace(/^-+|-+$/g, ""));
      }

      slug = this.getProperVersion(slug);
      if (EQUIPEMENT[slug]) {
        let item = await CompendiaUtils.getItemFromCompendium("equipment", EQUIPEMENT[slug].key);
        if (item) {
          item = item.toObject();
          item.name = k;
          if (item.type == "weapon") item.system.ability = { key: EQUIPEMENT[slug].ability, option: "", id: null };
          this.object.currentItems.push(item);
          stats.equipment.found++;
          continue;
        } else {
          console.error("Wrong Equipment key: " + slug);
          stats.equipment.unknown++;
        }
      } else {
        if (slug === "comment") continue;
        if (slug === "notes") continue;
        if (["antlers", "large-horns", "large-antlers"].includes(slug)) {
          slug = "large-horns-antlers";
        } else if (slug === "claw") {
          slug = "claws";
        } else if (slug === "bite") {
          slug = "teeth";
        } else if (slug === "fangs") {
          slug = "teeth";
        } else if (slug.startsWith("tusks")) {
          slug = "tusks";
        } else if (slug.includes("claws")) {
          slug = "claws";
        }
        let item = await CompendiaUtils.getItemFromCompendium("equipment", slug);
        if (item) {
          item = item.toObject();
          item.name = k;
          item.system.equipped = true;

          if (item.type == "weapon") {
            item.system.horse = mounted;
            item.system.ability = { key: "brawl", option: "", id: null };
          }
          // item.system.description =
          this.object.currentItems.push(item);
          stats.equipment.found++;
          continue;
        } else {
          this.addReviewItem(`Natural Weapons: No matches for "${k}"?`);
          console.error("Wrong Natural Weapons key: " + slug);
          stats.equipment.unknown++;
        }
      }
    }
  }

  async importQualities(src) {
    const stats = this.object.stats;
    if (!src.Qualities) {
      // this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      if (this.object.currentActor.type == "beast") {
        stats.qualities.no_field++;
        this.addReviewItem(`no "Qualities"?`);
      }
      return;
    }

    for (let k of src.Qualities) {
      let slug = FileTools.slugify(k);
      if (slug.startsWith("extra-natural-weapons")) {
        slug = "extra-natural-weapons";
      } else if (slug.includes("flier")) {
        slug = slug.replace("flier", "flyer");
      } else if (["large-antlers", "large-horns"].includes(slug)) {
        slug = "large-horns-antlers";
      }

      let item = await CompendiaUtils.getItemFromCompendium("virtues", slug);
      if (item) {
        item = item.toObject();
        item.name = k;
        // item.system.description =
        this.object.currentItems.push(item);
        stats.qualities.found++;
        continue;
      } else {
        this.addReviewItem(`Qualities: No matches for "${k}"?`);
        console.error("Wrong Qualities key: " + slug);
        stats.qualities.unknown++;
      }
    }
  }

  async importPowers(src) {
    const stats = this.object.stats;
    if (!src.Powers) {
      stats.powers.no_field++;
      // this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      if (this.object.currentActor.type != "beast") this.addReviewItem(`no "Powers"?`);

      return;
    }

    for (let p of src.Powers) {
      let power = {
        name: p.name,
        type: "power",
        system: {
          description: p.description,
          cost: p.points,
          init: p.init,
          form: p.form.substring(0, 2).toLowerCase(),
          indexKey: FileTools.slugify(p.name),
          reviewer: "xzotl",
          source: "ArM5Def"
        }
      };

      this.object.currentItems.push(power);
      stats.powers.found++;
    }
  }

  async importEquipment(src) {
    const stats = this.object.stats;
    if (!src.Equipment) {
      stats.equipment.no_field++;
      // this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      if (this.object.currentActor.type != "beast") this.addReviewItem(`no "Equipment"?`);

      return;
    }

    for (let e of src.Equipment) {
      let slug = FileTools.slugify(e);
      // remove dismounted
      slug = FileTools.slugify(slug.replace("dismounted", "").replace("unmounted", "")).replace(/^-+|-+$/g, "");
      let mounted = false;
      if (slug.includes("mounted")) {
        mounted = true;
        slug = FileTools.slugify(slug.replace("mounted", "").replace(/^-+|-+$/g, ""));
      }
      // alternate versions
      slug = this.getProperVersion(slug);
      if (EQUIPEMENT[slug]) {
        let item = await CompendiaUtils.getItemFromCompendium("equipment", EQUIPEMENT[slug].key);
        if (item) {
          item = item.toObject();
          item.name = e;

          if (item.type == "weapon") {
            item.system.ability = { key: EQUIPEMENT[slug].ability, option: "", id: null };
            item.system.horse = mounted;
          }
          this.object.currentItems.push(item);
          stats.equipment.found++;
          continue;
        } else {
          console.error("Wrong Equipment key: " + slug);
          stats.equipment.unknown++;
        }
      } else {
        let item = await CompendiaUtils.getItemFromCompendium("equipment", slug);
        if (item) {
          item = item.toObject();
          item.name = e;
          this.object.currentItems.push(item);
          stats.equipment.found++;
          continue;
        } else {
          console.error("Wrong Equipment key: " + slug);
          stats.equipment.unknown++;
        }
      }

      // find match in equipment list
      let matches = [];
      for (let ref of Object.keys(EQUIPEMENT)) {
        let re = new RegExp(ref);
        let m = slug.match(re);
        if (m) {
          matches.push(ref);
        }
      }
      if (matches.length == 1) {
        let item = await CompendiaUtils.getItemFromCompendium("equipment", EQUIPEMENT[matches[0]].key);
        if (item) {
          item = item.toObject();
          item.name = e;
          this.object.currentItems.push(item);
          stats.equipment.found++;
        } else {
          stats.equipment.unknown++;
          console.error("Wrong Equipment key: " + slug);
        }
      } else if (matches.length > 1) {
        this.addReviewItem(`Equipment: Multiple (${matches.length}) matches for "${e}" : ${matches}`);
        stats.equipment.unknown++;
      } else {
        this.addReviewItem(`Equipment: No matches for "${e}", added as item`);
        console.log(`Unknown Equipment : "${e}" key=${slug}, adding as Item`);
        stats.equipment.unknown++;

        const inv = {
          name: e,
          type: "item",
          img: "icons/svg/item-bag.svg",
          system: {}
        };
        this.object.currentItems.push(inv);
      }
    }
  }

  getProperVersion(slug) {
    switch (slug) {
      case "partial-heavy-leather":
        return "heavy-leather-partial";
      case "full-metal-scale-armor":
        return "metal-scale-full";
      case "full-chain-mail":
        return "chain-mail-full";
      // shields
      case "heater-shield":
        return "shield-heater";
      case "round-shield":
        return "shield-round";
      case "infantry-shield":
        return "shield-infantry";
      case "buckler-shield":
        return "shield-buckler";
      //swords
      case "long-sword":
        return "sword-long";
      case "short-sword":
        return "sword-short";
      case "great-sword":
      case "greatsword":
        return "sword-great";
      case "bastard-sword":
        return "sword-bastard-1h";
      // bows
      case "long-bow":
        return "bow-long";
      case "short-bow":
        return "bow-short";
      case "composite-bow":
        return "bow-composite";
      // spears
      case "long-spear":
        return "spear-long";
      case "short-spear":
        return "spear-short";
      case "thrown-rock":
        return "stone";
      case "great-sword":
        return "sword-great";
      // combo
      case "lance-heater":
        return "lance-and-heater-shield";
      case "lance":
        return "spear-long";
      case "long-sword-heater":
        return "long-sword-and-heater-shield";
      default:
        break;
    }
    // TODO complete
    if (slug.includes("full-metal-scale-armor")) {
      return slug.replace("full-metal-scale-armor", "metal-scale-full");
    }

    if (slug.includes("long-spear")) {
      return slug.replace("long-spear", "spear-long");
    }

    return slug;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".pick-files").click(async (ev) => {
      ev.preventDefault();

      await this.pickFiles();
    });

    html.find(".analysis").click(async (ev) => {
      ev.preventDefault();
      this.doStuff();
    });
    html.find(".import").click(async (ev) => {
      ev.preventDefault();
      if (this.object.toEnrich === null) return;
      await this.importDocuments(this.object.toEnrich, false);
    });
  }

  async _updateObject(ev, formData) {
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    this.render();
  }

  async doStuff() {
    const equip = {};

    let init = await (await game.packs.get("arm5e-compendia.equipment")).getDocuments();
    init = init.map((e) => {
      return { [e.system.indexKey]: { type: e.folder.name } };
    });
    init.reduce((previous, current) => {
      const [e] = Object.entries(current);
      previous[e[0]] = e[1];
      return previous;
    }, equip);

    const res = {};
    for (let [k, v] of Object.entries(equip)) {
      let m = k.match(/(s-)(.*)/);
      if (m) {
        let cleaned = m[2].replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "single-weapon" };
        continue;
      }
      m = k.match(/(g-)(.*)/);
      if (m) {
        let cleaned = m[2].replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "great-weapon" };
        continue;
      }
      m = k.match(/(b-)(.*)/);
      if (m) {
        let cleaned = m[2].replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "brawl" };
        continue;
      }
      m = k.match(/(t-)(.*)/);
      if (m) {
        let cleaned = m[2].replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "thrown-weapon" };
        continue;
      }
      if (v.type == "Missile") {
        let cleaned = k.replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "bow" };
        continue;
      }
      if (v.type == "Armor") {
        let cleaned = k.replaceAll("-", " ");
        res[cleaned] = { key: k, type: "armor" };
        continue;
      }
    }
    console.log(res);
  }
}
