import { customizeConfig, customizeOnInit } from "./customize.js";
import { CompendiaUtils } from "./compendia.js";
Hooks.once("init", async function () {
  game["arm5eCompendia"] = { CompendiaUtils };
  // try to load localized aspects
  let module;
  try {
    const langCode = game.i18n.lang;
    module = await import(`../lang/enchant-aspects_${langCode}.js`);
  } catch (err) {
    module = await import(`../lang/enchant-aspects_en.js`);
  }

  CONFIG.ARM5E.ASPECTS = Object.fromEntries(
    Object.entries(module.ASPECTS).sort((e1, e2) => {
      return e1[1].name.localeCompare(e2[1].name);
    })
  );

  await customizeOnInit();
});

Hooks.on("arm5e-config-done", async (config) => {
  await customizeConfig(config);
});
