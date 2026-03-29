# Active Effects

## Introduction

Active Effects are a powerful mechanism in Foundry VTT that modify document data dynamically from the state it is stored in the system. They allow for real-time modifications without permanently changing the underlying data.

### Key Concepts

- Active Effects can be added to **Items** or **Actors** directly
- Effects on Items can be configured to be transmitted to their owner (transfer property)
- In Ars Magica 5e, this mechanism is primarily used for:
  - **Virtues and Flaws** (most have preconfigured Active Effects in the compendia)
  - **Laboratory virtues and flaws**
  - **Covenant boons and hooks**
  - **Temporary effects** from spells and powers (in development)

### Important Notes

- Active effects can be **disabled temporarily** in the Effects tab without removing them
- Only the **GM** can enable/disable effects
- Effects are applied in a specific order based on their priority
- Multiple effects of the same type may combine or override depending on the Change Mode

## Configuring Active Effects

Active Effects are configured through two tabs in the item/actor sheet:

### Details Tab

The **Details** tab is only used for display purposes in the Actor's or Item's Effects tab. It shows the name, icon, and description of the effect.

### Effects Tab

The **Effects tab** is where active effects are configured and managed

### Effects Tab

The **Effects tab** is where active effects are configured and managed

![Active Effect Configuration](images/ActiveEffectConfig.webp)

#### Managing Effects

- Click the **plus sign** (+) to add a new effect to the list
- Click the **Perdo hand gesture** to destroy an effect
- Use the **cog icon** to access advanced options for certain effect types

#### Effect Parameters

Each effect has the following key parameters:

**Type**: The category of effect (see below for full list)

**Attribute**: The specific attribute or property being changed

**Change Mode**: Determines how the effect value is applied:

- **Add**: Adds the value to the attribute (use negative values to subtract)
- **Multiply**: Multiplies the attribute by a factor (use values < 1 to divide)
- **Override**: Replaces the existing attribute value completely
- **Upgrade**: Sets the value to the maximum between current and effect value
- **Downgrade**: Sets the value to the minimum between current and effect value
- **Custom**: Special handling by the system

**Effect value**: The numerical or boolean value to apply (some effect types may have predefined choices)

**Advanced Options** (cog icon): Some effects require additional information:

- Generic abilities need the specific ability option specified
- Optional roll bonuses need a label and condition description

---

## Effect Types Reference

The following sections describe all available Active Effect types in detail.

## Character Effects

### Null Effect

A placeholder effect with no actual impact. Used as a default when creating a new effect before selecting the proper type.

- **Use case**: Temporary placeholder
- **Change mode**: Custom
- **Value**: N/A

---

### Spellcasting

Effects that modify spellcasting mechanics and parameters.

#### Spellcasting Stances

Override the modifiers applied to casting totals for voice and gesture stances:

**Voice Stances:**

- **Loud**: +1 modifier (default)
- **Firm**: 0 modifier (default)
- **Quiet**: -5 modifier (requires Quiet Magic virtue)
- **Silent**: -10 modifier (requires Silent Magic virtue)

**Gesture Stances:**

- **Exaggerated**: +1 modifier
- **Bold**: 0 modifier (default)
- **Subtle**: -2 modifier (requires Subtle Magic virtue)
- **Motionless**: -5 modifier (requires Still Magic virtue)

**⚠️ Important**: Since these are override effects, having multiple of the same stance type will only apply the last one processed. Do not stack the same virtue multiple times.

#### Other Spellcasting Effects

- **Warping Threshold**: Overrides the warping score threshold (default: 2)
- **Spell Fatigue Threshold**: Changes how much below the target level the casting total needs to be to gain fatigue (default: 10)
- **Ritual Fatigue Cancelled**: Changes how many fatigue levels can be discarded when casting a ritual.

**Examples:**

- _Cyclic Magic_ virtue: Use optional roll bonuses
- _Mythic Blood_: Use "Spell Fatigue Threshold" and "Ritual Fatigue Cancelled"

---

### Realm Alignment

