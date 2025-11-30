# Release notes

## Version 1.1.1

### Bug fixes

- Moved the retrieval of shapes and materials translation to the "i18nInit" hook instead of "init" one, fixin a problem where the configured language was not yet set properly

### Compendia updates

- Virtues: Long-winded gets a +3 to fatigue rolls.
- Flaws: Obese get a -3 to fatigue rolls.

## Version 1.1.0

### Compendia updates

- Characters: Added Grogs templates from Covenants
- Flaws: Obese no longer impacts size

## Version 1.0.0

### Changes

### Compendia updates

- Creatures: letters N-Z
- Flaws: Flaws for corrupted beasts

## Version 0.12.2

### Compatibility

Verified for 13.350

### Changes

- Exchanged special armor equipment with active effect with bonus to soak when applicable.

### Compendia updates

- Creatures: letters G-M

## Version 0.12.1

### Compendia updates

- Creatures: letters C-F

## Version 0.12.0

### Compendia updates

- Creatures: letters A-B
- Spells: Common powers of creatures (A to B)

## Version 0.11.1

### Changes

- Minor fixes

## Version 0.11.0

### Compendia DE integration

- Virtues - V5 **UPDATE**
  - Added Hedge Magic (revised) virtues
  - Added RoP:I virtues
  - Various fixes
- Flaws - V6 **UPDATE**
  - Added Hedge Magic (revised) flaws
  - Added RoP:I flaws

### Changes

- Updated instructions for customizeConfig hook

## Version 0.10.4

### Changes

- Anchored by <land> flaw fix
- Added Quick UI macros to the compendium
- All compendia have been put in a folder and their name shortened for easier browsing

## Version 0.10.3

### Changes

- new internal roll tables for Arcane Experimentation
- new macro for Arcane Experimentation

## Version 0.10.2

### Changes

- added base effects to spells compendium
- level is now precomputed for spells for easier indexing (even if it is recomputed on change)

## Version 0.10.1

### Compendia DE integration

- Boons - V2 : all official boons

## Version 0.10.0

### Compatibility

- Verified for 12.343

### Compendia DE integration

- Hooks - V2 - added indexKeys

### Changes

- Fix to some utility macros

## Version 0.10.0

### Compatibility

- System minimum version 2.3.2.28

### Compendia DE integration

- Boons - V1 **NEW**
- Hooks - V1 **NEW**

### Changes

- Miscellaneous fixes

## Version 0.9.16

### Compatibility

- System minimum version 2.3.2.28

## Version 0.9.15

- Fixed Gold material sourcebook
- Fixed Folk Magic and Vulnerable to Folk tradition type

## Version 0.9.14

- FIY (Fix It Yourself) macro (alpha)

### Compendia DE integration

- Virtues - V4 **UPDATE**
  - Added Mythic Blood effects
- Flaws - V5 **UPDATE**
  - Added Twilight prone effect.

## Version 0.9.13

- Actor importer (WIP)

### Compendia DE integration

- Characters - V3 **UPDATE**
  - Fixed errors and missing Items
- Equipment - V4 **UPDATE**
  - Fixed some typos
  - Added some classic weapon and shield combos

## Version 0.9.12

- Actor importer (WIP)

### Compendia DE integration

- Characters - V1 **NEW**
  - All character templates
  - Mundane Animals
- Equipment - V3 **UPDATE**
  - Added standard inventory items (Wizardly robes,Clothes,...)
  - Added natural weapons
- Virtues - V3 **UPDATE**
  - Fixed some active effects
  - Added beast Qualities
- Flaws - V4 **UPDATE**
  -Fixed some active effects

## Version 0.9.11

- Added some macros
- Fixed bug in Armor enriching
- Actor importer (WIP)

### Compendia DE integration

- Abilities - V2 **NEW**
  - Added Church lore
  - Fixed some typos and errors
- Equipment - V2
- Virtues - V2 **NEW**
  - Added missing Fae virtues
- Flaws - V3 **NEW**
  - Added missing Fae Flaws
