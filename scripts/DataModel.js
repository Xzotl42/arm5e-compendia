export const VnFToReview = ["dwarf", "giant-blood", "faerie-blood"];

export const MODEL = {
  characteristics: {
    cun: {
      value: 0
    },
    int: {
      value: 0
    },
    per: {
      value: 0
    },
    str: {
      value: 0
    },
    sta: {
      value: 0
    },
    pre: {
      value: 0
    },
    com: {
      value: 0
    },
    dex: {
      value: 0
    },
    qik: {
      value: 0
    }
  },
  houses: {
    "N/A": "n-a",
    Bjornaer: "bjo",
    Bonisagus: "bon",
    Criamon: "cri",
    "Ex Miscellanea": "exm",
    Flambeau: "fla",
    "Generic Magus": "gen",
    Guernicus: "gue",
    Jerbiton: "jer",
    Mercere: "mer",
    Merinita: "mta",
    Tremere: "tre",
    Tytalus: "tyt",
    Verditius: "ver",
    Diedne: "die"
  }
};

export function getShortCharac(ch) {
  if (ch === "Quickness") return "qik";
  return ch.substring(0, 3).toLowerCase();
}

export const ARTS_STRUCT = {
  techniques: {
    cr: {
      xp: 0
    },
    in: {
      xp: 0
    },
    mu: {
      xp: 0
    },
    pe: {
      xp: 0
    },
    re: {
      xp: 0
    }
  },
  forms: {
    an: {
      xp: 0
    },
    aq: {
      xp: 0
    },
    au: {
      xp: 0
    },
    co: {
      xp: 0
    },
    he: {
      xp: 0
    },
    ig: {
      xp: 0
    },
    im: {
      xp: 0
    },
    me: {
      xp: 0
    },
    te: {
      xp: 0
    },
    vi: {
      xp: 0
    }
  }
};

// Object.values(CONFIG.ARM5E.character.characteristics).map(e =>  game.i18n.localize(e.label));
export const CHARACTERISTICS = [
  "Intelligence",
  "Perception",
  "Strength",
  "Stamina",
  "Presence",
  "Communication",
  "Dexterity",
  "Quickness"
];
// Object.values(CONFIG.ARM5E.magic.arts).map(e =>  e.label);
export const ARTS = [
  "Creo",
  "Intellego",
  "Muto",
  "Perdo",
  "Rego",
  "Animal",
  "Aquam",
  "Auram",
  "Corpus",
  "Herbam",
  "Ignem",
  "Imaginem",
  "Mentem",
  "Terram",
  "Vim"
];

export const TECHNIQUES = ["Creo", "Intellego", "Muto", "Perdo", "Rego"];

export const FORMS = ["Animal", "Aquam", "Auram", "Corpus", "Herbam", "Ignem", "Imaginem", "Mentem", "Terram", "Vim"];

export const AREAS = ["Sicily Lore", "Local Farms Lore", "Bavaria Lore", "Mythic Middle East Lore", "Local Farms Lore"];

export const ORGANIZATIONS = [];

export const MINOR_MAJOR = [
  "Ambitious",
  "Avaricious",
  "Compassionate",
  "Compulsion",
  "Compulsive lying",
  "Depraved",
  "Driven",
  "Envious",
  "Gender Nonconforming",
  "Generous",
  "Greedy",
  "Hatred",
  "Higher Purpose",
  "Lecherous",
  "Meddler",
  "Obsessed",
  "Optimistic",
  "Overconfident",
  "Oversensitive",
  "Pagan",
  "Pious",
  "Proud",
  "Rebelious",
  "Reckless",
  "Wrathful"
];

