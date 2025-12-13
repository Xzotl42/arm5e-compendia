## Rolls

You can trigger a roll by clicking on the relevant item you want to roll or, occasionally, on the die icon next to the item. In all cases, a pop up window will open so you can enter more details. Please see below for more detailed explanations of these windows.

- Click on a characteristic label to roll a pure characteristic;

- Click on an ability name in the character sheet;

- Click on an Art label for spontaneous magic;

- Click on a spell name to cast it;

- Click on the dice icon next to a label to roll for it (eg: attack, defense, personality trait).


**All the items above can be dragged and dropped on the macro bar for quick access to rolls.**

- In addition, weapons can be put on the macro bar too for a combat roll.

- To take into account any rule not implemented yet or any special modifier granted by the GM, a **modifier** field is available for all rolls.


**Please be aware all the rolls will be affected by the Default Roll Mode!**

![](modules/arm5e-compendia/doc/images/ChatRollMode.png)
*Chat Roll Mode, found at the bottom right of the Foundry screen*

**Dev note:** There is not yet a way to just roll a stress die using the character sheet, that is, not involving any characteristic, ability etc. Some people are rolling a dummy personality trait for that. A macro has been provided to do it, and it is available in the system compendia.

**Experimental**: use "/r Xds" to roll an exploding die. X is the number of botch dice


### Characteristic and ability rolls

![](modules/arm5e-compendia/doc/images/RollAbility.webp)

- This dialog is the exact same for both characteristics and abilities. All the fields are filled from the character sheet;

- Clicking on a characteristic label (and therefore rolling for it) sets the Characteristic field to whatever was clicked on and the Abilities field to None;

- Clicking on an ability label will set the Characteristic field to the default one for the ability, though this can be changed before the roll;

- Clicking the **Specialty** checkbox allows the bonus of the specialty to be used. Note the system is showing you what the specialty was described as;

- The system also adds in the penalties for Fatigue and Wounds - remember to check these before rolling.

### Magic rolls

- Click on a spell name or spontaneous magic effect label to cast it;

- For generic spontaneous magic, click on the Art label. It is possible to set a target level in order to compute penetration - leaving it at zero disables this calculation.

![](modules/arm5e-compendia/doc/images/SpellRoll.webp)

- Here you can change Voice and Gestures from the default set in the sheet;

- Clicking the hammer icon will allow you to add Art requisites to the effect;

- The **Aura Level** field will be set to "???" if the aura is not known, as set by the GM for the scene. See [[GM settings]].

- The **Apply magical focus** checkbox will be set automatically to the value set in the spell when it was saved to the sheet, but can be enabled or disabled as appropriate - this is especially important for spontaneous spell effects;

- Each botch on a magic roll will automatically increase the warping of the caster and may prompt a Twilight episode. See [[Twilight]].

Magic rolls have one additional section for Penetration, which can be expanded or collapsed as needed.

- Penetration mastery relate to the spell mastery effect if it exists

- Both the **Arcane Link** and **Sympathic Link** fields are drop fields which can be set as appropriate at the time of casting.
@@@
### Combat rolls

You can roll everything in Description.Vitals&Combat:

![](modules/arm5e-compendia/doc/images/CombatStats.webp)

See [[#Combat|Combat]] below for more details.  
It is also possible to roll for attack by dropping a weapon in the hotbar.

- If your specialty is with the shield, mark it on the shield and not on the weapon. If you don't have the shield equipped, the specialty bonus doesn't apply.

- Create a 'mounted' item with the ability to 'mount' and mark on its attributes that it is a horse. When you equip it, the calculations will be applied.

### Other rolls

Most rolls are triggered by clicking on the appropriate label.

## Magic

Once you cast a spell, do spontaneous magic or use a power, the result of the roll will appear in chat:

![](modules/arm5e-compendia/doc/images/SpellChatResult.webp)

- Icon of the token. Clicking on it will open its sheet.

- The name of the spell/magical effect and its level

- Icon of the spell if applicable.

- Details of the roll modifiers including penetration computation

- Roll formula

- Casting total without penetration

- Penetration total in parentheses

- The small icon is to use a confidence point if available.

If the spell is cast while one or more tokens are selected, additional message per target will appear in the chat indicating whether the spell successfully overcame magic resistance:

![](modules/arm5e-compendia/doc/images/MagicContest.webp)

Note that with the right [[Introduction#Settings|Settings]], a player will only see whether if the spell was a success or not, the details are reserved for the GM.

## Combat

**Dev note**: Combat being usually short and deadly in Ars Magica, it hasn't been properly integrated in the Foundry framework yet. At the moment, you can roll for initiative with it to have an action order, but it is a simplified version of the rules (ie: no reroll is made in case of tie).

- On **Attack** or **Defense** rolls, it is possible to exert self (ie: lose a fatigue level) to double the ability score.

- **Damage** roll will automatically compute the advantage based on the previous attack and defence chat messages. That's why the GM should pay attention that players only roll when it is their turn, otherwise the Advantage must be computed "manually".

- **Soak** roll will retrieve the result of the latest **Damage** roll to be applied to the target or zero if none are found.

  - Size is taken into account for the computation of wounds

  - This is also the way to apply damage from external events (fire, fall, etc)

  - Select your Form resistance bonus if you are a Magus (eg: Ignem for fire damage) or if you have an active effect which applies

  - Natural resistance: Some virtues and flaws may give modifiers to soak rolls (eg: Fire resistance or vulnerability) through Active effects. You can select it here.

  - **Dev note:** Spell damage will be applied differently in the future.

 Click on the Soak label to apply a given amount of damage. If a combat is ongoing, it will automatically compute the correct amount to soak. Size, stamina, armor, etc are automatically taken in account to compute the correct wound type.
## Macro dialogs

It is sometimes cumbersome to change stats or roll a specific test in the heat of the action (even more as a GM who has to manage a bunch of NPCs). If the hotbar can help for abilities or spells, it is not possible for some others. That's why the following macros were created.

To use them, select a token on the scene and execute them.

- **Quick combat** Attack, defense, damage, soak, all the combat rolls are accessible in a small dialog
- **Quick vitals** Manage fatigue and wounds as well as resting
- **Quick magic** Quick access to spellcasting stances (voice and gestures), spontaneous magic and standard rolls like fastcasting speed and targeting.
