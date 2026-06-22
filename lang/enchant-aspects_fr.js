export const ASPECTS = {
  agate: {
    name: "Agate",
    src: "ArM5",
    page: "173",
    effects: {
      air: { name: "Air", bonus: 3, index: "air" },
      "protection-from-storms": {
        name: "Protection contre les tempêtes",
        bonus: 5,
        index: "protection-contre-les-tempetes"
      },
      "protection-from-venom": { name: "Protection contre les venins", bonus: 7, index: "protection-contre-les-venins" }
    },
    index: "agate"
  },
  aquamarine: {
    name: "Aigue-Marine",
    src: "ArM5",
    page: "173",
    effects: { water: { name: "Eau", bonus: 3, index: "eau" } },
    index: "aigue-marine"
  },
  magnet: {
    name: "Aimant",
    src: "TMRE",
    page: "33",
    effects: {
      rego: { name: "Rego", bonus: 2, index: "rego" },
      "rego-corpus": { name: "Rego corpus", bonus: 4, index: "rego-corpus" },
      "rego-terram": { name: "Rego terram", bonus: 4, index: "rego-terram" }
    },
    index: "aimant"
  },
  alabaster: {
    name: "Albâtre",
    src: "HoH:MC",
    page: "172",
    effects: {
      forgiving: { name: "Oublier", bonus: 2, index: "oublier" },
      "mental-acuity": { name: "Acuité mental", bonus: 4, index: "acuite-mental" }
    },
    index: "albatre"
  },
  alexandrite: {
    name: "Alexandrite",
    src: "HoH:MC",
    page: "172",
    effects: {
      regeneration: { name: "Régénération", bonus: 2, index: "regeneration" },
      "long-life": { name: "Longévité", bonus: 3, index: "longevite" },
      horses: { name: "Chevaux", bonus: 5, index: "chevaux" }
    },
    index: "alexandrite"
  },
  aloe: {
    name: "Aloès",
    src: "TMRE",
    page: "33",
    effects: { friendship: { name: "Amitié", bonus: 3, index: "amitie" } },
    index: "aloes"
  },
  amber: {
    name: "Ambre",
    src: "HoH:TL",
    page: "163",
    effects: {
      "controlling-movement": { name: "Controller les mouvements", bonus: 3, index: "controller-les-mouvements" },
      corpus: { name: "Corpus", bonus: 3, index: "corpus" }
    },
    index: "ambre"
  },
  amethyst: {
    name: "Améthyste",
    src: "HoH:MC",
    page: "173",
    effects: {
      hearing: { name: "Ouïe", bonus: 2, index: "ouie" },
      "wealth-and-mercantile": { name: "Richesse et commerce", bonus: 2, index: "richesse-et-commerce" },
      dreams: { name: "Rêves", bonus: 3, index: "reves" },
      poisons: { name: "Poisons", bonus: 3, index: "poisons" },
      "versus-poison": { name: "Contre les poisons", bonus: 3, index: "contre-les-poisons" },
      temperance: { name: "Tempérance", bonus: 4, index: "temperance" },
      drunkenness: { name: "Ivresse", bonus: 7, index: "ivresse" },
      "versus-drunkenness": { name: "Contre l'ivresse", bonus: 7, index: "contre-livresse" }
    },
    index: "amethyste"
  },
  "violet-amethyst": {
    name: "Améthyste violette",
    src: "ArM5",
    page: "173",
    effects: {
      "ascendancy-over-masses": { name: "Ascendant sur les masses", bonus: 4, index: "ascendant-sur-les-masses" },
      "versus-drunkenness": { name: "Contre l'ivresse", bonus: 7, index: "contre-livresse" }
    },
    index: "amethyste-violette"
  },
  phylactery: {
    name: "Amulette (Phylactère)",
    src: "RoP:I",
    page: "123",
    effects: { "protect-wearer": { name: "Protection du porteur", bonus: 5, index: "protection-du-porteur" } },
    index: "amulette-phylactere"
  },
  "amulet-bearing-the-sigils-of-angels": {
    name: "Amulette avec le sceau des anges",
    src: "RoP:I",
    page: "123",
    effects: {
      "banish-demons": { name: "Banir les démons", bonus: 7, index: "banir-les-demons" },
      "ward-against-demons": { name: "Protection contre les démons", bonus: 7, index: "protection-contre-les-demons" }
    },
    index: "amulette-avec-le-sceau-des-anges"
  },
  anchor: {
    name: "Ancre",
    src: "HP",
    page: "66",
    effects: { "prevent-movement": { name: "Empêcher le mouvement", bonus: 3, index: "empecher-le-mouvement" } },
    index: "ancre"
  },
  ring: {
    name: "Anneau",
    src: "ArM5",
    page: "173",
    effects: { "constant-effect": { name: "Effet constant", bonus: 2, index: "effet-constant" } },
    index: "anneau"
  },
  bow: {
    name: "Arc",
    src: "ArM5",
    page: "173",
    effects: {
      "destroy-things-at-a-distance": {
        name: "Détruire les choses à distance",
        bonus: 5,
        index: "detruire-les-choses-a-distance"
      }
    },
    index: "arc"
  },
  silver: {
    name: "Argent",
    src: "TMRE",
    page: "33",
    effects: {
      terram: { name: "Terram", bonus: 1, index: "terram" },
      intellego: { name: "Intellego", bonus: 2, index: "intellego" },
      "protect-spirits": { name: "Protection contre les esprits", bonus: 3, index: "protection-contre-les-esprits" },
      "lycanthropes-in-general": { name: "Lycanthropie en général", bonus: 5, index: "lycanthropie-en-general" },
      "harm-lycanthropes": { name: "Blesser les lycanthropes", bonus: 10, index: "blesser-les-lycanthropes" }
    },
    index: "argent"
  },
  "fired-clay": {
    name: "Argile cuite",
    src: "ArM5",
    page: "173",
    effects: {
      "contain-or-protect-from-fire": {
        name: "Contenir ou protéger du feu",
        bonus: 4,
        index: "contenir-ou-proteger-du-feu"
      }
    },
    index: "argile-cuite"
  },
  "armillary-sphere": {
    name: "Armillary Sphere",
    src: "TMRE",
    page: "52",
    effects: {
      "display-the-heavens-celestial-time": {
        name: "Observer le ciel, donner le temps celeste",
        bonus: 5,
        index: "observer-le-ciel-donner-le-temps-celeste"
      }
    },
    index: "armillary-sphere"
  },
  armor: {
    name: "Armure",
    src: "ArM5",
    page: "173",
    effects: { "protect-wearer": { name: "Protection du porteur", bonus: 7, index: "protection-du-porteur" } },
    index: "armure"
  },
  astrolabe: {
    name: "Astrolabe",
    src: "TMRE",
    page: "33",
    effects: {
      astrology: { name: "Astrologie", bonus: 5, index: "astrologie" },
      "measure-the-stars-and-heavens-astrology-navigation": {
        name: "Mesurer les étoiles du ciel, astrologie, navigation",
        bonus: 5,
        index: "mesurer-les-etoiles-du-ciel-astrologie-navigation"
      }
    },
    index: "astrolabe"
  },
  hearth: {
    name: "Âtre",
    src: "ArM5",
    page: "173",
    effects: {
      "destroy-things-within": {
        name: "Détruire des choses à l'intérieur",
        bonus: 5,
        index: "detruire-des-choses-a-linterieur"
      },
      "create-fire-and-heat": { name: "Créer le feu et la chaleur", bonus: 7, index: "creer-le-feu-et-la-chaleur" }
    },
    index: "atre"
  },
  auger: {
    name: "Auger (vrille à bois)",
    src: "HoH:MC",
    page: "172",
    effects: {
      "puncture-wood": { name: "Façonner le bois", bonus: 2, index: "faconner-le-bois" },
      "shape-wood": { name: "Percer le bois", bonus: 2, index: "percer-le-bois" }
    },
    index: "auger-vrille-a-bois"
  },
  scales: {
    name: "Balance",
    src: "HoH:MC",
    page: "172",
    effects: {
      "weighing-goods-and-money": { name: "Peser les biens et l'argent", bonus: 3, index: "peser-les-biens-et-largent" }
    },
    index: "balance"
  },
  bandage: {
    name: "Bandage",
    src: "ArM5",
    page: "173",
    effects: { "healing-wounds": { name: "Soigner les blessures", bonus: 4, index: "soigner-les-blessures" } },
    index: "bandage"
  },
  basalt: {
    name: "Basalte",
    src: "HoH:MC",
    page: "173",
    effects: { ignem: { name: "Ignem", bonus: 3, index: "ignem" }, perdo: { name: "Perdo", bonus: 3, index: "perdo" } },
    index: "basalte"
  },
  boat: {
    name: "Bateau (petite embarcation)",
    src: "HP",
    page: "66",
    effects: { sailing: { name: "Naviguer", bonus: 3, index: "naviguer" } },
    index: "bateau-petite-embarcation"
  },
  wandstaff: {
    name: "Bâton/Baguette",
    src: "ArM5",
    page: "173",
    effects: {
      "repel-things": { name: "Repousser les choses", bonus: 2, index: "repousser-les-choses" },
      "project-bolt-or-other-missile": {
        name: "Projeter des carreaux ou autres projectiles",
        bonus: 3,
        index: "projeter-des-carreaux-ou-autres-projectiles"
      },
      "control-things-at-a-distance": {
        name: "Contrôle à distance des choses",
        bonus: 4,
        index: "controle-a-distance-des-choses"
      },
      "destroy-things-at-a-distance": {
        name: "Destruction des choses à distance",
        bonus: 4,
        index: "destruction-des-choses-a-distance"
      }
    },
    index: "batonbaguette"
  },
  spade: {
    name: "Bêche/Pelle",
    src: "HoH:MC",
    page: "172",
    effects: {
      "move-earth": { name: "Déplacer la terre", bonus: 2, index: "deplacer-la-terre" },
      "move-or-destroy-earth": {
        name: "Déplacer ou détruire la terre",
        bonus: 4,
        index: "deplacer-ou-detruire-la-terre"
      }
    },
    index: "bechepelle"
  },
  beryl: {
    name: "Béryl",
    src: "ArM5",
    page: "173",
    effects: { water: { name: "Eau", bonus: 3, index: "eau" } },
    index: "beryl"
  },
  "jewelry-clothing": {
    name: "Bijou/Vêtement",
    src: "ArM5",
    page: "173",
    effects: {
      "move-self": { name: "Se déplacer", bonus: 2, index: "se-deplacer" },
      "protect-self": { name: "Se protéger", bonus: 4, index: "se-proteger" },
      "transform-self": { name: "Se transformer", bonus: 4, index: "se-transformer" }
    },
    index: "bijouvetement"
  },
  almond: {
    name: "Bois d'amandier",
    src: "HoH:MC",
    page: "137",
    effects: { "creo-herbam": { name: "Creo herbam", bonus: 3, index: "creo-herbam" } },
    index: "bois-damandier"
  },
  hawthorn: {
    name: "Bois d'aubépine",
    src: "GotF",
    page: "33",
    effects: { wards: { name: "Protection", bonus: 3, index: "protection" } },
    index: "bois-daubepine"
  },
  alder: {
    name: "Bois d'Aulne",
    src: "GotF",
    page: "33",
    effects: {
      "resist-decay": { name: "Resistance à la décomposition", bonus: 1, index: "resistance-a-la-decomposition" },
      royalty: { name: "Royauté", bonus: 2, index: "royaute" }
    },
    index: "bois-daulne"
  },
  yew: {
    name: "Bois d'if",
    src: "GotF",
    page: "33",
    effects: {
      corpses: { name: "Cadavres", bonus: 2, index: "cadavres" },
      visions: { name: "Visions", bonus: 2, index: "visions" }
    },
    index: "bois-dif"
  },
  orange: {
    name: "Bois d'oranger",
    src: "HoH:MC",
    page: "137",
    effects: { sight: { name: "Vue", bonus: 5, index: "vue" } },
    index: "bois-doranger"
  },
  elm: {
    name: "Bois d'orme",
    src: "GotF",
    page: "33",
    effects: { "death-and-decay": { name: "Mort et décomposition", bonus: 2, index: "mort-et-decomposition" } },
    index: "bois-dorme"
  },
  birch: {
    name: "Bois de bouleau",
    src: "GotF",
    page: "33",
    effects: {
      creo: { name: "Creo", bonus: 1, index: "creo" },
      childbirth: { name: "Naissance des enfants", bonus: 3, index: "naissance-des-enfants" }
    },
    index: "bois-de-bouleau"
  },
  hickory: {
    name: "Bois de caryer",
    src: "HoH:MC",
    page: "137",
    effects: {
      majesty: { name: "Majesté", bonus: 2, index: "majeste" },
      ignem: { name: "Ignem", bonus: 4, index: "ignem" }
    },
    index: "bois-de-caryer"
  },
  "cedar-tree": {
    name: "Bois de cèdre",
    src: "HoH:MC",
    page: "137",
    effects: {
      "binding-spirits": { name: "Lier les esprits", bonus: 2, index: "lier-les-esprits" },
      "any-effect-with-mentem-and-herbam-requisites": {
        name: "Tout effet avec un complément Herbam ou Mentem",
        bonus: 5,
        index: "tout-effet-avec-un-complement-herbam-ou-mentem"
      }
    },
    index: "bois-de-cedre"
  },
  cherry: {
    name: "Bois de cerisier",
    src: "HoH:MC",
    page: "137",
    effects: { bloodshed: { name: "Massacre", bonus: 4, index: "massacre" } },
    index: "bois-de-cerisier"
  },
  hornbeam: {
    name: "Bois de charme",
    src: "HoH:MC",
    page: "137",
    effects: {
      strength: { name: "Force", bonus: 6, index: "force" },
      "vim-on-hostile-magic": { name: "Vim contre la magie hostile", bonus: 6, index: "vim-contre-la-magie-hostile" }
    },
    index: "bois-de-charme"
  },
  chestnut: {
    name: "bois de chataigner",
    src: "HoH:MC",
    page: "137",
    effects: {
      justice: { name: "Justice", bonus: 3, index: "justice" },
      honesty: { name: "Honnêteté", bonus: 4, index: "honnetete" }
    },
    index: "bois-de-chataigner"
  },
  oak: {
    name: "Bois de chêne",
    src: "ArM5",
    page: "173",
    effects: {
      "protection-from-storms": {
        name: "Protection contre les tempêtes",
        bonus: 7,
        index: "protection-contre-les-tempetes"
      }
    },
    index: "bois-de-chene"
  },
  lemon: {
    name: "Bois de citronnier",
    src: "HoH:MC",
    page: "137",
    effects: { hearing: { name: "Ouïe", bonus: 5, index: "ouie" } },
    index: "bois-de-citronnier"
  },
  dogwood: {
    name: "Bois de cornouiller",
    src: "HoH:MC",
    page: "137",
    effects: { pixies: { name: "Êtres féériques", bonus: 5, index: "etres-feeriques" } },
    index: "bois-de-cornouiller"
  },
  "cypress-tree": {
    name: "Bois de cyprès",
    src: "HoH:MC",
    page: "137",
    effects: {
      necromancy: { name: "Nécromancie", bonus: 3, index: "necromancie" },
      spirits: { name: "Esprits", bonus: 3, index: "esprits" }
    },
    index: "bois-de-cypres"
  },
  fig: {
    name: "Bois de figuier",
    src: "HoH:MC",
    page: "137",
    effects: {
      gambling: { name: "Jeux de hasard", bonus: 3, index: "jeux-de-hasard" },
      "sex-magic": { name: "Magie sexuelle", bonus: 3, index: "magie-sexuelle" }
    },
    index: "bois-de-figuier"
  },
  "ash-tree": {
    name: "Bois de frêne",
    src: "GotF",
    page: "33",
    effects: { "harm-people": { name: "Blesser des gens", bonus: 2, index: "blesser-des-gens" } },
    index: "bois-de-frene"
  },
  beech: {
    name: "Bois de hêtre",
    src: "GotF",
    page: "33",
    effects: { knowledge: { name: "Connaissance", bonus: 3, index: "connaissance" } },
    index: "bois-de-hetre"
  },
  holly: {
    name: "Bois de houx",
    src: "GotF",
    page: "33",
    effects: {
      "inflict-pain": { name: "Infliger la douleur", bonus: 2, index: "infliger-la-douleur" },
      "inflict-wounds": { name: "Infliger des blessures", bonus: 2, index: "infliger-des-blessures" }
    },
    index: "bois-de-houx"
  },
  lilac: {
    name: "Bois de lilas",
    src: "HoH:MC",
    page: "137",
    effects: { travel: { name: "Voyager", bonus: 2, index: "voyager" } },
    index: "bois-de-lilas"
  },
  hazel: {
    name: "Bois de noisetier",
    src: "GotF",
    page: "33",
    effects: {
      "good-judgment": { name: "Bon jugement", bonus: 1, index: "bon-jugement" },
      divination: { name: "Divination", bonus: 3, index: "divination" }
    },
    index: "bois-de-noisetier"
  },
  walnut: {
    name: "Bois de noyer",
    src: "HoH:MC",
    page: "137",
    effects: { mind: { name: "Esprit", bonus: 4, index: "esprit" } },
    index: "bois-de-noyer"
  },
  palm: {
    name: "Bois de palmier",
    src: "HoH:MC",
    page: "137",
    effects: { "animating-wood": { name: "Animer le bois", bonus: 3, index: "animer-le-bois" } },
    index: "bois-de-palmier"
  },
  "poplar-white": {
    name: "Bois de peuplier blanc",
    src: "HoH:MC",
    page: "137",
    effects: { divination: { name: "Divination", bonus: 3, index: "divination" } },
    index: "bois-de-peuplier-blanc"
  },
  pine: {
    name: "Bois de pin",
    src: "GotF",
    page: "33",
    effects: {
      "friendly-faeries": { name: "Êtres féériques amicaux", bonus: 1, index: "etres-feeriques-amicaux" },
      light: { name: "Lumière", bonus: 3, index: "lumiere" }
    },
    index: "bois-de-pin"
  },
  apple: {
    name: "Bois de pommier",
    src: "GotF",
    page: "33",
    effects: {
      corpus: { name: "Corpus", bonus: 1, index: "corpus" },
      longevity: { name: "Longévité", bonus: 1, index: "longevite" }
    },
    index: "bois-de-pommier"
  },
  blackthorn: {
    name: "Bois de prunellier",
    src: "HoH:MC",
    page: "137",
    effects: {
      "dark-fey": { name: "Être féériques sombres", bonus: 2, index: "etre-feeriques-sombres" },
      guardians: { name: "Gardiens", bonus: 6, index: "gardiens" }
    },
    index: "bois-de-prunellier"
  },
  plum: {
    name: "Bois de prunier",
    src: "HoH:MC",
    page: "137",
    effects: { blood: { name: "Sang", bonus: 2, index: "sang" } },
    index: "bois-de-prunier"
  },
  "yellow-sandalwood": {
    name: "Bois de santal jaune",
    src: "TMRE",
    page: "33",
    effects: { "binding-people": { name: "Lier les gens", bonus: 3, index: "lier-les-gens" } },
    index: "bois-de-santal-jaune"
  },
  fir: {
    name: "Bois de sapin",
    src: "GotF",
    page: "33",
    effects: {
      "malicious-faeries": { name: "Êtres féériques malicieux", bonus: 1, index: "etres-feeriques-malicieux" },
      darkness: { name: "Ténèbre", bonus: 3, index: "tenebre" }
    },
    index: "bois-de-sapin"
  },
  willow: {
    name: "Bois de saule",
    src: "GotF",
    page: "33",
    effects: {
      "cure-wounds": { name: "Soigner les blessures", bonus: 1, index: "soigner-les-blessures" },
      "restore-limb": { name: "Restaurer un membre", bonus: 4, index: "restaurer-un-membre" }
    },
    index: "bois-de-saule"
  },
  rowan: {
    name: "Bois de sorbier",
    src: "GotF",
    page: "33",
    effects: {
      vim: { name: "Vim", bonus: 1, index: "vim" },
      "protection-against-malicious-magic": {
        name: "Protection contre la magie maligne",
        bonus: 4,
        index: "protection-contre-la-magie-maligne"
      }
    },
    index: "bois-de-sorbier"
  },
  elder: {
    name: "Bois de sureau",
    src: "GotF",
    page: "33",
    effects: {
      vim: { name: "Vim", bonus: 1, index: "vim" },
      "malicious-magic": { name: "Magie malicieuse", bonus: 4, index: "magie-malicieuse" }
    },
    index: "bois-de-sureau"
  },
  linden: {
    name: "Bois de tilleul",
    src: "GotF",
    page: "33",
    effects: {
      "good-fortune": { name: "Bonne fortune", bonus: 1, index: "bonne-fortune" },
      "protection-against-weapons": {
        name: "Protection contre les armes",
        bonus: 2,
        index: "protection-contre-les-armes"
      }
    },
    index: "bois-de-tilleul"
  },
  aspen: {
    name: "Bois de tremble",
    src: "GotF",
    page: "33",
    effects: {
      "cure-disease": { name: "Soigner les maladies", bonus: 2, index: "soigner-les-maladies" },
      "cure-fever": { name: "Soigner la fièvre", bonus: 5, index: "soigner-la-fievre" }
    },
    index: "bois-de-tremble"
  },
  "tree-struck-by-lightning": {
    name: "Bois foudroyé",
    src: "HoH:MC",
    page: "172",
    effects: { auram: { name: "Auram", bonus: 2, index: "auram" } },
    index: "bois-foudroye"
  },
  "wood-dead": {
    name: "Bois mort",
    src: "ArM5",
    page: "173",
    effects: {
      "living-wood-bonus-to-affect": { name: "Affecter le bois vivant", bonus: 3, index: "affecter-le-bois-vivant" },
      "dead-wood-bonus-to-affect": { name: "Affecter le bois mort", bonus: 4, index: "affecter-le-bois-mort" }
    },
    index: "bois-mort"
  },
  "tree-twisted-in-a-field": {
    name: "Bois tordu dans un champ",
    src: "HoH:MC",
    page: "172",
    effects: {
      disguise: { name: "Déguiser", bonus: 3, index: "deguiser" },
      disfigure: { name: "Défiguration", bonus: 4, index: "defiguration" }
    },
    index: "bois-tordu-dans-un-champ"
  },
  boots: {
    name: "Bottes",
    src: "ArM5",
    page: "173",
    effects: { "walking-bonus-to-affect": { name: "Affecter la marche", bonus: 5, index: "affecter-la-marche" } },
    index: "bottes"
  },
  earring: {
    name: "Boucle d'oreille",
    src: "ArM5",
    page: "173",
    effects: { "hearing-bonus-to-affect": { name: "Affecter l'ouïe", bonus: 5, index: "affecter-louie" } },
    index: "boucle-doreille"
  },
  shield: {
    name: "Bouclier",
    src: "ArM5",
    page: "173",
    effects: { protection: { name: "Protection", bonus: 5, index: "protection" } },
    index: "bouclier"
  },
  "candle-made-of-goat-fat": {
    name: "Bougie à la graisse de bouc",
    src: "RoP:I",
    page: "123",
    effects: { "summon-demons": { name: "Invocation démons", bonus: 3, index: "invocation-demons" } },
    index: "bougie-a-la-graisse-de-bouc"
  },
  "candle-black": {
    name: "Bougie noire",
    src: "RoP:I",
    page: "123",
    effects: { "summon-demons": { name: "Invocation démons", bonus: 2, index: "invocation-demons" } },
    index: "bougie-noire"
  },
  bronze: {
    name: "Bronze",
    src: "HoH:MC",
    page: "173",
    effects: {
      terram: { name: "Terram", bonus: 3, index: "terram" },
      darkness: { name: "Ténèbres", bonus: 5, index: "tenebres" }
    },
    index: "bronze"
  },
  chalice: {
    name: "Calice",
    src: "ArM5",
    page: "173",
    effects: {
      "detect-poison-within": {
        name: "Détecter du poison contenu dedans",
        bonus: 4,
        index: "detecter-du-poison-contenu-dedans"
      },
      "transform-or-create-liquid-within": {
        name: "Transformer ou créer un liquide dedans",
        bonus: 5,
        index: "transformer-ou-creer-un-liquide-dedans"
      }
    },
    index: "calice"
  },
  cinnamon: {
    name: "Cannelle",
    src: "TMRE",
    page: "33",
    effects: {
      "destroying-ghosts": { name: "Destroying ghosts", bonus: 2, index: "destroying-ghosts" },
      imaginem: { name: "Imaginem", bonus: 4, index: "imaginem" }
    },
    index: "cannelle"
  },
  cloak: {
    name: "Cape",
    src: "ArM5",
    page: "173",
    effects: {
      flight: { name: "Vol", bonus: 3, index: "vol" },
      "transform-wearer": { name: "Transformer le porteur", bonus: 4, index: "transformer-le-porteur" },
      "altersuppress-wearers-image": {
        name: "Modifier ou supprimer l'image du porteur",
        bonus: 5,
        index: "modifier-ou-supprimer-limage-du-porteur"
      }
    },
    index: "cape"
  },
  "belt-or-girdle": {
    name: "Ceinture ou Gaine",
    src: "ArM5",
    page: "173",
    effects: { "strength-bonus-to-affect": { name: "Affecter la force", bonus: 3, index: "affecter-la-force" } },
    index: "ceinture-ou-gaine"
  },
  "ash-burned-material": {
    name: "Cendres (matériel brûlé)",
    src: "HP",
    page: "26",
    effects: {
      "burning-things": { name: "Brûler des choses", bonus: 2, index: "bruler-des-choses" },
      ignem: { name: "Ignem", bonus: 2, index: "ignem" },
      "things-that-have-been-burned-bonus-to-affect": {
        name: "Bonus pour affecter des choses qui ont été brûlé",
        bonus: 5,
        index: "bonus-pour-affecter-des-choses-qui-ont-ete-brule"
      }
    },
    index: "cendres-materiel-brule"
  },
  shackles: {
    name: "Chaîne",
    src: "ArM5",
    page: "173",
    effects: {
      "restraint-or-magical-binding": {
        name: "Entrave ou contrainte magique",
        bonus: 6,
        index: "entrave-ou-contrainte-magique"
      }
    },
    index: "chaine"
  },
  hat: {
    name: "Chapeau",
    src: "ArM5",
    page: "173",
    effects: {
      "image-of-self-bonus-to-affect": { name: "Affecter l'image de soi", bonus: 4, index: "affecter-limage-de-soi" }
    },
    index: "chapeau"
  },
  cinnabar: {
    name: "Cinabre",
    src: "HoH:MC",
    page: "173",
    effects: {
      "long-life": { name: "Longévité", bonus: 3, index: "longevite" },
      language: { name: "Langage", bonus: 4, index: "langage" },
      wealth: { name: "Richesse", bonus: 4, index: "richesse" },
      dragons: { name: "Dragons", bonus: 5, index: "dragons" }
    },
    index: "cinabre"
  },
  snip: {
    name: "Cisaille",
    src: "HoH:MC",
    page: "172",
    effects: { "shape-metal": { name: "Façonner le métal", bonus: 2, index: "faconner-le-metal" } },
    index: "cisaille"
  },
  "cloth-shears": {
    name: "Ciseaux à étoffe",
    src: "HoH:MC",
    page: "172",
    effects: { "shaping-fabrics": { name: "Tailler le tissu", bonus: 2, index: "tailler-le-tissu" } },
    index: "ciseaux-a-etoffe"
  },
  "mason-chisel": {
    name: "Ciseaux de maçon",
    src: "HoH:MC",
    page: "172",
    effects: { "shape-stone": { name: "Façonner la pierre", bonus: 2, index: "faconner-la-pierre" } },
    index: "ciseaux-de-macon"
  },
  "shearing-shears": {
    name: "Ciseaux de tonte",
    src: "HoH:MC",
    page: "172",
    effects: { fleecing: { name: "Tondre", bonus: 2, index: "tondre" } },
    index: "ciseaux-de-tonte"
  },
  bell: {
    name: "Cloche",
    src: "ArM5",
    page: "173",
    effects: { warning: { name: "Avertir", bonus: 5, index: "avertir" } },
    index: "cloche"
  },
  collar: {
    name: "Col de vêtement",
    src: "ArM5",
    page: "173",
    effects: { "control-wearer": { name: "Contrôle du porteur", bonus: 6, index: "controle-du-porteur" } },
    index: "col-de-vetement"
  },
  necklace: {
    name: "Collier",
    src: "ArM5",
    page: "173",
    effects: {
      "breathing-and-speaking-bonus-to-affect": {
        name: "Affecter la respiration et la parole",
        bonus: 4,
        index: "affecter-la-respiration-et-la-parole"
      }
    },
    index: "collier"
  },
  dividers: {
    name: "Compas",
    src: "HoH:MC",
    page: "172",
    effects: { measuring: { name: "Mesurer", bonus: 2, index: "mesurer" } },
    index: "compas"
  },
  "sea-shell": {
    name: "Coquillage marin",
    src: "ArM5",
    page: "173",
    effects: {
      "the-sea": { name: "Mer", bonus: 2, index: "mer" },
      "sea-creatures": { name: "Créatures marines", bonus: 3, index: "creatures-marines" }
    },
    index: "coquillage-marin"
  },
  "clam-shell": {
    name: "Coquille de palourde",
    src: "ArM5",
    page: "173",
    effects: { protection: { name: "Protection", bonus: 2, index: "protection" } },
    index: "coquille-de-palourde"
  },
  "coral-red": {
    name: "Corail rouge",
    src: "ArM5",
    page: "173",
    effects: { "versus-demons": { name: "Contre les démons", bonus: 10, index: "contre-les-demons" } },
    index: "corail-rouge"
  },
  "rope-or-cord": {
    name: "Corde",
    src: "ArM5",
    page: "173",
    effects: {
      strangulation: { name: "Strangulation", bonus: 2, index: "strangulation" },
      "restraint-or-binding": { name: "Contraindre ou entraver", bonus: 4, index: "contraindre-ou-entraver" }
    },
    index: "corde"
  },
  cleaver: {
    name: "Couperet",
    src: "HoH:MC",
    page: "172",
    effects: {
      butchery: { name: "Boucherie", bonus: 2, index: "boucherie" },
      "perdo-animal": { name: "Perdo animal", bonus: 3, index: "perdo-animal" }
    },
    index: "couperet"
  },
  crown: {
    name: "Couronne",
    src: "ArM5",
    page: "173",
    effects: {
      wisdom: { name: "Sagesse", bonus: 2, index: "sagesse" },
      "control-people": { name: "Contrôle des gens", bonus: 3, index: "controle-des-gens" },
      "gain-respect-authority": {
        name: "Gagner du respect ou de l'autorité",
        bonus: 5,
        index: "gagner-du-respect-ou-de-lautorite"
      }
    },
    index: "couronne"
  },
  "chalk-blue": {
    name: "Craie bleue",
    src: "RoP:I",
    page: "123",
    effects: {
      "wards-against-demons": { name: "Protection contre les démons", bonus: 2, index: "protection-contre-les-demons" }
    },
    index: "craie-bleue"
  },
  "rat-skull": {
    name: "Crâne de rat",
    src: "ArM5",
    page: "173",
    effects: { "cause-disease": { name: "Provoquer des maladies", bonus: 3, index: "provoquer-des-maladies" } },
    index: "crane-de-rat"
  },
  "human-skull": {
    name: "Crâne humain",
    src: "ArM5",
    page: "173",
    effects: {
      "destroy-human-body": { name: "Détruire le corp humain", bonus: 4, index: "detruire-le-corp-humain" },
      "destroy-human-mind": { name: "Détruire l'esprit humain", bonus: 5, index: "detruire-lesprit-humain" },
      "destroy-or-control-ghosts": {
        name: "Détruire ou contrôler les fantômes",
        bonus: 5,
        index: "detruire-ou-controler-les-fantomes"
      },
      "destroy-or-control-ghost-of-particular-skull": {
        name: "Détruire ou contrôler le fantôme d'un crâne donné",
        bonus: 10,
        index: "detruire-ou-controler-le-fantome-dun-crane-donne"
      }
    },
    index: "crane-humain"
  },
  "lions-mane": {
    name: "Crinière de lion",
    src: "ArM5",
    page: "173",
    effects: {
      courage: { name: "Courage", bonus: 5, index: "courage" },
      pride: { name: "Fierté", bonus: 5, index: "fierte" },
      strength: { name: "Force", bonus: 5, index: "force" }
    },
    index: "criniere-de-lion"
  },
  crystal: {
    name: "Cristal",
    src: "ArM5",
    page: "173",
    effects: { "water-related-effect": { name: "Effets liés à l'eau", bonus: 5, index: "effets-lies-a-leau" } },
    index: "cristal"
  },
  "rock-crystal": {
    name: "Cristal de roche",
    src: "ArM5",
    page: "173",
    effects: {
      healing: { name: "Soins", bonus: 3, index: "soins" },
      ice: { name: "Glace", bonus: 3, index: "glace" },
      clarity: { name: "Clarté", bonus: 4, index: "clarte" },
      clairvoyance: { name: "Clairvoyance", bonus: 5, index: "clairvoyance" }
    },
    index: "cristal-de-roche"
  },
  cross: {
    name: "Croix",
    src: "RoP:I",
    page: "123",
    effects: {
      "banish-demons": { name: "Bannir les démons", bonus: 5, index: "bannir-les-demons" },
      "cause-damage-to-infernal-creatures": {
        name: "Causer des dommages aux créatures infernales",
        bonus: 5,
        index: "causer-des-dommages-aux-creatures-infernales"
      },
      "ward-away-supernatural": {
        name: "Protection contre le surnaturel",
        bonus: 5,
        index: "protection-contre-le-surnaturel"
      }
    },
    index: "croix"
  },
  copper: {
    name: "Cuivre",
    src: "TMRE",
    page: "33",
    effects: {
      passion: { name: "Passion", bonus: 2, index: "passion" },
      "sex-magic": { name: "Magie sexuelle", bonus: 2, index: "magie-sexuelle" },
      bloodshed: { name: "Effusion de sang", bonus: 3, index: "effusion-de-sang" },
      deftness: { name: "Habilité", bonus: 4, index: "habilite" },
      "effects-that-changet-own-shape": {
        name: "Effets qui change sa propre forme",
        bonus: 4,
        index: "effets-qui-change-sa-propre-forme"
      }
    },
    index: "cuivre"
  },
  "dagger-knife": {
    name: "Dague / Couteau",
    src: "ArM5",
    page: "173",
    effects: {
      "precise-destruction": { name: "Destruction précise", bonus: 2, index: "destruction-precise" },
      "betrayal-assassination": { name: "Traîtrise, Assassinat", bonus: 3, index: "traitrise-assassinat" },
      poisoning: { name: "Empoisonnement", bonus: 3, index: "empoisonnement" }
    },
    index: "dague-couteau"
  },
  diamond: {
    name: "Diamant",
    src: "ArM5",
    page: "173",
    effects: { "versus-demons": { name: "Contre les démons", bonus: 5, index: "contre-les-demons" } },
    index: "diamant"
  },
  down: {
    name: "Duvet",
    src: "ArM5",
    page: "173",
    effects: { silence: { name: "Silence", bonus: 3, index: "silence" } },
    index: "duvet"
  },
  electrum: {
    name: "Electrum",
    src: "HoH:MC",
    page: "173",
    effects: {
      deception: { name: "Tromperie", bonus: 3, index: "tromperie" },
      scrying: { name: "Cristallomancie", bonus: 3, index: "cristallomancie" },
      "muto-terram": { name: "Muto terram", bonus: 4, index: "muto-terram" }
    },
    index: "electrum"
  },
  emerald: {
    name: "Emeraude",
    src: "TMRE",
    page: "33",
    effects: {
      calm: { name: "Calmer", bonus: 2, index: "calmer" },
      "incite-love-or-passion": {
        name: "Susciter l'amour ou la passion",
        bonus: 4,
        index: "susciter-lamour-ou-la-passion"
      },
      "snakes-and-dragon-kind": { name: "Les serpents et les dragons", bonus: 7, index: "les-serpents-et-les-dragons" }
    },
    index: "emeraude"
  },
  "ink-of-hermes": {
    name: "Encre hermétique",
    src: "TMRE",
    page: "33",
    effects: { vim: { name: "Vim", bonus: 3, index: "vim" }, books: { name: "Livres", bonus: 5, index: "livres" } },
    index: "encre-hermetique"
  },
  "iron-shackles": {
    name: "Entraves en fer",
    src: "ArM5",
    page: "173",
    effects: { "bind-faeries": { name: "Emprisonner les fées", bonus: 8, index: "emprisonner-les-fees" } },
    index: "entraves-en-fer"
  },
  sword: {
    name: "Epée",
    src: "ArM5",
    page: "173",
    effects: {
      "block-single-attack": { name: "Bloquer une unique attaque", bonus: 3, index: "bloquer-une-unique-attaque" },
      "harm-human-and-animal-bodies": {
        name: "Blesser les corps humains et animaux",
        bonus: 4,
        index: "blesser-les-corps-humains-et-animaux"
      }
    },
    index: "epee"
  },
  tin: {
    name: "Etain",
    src: "TMRE",
    page: "33",
    effects: {
      law: { name: "Loi", bonus: 1, index: "loi" },
      weakness: { name: "Faiblesse", bonus: 3, index: "faiblesse" }
    },
    index: "etain"
  },
  fan: {
    name: "Eventail",
    src: "ArM5",
    page: "173",
    effects: {
      "banish-weather-phenomena": {
        name: "Elimination des perturbations météorologiques",
        bonus: 4,
        index: "elimination-des-perturbations-meteorologiques"
      },
      "create-or-control-winds": {
        name: "Création et contrôle des vents",
        bonus: 4,
        index: "creation-et-controle-des-vents"
      }
    },
    index: "eventail"
  },
  sickle: {
    name: "Faucille",
    src: "HoH:MC",
    page: "172",
    effects: { harvesting: { name: "Moissonner", bonus: 2, index: "moissonner" } },
    index: "faucille"
  },
  scythe: {
    name: "Faux",
    src: "HoH:MC",
    page: "172",
    effects: {
      reaping: { name: "Moissonner", bonus: 3, index: "moissonner" },
      "year-duration-effects": { name: "Effet à durée annuelle", bonus: 3, index: "effet-a-duree-annuelle" },
      "effects-expressly-causing-death": {
        name: "Effets causant rapidement la mort",
        bonus: 4,
        index: "effets-causant-rapidement-la-mort"
      }
    },
    index: "faux"
  },
  vent: {
    name: "Fente",
    src: "HP",
    page: "26",
    effects: {
      "air-passing-through-it-bonus-to-affect": {
        name: "Affecter l'air qui passe au travers",
        bonus: 7,
        index: "affecter-lair-qui-passe-au-travers"
      }
    },
    index: "fente"
  },
  iron: {
    name: "Fer",
    src: "TMRE",
    page: "33",
    effects: {
      bonds: { name: "Liens", bonus: 3, index: "liens" },
      "harm-or-repel-faeries": {
        name: "Blesser ou repousser les êtres féériques",
        bonus: 7,
        index: "blesser-ou-repousser-les-etres-feeriques"
      }
    },
    index: "fer"
  },
  horseshoe: {
    name: "Fer à cheval",
    src: "ArM5",
    page: "173",
    effects: {
      warding: { name: "Protection", bonus: 2, index: "protection" },
      "horses-movement-bonus-to-affect": {
        name: "Affecter les mouvements des chevaux",
        bonus: 6,
        index: "affecter-les-mouvements-des-chevaux"
      }
    },
    index: "fer-a-cheval"
  },
  "doum-palm-leaf": {
    name: "Feuille de palmier",
    src: "AnM",
    page: "116",
    effects: {
      "controling-instincts-and-base-emotions": {
        name: "Contrôler l'instinct et les émotions de base",
        bonus: 3,
        index: "controler-linstinct-et-les-emotions-de-base"
      }
    },
    index: "feuille-de-palmier"
  },
  net: {
    name: "Filet",
    src: "ArM5",
    page: "173",
    effects: { immobilization: { name: "Immobilisation", bonus: 5, index: "immobilisation" } },
    index: "filet"
  },
  flail: {
    name: "Fléau à grain",
    src: "HoH:MC",
    page: "172",
    effects: { "harvesting-grain": { name: "Récolter le grain", bonus: 3, index: "recolter-le-grain" } },
    index: "fleau-a-grain"
  },
  arrow: {
    name: "Flèche",
    src: "ArM5",
    page: "173",
    effects: {
      aiming: { name: "Visée", bonus: 2, index: "visee" },
      direction: { name: "Direction", bonus: 3, index: "direction" }
    },
    index: "fleche"
  },
  panpipes: {
    name: "Flûte de pan",
    src: "ArM5",
    page: "173",
    effects: {
      "emotion-bonus-to-affect": { name: "Affecter les émotions", bonus: 3, index: "affecter-les-emotions" },
      "control-children": { name: "Contrôler les enfants", bonus: 5, index: "controler-les-enfants" },
      revelry: { name: "Festivités", bonus: 5, index: "festivites" },
      "faerie-emotions-bonus-to-affect": {
        name: "Affecter les émotions des êtres féériques",
        bonus: 6,
        index: "affecter-les-emotions-des-etres-feeriques"
      }
    },
    index: "flute-de-pan"
  },
  whip: {
    name: "Fouet",
    src: "ArM5",
    page: "173",
    effects: {
      "control-human-or-animal-body": {
        name: "Contrôle des corps humains ou animals",
        bonus: 4,
        index: "controle-des-corps-humains-ou-animals"
      },
      "induce-fear-in-animals": { name: "Faire peur aux animaux", bonus: 5, index: "faire-peur-aux-animaux" }
    },
    index: "fouet"
  },
  "pitch-fork": {
    name: "Fourche",
    src: "HoH:MC",
    page: "172",
    effects: {
      "gathering-reaped-grain": {
        name: "Rassembler les grains récoltés",
        bonus: 2,
        index: "rassembler-les-grains-recoltes"
      }
    },
    index: "fourche"
  },
  frankincense: {
    name: "Frankincense",
    src: "TMRE",
    page: "33",
    effects: {
      dreams: { name: "Rêves", bonus: 3, index: "reves" },
      "perdo-vim": { name: "Perdo vim", bonus: 3, index: "perdo-vim" },
      "cleanse-a-place-of-infernal-influence": {
        name: "Purifier un lieu d'influence infernale",
        bonus: 4,
        index: "purifier-un-lieu-dinfluence-infernale"
      },
      medicine: { name: "Médicine", bonus: 3, index: "medicine" },
      "promote-life": { name: "Promouvoir la vie", bonus: 5, index: "promouvoir-la-vie" }
    },
    index: "frankincense"
  },
  glove: {
    name: "Gant",
    src: "ArM5",
    page: "173",
    effects: {
      "manipulate-at-a-distance": { name: "Manipulation à distance", bonus: 4, index: "manipulation-a-distance" },
      "things-by-touch-bonus-to-affect": {
        name: "Affecter les choses au toucher",
        bonus: 4,
        index: "affecter-les-choses-au-toucher"
      }
    },
    index: "gant"
  },
  granite: {
    name: "Granite",
    src: "HoH:MC",
    page: "173",
    effects: {
      wealth: { name: "Richesse", bonus: 2, index: "richesse" },
      terram: { name: "Terram", bonus: 3, index: "terram" }
    },
    index: "granite"
  },
  garnet: {
    name: "Grenat",
    src: "HoH:MC",
    page: "173",
    effects: {
      navigation: { name: "Navigation", bonus: 2, index: "navigation" },
      "strengthen-body-and-mind": {
        name: "Renforcer le corps et l'esprit",
        bonus: 2,
        index: "renforcer-le-corps-et-lesprit"
      },
      vigor: { name: "Vigueur", bonus: 2, index: "vigueur" },
      "bonds-of-commitment": { name: "Liens d'engagement", bonus: 3, index: "liens-dengagement" },
      "repel-insects": { name: "Repousser les insectes", bonus: 4, index: "repousser-les-insectes" }
    },
    index: "grenat"
  },
  axe: {
    name: "Hache",
    src: "ArM5",
    page: "173",
    effects: { "destroy-wood": { name: "Destruction du bois", bonus: 4, index: "destruction-du-bois" } },
    index: "hache"
  },
  hatchet: {
    name: "Hachette",
    src: "HoH:MC",
    page: "172",
    effects: { "destroy-wood": { name: "Détruire le bois", bonus: 4, index: "detruire-le-bois" } },
    index: "hachette"
  },
  "haoma-in-potion": {
    name: "Haoma  (en potion)",
    src: "C&C",
    page: "91",
    effects: {
      "health-of-fertility-promote": {
        name: "Promouvoir la bonne fécondité",
        bonus: 3,
        index: "promouvoir-la-bonne-fecondite"
      },
      "percieve-invisible-spirit": {
        name: "Percevoir les esprits invisible",
        bonus: 3,
        index: "percevoir-les-esprits-invisible"
      },
      "longevity-promote": { name: "Favoriser la longévité", bonus: 5, index: "favoriser-la-longevite" }
    },
    index: "haoma-en-potion"
  },
  helmet: {
    name: "Heaume",
    src: "ArM5",
    page: "173",
    effects: {
      "wearers-mindemotions-bonus-to-affect": {
        name: "Affecter l'esprit et les émotions du porteur",
        bonus: 4,
        index: "affecter-lesprit-et-les-emotions-du-porteur"
      },
      "wearers-sight-bonus-to-affect": {
        name: "Affecter la vue du porteur",
        bonus: 6,
        index: "affecter-la-vue-du-porteur"
      }
    },
    index: "heaume"
  },
  bloodstone: {
    name: "Hématite",
    src: "ArM5",
    page: "173",
    effects: { "blood-and-wounds": { name: "Sang et blessures", bonus: 4, index: "sang-et-blessures" } },
    index: "hematite"
  },
  adze: {
    name: "Herminette",
    src: "HoH:MC",
    page: "172",
    effects: {
      "beautify-wood-structures": {
        name: "Embellir une structure en bois",
        bonus: 2,
        index: "embellir-une-structure-en-bois"
      }
    },
    index: "herminette"
  },
  ivory: {
    name: "Ivoire",
    src: "HoH:MC",
    page: "173",
    effects: { "healing-wounds": { name: "Guérir", bonus: 5, index: "guerir" } },
    index: "ivoire"
  },
  hyacinth: {
    name: "Jacinthe",
    src: "ArM5",
    page: "173",
    effects: { "healing-wounds": { name: "Soins", bonus: 2, index: "soins" } },
    index: "jacinthe"
  },
  jade: {
    name: "Jade",
    src: "ArM5",
    page: "110",
    effects: { aquam: { name: "Aquam", bonus: 4, index: "aquam" } },
    index: "jade"
  },
  jet: {
    name: "Jais",
    src: "ArM5",
    page: "173",
    effects: {
      protection: { name: "Protection", bonus: 2, index: "protection" },
      darkness: { name: "Obscurité", bonus: 3, index: "obscurite" }
    },
    index: "jais"
  },
  jasper: {
    name: "Jaspe",
    src: "ArM5",
    page: "173",
    effects: {
      "healing-wounds": { name: "Soins", bonus: 2, index: "soins" },
      "versus-demons": { name: "Contre les démons", bonus: 2, index: "contre-les-demons" }
    },
    index: "jaspe"
  },
  toy: {
    name: "Jouet",
    src: "ArM5",
    page: "173",
    effects: { "control-children": { name: "Contrôle des enfants", bonus: 4, index: "controle-des-enfants" } },
    index: "jouet"
  },
  yoke: {
    name: "Joug",
    src: "ArM5",
    page: "173",
    effects: {
      "control-wearer": { name: "Contrôle du porteur", bonus: 4, index: "controle-du-porteur" },
      "enhance-strength-of-wearer": {
        name: "Augmenter la force du porteur",
        bonus: 5,
        index: "augmenter-la-force-du-porteur"
      }
    },
    index: "joug"
  },
  brass: {
    name: "Laiton",
    src: "HoH:MC",
    page: "173",
    effects: {
      ignem: { name: "Ignem", bonus: 3, index: "ignem" },
      music: { name: "Musique", bonus: 3, index: "musique" },
      "demons-devils-and-angels": { name: "Démons, diables et anges", bonus: 4, index: "demons-diables-et-anges" }
    },
    index: "laiton"
  },
  "sharp-blade": {
    name: "Lame affûtée",
    src: "HoH:MC",
    page: "172",
    effects: { "shape-leather": { name: "Façonner le cuir", bonus: 2, index: "faconner-le-cuir" } },
    index: "lame-affutee"
  },
  lamp: {
    name: "Lampe",
    src: "ArM5",
    page: "173",
    effects: {
      "create-fire": { name: "Création de feu", bonus: 4, index: "creation-de-feu" },
      "produce-light": { name: "Production de lumière", bonus: 7, index: "production-de-lumiere" }
    },
    index: "lampe"
  },
  "snake-tongue": {
    name: "Langue de serpent",
    src: "ArM5",
    page: "173",
    effects: {
      deception: { name: "Tromperie", bonus: 3, index: "tromperie" },
      lying: { name: "Mensonge", bonus: 6, index: "mensonge" }
    },
    index: "langue-de-serpent"
  },
  "lapis-lazuli": {
    name: "Lapis Lazuli",
    src: "C&C",
    page: "176",
    effects: {
      "keep-limbs-healthy": {
        name: "Garder les membres en bonne santé",
        bonus: 5,
        index: "garder-les-membres-en-bonne-sante"
      },
      "cure-boils-and-ulcers": {
        name: "Soins des furoncles et des ulcères",
        bonus: 5,
        index: "soins-des-furoncles-et-des-ulceres"
      },
      "obsession-power-of-demons": {
        name: "Obsession pour le pouvoir des démons",
        bonus: 6,
        index: "obsession-pour-le-pouvoir-des-demons"
      }
    },
    index: "lapis-lazuli"
  },
  "lapis-lazuli-powder": {
    name: "Lapis Lazuli (poudre)",
    src: "C&C",
    page: "176",
    effects: { aphrodisiac: { name: "Aphrodisiaque", bonus: 3, index: "aphrodisiaque" } },
    index: "lapis-lazuli-poudre"
  },
  crowbar: {
    name: "Levier",
    src: "HoH:MC",
    page: "172",
    effects: { "moving-stone": { name: "Déplacer de la pierre", bonus: 2, index: "deplacer-de-la-pierre" } },
    index: "levier"
  },
  bed: {
    name: "Lit",
    src: "ArM5",
    page: "173",
    effects: {
      "sleep-and-dreams-bonus-to-affect": {
        name: "Affecter les rêves ou le sommeil",
        bonus: 6,
        index: "affecter-les-reves-ou-le-sommeil"
      }
    },
    index: "lit"
  },
  book: {
    name: "Livre",
    src: "TMRE",
    page: "92",
    effects: {
      intellego: { name: "Intellego", bonus: 2, index: "intellego" },
      divination: { name: "Divination", bonus: 3, index: "divination" },
      numerology: { name: "Numérologie", bonus: 4, index: "numerologie" }
    },
    index: "livre"
  },
  lyre: {
    name: "Lyre",
    src: "ArM5",
    page: "173",
    effects: {
      "create-sounds": { name: "Créer des sons", bonus: 3, index: "creer-des-sons" },
      "music-bonus-to-affect": { name: "Affecter la musique", bonus: 5, index: "affecter-la-musique" }
    },
    index: "lyre"
  },
  magnetite: {
    name: "Magnétite",
    src: "ArM5",
    page: "173",
    effects: { animal: { name: "Animal", bonus: 3, index: "animal" } },
    index: "magnetite"
  },
  mallet: {
    name: "Maillet",
    src: "HoH:MC",
    page: "172",
    effects: { precision: { name: "Précision", bonus: 2, index: "precision" } },
    index: "maillet"
  },
  marble: {
    name: "Marbre",
    src: "HoH:MC",
    page: "173",
    effects: {
      beauty: { name: "Beauté", bonus: 3, index: "beaute" },
      cold: { name: "Froid", bonus: 3, index: "froid" },
      wards: { name: "Protection", bonus: 5, index: "protection" }
    },
    index: "marbre"
  },
  mask: {
    name: "Masque",
    src: "ArM5",
    page: "173",
    effects: {
      "wearers-sight-bonus-to-affect": {
        name: "Affecter la vue du porteur",
        bonus: 2,
        index: "affecter-la-vue-du-porteur"
      },
      "wearers-breathing-bonus-to-affect": {
        name: "Affecter la respiration du porteur",
        bonus: 2,
        index: "affecter-la-respiration-du-porteur"
      },
      hiding: { name: "Cacher", bonus: 3, index: "cacher" },
      disguise: { name: "Déguisement", bonus: 7, index: "deguisement" }
    },
    index: "masque"
  },
  mast: {
    name: "Mât",
    src: "HP",
    page: "66",
    effects: {
      "protection-from-temptation": {
        name: "Protection contre la tentation",
        bonus: 2,
        index: "protection-contre-la-tentation"
      }
    },
    index: "mat"
  },
  manacles: {
    name: "Menottes",
    src: "HoH:MC",
    page: "172",
    effects: { binding: { name: "Lier", bonus: 4, index: "lier" } },
    index: "menottes"
  },
  mercury: {
    name: "Mercure (Vif argent)",
    src: "HoH:MC",
    page: "173",
    effects: {
      aquam: { name: "Aquam", bonus: 3, index: "aquam" },
      "arts-and-sciences": { name: "Arts et sciences", bonus: 3, index: "arts-et-sciences" },
      terram: { name: "Terram", bonus: 3, index: "terram" },
      muto: { name: "Muto", bonus: 5, index: "muto" }
    },
    index: "mercure-vif-argent"
  },
  "pure-honey": {
    name: "Miel pur",
    src: "AnM",
    page: "116",
    effects: {
      presevation: { name: "Préservation", bonus: 2, index: "preservation" },
      "spiritual-travel": { name: "Voyage spirituel", bonus: 5, index: "voyage-spirituel" }
    },
    index: "miel-pur"
  },
  mirror: {
    name: "Miroir",
    src: "HoH:TL",
    page: "163",
    effects: {
      "summon-or-bind-ghosts": { name: "Conjurer/Lier des fantômes", bonus: 3, index: "conjurerlier-des-fantomes" },
      "see-the-truth": { name: "Voir la vérité", bonus: 5, index: "voir-la-verite" },
      "display-images": { name: "Afficher des images", bonus: 6, index: "afficher-des-images" },
      illusions: { name: "Illusions", bonus: 7, index: "illusions" }
    },
    index: "miroir"
  },
  myrrh: {
    name: "Myrrhe",
    src: "C&C",
    page: "117",
    effects: {
      "sanctify-bonus-to": { name: "Bonus à la sanctification", bonus: 2, index: "bonus-a-la-sanctification" },
      spirits: { name: "Esprits", bonus: 3, index: "esprits" },
      "relieve-arthritis-or-inflammation": {
        name: "Soulager l'arthrite ou l'inflammation",
        bonus: 3,
        index: "soulager-larthrite-ou-linflammation"
      },
      preservation: { name: "Préservation", bonus: 5, index: "preservation" }
    },
    index: "myrrhe"
  },
  "artifacts-from-pompeii-and-herculani": {
    name: "Objets provenant de Pompéi et d'Herculanum",
    src: "HP",
    page: "26",
    effects: { volcanos: { name: "Volcans", bonus: 3, index: "volcans" } },
    index: "objets-provenant-de-pompei-et-dherculanum"
  },
  obsidian: {
    name: "Obsidienne",
    src: "ArM5",
    page: "173",
    effects: { darkness: { name: "Ténèbres", bonus: 5, index: "tenebres" } },
    index: "obsidienne"
  },
  "cats-eye": {
    name: "Oeil de chat",
    src: "ArM5",
    page: "173",
    effects: {
      "versus-malign-corpus": {
        name: "Contre les sorts de Corpus néfaste",
        bonus: 3,
        index: "contre-les-sorts-de-corpus-nefaste"
      }
    },
    index: "oeil-de-chat"
  },
  onyx: {
    name: "Onyx",
    src: "ArM5",
    page: "173",
    effects: {
      darkness: { name: "Ténèbres", bonus: 4, index: "tenebres" },
      death: { name: "Mort", bonus: 4, index: "mort" }
    },
    index: "onyx"
  },
  opal: {
    name: "Opale",
    src: "HoH:TL",
    page: "163",
    effects: {
      images: { name: "Images", bonus: 2, index: "images" },
      imagination: { name: "Imagination", bonus: 2, index: "imagination" },
      invisibility: { name: "Invisibilité", bonus: 2, index: "invisibilite" },
      memory: { name: "Mémoire", bonus: 4, index: "memoire" },
      travel: { name: "Voyager", bonus: 4, index: "voyager" },
      eyes: { name: "Yeux", bonus: 6, index: "yeux" }
    },
    index: "opale"
  },
  gold: {
    name: "Or",
    src: "TMRE",
    page: "33",
    effects: {
      health: { name: "Santé", bonus: 2, index: "sante" },
      "induce-greed": { name: "Susciter l'avidité", bonus: 4, index: "susciter-lavidite" },
      nobility: { name: "Noblesse", bonus: 4, index: "noblesse" },
      peace: { name: "Paix", bonus: 4, index: "paix" },
      "wealth-bonus-to-affect": { name: "Affecter la richesse", bonus: 4, index: "affecter-la-richesse" }
    },
    index: "or"
  },
  "red-gold": {
    name: "Or rouge",
    src: "TMRE",
    page: "33",
    effects: { perdo: { name: "Perdo", bonus: 1, index: "perdo" }, war: { name: "Guerre", bonus: 4, index: "guerre" } },
    index: "or-rouge"
  },
  "animal-bone": {
    name: "Os d'animal",
    src: "ArM5",
    page: "173",
    effects: {
      "harm-or-destroy-animals": {
        name: "Blesser ou détruire les animaux",
        bonus: 4,
        index: "blesser-ou-detruire-les-animaux"
      }
    },
    index: "os-danimal"
  },
  "human-bone": {
    name: "Os humain",
    src: "ArM5",
    page: "173",
    effects: {
      "destroy-human-mind": { name: "Détruire l'esprit humain", bonus: 3, index: "detruire-lesprit-humain" },
      "destroy-human-body": { name: "Détruire le corps humain", bonus: 4, index: "detruire-le-corps-humain" }
    },
    index: "os-humain"
  },
  waterskin: {
    name: "Outre",
    src: "ArM5",
    page: "173",
    effects: {
      "create-liquid-within": { name: "Création d'un contenu liquide", bonus: 5, index: "creation-dun-contenu-liquide" }
    },
    index: "outre"
  },
  basket: {
    name: "Panier",
    src: "HoH:MC",
    page: "172",
    effects: {
      "collect-and-preserve-items": {
        name: "Collecter et conserver des objets",
        bonus: 2,
        index: "collecter-et-conserver-des-objets"
      },
      "create-things-within": {
        name: "Création de choses à l'intérieur",
        bonus: 3,
        index: "creation-de-choses-a-linterieur"
      },
      "preserve-contents": { name: "Conservation du contenu", bonus: 4, index: "conservation-du-contenu" },
      "create-food-within": {
        name: "Création de nourriture à l'intérieur",
        bonus: 5,
        index: "creation-de-nourriture-a-linterieur"
      }
    },
    index: "panier"
  },
  "animal-hide": {
    name: "Peau animale",
    src: "ArM5",
    page: "173",
    effects: {
      "turn-into-appropriate-animal": {
        name: "prendre la forme de l'animal approprié",
        bonus: 7,
        index: "prendre-la-forme-de-lanimal-approprie"
      }
    },
    index: "peau-animale"
  },
  comb: {
    name: "Peigne",
    src: "ArM5",
    page: "173",
    effects: {
      beauty: { name: "Beauté", bonus: 5, index: "beaute" },
      "hair-bonus-to-affect": { name: "Affecter la coiffure", bonus: 7, index: "affecter-la-coiffure" }
    },
    index: "peigne"
  },
  peridot: {
    name: "Péridot",
    src: "TMRE",
    page: "33",
    effects: {
      "protection-against-nightmares": {
        name: "Protection contre les cauchemars",
        bonus: 3,
        index: "protection-contre-les-cauchemars"
      }
    },
    index: "peridot"
  },
  pearl: {
    name: "Perle",
    src: "ArM5",
    page: "173",
    effects: {
      "detect-of-eliminate-poisons": {
        name: "Detection/Eliminination des poisons",
        bonus: 5,
        index: "detectioneliminination-des-poisons"
      }
    },
    index: "perle"
  },
  "small-hammer": {
    name: "Petit marteau",
    src: "HoH:MC",
    page: "172",
    effects: { building: { name: "Construire", bonus: 2, index: "construire" } },
    index: "petit-marteau"
  },
  pick: {
    name: "Pic",
    src: "ArM5",
    page: "173",
    effects: { "destroy-stone": { name: "Destruction de la pierre", bonus: 4, index: "destruction-de-la-pierre" } },
    index: "pic"
  },
  coin: {
    name: "Pièce de monnaie",
    src: "ArM5",
    page: "173",
    effects: {
      "induce-greed": { name: "Susciter l'avidité", bonus: 4, index: "susciter-lavidite" },
      "wealth-and-mercantile": { name: "Richesse et commerce", bonus: 4, index: "richesse-et-commerce" }
    },
    index: "piece-de-monnaie"
  },
  tongs: {
    name: "Pince coupante",
    src: "HoH:MC",
    page: "172",
    effects: { "controlling-metal": { name: "Contrôler le métal", bonus: 2, index: "controler-le-metal" } },
    index: "pince-coupante"
  },
  floor: {
    name: "Plancher",
    src: "ArM5",
    page: "173",
    effects: {
      "movement-across-bonus-to-affect": {
        name: "Affecter les déplacements à travers",
        bonus: 7,
        index: "affecter-les-deplacements-a-travers"
      }
    },
    index: "plancher"
  },
  platinum: {
    name: "Platine",
    src: "HoH:MC",
    page: "173",
    effects: { air: { name: "Air", bonus: 4, index: "air" } },
    index: "platine"
  },
  lead: {
    name: "Plomb",
    src: "TMRE",
    page: "33",
    effects: {
      hatred: { name: "Haine", bonus: 3, index: "haine" },
      "summon-or-bind-spirits": { name: "Invoquer/Lier des esprits", bonus: 3, index: "invoquerlier-des-esprits" },
      "summoning-or-binding-ghosts": { name: "Invoquer/Lier fantômes", bonus: 3, index: "invoquerlier-fantomes" },
      wards: { name: "Garder", bonus: 4, index: "garder" }
    },
    index: "plomb"
  },
  "pin-feather": {
    name: "Plume",
    src: "ArM5",
    page: "173",
    effects: { auram: { name: "Auram", bonus: 2, index: "auram" }, flight: { name: "Vol", bonus: 5, index: "vol" } },
    index: "plume"
  },
  quill: {
    name: "Plume d'oie",
    src: "ArM5",
    page: "173",
    effects: { scribing: { name: "Ecriture", bonus: 7, index: "ecriture" } },
    index: "plume-doie"
  },
  pepper: {
    name: "Poivre",
    src: "TMRE",
    page: "33",
    effects: { perdo: { name: "Perdo", bonus: 2, index: "perdo" } },
    index: "poivre"
  },
  hall: {
    name: "Porche",
    src: "ArM5",
    page: "173",
    effects: {
      "magical-transportation": { name: "Transports magique", bonus: 3, index: "transports-magique" },
      "movement-through-bonus-to-affect": {
        name: "Affecter les déplacements au travers",
        bonus: 6,
        index: "affecter-les-deplacements-au-travers"
      }
    },
    index: "porche"
  },
  door: {
    name: "Porte",
    src: "ArM5",
    page: "173",
    effects: { warding: { name: "Garder", bonus: 5, index: "garder" } },
    index: "porte"
  },
  "kohl-powder": {
    name: "Poudre de Khôl",
    src: "C&C",
    page: "107",
    effects: { "vision-to-affect": { name: "Affecter la vision", bonus: 3, index: "affecter-la-vision" } },
    index: "poudre-de-khol"
  },
  quartz: {
    name: "Quartz",
    src: "ArM5",
    page: "173",
    effects: { invisibility: { name: "Invisibilité", bonus: 5, index: "invisibilite" } },
    index: "quartz"
  },
  cinquefoil: {
    name: "Quintefeuille (Fleur)",
    src: "TMRE",
    page: "33",
    effects: {
      "making-amends": { name: "Se racheter", bonus: 2, index: "se-racheter" },
      "drive-away-demons": { name: "Chasser/éconduire les démons", bonus: 3, index: "chassereconduire-les-demons" },
      "resist-poison": { name: "Résister aux poisons", bonus: 4, index: "resister-aux-poisons" }
    },
    index: "quintefeuille-fleur"
  },
  oar: {
    name: "Rame",
    src: "ArM5",
    page: "173",
    effects: {
      "currents-bonus-to-affect": { name: "Affecter les courants", bonus: 4, index: "affecter-les-courants" }
    },
    index: "rame"
  },
  bookshelf: {
    name: "Rayonnage (Bibliothèque)",
    src: "ArM5",
    page: "173",
    effects: {
      "hide-things-within": {
        name: "Cacher les choses qui s'y trouvent",
        bonus: 3,
        index: "cacher-les-choses-qui-sy-trouvent"
      },
      "protect-things-within": {
        name: "Protéger les choses qui s'y trouvent",
        bonus: 4,
        index: "proteger-les-choses-qui-sy-trouvent"
      }
    },
    index: "rayonnage-bibliotheque"
  },
  container: {
    name: "Récipient",
    src: "ArM5",
    page: "173",
    effects: {
      "create-or-transform-within": {
        name: "Création ou transformation d'un contenu",
        bonus: 5,
        index: "creation-ou-transformation-dun-contenu"
      }
    },
    index: "recipient"
  },
  rhodocrosite: {
    name: "Rhodocrosite",
    src: "HoH:TL",
    page: "163",
    effects: {
      memories: { name: "Mémoires/Souvenirs", bonus: 2, index: "memoiressouvenirs" },
      "binding-wounds": { name: "Cicatriser les blessures", bonus: 3, index: "cicatriser-les-blessures" },
      forgetfulness: { name: "Oubli", bonus: 3, index: "oubli" }
    },
    index: "rhodocrosite"
  },
  "star-ruby": {
    name: "Rubis étoilé",
    src: "ArM5",
    page: "173",
    effects: {
      "conjurecontrol-occult-entities": {
        name: "Conjuration ou contrôle des entités occultes",
        bonus: 5,
        index: "conjuration-ou-controle-des-entites-occultes"
      }
    },
    index: "rubis-etoile"
  },
  ruby: {
    name: "Ruby",
    src: "TMRE",
    page: "33",
    effects: {
      courage: { name: "Courage", bonus: 2, index: "courage" },
      "battle-wounds": { name: "Blessures de combat", bonus: 3, index: "blessures-de-combat" },
      "blood-bonus-to-affect": { name: "Affecter le sang", bonus: 3, index: "affecter-le-sang" },
      "leadership-in-war": {
        name: "Commandement en temp de guerre",
        bonus: 4,
        index: "commandement-en-temp-de-guerre"
      },
      "fire-related-effect": { name: "Pouvoir liés au feu", bonus: 6, index: "pouvoir-lies-au-feu" }
    },
    index: "ruby"
  },
  hourglass: {
    name: "Sablier",
    src: "ArM5",
    page: "173",
    effects: {
      "increasing-speed": { name: "Augmenter la vitesse", bonus: 3, index: "augmenter-la-vitesse" },
      "timing-and-alarms": { name: "Chronométrage et alarmes", bonus: 7, index: "chronometrage-et-alarmes" }
    },
    index: "sablier"
  },
  bagsack: {
    name: "Sac/sacoche",
    src: "ArM5",
    page: "173",
    effects: {
      "moving-things-into-or-out-of": {
        name: "pour y mettre ou en enlever les choses",
        bonus: 3,
        index: "pour-y-mettre-ou-en-enlever-les-choses"
      },
      "trapping-things-within": { name: "pour emprisonner le contenu", bonus: 5, index: "pour-emprisonner-le-contenu" }
    },
    index: "sacsacoche"
  },
  saffron: {
    name: "Safran",
    src: "TMRE",
    page: "33",
    effects: { "physical-strength": { name: "Force physique", bonus: 4, index: "force-physique" } },
    index: "safran"
  },
  room: {
    name: "Salle",
    src: "ArM5",
    page: "173",
    effects: {
      "create-things-within": {
        name: "Création de salle à l'intérieur",
        bonus: 4,
        index: "creation-de-salle-a-linterieur"
      },
      "everything-within-at-once-bonus-to-affect": {
        name: "Affecter tout ce qu'y s'y trouve",
        bonus: 6,
        index: "affecter-tout-ce-quy-sy-trouve"
      }
    },
    index: "salle"
  },
  "lions-blood": {
    name: "Sang de lion",
    src: "TMRE",
    page: "33",
    effects: {
      leadership: { name: "Commandement", bonus: 2, index: "commandement" },
      courage: { name: "Courage", bonus: 3, index: "courage" },
      "protection-from-wild-beasts": {
        name: "Protection contre les bêtes sauvages",
        bonus: 4,
        index: "protection-contre-les-betes-sauvages"
      }
    },
    index: "sang-de-lion"
  },
  sapphire: {
    name: "Saphir",
    src: "ArM5",
    page: "173",
    effects: {
      knowledge: { name: "Connaissance", bonus: 2, index: "connaissance" },
      "perdo-vim-against-spirits": {
        name: "Perdo vim contre les esprits",
        bonus: 2,
        index: "perdo-vim-contre-les-esprits"
      },
      "versus-malign-corpus": {
        name: "Protection contre les sorts Corpus néfastes",
        bonus: 2,
        index: "protection-contre-les-sorts-corpus-nefastes"
      },
      healing: { name: "Soins", bonus: 3, index: "soins" },
      "reducing-anger": { name: "Réduire la colère", bonus: 3, index: "reduire-la-colere" }
    },
    index: "saphir"
  },
  sardonyx: {
    name: "Sardonyx",
    src: "ArM5",
    page: "173",
    effects: {
      "versus-malign-corpus": {
        name: "Protection contre les sorts Corpus néfastes",
        bonus: 2,
        index: "protection-contre-les-sorts-corpus-nefastes"
      }
    },
    index: "sardonyx"
  },
  "sun-scarab": {
    name: "Scarabée doré",
    src: "AnM",
    page: "116",
    effects: { "detect-magic": { name: "Détecter la magie", bonus: 4, index: "detecter-la-magie" } },
    index: "scarabee-dore"
  },
  handsaw: {
    name: "Scie à main",
    src: "HoH:MC",
    page: "172",
    effects: {
      "delicately-shape-wood": { name: "Façonner finement du bois", bonus: 3, index: "faconner-finement-du-bois" }
    },
    index: "scie-a-main"
  },
  "carving-of-behemoth": {
    name: "Sculpture de Béhémoth",
    src: "TMRE",
    page: "33",
    effects: { "great-size": { name: "Grande taille", bonus: 3, index: "grande-taille" } },
    index: "sculpture-de-behemoth"
  },
  "cappadocian-salt": {
    name: "Sel Capadocien",
    src: "AnM",
    page: "116",
    effects: { "purifying-effects": { name: "Effets purificateurs", bonus: 6, index: "effets-purificateurs" } },
    index: "sel-capadocien"
  },
  saddle: {
    name: "Selle",
    src: "ArM5",
    page: "173",
    effects: {
      "horse-bonus-to-affect": { name: "Affecter les chevaux", bonus: 4, index: "affecter-les-chevaux" },
      "riding-bonus-to-affect": { name: "Affecter l'équitation", bonus: 7, index: "affecter-lequitation" }
    },
    index: "selle"
  },
  serpentine: {
    name: "Serpentine",
    src: "ArM5",
    page: "173",
    effects: {
      "versus-infection-and-animal-poison": {
        name: "Contre les infections et les poisons animaux",
        bonus: 3,
        index: "contre-les-infections-et-les-poisons-animaux"
      }
    },
    index: "serpentine"
  },
  billhook: {
    name: "Serpette",
    src: "HoH:MC",
    page: "172",
    effects: { pruning: { name: "Tailler", bonus: 2, index: "tailler" } },
    index: "serpette"
  },
  doorway: {
    name: "Seuil",
    src: "ArM5",
    page: "173",
    effects: {
      "magical-transportation": { name: "Transport magique", bonus: 5, index: "transport-magique" },
      "magical-gates-and-portals": {
        name: "Portails et portes magiques",
        bonus: 7,
        index: "portails-et-portes-magiques"
      },
      "movement-through-bonus-to-affect": {
        name: "Affecter le mouvement au travers",
        bonus: 7,
        index: "affecter-le-mouvement-au-travers"
      }
    },
    index: "seuil"
  },
  bellows: {
    name: "Soufflet",
    src: "ArM5",
    page: "173",
    effects: {
      "create-wind": { name: "Création de vent", bonus: 4, index: "creation-de-vent" },
      "strengthen-fire": { name: "Attiser les feux", bonus: 5, index: "attiser-les-feux" }
    },
    index: "soufflet"
  },
  sulfur: {
    name: "Souffre",
    src: "HoH:MC",
    page: "173",
    effects: {
      "preserving-or-decaying": { name: "Préserver ou décomposer", bonus: 2, index: "preserver-ou-decomposer" },
      "sowing-discord": { name: "Semer la discorde", bonus: 2, index: "semer-la-discorde" },
      "binding-tongues": { name: "Lier les langues", bonus: 3, index: "lier-les-langues" },
      demons: { name: "Démons", bonus: 4, index: "demons" }
    },
    index: "souffre"
  },
  tablet: {
    name: "Tablette",
    src: "RoP:I",
    page: "123",
    effects: { "command-spirits": { name: "Commander aux esprits", bonus: 2, index: "commander-aux-esprits" } },
    index: "tablette"
  },
  drum: {
    name: "Tambour",
    src: "ArM5",
    page: "173",
    effects: {
      "cause-fear": { name: "Faire peur", bonus: 2, index: "faire-peur" },
      "create-storms-and-thunder": {
        name: "Création de tempêtes et de tonnerre",
        bonus: 3,
        index: "creation-de-tempetes-et-de-tonnerre"
      },
      deafening: { name: "Assourdir", bonus: 5, index: "assourdir" }
    },
    index: "tambour"
  },
  rug: {
    name: "Tapis",
    src: "ArM5",
    page: "173",
    effects: {
      "those-upon-it-bonus-to-affect": {
        name: "Affecter ceux qui s'y trouvent",
        bonus: 3,
        index: "affecter-ceux-qui-sy-trouvent"
      }
    },
    index: "tapis"
  },
  cask: {
    name: "Tonneau",
    src: "HoH:MC",
    page: "172",
    effects: { "induce-drunkenness": { name: "Provoquer l'ivresse", bonus: 3, index: "provoquer-livresse" } },
    index: "tonneau"
  },
  topaz: {
    name: "Topaze",
    src: "ArM5",
    page: "173",
    effects: {
      courage: { name: "Courage", bonus: 4, index: "courage" },
      leadership: { name: "Commandement", bonus: 4, index: "commandement" },
      pride: { name: "Fierté", bonus: 4, index: "fierte" },
      strength: { name: "Force", bonus: 4, index: "force" },
      "controlling-wild-beasts": { name: "Contrôle des bêtes sauvages", bonus: 5, index: "controle-des-betes-sauvages" }
    },
    index: "topaze"
  },
  trowel: {
    name: "Truelle",
    src: "HoH:MC",
    page: "172",
    effects: { building: { name: "Construire", bonus: 2, index: "construire" } },
    index: "truelle"
  },
  turquoise: {
    name: "Turquoise",
    src: "HoH:MC",
    page: "173",
    effects: { necromancy: { name: "Nécromancie", bonus: 4, index: "necromancie" } },
    index: "turquoise"
  },
  "green-turquoise": {
    name: "Turquoise verte",
    src: "ArM5",
    page: "173",
    effects: { necromancy: { name: "Nécromancie", bonus: 4, index: "necromancie" } },
    index: "turquoise-verte"
  },
  "glass-clear": {
    name: "Verre transparent",
    src: "HoH:MC",
    page: "173",
    effects: {
      invisibility: { name: "Invisibilité", bonus: 4, index: "invisibilite" },
      "seeing-through-something": {
        name: "Voir au travers de quelque chose",
        bonus: 5,
        index: "voir-au-travers-de-quelque-chose"
      }
    },
    index: "verre-transparent"
  },
  "ship-sail": {
    name: "Voile de bateau",
    src: "ArM5",
    page: "173",
    effects: {
      "winds-bonus-to-affect": { name: "Affecter les vents", bonus: 4, index: "affecter-les-vents" },
      sailing: { name: "Navigation", bonus: 7, index: "navigation" }
    },
    index: "voile-de-bateau"
  },
  volcano: {
    name: "Volcan",
    src: "HP",
    page: "26",
    effects: { volcanos: { name: "Volcans", bonus: 5, index: "volcans" } },
    index: "volcan"
  }
};