Sets the character's alignment to a specific supernatural realm. Characters aligned to a realm are affected by auras of that realm when using magic or powers.

**Available Realms:**

- **Magic**: Default for all Magi
- **Faerie**
- **Divine**
- **Infernal**

**Change Mode**: Override (sets alignment to true/false)

**⚠️ Note**: The Gift automatically aligns a character to the Magic realm. Multiple realm alignments are possible (though rare).

---

### Realm Susceptibility

Sets whether a character is susceptible to the negative effects of a realm's aura.

**Available Realms:**

- **Magic**
- **Faerie**
- **Divine**
- **Infernal**

**Change Mode**: Override
**Default**: Varies by character type

---

### Seasonal Activities

Modifies the source quality for long-term advancement activities. These effects directly impact experience point gains.

**Activity Types:**

- **Adventuring**: Base quality for adventure experience (default: 3 XP)
- **Practice**: Self-study quality (default: 3 XP)
- **Training**: Being trained by someone without a teacher (default: 5 XP)
- **Teaching**: Being taught in a formal lesson (default: 5 XP + teacher bonus)
- **Teacher**: Bonus the character provides when teaching others (default: 5)
- **Reading**: Book quality bonus
- **Reading Arts**: Bonus for reading Arts specifically
- **Writing**: Book quality bonus for authored books
- **Vis Study**: Quality for studying raw vis

**Examples:**

- _Good Teacher_ virtue: +3 to Teacher bonus
- _Book Learner_ virtue: +3 to Reading bonus
- _Study Bonus_ virtue: +3 to Practice bonus

---

### Arts

Flat bonus to a specific Hermetic Art score.

**Available Arts:**

- **Techniques**: Creo (Cr), Intellego (In), Muto (Mu), Perdo (Pe), Rego (Re)
- **Forms**: Animal (An), Aquam (Aq), Auram (Au), Corpus (Co), Herbam (He), Ignem (Ig), Imaginem (Im), Mentem (Me), Terram (Te), Vim (Vi)

**Change Mode**: Add
**Default**: +2 (standard for Puissant Art virtue)

**Examples:**

- _Puissant Vim_ virtue: +3 to Vim score
- _Special Circumstances_: +1 to specific Art under certain conditions

**⚠️ Dev Note**: This is a flat bonus to the Art score itself, not to casting totals or lab totals.

---

### Art Affinity

Multiplies the total experience points in a specific Art, effectively increasing the score.

**Available Arts**: All Techniques and Forms (same as above)

**Change Mode**: Multiply
**Default**: 1.5x (standard affinity multiplier)

**⚠️ Important Implementation Note**: For simplicity, the multiplier is applied to the **total XP pool**, not just XP gained after acquiring the affinity. This means:

- An affinity gained during Twilight will apply retroactively to all previous XP
- This is intentional to keep the system manageable
- The multiplication happens on the XP pool, then the score is recalculated

**Examples:**

- _Affinity with Ignem_: All Ignem XP × 1.5
- If a character has 50 XP in Ignem (score 7), with affinity this becomes 75 XP (score 8)

---

### Art Deficiency

Represents a severe limitation in an Art, halving both casting totals and laboratory totals involving that Art.

**Available Arts**: All Techniques and Forms

**Change Mode**: Custom (internally divides totals by 2)

**Important Rules:**

- Deficiencies in both a Technique and a Form are **cumulative** (totals divided by 4)
- Multiple deficiencies in only Forms or only Techniques are **not cumulative**
- This is an "exists" effect - the presence of the effect is what matters, not the value

**Examples:**

- _Deficient Technique (Creo)_: All Creo-related totals halved
- _Deficient Form (Corpus)_: All Corpus-related totals halved
- Both together for a Creo Corpus spell: Totals divided by 4

---

### Form Resistance

Natural resistance or vulnerability to magical effects of a specific Form. This appears as an additional field in Soak dialogs.

**Available Forms**: All 10 Forms

**Change Mode**: Add
**Default**: Can be positive (resistance) or negative (vulnerability)