- Spells
  - Animal - V1
  - Aquam (DE only) V1
- Laboratory-virtues - V1

## Version 0.9.10

- Abilities compendium integrated with DE content.
- New Document Enricher macro

### Compendia DE integration

- Abilities - V1 **NEW**
- Equipment - V2
- Virtues - V1
- Flaws - V1
- Spells
  - Animal - V1
  - Aquam (DE only) V1
- Laboratory-virtues - V1

## Version 0.9.9

- New utility macro to display the rollData of a token in the console.
- New Compendia : characters, creatures and covenants
- HTML clean up of virtues (WIP)
- Spanish user guide now points to the proper images.

### Compendia content

- Equipment - V2
- Virtues - V1
- Flaws - V1 - **NEW**
- Spells
  - Animal - V1
  - Aquam (DE only) V1
- Laboratory-virtues - V1

## Version 0.9.8

- Added compendium data from the standard edition

  - Abilities
  - Spells
    - Aquam
    - Auram
    - Corpus
    - Herbam
    - Ignem
    - Imaginem
    - Mentem
    - Terram
    - Vim

- New macros for troubleshooting
- New Credits page

### Compendia content

## Version 0.9.7

### Compendia content

- Equipment - V2
- Virtues - V1 - NEW
- Spells
  - Animal - V1
  - Aquam (DE only) V1 - NEW
- Laboratory-virtues - V1

## Version 0.9.6

- Improved compendium stats macro
  - List empty descriptions
  - List page references to be filled in the future (@@)
  - List duplicates

### Compendia content

- Equipment - Update
- Flaws
- Covenant - Boons
- Covenant - Hooks
- journals
- Laboratory-flaws
- Laboratory-virtues - 1st version
- Spells
  - Animal - 1st version
- Virtues

## Version 0.9.4

### Compendia integration with DE

- Equipment compendium
- CLI update
- Improved logging at packing.
- Compendium stats macro

## Version 0.9.0

- Prepare the way for the open license

## Version 0.3.3

- Added boons and hooks compendia

## Version 0.3.2

- Added missing Rolltable compendium
  - Experimentation tables
- Use of relative paths even when refering to arm5e-compendia

## Version 0.3.1

- New sanitization tool
- Fix missing template folder in package

## Version 0.3.0

- New ref compendia module generator
- [technical] use of absolute path in javascript imports, in order to always import from the original module.
- New macros to open canvas applications via the hotbar (Scriptorium, Astrolabium, ...)

## Version 0.2.6

- Added templates for all generic abilities
- Added Spanish userguide

## Version 0.2.5

- Fixed wrong active effect for supernatural abilities

## Version 0.2.4

- Aspect indexing FR

## Version 0.2.3

- French version by @orneen

## Version 0.2.2

- Aspect fixes
  - Fixed Birch, Elder material bonuses
  - Imagonem -> Imaginem
  - Frankincense duplicate
  - Clear glass duplicate
  - Book added
  - Dead wood vs Dead tree
  - Snip fixed

## Version 0.2.1

- Relocation of the customized code for easier migration
- Sorting of aspects by name.

## Version 0.2.0

- Basi upport for localization of shapes and materials.

## Version 0.1.8

- Put the user guide in the Journal compendium
- Shapes and materials parsing
- Typos fixes

## Version 0.1.6

- Added a journal compendium
- Added missing css folder in the packaging

## Version 0.1.5

- Added examples of customization in the init hook
- Added a css file for custom styling
- Added macro to merge personal compendia into your own reference module.

## Version 0.1.4

- Added macro compendium for migrations utilities
- Fixed some abilities without the correct key

## Version 0.1.3

- Added index key to all Item documents
- Renamed Item into Equipment
- Packing of documents to V10 format
- Added a module script

## Version 0.1.2

- Removal of Compendium folders documents
- Added prefix to the compendia labels
- Updated readme file

## Version 0.1.1

- Updated virtues and flaws
- Added banner
- Added unpack script

## Version 0.1.0

- First release
