// Import utility classes and data models
import { CompendiaUtils } from "./compendia.js";
import {
  ABILITY_KEY_MAPPING,
  AREAS,
  ARTS,
  ARTS_STRUCT,
  CHARACTERISTICS,
  EQUIPEMENT,
  FLAWS_KEY_MAPPING,
  FORMS,
  getShortCharac,
  MINOR_MAJOR,
  MODEL,
  ORGANIZATIONS,
  TECHNIQUES,
  TYPOS,
  VIRTUES_KEY_MAPPING,
  VnFToReview
} from "./DataModel.js";
import { FileTools } from "./FileTools.js";
import { ACTIVE_EFFECTS_TYPES } from "../../../systems/arm5e/module/constants/activeEffectsTypes.js";

/**
 * ActorImporter - Form application for importing parsed character/creature data into Ars Magica 5e
 * Handles transformation of JSON data into complete actor documents with items, abilities, virtues, etc.
 */
export class ActorImporter extends FormApplication {
  /**
   * Initialize the importer with default state
   */
  constructor(data, options) {
    super(data, options);
    this.object.original = null; // Original reference (unused)
    this.object.imports = []; // Array of imported actors
    this.object.stats = {
      // Statistics tracking object
      // Statistics counters are initialized in pickFiles()
    };
    this.object.process = {
      // Feature flags for import options
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
  /**
   * Configure form appearance and behavior
   */
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

  /**
   * Prepare context data for form rendering, including enriched HTML report
   */
  async getData() {
    const context = super.getData().object;
    // Check if developer mode is enabled for debug features
    context.devMode = game.modules.get("_dev-mode")?.api?.getPackageDebugValue(CONFIG.ARM5E.SYSTEM_ID);
    // Enrich report HTML to process any inline tags/rolls
    context.enrichedReport = await TextEditor.enrichHTML(context.report, {
      secrets: true, // Show hidden/secret content
      async: true, // Use async processing
      rollData: {} // No custom roll data needed
    });
    console.log(context);
    return context;
  }

  /**
   * Pre-process raw JSON data for compatibility
   * - Normalize field names (Pretenses → Abilities)
   * - Combine biography from multiple sources
   * - Standardize Arts keys to lowercase
   */
  preprocessing(json) {
    // Handle legacy "Pretenses" field by renaming to "Abilities"
    if (json.system.Pretenses) {
      json.system.Abilities = json.system.Pretenses;
    }

    // Consolidate various biography fields into single description
    json.system.description = "";
    if (json.system["Appearance"]) {
      json.system.description = `<p><b>Appearance:</b> ${json.system["Appearance"]}</p>`;
    }
    if (json.system["Equipment"]) {
      json.system.description += `<p><b>Equipment:</b> ${json.system["Equipment"]}</p>`;
    }
    if (json.system.Combat?.comment) {
      json.system.description += `<p><b>Combat:</b> ${json.system.Combat?.comment}</p>`;
    }

    if (json.system["Customization Notes"]) {
      json.system.description += `<p><b>Customization Notes:</b> ${json.system["Customization Notes"]}</p>`;
    }

    // Normalize Arts keys to lowercase for consistent lookups
    if (json.system.Arts) {
      for (let [k, v] of Object.entries(json.system.Arts)) {
        json.system.Arts[k.toLowerCase()] = v;
      }
    }
  }

  /**
   * Open file picker and import all selected actor JSON files
   * Creates actors in "Antagonists Actors" folder with embedded items
   */
  async pickFiles() {
    // Prompt user to select JSON files from defed_actors directory
    const files = await FileTools.filepickerPromise("./pdf2compendia/antagonists");
    // Initialize all statistics counters for this import batch
    this.object.stats.actors = { count: 0 };
    this.object.stats.abilities = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.virtuesAndFlaws = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.personalityTraits = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.spells = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.powers = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.equipment = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.qualities = { found: 0, unknown: 0, no_field: 0 };
    this.object.stats.reputations = { found: 0, unknown: 0, no_field: 0 };

    // Initialize tracking sets and arrays for this batch
    this.actorsWithProblems = new Set(); // Tracks which actors had issues
    this.problems = new Set(); // General problem tracking
    this.object.imports = []; // Imported actor documents
    this.object.currentItems = []; // Current actor's items
    this.object.toReview = []; // Flagged items needing review

    let counter = 1;
    // Create or fetch "Antagonists Actors" folder for organization
    const folderName = "Antagonists Actors";
    let folder = game.folders.getName(folderName);
    if (!folder) {
      [folder] = await Folder.create([{ name: folderName, type: "Actor" }]);
    }

    // Process each selected JSON file
    for (let file of files) {
      // Load and preprocess JSON data
      let json = await foundry.utils.fetchJsonWithTimeout(file);
      this.currentFile = file; // Track current file for error reporting
      this.preprocessing(json);

      // Determine actor and character type based on data
      let type = this.guessType(json);
      let charType = this.guessCharType(type, json);

      console.log(`Importing Actor "${json.name}"`);
      // Main import orchestration - returns complete actor data
      const imported = await this.importCharacter(json);
      imported.folder = folder._id; // Assign to created folder

      // Create actor document in the world
      let [actor] = await Actor.createDocuments([imported]);

      // Attach all items to the actor
      await actor.createEmbeddedDocuments("Item", this.object.currentItems, {});
      this.object.stats.actors.count++;
      this.object.imports.push(imported);

      counter++;
    }

    // Calculate final statistics
    this.object.stats.actors.withProblem = this.actorsWithProblems.size;
    console.log(this.object.stats);
  }

  /**
   * Flag an item for manual review
   * Items are appended to actor's biography in "To review" section
   */
  addReviewItem(txt) {
    this.object.toReview.push(txt);
  }

  /**
   * Main import orchestrator for a single character
   * Sequentially imports all character attributes and items
   * @param {Object} json - Source character data from parsed PDF
   * @returns {Object} Complete actor document ready for creation
   */
  async importCharacter(json) {
    // Initialize actor structure with basic properties
    this.object.currentActor = { name: json.name, type: this.guessType(json), system: {}, items: [] };
    const root = this.object.currentActor.system; // Shortcut to system data
    this.current = json; // Store for error reporting
    this.object.currentItems = []; // Reset items for this actor
    this.object.toReview = []; // Reset review list

    // Determine character archetype (grog, companion, magus, entity, etc.)
    root.charType = { value: this.guessCharType(this.object.currentActor.type, json) };
    // Import characteristics (Str, Dex, Sta, etc.) with error handling
    if (json.system.Characteristics.message) {
      this.addReviewItem(
        `Characteristics parsing error: ${json.system.Characteristics.message} : "${json.system.Characteristics.entry}"`
      );
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
    } else {
      this.importCharacteristics(json.system);
    }

    // Import various character attributes
    this.importTraits(json.system); // Age, biography, confidence, decrepitude, warping
    this.importQualities(json.system); // Beast special qualities

    // Supernatural entities have special requirements
    if (root.charType.value == "entity") {
      this.setMightAndRealm(json); // Set Might and aligned realm
      this.importPowers(json.system); // Supernatural powers
    }

    // Import social connections and reputations
    await this.importReputations(json.system);

    // Magi have additional magical attributes and abilities
    if (root.charType.value == "magus") {
      if (this.object.process.spells) await this.importSpells(json.system);
      if (this.object.process.arts) this.importArts(json.system);
    }

    // Set metadata for indexing and tracking
    root.indexKey = FileTools.slugify(json.name);
    root.reviewer = "xzotl";
    root.source = "Ant"; // TODO: Set source properly from source data

    // Import abilities (skills and knowledge) with error handling
    if (this.object.process.abilities) {
      if (json.system.Abilities?.message) {
        this.addReviewItem(
          `Abilities parsing error: ${json.system.Abilities?.message} : "${json.system.Abilities?.entry}"`
        );
        this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      } else {
        await this.importAbilities(json.system);
      }
    }

    // Import virtues and flaws (advantages and disadvantages)
    if (this.object.process.virtuesAndFlaws) await this.importVirtuesAndFlaws(json.system);

    // Import personality traits (Pride, Caution, etc.) with error handling
    if (this.object.process.personalityTraits) {
      if (json.system["Personality Traits"]?.message) {
        this.addReviewItem(
          `Personality Traits parsing error: ${json.system["Personality Traits"].message} : "${json.system["Personality Traits"].entry}"`
        );
        this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      } else {
        await this.importPersonalityTraits(json.system);
      }
    }

    // Import equipment (weapons, armor, gear)
    if (this.object.process.equipment) {
      if (json.system.Equipment) {
        await this.importEquipment(json.system);
      }
      await this.importNaturalWeapons(json.system); // Beast natural attacks
    }

    // Append any flagged items to actor biography for review
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

  /**
   * Import the 9 core characteristics from source data
   * Handles: Str, Dex, Sta, Per, Int/Cun, Pre, Com, Qik
   */
  importCharacteristics(src) {
    const root = this.object.currentActor.system;
    root.characteristics = foundry.utils.deepClone(MODEL.characteristics);
    const char = src.Characteristics;

    // Handle either Cunning or Intelligence (mutually exclusive for some characters)
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

    // Import remaining characteristics
    root.characteristics.per.value = char.Per.score;
    root.characteristics.per.aging = char.Per.agingPoints;
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

  /**
   * Import Hermetic Magic Arts (Techniques and Forms)
   * Transfers experience points for each art
   */
  importArts(src) {
    const root = this.object.currentActor.system;
    root.arts = foundry.utils.deepClone(ARTS_STRUCT);

    // Copy technique experience points
    for (let t of Object.keys(CONFIG.ARM5E.magic.techniques)) {
      root.arts.techniques[t].xp = src.Arts[t].xp;
    }

    // Copy form experience points
    for (let f of Object.keys(CONFIG.ARM5E.magic.forms)) {
      root.arts.forms[f].xp = src.Arts[f].xp;
    }
  }

  /**
   * Import miscellaneous character attributes
   * Including age, biography, house, twilight scars, decrepitude, warping, confidence
   */
  importTraits(src) {
    const root = this.object.currentActor.system;

    // Age information
    if (src.Age) {
      root.age = { value: Number(src.Age.actual) };
      root.apparent = { value: Number(src.Age.apparent) };
    }

    // House assignment for magi (if name matches a known house)
    if (root.charType.value == "magus") {
      if (Object.keys(MODEL.houses).includes(this.object.currentActor.name)) {
        root.house = { value: MODEL.houses[this.object.currentActor.name] };
      }
    }

    // Biography/description
    if (src.description) {
      root.biography = src.description;
    }

    // Size (primarily for beasts)
    if (src.Size) {
      if (this.object.currentActor.type == "beast") {
        root.vitals = { siz: { value: src.Size } };
      }
    }

    // Twilight scars (from longevity rituals)
    if (src["Twilight Scars"]) {
      root.laboratory = { longevityRitual: { twilightScars: src["Twilight Scars"] } };
    }

    // Decrepitude score and points (aging penalty)
    if (src["Decrepitude"]) {
      let score = Number(src["Decrepitude"].score);
      root.decrepitude = { points: 5 * ((score * (score + 1)) / 2) + Number(src["Decrepitude"].points) };
    } else {
      root.decrepitude = { points: 0 };
    }

    // Warping score and points (magical corruption)
    if (src["Warping Score"]) {
      let score = Number(src["Warping Score"].score);
      root.warping = { points: 5 * ((score * (score + 1)) / 2) + Number(src["Warping Score"].points) };
    } else {
      root.warping = { points: 0 };
    }

    // Confidence score (for magi)
    if (src["Confidence Score"]) {
      root.con = {
        score: src["Confidence Score"].score,
        points: src["Confidence Score"].points
      };
    }
  }

  /**
   * Find or map ability name to compendium index key
   * Attempts direct lookup, then checks mappings, then handles special cases
   * @param {string} k - Ability name
   * @param {object} v - Ability data
   * @returns {string|null} Compendium key or null if not found
   */
  async getAbitilyIndexKey(k, v) {
    // Try direct slugified lookup in abilities compendium
    const slug = FileTools.slugify(k);
    let found = await CompendiaUtils.getItemFromCompendium("abilities", slug);

    if (found) {
      return slug;
    } else {
      // Check for prefix matches in ability mapping
      for (let mapping of Object.entries(ABILITY_KEY_MAPPING)) {
        if (k.startsWith(mapping[0])) {
          return mapping[1];
        }
      }

      // Handle Form Resistance special case
      if (/(.+) Resistance/.test(k)) {
        let m = k.match(/(.+) Resistance/);
        if (FORMS.includes(m[1])) {
          return "form-resistance";
        } else {
          console.log(`Ability "${k}" with key : "${slug}" not found - ${this.current.name} in ${this.currentFile}`);
          this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
          this.addReviewItem(`Form resistance not found: "${k}"`);
          stats.abilities.unknown++;
        }
      }
      // Handle Area Lores
      else if (/.*Area.+Lore/.test(k)) {
        return "area-lore";
      } else {
        // Check against area lore list
        for (let lore of AREAS) {
          if (k === lore) {
            return "area-lore";
          }
        }
        // Check against organization lore list
        for (let lore of ORGANIZATIONS) {
          if (k === lore) {
            return "lore-organisation";
          }
        }
        return null;
      }
    }
  }

  /**
   * Import abilities (skills and knowledge)
   * Handles ability lookup with 3-step strategy:
   * 1. Direct compendium lookup (slugified name)
   * 2. Prefix matching (e.g., "Form Resistance" variants)
   * 3. Special lore handling (area lores, organization lores)
   *
   * Abilities include:
   * - Academic abilities (Latin, Philosophy, etc.)
   * - Martial abilities (Single Weapon, Great Weapon, etc.)
   * - General abilities (Craft, Swim, Hunt, etc.)
   * - Mystery Cult abilities (Hermetic, Cult-specific)
   * - Supernatural abilities (Magic Theory, Faerie Lore, etc.)
   * - Area Lores (knowledge of specific regions)
   * - Organization Lores (knowledge of specific groups)
   * - Form Resistances (defense against specific forms)
   *
   * Each ability stores XP (experience points) and specialization choice
   */
  async importAbilities(src) {
    const stats = this.object.stats;

    // Validate required field exists before processing
    if (!src.Abilities) {
      stats.abilities.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.addReviewItem(`No "Abilities" field`);
      return;
    }
    const items = this.object.currentItems;

    // Process each ability entry from source data
    for (let [k, v] of Object.entries(src.Abilities)) {
      // STEP 0: Apply known typo corrections from TYPOS mapping
      // Fixes common parsing errors or alternate spellings from source PDFs
      if (TYPOS[k]) {
        k = TYPOS[k];
      }

      // STEP 1 & 2: Find the compendium key for this ability
      // This method attempts:
      //   1. Direct slugified lookup (e.g., "Latin" → "latin")
      //   2. Prefix matching against ABILITY_KEY_MAPPING (e.g., "Puissant" → generic prefix handler)
      //   3. Special case handling:
      //      - Form Resistance (check if matches known form: "Creo Resistance" → "form-resistance")
      //      - Area Lores (matches AREAS list or area-lore pattern)
      //      - Organization Lores (matches ORGANIZATIONS list)
      const indexKey = await this.getAbitilyIndexKey(k, v);

      if (indexKey) {
        // Found a matching ability in compendium

        // SPECIAL CASE: Area Lore handling
        // Area Lores are abilities that represent knowledge of specific geographic regions
        // Examples: "Aquitaine Lore", "Rhine Valley Lore", "Iberia Lore"
        // These are created as generic "area-lore" items with customized names
        if (indexKey == "area-lore") {
          console.log(`Area lore "${k}"`);
          // Delegates to special handler that creates area-lore item with custom name
          this.handleSpecialCasesAreaLore(k, v);
        }
        // SPECIAL CASE: Organization Lore handling
        // Organization Lores represent knowledge of specific groups/organizations
        // Examples: "House Jerbiton Lore", "Order of Hermes Lore", "Church Lore"
        // These are created as generic "lore-organisation" items with customized names
        else if (indexKey == "lore-organisation") {
          console.log(`Organisation lore "${k}"`);
          // Delegates to special handler that creates organization-lore item with custom name
          this.handleSpecialCasesAreaLore(k, v);
        }
        // STANDARD CASE: Regular ability import
        // For standard abilities, retrieve compendium item and populate with:
        //   - XP (experience points, derived from ability score via formula: score * (score+1) / 2 * 5)
        //   - Specialization (chosen focus within ability, e.g., "Swords" for Single Weapon)
        else {
          // Create ability item with compendium reference, XP, and specialization
          let found = await this.addSpecialCaseAbility(k, v, indexKey);
        }
      }
      // Ability lookup failed - flag for review
      else {
        const slug = FileTools.slugify(k);
        // Log to console for development debugging
        console.log(`Ability "${k}" with key : "${slug}" not found - ${this.current.name} in ${this.currentFile}`);
        // Track actor with missing ability for review
        this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
        // Flag item for manual review in actor's biography
        this.addReviewItem(`Ability not found: "${k}"`);
        // Update statistics for import report
        stats.abilities.unknown++;
      }
    }
  }

  /**
   * Import virtues and flaws (advantages and disadvantages)
   * Handles 40+ special case patterns including:
   * - Direct compendium lookups (virtues, then flaws)
   * - Variable form/technique abilities (Quiet Magic, Deft, Deficient, Puissant, Affinity)
   * - Characteristic modifications (Great/Poor Characteristic x2)
   * - Personality traits (minor/major variants)
   * Creates active effects for mechanical bonuses/penalties
   */
  async importVirtuesAndFlaws(src) {
    const stats = this.object.stats;

    // Validate required field exists
    if (!src["Virtues and Flaws"]) {
      stats.virtuesAndFlaws.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.addReviewItem(`No "Virtues and Flaws" field`);
      return;
    }
    const items = this.object.currentItems;

    // Process each virtue/flaw entry
    for (let v of src["Virtues and Flaws"]) {
      v = v.trim();

      // Apply typo corrections from mapping
      if (TYPOS[v]) {
        v = TYPOS[v];
      }

      const slug = FileTools.slugify(v);

      // Check for edge cases handled by special oddity handler
      let found = await this.handleAbilitiesOddities(v);
      if (found) {
        continue;
      }

      // STEP 1: Try direct virtue compendium lookup
      const virtue = await CompendiaUtils.getItemFromCompendium("virtues", slug);
      if (virtue) {
        stats.virtuesAndFlaws.found++;
        // Flag items that require review (may have duplicate active effects)
        if (VnFToReview.includes(slug)) {
          this.addReviewItem(`Review Active effects of : "${v}", they may have been applied twice`);
        }
        items.push(virtue);
      } else {
        // STEP 2: Try direct flaw compendium lookup
        const flaw = await CompendiaUtils.getItemFromCompendium("flaws", slug);
        if (flaw) {
          stats.virtuesAndFlaws.found++;
          items.push(flaw);
        } else {
          // STEP 3: Handle special cases and complex patterns

          // Skip "none" entry (indicates no virtues/flaws)
          if (v.toLowerCase() == "none") {
            break;
          }

          // Try VIRTUES_KEY_MAPPING - check prefix matches and slugified matches
          for (let mapping of Object.entries(VIRTUES_KEY_MAPPING)) {
            if (v.startsWith(mapping[0])) {
              return await this.addSpecialCaseVnF("virtues", v, mapping[1]);
            } else if (v.toLowerCase().startsWith(mapping[0])) {
              return await this.addSpecialCaseVnF("virtues", v, mapping[1]);
            } else if (FileTools.slugify(v) == mapping[0]) {
              return await this.addSpecialCaseVnF("virtues", v, mapping[1]);
            }
          }

          // Try FLAWS_KEY_MAPPING - check prefix matches and slugified matches
          for (let mapping of Object.entries(FLAWS_KEY_MAPPING)) {
            if (v.startsWith(mapping[0])) {
              return await this.addSpecialCaseVnF("flaws", v, mapping[1]);
            } else if (v.toLowerCase().startsWith(mapping[0])) {
              return await this.addSpecialCaseVnF("flaws", v, mapping[1]);
            } else if (FileTools.slugify(v) == mapping[0]) {
              return await this.addSpecialCaseVnF("flaws", v, mapping[1]);
            }
          }

          // SPECIAL CASE: Quiet Magic variants
          // "Quiet Magic" (normal) or "Quiet Magic x2" (silent magic - double benefit)
          if (v.startsWith("Quiet Magic")) {
            let n = v.replace("(", "").replace(")", "");
            if (/Quiet Magic x2/.test(n)) {
              // x2 variant grants Silent Magic (double benefit)
              await this.addSpecialCaseVnF("virtues", null, "silent-magic");
            } else if (v === "Quiet Magic") {
              // Standard Quiet Magic virtue
              await this.addSpecialCaseVnF("virtues", null, "quiet-magic");
            } else {
              this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
              this.addReviewItem(`Quiet Magic Virtue parsing error: "${v}"`);
              stats.virtuesAndFlaws.unknown++;
            }
          }
          // SPECIAL CASE: Deft <Form> - Bonus to spellcasting in specific form
          else if (v.startsWith("Deft ")) {
            let m = v.match(/Deft (.+)/);
            if (FORMS.includes(m[1])) {
              // Create deft-form virtue with active effect for bonus
              const virtue = await this.addSpecialCaseVnF("virtues", v, "deft-form");
            } else {
              console.log(`Virtue or Flaw "${v}" with key : "${slug}" not found`);
              this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
              this.addReviewItem(`Deft Virtue not found: "${v}"`);
              stats.virtuesAndFlaws.unknown++;
            }
          }
          // SPECIAL CASE: Deficient <Technique/Form> - Penalty to technique/form
          // Can be: "Deficient Technique" or "Deficient Technique (Cr)" for specific
          else if (v.startsWith("Deficient ")) {
            let m = v.match(/Deficient (.+)/);

            // Check if it's a known technique or form
            if (TECHNIQUES.includes(m[1])) {
              // Deficiency in specific technique
              const virtue = await this.addSpecialCaseVnF("flaws", v, "deficient-technique");
              this.setActiveEffect(virtue, "deficiency", m[1].substring(0, 2).toLowerCase());
            } else if (FORMS.includes(m[1])) {
              // Deficiency in specific form
              await this.addSpecialCaseVnF("flaws", v, "deficient-form");
              this.setActiveEffect(virtue, "deficiency", m[1].substring(0, 2).toLowerCase());
            } else {
              // Try parsing with parenthetical: "Deficient Technique (Cr)"
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
                this.addReviewItem(`Deficient X Flaw not found: "${v}"`);
                stats.virtuesAndFlaws.unknown++;
              }
            }
          }
          // SPECIAL CASE: Traditional Ward - Ward against specific supernatural type
          else if (v.match(/Traditional Ward/)) {
            await this.addSpecialCaseVnF("flaws", v, "traditional-ward");
          }
          // SPECIAL CASE: Overconfident <Minor/Major> - Personality flaw
          else if (v.startsWith("Overconfident ")) {
            if (v.match(/Major/)) {
              await this.addSpecialCaseVnF("flaws", v, "overconfident-major");
            } else {
              await this.addSpecialCaseVnF("flaws", v, "overconfident-minor");
            }
          }
          // SPECIAL CASE: Greater/Lesser <Type> Power - Creature powers
          else if (v.match(/Greater .* Power/)) {
            await this.addSpecialCaseVnF("virtues", v, "greater-power");
          } else if (v.match(/Lesser .* Power/)) {
            await this.addSpecialCaseVnF("virtues", v, "lesser-power");
          }
          // SPECIAL CASE: Gentleman/Gentlewoman - Gender-specific virtue
          else if ("gentleman" === slug || "gentlewoman" === slug) {
            await this.addSpecialCaseVnF("virtues", v, "gentlemanwoman");
          }
          // SPECIAL CASE: Improved Characteristics <xN> - Can be taken multiple times
          // "Improved Characteristics" or "Improved Characteristics x2" etc.
          else if (v.startsWith("Improved Characteristics ")) {
            let np = v.replace("(", "").replace(")", "");
            let re = /Improved Characteristics x(\d)/;

            let match = np.match(re);
            if (match) {
              // Create multiple instances for x2, x3, etc.
              for (let n = 1; n <= Number(match[1]); n++) {
                await this.addSpecialCaseVnF("virtues", null, "improved-characteristics");
              }
              continue;
            }

            // Single improved characteristic
            re = /Improved Characteristics/;
            match = np.match(re);
            if (match) {
              const virtue = await this.addSpecialCaseVnF("virtues", v, "improved-characteristics");
            } else {
              console.log("Unknown improved characteristic: " + match[1]);
              this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
              this.addReviewItem(`Improved characteristics - Virtue or Flaw not found: "${v}"`);
            }
          }
          // SPECIAL CASE: Poor <Characteristic> [xN] - Penalty to characteristic
          // "Poor Strength" or "Poor Strength x2" etc.
          else if (v.startsWith("Poor ")) {
            let found = await this.handleExtremeChars(v, "poor-characteristic", "Poor", "flaws", -1);
            if (found) continue;
            this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
            this.addReviewItem(`Poor characteristic - Virtue or Flaw not found: "${v}"`);
          }
          // SPECIAL CASE: Great <Characteristic> [xN] - Bonus to characteristic
          // "Great Strength" or "Great Strength x2" etc.
          else if (v.startsWith("Great ")) {
            let found = await this.handleExtremeChars(v, "great-characteristic", "Great", "virtues", 1);
            if (found) continue;
            this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
            this.addReviewItem(`Great characteristic - Virtue or Flaw not found: "${v}"`);
          }
          // SPECIAL CASE: Puissant <Art/Ability> - +3 bonus to specific ability
          // Can be "Puissant Art (Form)" or "Puissant Ability (Name)" or variants
          else if (v.startsWith("Puissant")) {
            // Normalize the string for parsing
            let np = v
              .trim()
              .replace("*", "")
              .replace("(", "")
              .replace(")", "")
              .replace("Art", "art")
              .replace("Ability", "ability");

            // Check if it's a puissant art
            let containArt = np.match(/Puissant art (.+)/);
            if (containArt) np = np.replace(" art", "");

            let m = np.match(/Puissant (.+)/);
            if (ARTS.includes(m[1])) {
              // PUISSANT ART: +3 XP per year in this art
              const virtue = await this.addSpecialCaseVnF("virtues", v, "puissant-art");
              // Set active effect with art code (e.g., "cr" for Creo)
              this.setActiveEffect(virtue, "art", m[1].toLowerCase().substring(0, 2));
            } else {
              // Check if it's a puissant ability
              let containAb = np.match(/Puissant ability (.+)/);
              if (containAb) np = np.replace(" ability", "");
              m = np.match(/Puissant (.+)/);

              // PUISSANT ABILITY: +3 XP per year in this ability
              const virtue = await this.addSpecialCaseVnF("virtues", v, "puissant-ability");
              // Find the corresponding ability and set appropriate bonus effect
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
          }
          // SPECIAL CASE: Affinity with <Art/Ability> - +1 XP per year in specific art/ability
          // "Affinity with Creo" or "Affinity with Craft"
          else if (v.startsWith("Affinity with ")) {
            let np = v.replace("*", "");
            const m = np.match(/Affinity with (.+)/);
            await this.handleAffinityWith(v, m);
          }
          // SPECIAL CASE: Affinity (Art/Ability) - variant parenthetical format
          else if (v.startsWith("Affinity (")) {
            let np = v.replace("*", "");
            const m = np.match(/Affinity (.+)/);
            await this.handleAffinityWith(v, m);
          }
          // SPECIAL CASE: Personality flaws (Arrogant, Cautious, Cruel, etc.)
          else if (await this.handlePersonalityFlaws(v, slug)) {
            continue;
          }
          // NO MATCH FOUND: Log as unknown virtue/flaw
          else {
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

  async handleAffinityWith(v, m) {
    if (ARTS.includes(m[1].trim())) {
      // puissant art
      const virtue = await this.addSpecialCaseVnF("virtues", v, "affinity-with-art");
      this.setActiveEffect(virtue, "affinity", m[1].trim().substring(0, 2).toLowerCase());
    } else {
      // puissant ability
      const virtue = await this.addSpecialCaseVnF("virtues", v, "affinity-with-ability");
      // find the corresponding ability
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

  /**
   * Configure active effect for an item
   * Sets up mechanical bonuses for virtues/abilities (bonuses, affinity, deficiency, etc.)
   * @param {Object} item - The item to configure
   * @param {string} type - Effect type (art, characteristic, bonus, affinity, etc.)
   * @param {string} subtype - Effect subtype (specific art/form/ability)
   * @param {string} option - Optional specific target (e.g., "Metalsmith" for Craft)
   * @param {number} value - Effect value (usually 1 or -1)
   * @param {number} idx - Effect index in array
   */
  setActiveEffect(item, type, subtype, option = null, value = null, idx = 0) {
    if (!item) return;

    const cfg = ACTIVE_EFFECTS_TYPES[type].subtypes[subtype];

    const effect = item.effects[idx];
    let key = cfg.key;
    effect.flags.arm5e.type = [type];
    effect.flags.arm5e.subtype = [subtype];

    // Handle dynamic options (like specific craft specialty)
    if (option) {
      effect.flags.arm5e.option = [option];
      key = key.replace("#OPTION#", option);
    }

    effect.name = item.name;

    // Set the actual game mechanics change
    if (effect.changes.length) {
      let newVal = value ? value : cfg.default;
      effect.changes[0] = { key: key, mode: cfg.mode, value: newVal };
    }
  }

  /**
   * Check if a virtue/flaw is a personality trait (minor/major variant)
   * Examples: Arrogant, Cautious, Cruel, Merciful, etc.
   * @param {string} name - Virtue/flaw name
   * @param {string} key - Slugified name
   * @returns {boolean} True if handled as personality flaw
   */
  async handlePersonalityFlaws(name, key) {
    // Check against list of personality traits
    for (let f of MINOR_MAJOR) {
      if (name.startsWith(f)) {
        // Create minor or major variant based on name
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

  /**
   * Import personality traits (Pride, Caution, etc.)
   * Creates personality trait items with XP calculated from trait score
   */
  async importPersonalityTraits(src) {
    const stats = this.object.stats;

    // Validate required field exists
    if (!src["Personality Traits"]) {
      stats.personalityTraits.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.problems.add(`${this.current.name} - ${this.currentFile} - no "Personality traits?`);
      return;
    }
    const items = this.object.currentItems;

    // Create personality trait item for each entry
    for (let [k, v] of Object.entries(src["Personality Traits"])) {
      const trait = {
        name: k,
        type: "personalityTrait",
        img: "icons/skills/social/intimidation-impressing.webp",
        system: {}
      };
      // Calculate XP from score using standard formula
      let score = Number(v);
      trait.system.xp = ((score * (score + 1)) / 2) * 5;
      items.push(trait);
      stats.personalityTraits.found++;
    }
  }

  /**
   * Import reputations (social standing in communities)
   * Creates reputation items with type (local, hermetic, academic, persona)
   */
  async importReputations(src) {
    const stats = this.object.stats;

    // Validate required field exists
    if (!src["Reputations"]) {
      stats.reputations.no_field++;
      this.actorsWithProblems.add(`${this.current.name} - ${this.currentFile}`);
      this.addReviewItem(`no "Reputation?`);
      return;
    }
    const items = this.object.currentItems;

    // Skip if "none" reputation
    if (["none", "None"].includes(src["Reputations"])) return;

    // Create reputation item for each entry
    for (let r of src["Reputations"]) {
      const trait = {
        name: r.name,
        type: "reputation",
        img: "icons/svg/angel.svg",
        system: {}
      };
      // Calculate XP from score
      let score = Number(r.score);
      trait.system.xp = ((score * (score + 1)) / 2) * 5;
      // Determine reputation type/scope
      trait.system.type = this.guessReputationType(r.type);
      items.push(trait);
      stats.reputations.found++;
    }
  }

  /**
   * Infer reputation scope/type from type field
   * Maps text to reputation categories: local, hermetic, academic, persona
   */
  guessReputationType(type) {
    let t = type?.toLowerCase() ?? "";

    // Check for reputation type keywords
    if (t.match(/local/)) {
      return "local";
    }
    if (t.match(/hermetic/)) {
      return "hermetic";
    }
    if (t.match(/academic/)) {
      return "academic";
    }
    if (t.match(/persona/)) {
      return "persona";
    }
    if (t.match(/infernal/)) {
      return "infernal";
    }

    // Default to local if unknown
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
    for (let lore of ORGANIZATIONS) {
      if (name === lore) {
        await this.addSpecialCaseAbility(name, attributes, "lore-organisation");
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
      console.error("Wrong special case", name, key);
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
      console.error("Wrong V&F special case", name, key);
    }
  }

  /**
   * Determine actor document type (player, npc, or beast)
   * Based on presence of Might field and other characteristics
   */
  guessType(json) {
    // NPCs have a Might field (supernatural)
    if (this.getMightFieldName(json)) {
      return "npc";
    }
    // Beasts have Cunning instead of Intelligence
    if (json.system.Characteristics.Cun) {
      return "beast";
    }

    // Default: player character (human)
    return "npc";
  }

  /**
   * Determine character archetype based on type and data
   * Returns: grog, companion, magus (for players) or entity (for NPCs) or mundane (for beasts)
   */
  guessCharType(type, json) {
    // For human characters
    if (type == "player") {
      // Grogs lack confidence score
      if (!json.system["Confidence Score"]) {
        return "grog";
      }
      // Magi have Arts
      if (json.system.Arts) {
        return "magus";
      } else {
        // Others are companions (specialists, warriors, etc.)
        return "companion";
      }
    }

    // For supernatural creatures
    const realm = this.getMightFieldName(json);
    if (realm) {
      // Initialize realm alignments for supernatural entity
      json.system.realm = {
        magic: { aligned: false },
        faeric: { aligned: false },
        divine: { aligned: false },
        infernal: { aligned: false }
      };
      return "entity";
    } else {
      // Mundane beasts (animals without supernatural powers)
      return "mundane";
    }
  }

  /**
   * Find which Might field is present for supernatural entities
   * @returns {string} Field name (Faerie Might, Magic Might, Divine Might, Infernal Might) or empty string
   */
  getMightFieldName(json) {
    if (json.system["Faerie Might"]) return "Faerie Might";
    if (json.system["Magic Might"]) return "Magic Might";
    if (json.system["Divine Might"]) return "Divine Might";
    if (json.system["Infernal Might"]) return "Infernal Might";
    return "";
  }

  /**
   * Configure Might and realm alignment for supernatural entities
   * Parses Might field (e.g., "50 (Co)" = 50 points, Corpus form)
   * Sets which realm the entity is aligned to
   */
  setMightAndRealm(json) {
    // Initialize all realms as unaligned
    this.object.currentActor.system.realms = {
      magic: { aligned: false },
      faeric: { aligned: false },
      divine: { aligned: false },
      infernal: { aligned: false }
    };

    let mightField = this.getMightFieldName(json);
    let might = String(json.system[mightField]);

    // Parse Might field format: "50 (Co)" -> score=50, form=Co
    let m = might.match(/(\d+) \((.+)\)/);
    if (m) {
      let form = m[2];
      // Validate form is valid
      if (FORMS.includes(form)) {
        this.object.currentActor.system.might = {
          form: form.substring(0, 2).toLowerCase(), // Get 2-letter abbreviation
          value: m[1],
          points: m[1]
        };
      } else {
        this.addReviewItem(`Might problem: ${might}`);
      }
    } else {
      this.addReviewItem(`Might problem: ${might}`);
    }

    // Set aligned realm based on Might field
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
      let combatPrep = false;
      let slug = FileTools.slugify(k);
      slug = FileTools.slugify(slug.replace("dismounted", "").replace("unmounted", "")).replace(/^-+|-+$/g, "");
      let mounted = false;
      if (slug.includes("mounted")) {
        mounted = true;
        slug = FileTools.slugify(slug.replace("mounted", "").replace(/^-+|-+$/g, ""));
      }

      slug = this.getProperVersion(slug);
      let equipment = EQUIPEMENT[slug];
      if (equipment) {
        if (equipment instanceof Array) {
          combatPrep = true;
        } else {
          equipment = [equipment];
        }
        for (let piece of equipment) {
          let item = await CompendiaUtils.getItemFromCompendium("equipment", piece.key);
          if (item) {
            item = item.toObject();
            if (!combatPrep) item.name = k;

            if (item.type == "weapon") {
              item.system.ability = { key: piece.ability, option: "", id: null };
              item.system.horse = mounted;
              if (combatPrep && mounted) item.name += " - Mounted";
            }

            // Check for duplicate equipment (weapon, armor, or other type)
            const duplicate = this.object.currentItems.find((e) => {
              if (item.type == "weapon") {
                return e.type == "weapon" && e.system.horse === mounted && e.system.indexKey === item.system.indexKey;
              } else if (item.type == "armor") {
                return e.type == "armor" && e.system.indexKey === item.system.indexKey;
              } else {
                return e.type === item.type && e.system.indexKey === item.system.indexKey;
              }
            });
            // Skip if duplicate found
            if (duplicate) {
              continue;
            }

            this.object.currentItems.push(item);
            stats.equipment.found++;
            continue;
          } else {
            console.error("Wrong Equipment key: " + slug);
            stats.equipment.unknown++;
          }
        }
      } else {
        if (slug === "comment") {
          this.addReviewItem(`Combat comments : ${v}`);
          continue;
        }
        if (slug === "notes") {
          this.addReviewItem(`Combat notes : ${v}`);
          continue;
        }
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

  /**
   * Import special beast qualities (Strength, Resilience, etc.)
   * Looks up qualities in virtues compendium
   */
  async importQualities(src) {
    const stats = this.object.stats;

    // Validate required field exists
    if (!src.Qualities) {
      if (this.object.currentActor.type == "beast") {
        stats.qualities.no_field++;
        this.addReviewItem(`no "Qualities"?`);
      }
      return;
    }

    // Process each quality entry
    for (let k of src.Qualities) {
      let slug = FileTools.slugify(k);

      // Normalize slug variations
      if (slug.startsWith("extra-natural-weapons")) {
        slug = "extra-natural-weapons";
      } else if (slug.includes("flier")) {
        slug = slug.replace("flier", "flyer");
      } else if (["large-antlers", "large-horns"].includes(slug)) {
        slug = "large-horns-antlers";
      }

      // Look up in virtues compendium (qualities are virtue items)
      let item = await CompendiaUtils.getItemFromCompendium("virtues", slug);
      if (item) {
        item = item.toObject();
        item.name = k;
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

  /**
   * Import supernatural entity powers (Special powers, abilities unique to creatures)
   * Creates power items with cost, initiative, form, and description
   */
  async importPowers(src) {
    const stats = this.object.stats;

    // Validate required field exists
    if (!src.Powers) {
      stats.powers.no_field++;
      if (this.object.currentActor.type != "beast") this.addReviewItem(`no "Powers"?`);
      return;
    }

    // Process each power entry
    for (let p of src.Powers) {
      let power = {
        name: p.name,
        type: "power",
        system: {
          description: p.description,
          cost: p.points, // Power point cost
          init: p.init, // Initiative modifier
          form: p.form.substring(0, 2).toLowerCase(), // Form abbreviation
          indexKey: FileTools.slugify(p.name),
          reviewer: "xzotl",
          source: "Cov"
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
      let combatPrep = false;
      // alternate versions
      slug = this.getProperVersion(slug);
      let equipment = EQUIPEMENT[slug];
      if (equipment) {
        if (equipment instanceof Array) {
          combatPrep = true;
        } else {
          equipment = [equipment];
        }
        for (let piece of equipment) {
          let item = await CompendiaUtils.getItemFromCompendium("equipment", piece.key);
          if (item) {
            item = item.toObject();
            if (!combatPrep) item.name = e;

            if (item.type == "weapon") {
              item.system.ability = { key: piece.ability, option: "", id: null };
              item.system.horse = mounted;
            }

            // Check for duplicate equipment (weapon, armor, or other type)
            const duplicate = this.object.currentItems.find((e) => {
              if (item.type == "weapon") {
                return e.type == "weapon" && e.system.horse === mounted && e.system.indexKey === item.system.indexKey;
              } else if (item.type == "armor") {
                return e.type == "armor" && e.system.indexKey === item.system.indexKey;
              } else {
                return e.type === item.type && e.system.indexKey === item.system.indexKey;
              }
            });
            // Skip if duplicate found
            if (duplicate) {
              continue;
            }

            this.object.currentItems.push(item);
            stats.equipment.found++;
            continue;
          } else {
            console.error("Wrong Equipment key: " + slug);
            this.addReviewItem(`Equipment not found: "${e}" key=${slug}`);
            stats.equipment.unknown++;
          }
        }
        continue;
      } else {
        let item = await CompendiaUtils.getItemFromCompendium("equipment", slug);
        if (item) {
          item = item.toObject();
          item.name = e;
          let duplicate = this.object.currentItems.find((e) => {
            return e.type == "weapon" && e.system.horse === mounted && e.system.indexKey === item.system.indexKey;
          });
          // is a duplicate?
          if (duplicate) {
            continue;
          }

          duplicate = this.object.currentItems.find(
            (e) => e.type == "armor" && e.system.indexKey === item.system.indexKey
          );
          // is a duplicate?
          if (duplicate) {
            continue;
          }

          this.object.currentItems.push(item);
          stats.equipment.found++;
          continue;
        } else {
          console.error("Wrong Equipment key: " + slug);
          this.addReviewItem(`Equipment not found: "${e}" key=${slug}`);
          stats.equipment.unknown++;
        }
      }

      // // find match in equipment list
      // let matches = [];
      // for (let ref of Object.keys(EQUIPEMENT)) {
      //   let re = new RegExp(ref);
      //   let m = slug.match(re);
      //   if (m) {
      //     matches.push(ref);
      //   }
      // }
      // if (matches.length == 1) {
      //   let item = await CompendiaUtils.getItemFromCompendium("equipment", EQUIPEMENT[matches[0]].key);
      //   if (item) {
      //     item = item.toObject();
      //     item.name = e;
      //     let duplicate = this.object.currentItems.find(
      //       (e) => e.type == "weapon" && e.system.horse === mounted && e.system.indexKey === item.system.indexKey
      //     );
      //     // is a duplicate?
      //     if (duplicate) {
      //       con;
      //       continue;
      //     }

      //     this.object.currentItems.push(item);
      //     stats.equipment.found++;
      //   } else {
      //     stats.equipment.unknown++;
      //     console.error("Wrong Equipment key: " + slug);
      //   }
      // } else if (matches.length > 1) {
      //   this.addReviewItem(`Equipment: Multiple (${matches.length}) matches for "${e}" : ${matches}`);
      //   stats.equipment.unknown++;
      // } else {
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
      // }
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
      case "full-chain-armor":
        return "full-chain-mail";
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

  /**
   * Bind form button click handlers
   */
  activateListeners(html) {
    super.activateListeners(html);

    // File picker button - opens dialog to select actor JSON files
    html.find(".pick-files").click(async (ev) => {
      ev.preventDefault();
      await this.pickFiles();
    });

    // Analysis button - utility for equipment mapping generation
    html.find(".analysis").click(async (ev) => {
      ev.preventDefault();
      this.doStuff();
    });

    // Import button - imports flagged documents
    html.find(".import").click(async (ev) => {
      ev.preventDefault();
      if (this.object.toEnrich === null) return;
      await this.importDocuments(this.object.toEnrich, false);
    });
  }

  /**
   * Handle form submission and update object state
   */
  async _updateObject(ev, formData) {
    // Merge submitted form data into object state
    foundry.utils.mergeObject(this.object, foundry.utils.expandObject(formData));
    // Re-render form to show updated state
    this.render();
  }

  /**
   * Utility method - generates equipment mapping reference from equipment compendium
   * Creates mapping of equipment names to keys, types, and associated abilities
   * Used for development/debugging to understand EQUIPEMENT data structure
   */
  async doStuff() {
    const equip = {};

    // Get all equipment items from compendium
    let init = await (await game.packs.get("arm5e-compendia.equipment")).getDocuments();
    // Extract indexed equipment by indexKey
    init = init.map((e) => {
      return { [e.system.indexKey]: { type: e.folder.name } };
    });
    // Consolidate into single object
    init.reduce((previous, current) => {
      const [e] = Object.entries(current);
      previous[e[0]] = e[1];
      return previous;
    }, equip);

    const res = {};
    // Process equipment and organize by prefix for quick lookup
    for (let [k, v] of Object.entries(equip)) {
      let m = k.match(/(s-)(.*)/); // Single-weapon prefix
      if (m) {
        let cleaned = m[2].replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "single-weapon" };
        continue;
      }
      m = k.match(/(g-)(.*)/); // Great-weapon prefix
      if (m) {
        let cleaned = m[2].replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "great-weapon" };
        continue;
      }
      m = k.match(/(b-)(.*)/); // Brawl prefix
      if (m) {
        let cleaned = m[2].replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "brawl" };
        continue;
      }
      m = k.match(/(t-)(.*)/); // Thrown-weapon prefix
      if (m) {
        let cleaned = m[2].replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "thrown-weapon" };
        continue;
      }
      // Missile weapons (bows, crossbows)
      if (v.type == "Missile") {
        let cleaned = k.replaceAll("-", " ");
        res[cleaned] = { key: k, type: "weapon", ability: "bow" };
        continue;
      }
      // Armor items
      if (v.type == "Armor") {
        let cleaned = k.replaceAll("-", " ");
        res[cleaned] = { key: k, type: "armor" };
        continue;
      }
    }
    console.log(res);
  }
}
