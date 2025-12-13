
The traditional troupe members of a Saga. The character sheets should be familiar to Ars Magica players as most fields are self explanatory and their sheets are very similar. They increase in complexity from grog to companion to magus. Please see below for a more in-depth explanation of each feature of the sheet.

Whenever you see a die icon, click it to roll. A pop up will open to confirm some details and actually roll.

For brevity, we will limit ourselves to describing only items that need some sort of explanation or that function differently than a simple "type your info here".


# **Magi, Companions and Grogs**    


#### *Please note: for most of the sheet, right-clicking on an item will show its full description in the sheet without opening an extra window*


## Header

![](modules/arm5e-compendia/doc/images/CreationModeIcon.webp)
**Creation mode icon:** Indicates this **Actor** is in creation mode. Right now, it has only the following effects (with more to come):
	- Normal mode: You can change the **Year born** field and have the system set the **Actor's** age;
	- Creation mode: You set the age of the **Actor** and the system sets the birth year based on the current time

This setting can be changed in the [[Player Characters#Actor settings, or the gear icon]], below.

**Covenant field:** Set it to an existing covenant name in the world to link it to that character - the character will automatically become a member in the covenant sheet. Or you can click on the link symbol to open the covenant sheet. You can also drag and drop a covenant actor on the character sheet for the same effect. A covenant needs to be created as an Actor, that is, just like a Player Character. Please see [[Covenant]].

**Season** and **Year** cannot be changed by hand - they're automatically set by the system. Changing your character's age will also changed their year of birth, further down the sheet.

**Characteristics:** 
Click on a characteristic label to open a roll dialog. Mousing over the score will also tell you the number of aging points in that characteristic - the more aging points, the larger a shadow will appear around the field. To edit the aging points, shift+click the label of the characteristic.
  
## Description

Some fields like **size**, **soak** and **encumbrance** are read only because they are automatically computed by the system and can only be changed through [[Active effects]];

**Warping**: Clicking on the Twilight icon will trigger a Twilight episode, as will getting two or more points of Warping when casting a spell (though the threshold can be adjusted with [[Active effects]]). See [[Twilight]];

**Aging and decrepitude**: Click on the little hourglass icon to do an aging roll (see [[Long term activities#Aging (special)|Aging]]);

**Personaliy traits:** Click on the + sign to add a Personality Trait. Click on the die icon to roll for it;

**Reputation**: Click on the + sign to add a Reputation. Click on the die icon to roll for it.

### Vitals and Combat

**Fatigue**: Use the + and - signs to increase your fatigue or the rest button to reset it all. Spell casting will automatically add fatigue levels as well, which is taken into account for all necessary rolls.

It is also possible to increase or decrease your fatigue levels and the associated penalty using [[Active effects]].

**Wounds:** You can manually add wounds to a character here. Each wound is individually represented by an icon and fresh wounds have a red aura around them.

![](modules/arm5e-compendia/doc/images/Wounds.webp)
*Wounds*

Clicking the wound icon opens a pop up where you can add more information about the wound, such as location, for instance. It will also allow you to delete the wound. Deleting the wound is *not* the same as recovering from it and will just remove it altogether!

![](modules/arm5e-compendia/doc/images/WoundWindow.webp)
*Wound window*

Clicking the bandaged hand opens the [[Sanatorium]] window. In this window not only can you roll for recovery, it will also keep a record of the rolls and effects. Please see the corresponding page for more details on how it works.

The penalties for wounds and fatigue are automatically taken into account for rolls - remember that if you're casting a lot of spells and rest for a while you need to come back here and remove those fatigue levels.

**Combat section:** You can roll for initiative, attack, defense etc here (See [[Gameplay#Combat|Combat]] for more detail). Please note you can't change any numbers here - they're derived from other places, such as your stats, items and so on.

**Weapons and Armor**: A duplicate from the Inventory tab put here for convenience. Click on the check box to equip or unequip. Dragging and dropping items here will also work, of course, as will adding them manually by clicking on the + icon. You can edit them here, like you can in the [[Inventory]] tab.

## Abilities

This section lists all the abilities possessed by the character. As mentioned in the Introduction, you can add preconfigured abilities by dragging and dropping from the sidebar, from a Compendium or even from another character sheet.

![](modules/arm5e-compendia/doc/images/AbilitiesActor.webp)

You can also click the little + icon to add an ability that will be specific to this character only. Creating it here and then dragging and dropping it back into the Items tab will add that new ability to the Items available.

Simply click on the Ability label to roll for it. A pop up window will ask for the specific conditions to the roll (like Characteristic to be used, simple/stress die etc).

![](modules/arm5e-compendia/doc/images/AbilityRoll.webp)
*Ability roll window*

The abilities are arranged alphabetically in different sections corresponding to their category in the Core book (General, Academic etc).

A category will appear only if the character has an ability in it, however. Clicking on a category will collapse or expand the corresponding list of abilities.

Active effects are represented by colors:

* Blue: Puissant

* Red: Affinity

* Violet: Puissant and affinity

* Dark grey blue: Deficiency

![](modules/arm5e-compendia/doc/images/AbilitiesActorEffects.webp)
*Active effects*

### Virtues and Flaws

As with abilities, you can drag and drop Virtues and Flaws, as well as create new ones here and drag them back to the Items tab. A label in _italic_ means it has an Active Effect, that is, it affects something else in the sheet (like an Ability, for instance).

## Arts

This tab is only available to magic users.

![](modules/arm5e-compendia/doc/images/HermeticArts.webp)

Each of the Arts is represented in this section:

-   The Art symbol or its hand gesture (see [[Introduction#Settings|Settings]]);

-   Its name - click on it to roll for spontaneous magic and follow the prompts in the pop up window;
   
-   The amount of XP spent in it and the total needed for the next level. You can directly edit the amount of XP here;

-   The score, read only but adjustable with the plus and minus icons. Please note changing the score will also change the amount of XP in the previous box to the amount necessary for the level, ignoring whatever you added before. Changing it back will not remember the last number set there;

-   The forms have an additional number between braces: this is the magic resistance for this form (ie: 5x Parma Magica + score);

-   The same colored shadow codes as abilities are used to indicate an active effect:

   -   Blue: Puissant

   -   Red: Affinity

   -   Violet: Puissant and affinity
   
   -   Dark grey blue: Deficiency

![](modules/arm5e-compendia/doc/images/SpontaneousCasting.webp)
  *Spontaneous casting window*

#### Voice and gestures

![](modules/arm5e-compendia/doc/images/VoiceGestures.webp)

You can configure the default casting modifiers here. Whenever you cast a spell, whether formulaic or through a spontaneous casting effect, these settings will affect that roll.

#### Magic totals

![](modules/arm5e-compendia/doc/images/MagicTotals.webp)

A list of totals used for magic computed with characteristics and abilities. None of these are directly editable, being derived numbers.

You can, however, directly roll fast-casting and targeting by clicking on the corresponding labels.

#### Spells

![](modules/arm5e-compendia/doc/images/SpellList.webp)

As it is for abilities, a list of the spells known by the magus. And just as with abilities, these can be created here, added through drag and drop from the Items tab, or created here and then dragged back to the Item tab, adding them to the general item list.

Please see [[Creating new spells and effects]] for more details on how to create these.

Also note the little icon next to the spell name - that icon denotes a specific Mastery for that spell - Fast Casting, in this example. Hovering the mouse over the icon will bring up what it means.

Click on a spell to roll for casting. That will open a pop up window asking for more details. Remember the Voice and Gestures choices *will* affect this roll (and do show up under "Bonuses" in the new window and in the result dialogue).

Clicking on the up-down arrow icon will display a special filter area:

![](modules/arm5e-compendia/doc/images/SpellFilter.webp)
*Spell filter*

You can filter by technique, form and level and then close it. A red aura around the word "Filter" will indicate the list is filtered.

Please note the filter parameters are stored in the browser on a per user and character basis so two different users can have their own specific view of the same sheet at the same time. As long as you keep using the same tab they will be preserved.

#### Spontaneous magical effects

Same as spell list, but for frequently used spontaneous effects. Please [[Creating new spells and effects]] for more details on adding these.

### Casting totals

This table gives you a quick overview of the magical capabilities of a character and is only for reference.
Applying a magical focus, changing the aura level, changing the Divider or the Modifier here will only show you the effects such an actual change would have and do not affect actual casting or lab totals at all.

## Laboratory

A laboratory or sanctum needs to be created as an Actor, just like a Player Character. Please see [[Laboratory]].

Just below that line, you have the same totals you had in Arts, and, like in Arts, they're for reference mostly, though you can click on Fast Casting Speed and Targeting to roll them from here.

**Twilight Scars**: This is an editable field that is pretty self explanatory, but will also be modified in the future.

**Familiar**: For now, the Familiar tab is very simple, though, and mostly for reference. It will be expanded in the future.

### Lab totals

Similar to casting totals, this table gives an overview of the lab capabilities of a character. The table is not directly editable, being calculated from other fields in the sheet.

Please be aware **Laboratory quality** is a read-only field if there's a sanctum linked to the character, and the same for the aura. **Modifier** and **Apply magical focus** can be changed, however.

##### Laboratory help

Simply enter the stats of the magus's assistant here. This part will also be expanded later.

## Inventory

Pretty self explanatory in general. A lot of it is drag and drop already, and new items can be created following the same rules already explained.

Please remember to equip or unequip whatever armor or weapon the character is using so these values are used for combat! To equip or unequip something, simply click on the "Equipped:" checkbox.

### Library

This section reflects the character's library and not the covenant's one. Books are split into the following types:

- Hermetic Arts
- Abilities
- Spell Masteries
- Lab Texts
- Physical Books

For more information on adding books, please see [[Libraries]].
  
### Diary

The diary tab lists all diary entries in ante-chronological order and will be populated from different sources. Adding equipment, for instance, twilight episodes, recovery in the sanatorium and others create entries here automatically, which can also be edited.

To add an activity here that is not controlled by another section, click the *+ Create* button and see [[Long term activities]]. 

Depending on the activity, XP must be applied. If that is the case, but the activity and its XP hasn't been finalized yet, the entry will be in *italics*.

- The *Pending Experience* field shows how much total experience hasn't been applied to the character yet

- The Astrolabe icon opens up the calendar with the seasons and the years showing a complete list of past diary entries. Clicking on an activity will open its full entry. New activities can also be added through here, by clicking on the appropriate square for the season and year. Please see [[Long term activities]].

![](modules/arm5e-compendia/doc/images/Diary.webp)
*Diary tab*

### Effects

This tab lists all the effects currently affecting this **Actor** (including covenants) and is read-only for players.

- Hovering the mouse pointer over the icon will bring up its description;

- Items can be turned on and off (that is, made active or inactive) by clicking on the little X to its right. Once it's moved to the **Inactive effects** zone, it can be turned back on by clicking on the little check mark;

- Some effects are brought in automatically as certain characteristics are added, like Virtues and Flaws, for example, but others must be added manually;
	- Please note not all Virtues, Flaws etc are adding all the effects at this time (2025/03/08). These are still being added. Please check if all the effects you need are here.

- Temporary effects caused by spells will eventually also be listed here;

- The **Source** field lists where the effect is coming from, of course. If the source is the name of the **Actor**, this means it was added manually to this Actor only;

- To add a new effect, click the *+ Create* icon and see [[Active effects]] for more details on each kind of effect available.

- **Dev note:** In Foundry core, the name for this feature is Active effects but they can be Active, Passive or Inactive which can make things confusing.

![](modules/arm5e-compendia/doc/images/ActorEffects.webp)
*Actor effects tab*

### Actor settings, or the gear icon

In this tab you can change between Creation and Normal modes by clicking on the **Creation mode** checkbox. Right now, Creation mode only has the following effects, but will be expanded later:

- Normal mode: You can change the **Year born** field and have the system set the **Actor's** age, in the Description.Description tab;
- Creation mode: You can set the age of the **Actor** (in the Header section) and the system sets the birth year based on the current time

This is also a good spot to quickly add "packages" of stats. Please see below for details on each "package". 

Please be aware the buttons will only add the stats, not remove them, and that adding one more package doesn't exclude the previous one. Shift+Click, however, will add 5 XP to all the related abilities (nifty for quick creation):

- Add basic abilities: (Area) Lore 1, Language 5
- Martial: Awareness 0, Brawl 0, Bows 0, Great Weapon 0, Single Weapon 0, Thrown Weapon 0
- Social: Carouse 0, Charm 0, Etiquette 0, Folk Ken 0, Leadership 0, Bows 0
- Rogue: Awareness 0, Charm 0, Folk Ken 0, Guile 0, Intrigue 0, Legerdemain 0
- Mundane scholar: (no effect for now)
- Arcane scholar: Profession: Scribe 0, Artes LIberales 0, Language: Latin 0, Philosophiae 0, Dominion Lore 0, Faerie Lore 0, Infernal Lore 0, Magic Lore 0
- Magus: *The Gift*, Awareness 0, Concentration 0, Artes Liberales 1, Language: Latin 4, Philosophiae 0, Code of Hermes 0, Finesse 0, Magic Theory 3, Parma Magica 1, Penetration 0
- Arts mastery: Adds 5 XP to each Art the Actor has



From here, perhaps [[Gameplay]] would be a good idea.