**Examples:**

- _Magic Resistance (Ignem)_: +15 to soak against Ignem effects
- _Vulnerability to Fire_: -5 to soak against Ignem effects

---

### Form Magic Resistance

Bonus or penalty to Magic Resistance specifically against spells of a particular Form. Do not cummulate with Parma Magica

**Available Forms**: All 10 Forms, plus general "Magic Resistance"

**Change Mode**: Add

**Examples:**

- _Minor Magical Defenses_: +5 magic resistance
- _Piercing Magic_: Reduces target's magic resistance

---

### Spell Mastery

Modifies experience gain or score for all spell mastery abilities.

**Subtypes:**

- **XP Coefficient**: Multiplies all mastery XP (default: 2.0 for affinity)
- **XP Modifier**: Flat bonus to all mastery XP (default: 5)

**Examples:**

- _Mastery Path_ virtue: 1.5x multiplier to mastery XP
- _Special Circumstance_: +5 XP bonus to mastery study

---

### Vitals

Modifies core character vital statistics.

**Available Attributes:**

- **Size**: Character size (default: +1 for Large, -1 for Small Frame)
- **Soak**: Natural soak bonus (e.g., +3 for Tough virtue)
- **Age**: Direct modifier to age value (rarely used)
- **Aging**: Bonus to aging rolls (e.g., +1 per point of Faerie Blood)
- **Aging Start**: Offset when character starts making aging rolls (default: 35 years)
- **Recovery**: Bonus to recovery rolls
- **Might**: Modifier to creature Might score

**Examples:**

- _Large_ virtue: +1 Size
- _Tough_ virtue: +3 Soak
- _Faerie Blood_ virtue: Aging bonus based on score
- _Longevity Ritual_: Aging bonus based on Lab Total ÷ 10

---

### Characteristics

Flat modifier to one of the character's Characteristics.

**Available Characteristics:**

- Intelligence (Int), Perception (Per), Strength (Str), Stamina (Sta)
- Presence (Pre), Communication (Com), Dexterity (Dex), Quickness (Qik)
- Cunning (Cun) - for beasts

**Change Mode**: Add
**Default**: Varies by virtue/flaw

**⚠️ Important**: While an active effect is modifying a Characteristic, you cannot manually edit that Characteristic's value unless you disable/remove the effect first.

**Examples:**

- _Great Characteristic_ virtue: +1 to chosen characteristic at 3+
- _Poor Characteristic_ flaw: -1 to chosen characteristic at 3 or less

---

### Characteristic Boost

Similar to Characteristics, but uses Upgrade mode to set a minimum value.

**Change Mode**: Upgrade (takes maximum of current value and effect value)

**Use Cases:**

- Effects that temporarily boost characteristics
- Ensuring a minimum characteristic value

---

### Fatigue

Modifies fatigue-related mechanics.

**Available Modifiers:**

**Fatigue Penalties:**

- **Total**: Flat modifier to all fatigue penalties
- **Fatigue Rolls**: Bonus to rolls to avoid gaining fatigue
- **Winded Level**: Modifier to the penalty from Winded fatigue (-1 default)
- **Weary Level**: Modifier to the penalty from Weary fatigue (-3 default)
- **Tired Level**: Modifier to the penalty from Tired fatigue (-5 default)
- **Dazed Level**: Modifier to the penalty from Dazed fatigue (-10 default)

**Fatigue Capacity:**