export const EQUIPEMENT = {
  "leather-scale-full": {
    key: "leather-scale-full",
    type: "armor"
  },
  whip: {
    key: "s-whip",
    type: "weapon",
    ability: "single-weapon"
  },
  "rock-sharpened": {
    key: "t-rock-sharpened",
    type: "weapon",
    ability: "thrown-weapon"
  },
  trident: {
    key: "s-trident",
    type: "weapon",
    ability: "single-weapon"
  },
  knife: {
    key: "b-knife",
    type: "weapon",
    ability: "brawl"
  },
  "shield-round": {
    key: "s-shield-round",
    type: "weapon",
    ability: "single-weapon"
  },
  dagger: {
    key: "b-dagger",
    type: "weapon",
    ability: "brawl"
  },
  fist: {
    key: "b-fist",
    type: "weapon",
    ability: "brawl"
  },
  axe: {
    key: "s-axe",
    type: "weapon",
    ability: "single-weapon"
  },
  bludgeon: {
    key: "b-bludgeon",
    type: "weapon",
    ability: "brawl"
  },
  "axe-throwing": {
    key: "t-axe-throwing",
    type: "weapon",
    ability: "thrown-weapon"
  },
  "sword-long": {
    key: "s-sword-long",
    type: "weapon",
    ability: "single-weapon"
  },
  "farm-implement": {
    key: "g-farm-implement",
    type: "weapon",
    ability: "great-weapon"
  },
  "shield-infantry": {
    key: "s-shield-infantry",
    type: "weapon",
    ability: "single-weapon"
  },
  "leather-scale-partial": {
    key: "leather-scale-partial",
    type: "armor"
  },
  "pole-axe": {
    key: "g-pole-axe",
    type: "weapon",
    ability: "great-weapon"
  },
  "bow-long": {
    key: "bow-long",
    type: "weapon",
    ability: "bow"
  },
  "metal-scale-full": {
    key: "metal-scale-full",
    type: "armor"
  },
  arbalest: {
    key: "c-arbalest",
    type: "weapon",
    ability: "bow"
  },
  gauntlet: {
    key: "b-gauntlet",
    type: "weapon",
    ability: "brawl"
  },
  "stick-short": {
    key: "b-dueling-stick-short",
    type: "weapon",
    ability: "great-weapon"
  },
  "mace-and-chain": {
    key: "s-mace-and-chain",
    type: "weapon",
    ability: "single-weapon"
  },
  sling: {
    key: "t-sling",
    type: "weapon",
    ability: "thrown-weapon"
  },
  staff: {
    key: "g-staff",
    type: "weapon",
    ability: "great-weapon"
  },
  "pole-arm": {
    key: "g-pole-arm",
    type: "weapon",
    ability: "great-weapon"
  },
  "sword-great": {
    key: "g-sword-great",
    type: "weapon",
    ability: "great-weapon"
  },
  "metal-scale-partial": {
    key: "metal-scale-partial",
    type: "armor"
  },
  lance: {
    key: "s-lance",
    type: "weapon",
    ability: "single-weapon"
  },
  club: {
    key: "s-club",
    type: "weapon",
    ability: "single-weapon"
  },
  javelin: {
    key: "t-javelin",
    type: "weapon",
    ability: "thrown-weapon"
  },
  "metal-reinf-leather-full": {
    key: "metal-reinf-leather-full",
    type: "armor"
  },
  flail: {
    key: "g-flail",
    type: "weapon",
    ability: "great-weapon"
  },
  warhammer: {
    key: "g-warhammer",
    type: "weapon",
    ability: "great-weapon"
  },
  "bow-short": {
    key: "bow-short",
    type: "weapon",
    ability: "bow"
  },
  halberd: {
    key: "g-halberd",
    type: "weapon",
    ability: "great-weapon"
  },
  "arbalest-heavy": {
    key: "c-arbalest-heavy",
    type: "weapon",
    ability: "thrown-weapon"
  },
  "sword-short": {
    key: "s-sword-short",
    type: "weapon",
    ability: "single-weapon"
  },
  "shield-buckler": {
    key: "s-shield-buckler",
    type: "weapon",
    ability: "single-weapon"
  },
  falchion: {
    key: "s-falchion",
    type: "weapon",
    ability: "single-weapon"
  },
  cudgel: {
    key: "g-cudgel",
    type: "weapon",
    ability: "great-weapon"
  },
  "shield-heater": {
    key: "s-shield-heater",
    type: "weapon",
    ability: "single-weapon"
  },
  net: {
    key: "s-net",
    type: "weapon",
    ability: "single-weapon"
  },
  dodge: {
    key: "b-dodge",
    type: "weapon",
    ability: "brawl"
  },
  "spear-short": {
    key: "s-spear-short",
    type: "weapon",
    ability: "single-weapon"
  },
  crossbow: {
    key: "c-crossbow",
    type: "weapon",
    ability: "bow"
  },
  "spear-long": {
    key: "g-spear-long",
    type: "weapon",
    ability: "great-weapon"
  },
  "bow-composite": {
    key: "bow-composite",
    type: "weapon",
    ability: "bow"
  },
  "sword-bastard-1h": {
    key: "s-sword-bastard-1h",
    type: "weapon",
    ability: "single-weapon"
  },
  stone: {
    key: "t-stone",
    type: "weapon",
    ability: "thrown-weapon"
  },
  hatchet: {
    key: "s-hatchet",
    type: "weapon",
    ability: "single-weapon"
  },
  "chain-mail-partial": {
    key: "chain-mail-partial",
    type: "armor"
  },
  "metal-reinf-leather-partial": {
    key: "metal-reinf-leather-partial",
    type: "armor"
  },
  "bow-horse": {
    key: "bow-horse",
    type: "weapon",
    ability: "bows"
  },
  kick: {
    key: "b-kick",
    type: "weapon",
    ability: "brawl"
  },
  mace: {
    key: "s-mace",
    type: "weapon",
    ability: "single-weapon"
  },
  "heavy-leather-partial": {
    key: "heavy-leather-partial",
    type: "armor"
  },
  "chain-mail-full": {
    key: "chain-mail-full",
    type: "armor"
  },
  "quiltedfur-partial": {
    key: "quiltedfur-partial",
    type: "armor"
  }
};
// (await (await game.packs.get("arm5e-compendia.equipment")).getDocuments()).map(e => {return   [e.system.indexKey] : { type: e.folder.name} ;})
