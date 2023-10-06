import { CompendiaUtils } from "./compendia.js";

Hooks.on("arm5e-config-done", async (config) => {
  // Find below a list of examples of customizations you can make
  // You are encouraged to explore the content of the config object (type CONFIG.ARM5E in the console when logged into a world)
  // Not all of can be edited (ask on Discord if you are unsure), but there is a lot of possibilities
  // ### Add a new hermetic house
  // config.character.houses.mynewhouse = { label : "The name of my House"};
  // ### Add a new field in the description tab of characters:
  // config.character.description.religion = { label : "Religion"};
  // ### Realms:
  // influence is the impact the aura has on powers of mundane (ie: none), magic, faery, divine and infernal respectively
  // ARM5E.realms = {
  //   magic: {
  //   label: "arm5e.sheet.realm.magic",
  //   value: ARM5E.REALM_TYPES.MAGIC,
  //   influence: [0, 1, 0.5, 0, -1]
  // },[...]
  // ### Make divine auras not impact magic
  // From
  // config.realms.divine.influence: [0, -3, -4, 1, -5]
  // To
  // config.realms.divine.influence: [0, 0, -4, 1, -5]
  // ### Give a bigger bonus to spellcasting when you shout
  // config.magic.mod.voice.loud.value = 2
  // ### Spell attributes
  // magic.durations = { ...
  //   sun: {
  //   label: "arm5e.spell.durations.sun",
  //   dtype: "String",
  //   source: "ArM5",
  //   impact: 2
  // },...
  // ### Change the cost of a spell attribute
  // Template: config.magic.(durations|ranges|targets).name.impact
  // Arcane connection range 1 magnitude more difficult:
  // config.magic.ranges.arc.impact = 5
  // New duration: "High tide" similar to sun
  // config.magic.durations.hightide = { label : "High tide", source : "custom", impact : 2};
});

Hooks.once("init", () => {
  game["arm5eCompendia"] = { CompendiaUtils };
});