- **Winded**: Number of Winded levels (see [[Actors#Vitals and Combat|Vitals and Combat]])
- **Weary**: Number of Weary levels
- **Tired**: Number of Tired levels
- **Dazed**: Number of Dazed levels

**Example:**

- _Extra Fatigue Level_: +1 to specific fatigue level, mostly used for creatures

---

### Wounds

Modifies wound penalties.

**Available Modifiers:**

- **Total**: Flat modifier to all wound penalties combined
- **Light**: Modifier to Light wound penalty (-1 default)
- **Medium**: Modifier to Medium wound penalty (-3 default)
- **Heavy**: Modifier to Heavy wound penalty (-5 default)

**Example:**

- _Enduring Constitution_ virtue: Reduce all wound penalties by 1

---

### Character Features

Special flags that enable or disable character features.

**Available Features:**

- **Magic System**: Enables Hermetic Magic system (Arts, spells, etc.)
- **Intelligent Beast**: Marks creature as intelligent

**Change Mode**: Override (boolean)

---

## Abilities Effects

### Ability Bonus (by category)

Flat bonus to specific ability scores. Available for all ability categories:

- **General Abilities** (Athletics, Awareness, Brawl, etc.)
- **Academic Abilities** (Artes Liberales, Civil & Canon Law, etc.)
- **Arcane Abilities** (Magic Theory, Parma Magica, Finesse, etc.)
- **Martial Abilities** (Single Weapon, Great Weapon, Bow, etc.)
- **Mystery Abilities** (House-specific abilities)
- **Supernatural Abilities** (Second Sight, Sense Holiness, etc.)
- **Alternate Arts** (Non-Hermetic magical traditions)

**Change Mode**: Add
**Default**: +2 (standard for Puissant Ability)

**For Generic Abilities**: Use the cog icon to specify the exact ability option. The option name must **exactly match** the option of the owned ability.

**Examples:**

- _Puissant Awareness_: +2 to Awareness
- _Puissant Area Lore (Rome)_: +2 to Area Lore, option must be "Rome"

---

### Ability XP Bonus (by category)

Flat experience bonus added to ability XP totals. Available for all ability categories (same as above).

**Change Mode**: Add
**Default**: +5 to +15 depending on virtue

**Use Cases:**

- Representing initial score from virtues (e.g., +15 XP for score 2)
- Bonus XP from training or special circumstances

---

### Ability Affinity (by category)

Multiplies total experience points in a specific ability. Available for all ability categories.

**Change Mode**: Multiply
**Default**: 1.5x (standard affinity)

**⚠️ Same Implementation Note as Arts**: The multiplier applies to the total XP pool retroactively.

**For Generic Abilities**: Use the cog icon to specify the exact ability option that must **exactly match** the owned ability's option.

**Examples:**

- _Affinity with Philosophiae_: All Philosophiae XP × 1.5
- _Affinity with Area Lore (Alps)_: That specific Area Lore XP × 1.5

---

### Quality Ability Boost

Uses upgrade mode to set a minimum quality for certain frequently-used abilities.

**Available Abilities:**

- Athletics, Awareness, Brawl, Hunt, Leadership, Music, Stealth, Survival, Swim

**Change Mode**: Upgrade
**Default**: +3 to +5

---

### Supernatural Ability XP Bonus

Special XP bonus for Supernatural Abilities, typically used to represent the initial score of 1 when the virtue is first taken (5 XP).

**Change Mode**: Add
**Default**: 5 (for score 1)

---

## Laboratory Effects

### Laboratory Activities

Flat modifiers to specific laboratory activities (for characters, not laboratories).

**Available Activities:**

- **Learn Spell**: Bonus to Lab Total when learning spells
- **Invent Spell**: Bonus to Lab Total when inventing spells
- **Item Investigation**: Bonus to Lab Total when investigating magic items
- **Vis Extraction**: Bonus to Lab Total when extracting vis
- **Enchanting**: Bonus to Lab Total when enchanting items
- **Longevity Rituals**: Bonus to Lab Total when creating a longevity ritual

**Change Mode**: Add
**Default**: Varies by virtue

**Examples:**

- _Inventive Genius_ virtue: +3 to Invent Spell and longevity rituals.
- _Fast Learner_: +3 to Learn Spell

---

### Laboratory (Attributes)

Modifies the physical attributes of a laboratory structure. Applied to **laboratory/sanctum documents**, not characters.

**Available Attributes:**

- **Size**: Laboratory size
- **General Quality**: Overall quality bonus
- **Safety**: Safety rating
- **Health**: Healthiness of environment
- **Refinement**: Level of refinement
- **Upkeep**: Yearly upkeep cost
- **Warping**: Warping effect on inhabitants
- **Aesthetics**: Aesthetic value
- **Aesthetics Cap**: Maximum aesthetic value (uses Downgrade mode)
- **Aura Modifier**: Bonus to aura strength in lab

**Change Mode**: Add (Downgrade for cap)
**Default**: Varies by virtue/flaw

**Examples:**

- _Spacious_ virtue: +1 Size
- _Missing Equipment_ flaw: -3 General Quality
- _Haunted_ flaw: +2 Warping

---

### Laboratory Speciality

Bonus to laboratory totals for specific Arts or activities. Applied to **laboratory documents**.

**Available Specialties:**

**Activity-based:**

- Texts, Spells, Experimentation, Familiar, Items, Longevity Rituals, Vis Extraction

**Art-based:**

- All 5 Techniques (Cr, In, Mu, Pe, Re)
- All 10 Forms (An, Aq, Au, Co, He, Ig, Im, Me, Te, Vi)

**Change Mode**: Add
**Default**: +1 to +3

**Examples:**

- Laboratory specialty in Ignem: +3 to all Ignem-related lab work
- Laboratory specialty in Longevity Rituals: +2 to longevity ritual creation

---

## Combat & Roll Effects

### Optional Roll Bonuses

Creates additional optional modifiers for specific types of rolls. These appear as choices when making the relevant roll.

**Available Roll Types:**

- **Formulaic Magic**: Bonus to formulaic spell casting
- **Spontaneous Magic**: Bonus to spontaneous spell casting
- **Initiative**: Bonus to initiative rolls
- **Attack**: Bonus to attack rolls
- **Defense**: Bonus to defense rolls

**Change Mode**: Add
**Default**: Varies (typically +3 to +5)

**Configuration**: Click the cog icon to provide:

- **Label**: Name of the bonus (shown in roll dialog)
- **Description**: Conditions or circumstances when it applies

**Examples:**

- _Cyclic Magic (Astrological)_: +3 to casting when stars are favorable
- _Special Circumstances (Forest)_: +3 to Herbam casting in forests
- _Talisman Attunement (Fire)_: +5 to Ignem casting through talisman
- _Improved Initiative_: +3 to initiative in combat

**⚠️ Note**: Optional bonuses must be manually selected during rolls - they are not automatically applied.

---

## Covenant Effects

These effects apply to Covenant documents rather than characters.

### Covenant Build Points

Modifies the build points available for various covenant resources during creation.

**Available Categories:**

- Library, Lab Texts, Vis, Magic Items, Specialists, Laboratories, Money

**Change Mode**: Add
**Default**: +10 points

**Examples:**

- _Extensive Library_ boon: +30 Library points
- _Impoverished_ hook: -20 Money points

---

### Covenant Expenses

Adds or reduces yearly expense costs for covenant maintenance.

**Available Expense Types:**

- **Inhabitant Points**: Cost per inhabitant
- **Buildings**: Building maintenance
- **Consumables**: Consumable goods
- **Provisions**: Food and supplies
- **Wages**: Wages for employees
- **Laboratories**: Lab maintenance
- **Books**: Writing materials and book costs
- **Weapons**: Weapon and armor maintenance

**Change Mode**: Add
**Default**: Varies by boon/hook

---

### Covenant Cost Savings (Mundane)

Reduces expenses through mundane means (better management, local resources, etc.).

**Available Categories**: Same as Covenant Expenses

**Change Mode**: Add (positive value reduces costs)

---

### Covenant Cost Savings (Magic)

Reduces expenses through magical means (enchanted items, spells, etc.).

**Available Categories**: Same as Covenant Expenses

**Change Mode**: Add (positive value reduces costs)

**⚠️ Note**: Magic and mundane savings stack, but there may be limits on total reduction.

---

### Covenant Modifiers

Various modifiers affecting covenant mechanics.

**Available Modifiers:**

- **Magi Aging**: Modifier to aging rolls for Magi in covenant
- **Mundane Aging**: Modifier to aging rolls for mundane inhabitants

**Examples:**

- _Healthy Climate_ boon: +1 to all aging rolls
- _Unhealthy Climate_ hook: -1 to all aging rolls

---

### Covenant Inhabitants

Modifies the number of inhabitants in various categories.

**Available Categories:**

- **Turbula**: General population
- **Laborers**: Manual workers
- **Teamsters**: Transport workers
- **Servants**: Household servants

**Change Mode**: Add

---

## Advanced Topics

### Effect Priority and Ordering

Active Effects are applied in a specific order:

1. Add effects are applied first
2. Multiply effects are applied second
3. Override effects are applied last
4. Custom effects have special handling

### Stacking Effects

- **Add effects**: Always stack with each other
- **Multiply effects**: Are applied multiplicatively (1.5 × 1.5 = 2.25)
- **Override effects**: Only the last one processed takes effect
- **Upgrade/Downgrade**: Take the maximum/minimum value

### Temporary vs. Permanent Effects

- **Permanent**: Virtues, flaws, and inherent traits
- **Temporary**: Can be toggled on/off by GM
- **Duration**: Currently, the system does not automatically expire effects based on time

### Transfer Property

When an effect is on an Item:

- **Transfer ON**: Effect applies to the character owning the item
- **Transfer OFF**: Effect only applies to the item itself (rarely used)

Most virtue and flaw effects have transfer enabled by default.

### Creating Custom Effects

To create a custom effect:

1. Open the item/actor sheet
2. Go to the Effects tab
3. Click the + icon
4. Select the effect Type
5. Choose the specific Attribute
6. Enter the Effect Value
7. Configure advanced options if needed (cog icon)
8. Test the effect to ensure it works as expected

### Common Pitfalls

1. **Generic Abilities**: Forgetting to set the option, or mistyping it
2. **Override Mode**: Stacking virtues with override effects (only the last applies)
3. **Transfer**: Forgetting to enable transfer on item effects
4. **Editing Characteristics**: Can't edit while an active effect is modifying it
5. **Optional Bonuses**: Must be manually selected during rolls

---

## Examples of Common Effects

### Virtue: Puissant Art (Ignem)

- **Type**: Art
- **Attribute**: Ignem (ig)
- **Mode**: Add
- **Value**: 3

### Virtue: Affinity with Magic Theory

- **Type**: Affinity Arcane Ability
- **Attribute**: Magic Theory
- **Mode**: Multiply
- **Value**: 1.5

### Virtue: Large

- **Type**: Vitals
- **Attribute**: Size
- **Mode**: Add
- **Value**: 1

### Virtue: Cyclic Magic (Positive)

- **Type**: Optional Roll Bonus
- **Attribute**: Formulaic Magic or Spontaneous Magic
- **Mode**: Add
- **Value**: 3
- **Advanced**: Label "Cyclic Magic (Night)", condition description

### Flaw: Deficient Technique (Perdo)

- **Type**: Deficiency
- **Attribute**: Perdo (pe)
- **Mode**: Custom
- **Value**: (existence of effect is what matters)

### Longevity Ritual

- **Type**: Vitals
- **Attribute**: Aging
- **Mode**: Add
- **Value**: (Lab Total ÷ 10)

---

## Troubleshooting

### Effect Not Working

1. **Check transfer**: Is transfer enabled on the item?
2. **Check disabled**: Is the effect accidentally disabled?
3. **Check type/attribute**: Is the correct type and attribute selected?
4. **Check ownership**: Does the character own the item?
5. **Check change mode**: Is the correct change mode selected?

### Can't Edit Characteristic

An active effect is modifying it. Disable/remove the effect temporarily to edit manually.

### Generic Ability Effect Not Working

The option name in the effect must **exactly match** the option in the owned ability (case-sensitive, spaces, etc.).

### Optional Bonus Not Appearing

1. Ensure effect type is "Optional Roll Bonus"
2. Check that the roll type matches (Formulaic/Spontaneous/etc.)
3. Manually look for it in the roll dialog's optional section
