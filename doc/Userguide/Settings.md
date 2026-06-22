# System Settings

This page covers the settings specific to the Ars Magica 5e system in Foundry VTT. For general Foundry VTT settings, please refer to the official Foundry documentation.

## Table of Contents

- [World Configuration](#world-configuration)
- [Visual & Display Settings](#visual--display-settings)
- [Gameplay Mechanics](#gameplay-mechanics)
- [Dice & Rolling](#dice--rolling)
- [Calendar & Time](#calendar--time)
- [Economy & Resources](#economy--resources)
- [User Interface](#user-interface)
- [Advanced Settings](#advanced-settings)

---

## World Configuration

These settings affect the entire world and are typically configured once during initial setup.

### Sourcebooks Filter

**Menu Dialog** | **World Setting** | **GM Only**

Allows you to choose which sourcebooks to include in your current world. This helps prevent overwhelming players with choices and lets you customize what content is allowed in your game.

**How to access**: Click the button to open the configuration menu where you can enable/disable individual sourcebooks.

**Current functionality**: Filters spell attributes and other content based on sourcebook selection.

**Use cases**:

- Running a core-books-only saga
- Excluding experimental or house-ruled content
- Gradually introducing supplements as your saga progresses
- Custom campaign with specific source restrictions

---

### Compendia Reference

**Menu Dialog** | **World Setting** | **GM Only**

Selects which module will be the reference for this world's compendia content.

**Use case**: If you're playing in two different Tribunals with separate compendium modules containing different information, you can set the appropriate reference for each world to prevent mixing content.

**Default**: `arm5e-compendia`

**Note**: This setting ensures that when the system looks for reference content (like virtues, flaws, or spells), it pulls from the correct module.

---

### System Migration Version

**Text Field** | **World Setting** | **GM Only**

Allows you to reset the system version to trigger a data migration from that version forward.

**Use case**: Useful when importing documents from old compendia that need to be migrated to the current system version's data structure.

**⚠️ Warning**: Only use this if you understand data migrations. Incorrect use may require restoring from backup.

**Example**: If you import actors from a compendium created with version 2.0.0, set this to `2.0.0` and reload to trigger the migration process.

---

## Visual & Display Settings

Cosmetic preferences that affect how information is displayed.

### Default Icon Style

**Dropdown** | **World Setting** | **GM Only**

Choose between monochrome (black & white) or color versions of default icons for newly created documents.

**Options**:

- **Monochrome**: Classic black & white style
- **Color**: Full color icons

**Important**:

- Only applies to **brand new** documents
- Existing documents keep their original icons
- Copied documents retain the icon from the source
- Purely cosmetic - no mechanical effect

---

### Icon Style for Arts

**Dropdown** | **Client Setting**

Choose the visual representation for Hermetic Arts throughout the system.

**Options**:

- **Hermetic Symbols**: Traditional Hermetic Art symbols
- **Hand Gestures**: Medieval hand gesture illustrations

**Important**:

- This is a per-user preference (client setting)
- Purely cosmetic - no mechanical effect
- Affects display in character sheets, spell lists, and lab totals

---

### Header Font

**Dropdown** | **Client Setting**

Choose the font used for headers in sheets and dialogs.

**Options**: Various medieval-style fonts
**Default**: Blackmoor

**Note**: This is a client-side preference, so each player can choose their preferred font style.

---

### Show Metagame Information

**Checkbox** | **World Setting** | **GM Only**

Whether to display the sourcebook reference and page number where an Item originates.

**When enabled**: Shows information like "Core Rulebook, p. 45" on item sheets
**When disabled**: Hides sourcebook references for a more immersive experience

**Use cases**:

- Enable for easy rulebook reference during play
- Disable for players who prefer not to see metagame information
- Useful for GMs who want to cite sources quickly

---

## Gameplay Mechanics

Settings that affect game rules and character progression.

### Enforce Schedule Constraints

**Checkbox** | **World Setting** | **GM Only**
**Default**: Enabled

Whether to prevent users from scheduling or applying seasonal activities that violate system constraints.

**Constraints enforced**:

- Cannot read the same book twice in one season
- Cannot perform incompatible activities simultaneously
- Must meet prerequisites for certain activities
- Book availability conflicts

**When disabled**: Players can schedule any activities (useful for special circumstances or house rules)

**Recommendation**: Keep enabled for standard play to prevent accidental rule violations.

---

### Track Resources

**Checkbox** | **World Setting** | **GM Only**
**Default**: Enabled

Automatically creates diary entries whenever resources are added or removed from Actor sheets.

**Tracked resources**:

- Vis (all Arts)
- Books and lab texts
- Magic items
- Laboratory changes
- Covenant finances

**Use cases**:

- **Disable during character creation**: Prevent cluttering the diary with initial resource allocation
- **Enable during play**: Maintain accurate records of resource transactions
- Historical tracking of vis expenditure and item acquisition

**Also available in**: The Astrolabium (calendar interface)

**Tip**: Disable temporarily when doing bulk resource management, then re-enable.

---

### Automatic Confidence Prompt

**Checkbox** | **Client Setting**
**Default**: Enabled

When making consecutive rolls, automatically skips the confidence prompt and proceeds with the roll.

**Behavior**:

- Any pending fatigue levels are applied automatically
- Any pending wounds are applied automatically
- If conditions prevent the roll (e.g., unconscious), it will fail appropriately

**When disabled**: Each roll will prompt for confidence use, fatigue application, etc.

**Use case**: Speeds up play by reducing clicks for routine rolls.

---

## Dice & Rolling

Settings related to dice rolling, visibility, and special effects.

### Show Rolls

**Dropdown** | **World Setting** | **GM Only**
**Default**: Players only

Controls who can see whose roll results in chat.

**Options**:

- **Give me all details!**: Everyone sees all rolls
- **Only players rolls**: All players see each other's rolls, GM rolls are hidden
- **Only the rolls of owned characters**: Players only see rolls from their owned characters

**Use case**: Maintain mystery by hiding NPC rolls and keeping player rolls separate.

---

### Show Roll Formulas

**Dropdown** | **World Setting** | **GM Only**
**Default**: Players only

Controls who can see the formula breakdown of rolls (e.g., "1d10 + 5 (Characteristic) + 3 (Skill)").

**Options**:

- **Give me all details!**: Everyone sees all roll formulas
- **Only players rolls**: Only player roll formulas are visible
- **Only the formula for owned characters**: Players only see formulas for their characters

**Use case**: Hide NPC capabilities by concealing their roll formulas.

---

### Show NPC Magic Details

**Dropdown** | **World Setting** | **GM Only**
**Default**: Only results

During magic contests against NPCs, controls how much information is revealed.

**Options**:

- **Give me all details!**: Shows exact casting total, penetration, and magic resistance values
- **Show me only the result**: Only reveals success or failure without numerical details

**Use case**:

- **Only results**: Maintains mystery about NPC capabilities
- **All details**: Useful for teaching players or transparent gameplay

---

### Fun Stress Dice

**Dropdown** | **World Setting** | **GM Only**
**Default**: Players only

Shows a special dialog when rolling a 1 on a stress die (before checking for explosion or botch).

**Options**:

- **Nobody**: No fun dialog, proceed immediately
- **Players only**: Show dialog for player rolls; GM rolls explode automatically
- **Everyone**: Show dialog for all rolls

**Fun dialog features**:

- Dramatic announcement
- Sound effects (if configured)
- Roll animation pause

**Note**: If enabled, GM stress dice that explode are rolled automatically to speed up play.

---

### Dramatic Pause After Rolling a One

**Slider** | **World Setting** | **GM Only**
**Default**: 2000 milliseconds
**Range**: 0-5000 ms

**[Dice So Nice Integration]**

When the "Fun Stress Die" setting is disabled, adds a dramatic pause (in milliseconds) after rolling a 1 on a stress die.

**Requirements**: Dice So Nice module must be installed and enabled

**Use case**: Adds tension before revealing whether the roll explodes or botches, without the full fun dialog.

---

### Use Alternate Stress Die

**Checkbox** | **World Setting** | **GM Only**
**Default**: Disabled

Inverts the stress die mechanics to use an alternate system.

**Standard rules**:

- 1 = Potentially explode (multiply die)
- 0 = Check for botch

**Alternate rules**:

- 0 = Potentially explode (add +10 to roll)
- 1 = Check for botch

**When exploding**: Adds +10 instead of doubling the roll.

**Use case**: Some house rules or non-standard campaigns use this alternative stress die system.

**⚠️ Warning**: This fundamentally changes the probability distribution. Only use if you understand the mathematical implications.

---

## Calendar & Time

Settings related to the saga's calendar and time tracking.

### Winter First

**Checkbox** | **World Setting** | **GM Only**
**Default**: Disabled (Spring is first)

Determines whether the first season of the year is Winter or Spring.

**Options**:

- **Disabled** (default): Year starts with Spring (March), as per core rules
- **Enabled**: Year starts with Winter (December/January)

**Season order when disabled**: Spring → Summer → Autumn → Winter
**Season order when enabled**: Winter → Spring → Summer → Autumn

**⚠️ Important**: Do **not** change this setting in the middle of a saga. It can cause confusion with existing seasonal activity records and dates.

**Use case**: Some sagas prefer Winter as the first season to align with calendar year.

---

### Current Date

**Hidden Setting** | **World Setting**

Stores the current date in the saga (year, season, month, day).

**Default**: Year 1220, Spring, March 20

**Not directly configurable**: Use the Astrolabium (calendar tool) to change the date.

**Note**: If Simple Calendar module is active, it may take precedence over this setting.

---

## Economy & Resources

Settings for managing money and economic complexity.

### Money Management Level

**Dropdown** | **World Setting** | **GM Only**
**Default**: Don't bother with it

Controls the level of detail for item prices and economic tracking.

**Options**:

- **Don't bother with it**: No prices tracked, narrative economics
- **Only a qualifier**: Items marked as cheap, standard, or expensive
- **Everything priced to the coin**: Full economic simulation with exact prices

**Use cases**:

- **Don't bother**: Story-focused sagas without economic constraints
- **Qualifier**: Abstract wealth without detailed bookkeeping
- **To the coin**: Realistic economic simulation for merchant/covenant-focused sagas

---

### Currency Name

**Text Field** | **World Setting** | **GM Only**
**Default**: "Silver coins"

Name of the local currency used in your saga.

**Examples**:

- "Denarii" (Latin)
- "Pennies" (English)
- "Sous" (French)
- "Pfennige" (German)
- "Dinero" (Spanish)

**Note**: This is cosmetic and affects how currency is displayed.

---

### Currency Coefficient

**Number Field** | **World Setting** | **GM Only**
**Default**: 240

How many units of the local currency equal one Mythic Pound (the standard unit in Ars Magica).

**Standard conversions**:

- **240**: Silver pennies to 1 Mythic Pound (core rules)
- **20**: Gold coins to 1 Mythic Pound
- **1**: If using Mythic Pounds directly

**Formula**: Local currency amount ÷ Coefficient = Mythic Pounds

**Use case**: Allows you to work in local currency while the system tracks values in the standard Mythic Pound.

---

## User Interface

Settings that affect the user interface and interaction experience.

### Quick Delete

**Checkbox** | **Client Setting**
**Default**: Enabled (asks for confirmation)

Controls whether deletion of owned items requires confirmation.

**When enabled**: Shows a confirmation dialog before deleting items from character sheets
**When disabled**: Items delete immediately without confirmation

**Recommendation**: Keep enabled to prevent accidental deletions.

---

## Advanced Settings

### Notify Missing Reference

**Hidden Checkbox** | **World Setting**
**Default**: Enabled

Whether to display notifications when the system can't find referenced compendium content.

**Not user-configurable**: This is typically managed automatically by the system.

**When enabled**: Shows warnings if a document references a compendium entry that doesn't exist (useful for troubleshooting).

---

### Clear User Cache

**Checkbox** | **Client Setting**
**Default**: Enabled

Resets the browser session data on the next refresh.

**Cached data includes**:

- Filter criteria for all actors
- Folding state of all expandable sections
- UI preferences and view states
- Scroll positions

**When to use**:

- UI behaving strangely or showing old data
- After a system update if things seem wrong
- Cache has grown too large (happens over long campaigns)

**Effect**: On next page refresh, all filters and folded sections reset to defaults. This is normal and clears the cache.

**Note**: This setting automatically resets to enabled after clearing.

---

## Recommendations by Play Style

### New Saga Starting at 1220

- **Winter First**: Disabled (Spring first is standard)
- **Enforce Schedule Constraints**: Enabled
- **Track Resources**: Disabled during character creation, enable after
- **Show NPC Magic Details**: Only results (mystery!)
- **Money Management**: Don't bother, or qualifier
- **Sourcebook Filter**: Core + desired supplements

### Established Saga

- **Track Resources**: Enabled (keep good records)
- **Enforce Schedule Constraints**: Enabled (prevent accidents)
- **Show Rolls**: Only players or owned characters
- **Fun Stress Die**: Players only or Everyone
- **Quick Delete**: Enabled (prevent accidents)

### Teaching/Learning Saga

- **Show NPC Magic Details**: Give me all details!
- **Show Roll Formulas**: Give me all details!
- **Show Metagame Information**: Enabled
- **Fun Stress Die**: Everyone
- **Enforce Schedule Constraints**: Enabled (learn proper rules)

### House Rules / Experimental

- **Enforce Schedule Constraints**: Possibly disabled
- **Alternate Stress Die**: As per house rules
- **Winter First**: As per preference
- **Sourcebook Filter**: Custom selections

---

## Troubleshooting

### Setting Not Saving

- Check if you have permission (some settings are GM-only)
- Try refreshing the page after changing
- Check browser console for errors

### UI Acting Strange

- Enable "Clear User Cache" and refresh
- Clear browser cache
- Check for module conflicts

### Dates Not Working

- Check if Simple Calendar module is active (may override)
- Use the Astrolabium to manage dates
- Verify "Current Date" setting via console if needed

### Icons Not Changing

- "Default Icon Style" only affects **new** documents
- Existing documents keep their icons
- Manually change individual document icons if needed

---

## Next Steps

If you're following our recommended reading order, please move on to [[Actors]]

For information about using the calendar system, see the **Astrolabium** section.

For Active Effects and how they interact with settings, see [[Active effects]]
