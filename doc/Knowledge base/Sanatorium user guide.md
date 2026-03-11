# Sanatorium — User Guide

This guide explains how to use the Sanatorium wound-recovery interface in Ars Magica 5e for Foundry VTT. It is written for storytellers and players who need to manage character wound recovery between seasons.

---

## Table of Contents

1. [Opening the Sanatorium](#opening-the-sanatorium)
2. [Understanding the Interface](#understanding-the-interface)
3. [Before You Roll — Setting Up the Session](#before-you-roll--setting-up-the-session)
4. [Standard Recovery (Roll by Roll)](#standard-recovery-roll-by-roll)
5. [Fast Recovery (Auto-Roll)](#fast-recovery-auto-roll)
6. [Individual Wound Recovery from the Wound Sheet](#individual-wound-recovery-from-the-wound-sheet)
7. [Ending the Season and Creating the Diary Entry](#ending-the-season-and-creating-the-diary-entry)
8. [Multi-Season Recovery (Catch-Up)](#multi-season-recovery-catch-up)
9. [Overstrain Checks](#overstrain-checks)
10. [Reading the Log](#reading-the-log)
11. [The Wound Penalty Advisory Note](#the-wound-penalty-advisory-note)
12. [Practical Examples](#practical-examples)
13. [Common Situations and Tips](#common-situations-and-tips)

---

## Opening the Sanatorium

There are two ways to open the Sanatorium for a character:

**From the actor sheet:** Look for the Sanatorium button or wound management controls on the character's sheet. This opens a full Sanatorium window pre-loaded with all of the character's active wounds.

**From a wound item sheet:** Open any wound item directly from the character sheet inventory. A **"Roll wound recovery"** button appears on the wound sheet. Clicking it opens the Sanatorium automatically if it isn't already open, then immediately rolls recovery for that specific wound (see [Individual Wound Recovery](#individual-wound-recovery-from-the-wound-sheet)).

The Sanatorium remembers which character it belongs to and registers itself on that character for the duration of the session.

---

## Understanding the Interface

![[SanatoriumUI.webp]]

### Top row — Roll modifiers

| Field          | Editable? | Description                                                      |
| -------------- | --------- | ---------------------------------------------------------------- |
| Stamina        | Read-only | Character's Stamina score; used automatically in every roll      |
| Recovery Bonus | Read-only | Active spell/effect bonuses on the character (auto-populated)    |
| Mundane Help   | **Yes**   | Flat bonus from a chirurgeon, physician, or other mundane career |
| Magical Help   | **Yes**   | Flat bonus from magical assistance (e.g. a _Purification_ spell) |
| Sanctum        | Read-only | Lab Health bonus for linked sanctum (magi only; auto-populated)  |

**Mundane Help and Magical Help are the only two fields you need to set manually.** Set them before the first roll of the season; they cannot be meaningfully changed mid-session because the date fields lock after the first roll.

### Wound icons

Each wound appears as a small icon. The icon style shows its current state:

- **Normal** — wound is waiting for its next roll.
- **Improved** (glowing / highlighted) — wound trended better on the last roll.
- **Worsened** (darkened / marked) — wound trended worse on the last roll.
- **Padlock overlay** — wound is locked for this season (already treated the maximum number of times, or locked due to individual-roll severity rules).

### Available Days

Defaults to **92** (a full season). Change this only if the wound was inflicted **partway through the current season** (e.g. the character was injured on day 30 of spring; set Available Days to 62). This field locks after the first roll.

### Progress bar and "days left" label

Shows how far through the season the recovery has advanced. The label reads _"X days left on next recovery roll"_ — this is the number of days remaining until the **next** roll is due, not until the season ends.

### Four action buttons

| Button                                              | When active                              | What it does                                                      |
| --------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------- |
| **Roll for recovery**                               | Wounds are due for treatment             | Rolls one recovery period                                         |
| **Fast recovery (auto-roll)**                       | Wounds are due for treatment             | Rolls all remaining periods automatically                         |
| **Overstrain check**                                | Any active wound exists                  | Rolls Stamina to see if exertion worsens the worst wound          |
| **End the season / Next season / End the recovery** | Season complete, or individual roll done | Creates the diary entry and advances to the next season if needed |

---

## Before You Roll — Setting Up the Session

1. **Open the Sanatorium** for the character.
2. **Check the season and year.** The Sanatorium auto-detects the correct treatment season based on when wounds were last treated. If this is the first season of recovery, it matches the current world date.
3. **Set Available Days** if the wound was inflicted mid-season (otherwise leave it at 92).
4. **Set Mundane Help** if a physician is attending (typical value: +3 for a skilled chirurgeon).
5. **Set Magical Help** if the character benefits from magical healing assistance.
6. You are ready to roll.

---

## Standard Recovery (Roll by Roll)

Click **"Roll for recovery"** once per recovery period.

Each click:

1. Rolls a stress die for every wound that is due for treatment this period.
2. Applies the roll result against each wound's improvement and stability thresholds.
3. Updates the wound icons (improved/worsened indicators).
4. Appends a dated log entry showing every wound's result.
5. Advances the progress bar to the next period.

**Repeat** until the button becomes disabled (no more wounds are due this season, or all remaining wounds are locked until next season).

When the "Roll for recovery" button greys out and the diary button activates, the season is done — see [Ending the Season](#ending-the-season-and-creating-the-diary-entry).

### What the roll results mean

For each Light / Medium / Heavy wound:

| Roll vs threshold       | Outcome       | Next period effect                         |
| ----------------------- | ------------- | ------------------------------------------ |
| ≥ Improvement threshold | **Improving** | Next roll uses one lighter gravity bracket |
| ≥ Stability threshold   | **Stable**    | Cumulative +3 bonus on next roll           |
| < Stability threshold   | **Worsening** | Next roll uses one heavier gravity bracket |

A wound that improves enough eventually reaches **Healthy** and heals with no further roll needed.  
A wound that worsens enough may become **Incapacitating**.

For **Incapacitating** wounds, all incap wounds share a single die per period:

| Roll result                     | Outcome                             |
| ------------------------------- | ----------------------------------- |
| ≤ 0 (botch)                     | Patient **dies** immediately        |
| ≥ Improvement                   | All incap wounds trend toward Heavy |
| ≥ Stability                     | Stable                              |
| < Stability (first time)        | Worsening trend                     |
| < Stability (already worsening) | Patient **dies**                    |

---

## Fast Recovery (Auto-Roll)

Click **"Fast recovery (auto-roll)"** to have the Sanatorium roll every remaining period in the season automatically without pausing for inspection between rolls.

- All rolls are made in sequence with a brief pause between each.
- When the season is exhausted, the diary entry is created **automatically** — you do not need to click the diary button separately.
- The log accumulates all period entries in one go; you can review the full season history in the diary that opens.

**Use Fast Recovery when:**

- You are catching up on multiple seasons at once and don't need to inspect each period.
- You have a single Light wound and just want to get through the season quickly.
- You are processing NPC wounds in bulk.

**Use Standard Recovery when:**

- You want to narrate each period individually.
- You are curious to see intermediate wound states (e.g. whether an Incapacitating wound survived its first roll before continuing).

---

## Individual Wound Recovery from the Wound Sheet

Any wound item has a **"Roll wound recovery"** button on its item sheet (the small icon/pencil view).

Clicking this button:

1. Opens the Sanatorium for the character automatically if it isn't already open.
2. Rolls recovery **only for that wound** and all wounds of equal or lesser severity.
3. Wounds of **strictly higher** severity are not rolled and are carried over unchanged.
4. Sets the Sanatorium into "individual roll done" state — the **"End the recovery"** diary button becomes available immediately.

### Which wounds roll together?

When you click "Roll wound recovery" on a wound of a given severity:

| Target wound | Also rolls                                | Not rolled                           |
| ------------ | ----------------------------------------- | ------------------------------------ |
| Medium wound | All Light wounds + other Medium wounds    | Heavy and Incapacitating wounds      |
| Heavy wound  | All Light, Medium, and other Heavy wounds | Incapacitating wounds                |
| Light wound  | Other Light wounds                        | Medium, Heavy, Incapacitating wounds |

### After an individual roll

The Sanatorium shows all results in the log. The diary button now reads **"End the recovery"**.

You can:

- **Click "End the recovery"** to commit the session now, document what happened, and stop.
- **Click "Roll wound recovery"** on a different wound from its item sheet to do another individual roll (e.g. treat the Incapacitating wound separately).
- The standard **"Roll for recovery"** button remains available if you want to switch to rolling everything due at once.

### Worsened wounds in an individual roll

If a lesser wound worsens during an individual roll and its new severity would reach or exceed the target wound's severity, **it is locked for the rest of the season**. The storyguide must explicitly roll it again in a future period (either by clicking its own "Roll wound recovery" button or via the standard Roll button).

_Example: Rolling for a Medium wound, a co-treated Light wound worsens. Its next effective bracket would be Medium — so it locks. It needs its own roll next season or a targeted individual roll._

---

## Ending the Season and Creating the Diary Entry

When the diary button is active, click it to:

1. Write the full session log (all periods, all wound outcomes) into each wound item's description as a dated entry.
2. Create a **Diary Entry** item on the character documenting the recovery season. The diary sheet opens automatically so you can review or annotate it.
3. If the current world date is ahead of this treatment season, the Sanatorium **auto-advances** to the next season without closing — see [Multi-Season Recovery](#multi-season-recovery-catch-up).
4. If there are no more seasons to catch up on, the Sanatorium closes.

### Button label tells you what will happen

| Label                | Meaning                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Next season**      | There are more treatment seasons to process; Sanatorium resets for the next one          |
| **End the season**   | This is the current season; Sanatorium closes after creating the diary                   |
| **End the recovery** | An individual wound roll was done; you are ending early before all periods are exhausted |

---

## Multi-Season Recovery (Catch-Up)

If the world date has advanced and a character has wounds that needed treatment across several past seasons, the Sanatorium handles them automatically:

1. Open the Sanatorium — it detects the earliest untreated season.
2. Roll (or fast-roll) the first season.
3. Click **"Next season"** — the diary entry is created, and the Sanatorium immediately resets to the next treatment season.
4. Repeat until you reach the current season, at which point the button reads **"End the season"** and the Sanatorium closes after the final diary.

You can use **Fast Recovery** for each catch-up season to speed through the process.

---

## Overstrain Checks

Click **"Overstrain check"** when a wounded character performs strenuous activity (combat, demanding spell casting, hard travel, heavy labour).

The Sanatorium:

1. Finds the **worst active wound** (highest severity that isn't dead or fully healed).
2. Rolls a Stamina stress die against that wound's stability threshold.
3. **Below threshold:** The wound worsens by one rank. A dated note is appended to the wound's description and a warning notification appears.
4. **At or above threshold:** The wound holds. A notification confirms no worsening.

This does **not** consume a recovery period — it is a separate check independent of the seasonal recovery rolls.

---

## Reading the Log

The log panel on the right side of the Sanatorium accumulates all events for the current session.

### Log structure

```
Autumn 1220

Recovery period, day 1
  Medium wound:
    Rolled 9 (Stress die + 0) vs 9
    Wound improvement in 30 days       ← will trend lighter next roll

  Light wound:
    Rolled 4 (Stress die + 0) vs 6
    Wound stabilized                   ← stable, cumulative +3 next time

-3 penalty (current wound total)

Recovery period, day 31
  Light wound (trending lighter):
    Rolled 11 (Stress die + 3) vs 6    ← +3 from stability bonus
    Wound improvement in 15 days

-2 penalty

Nothing else can be done this season.

Wound penalty of –2 was sustained for 61 days this season. [Advisory text]
```

### Log icons alongside wound images

When you hover over a wound icon, the tooltip shows the wound's name and its current accumulated bonus (displayed as `+N`). A **padlock** overlay means the wound is locked.

---

## The Wound Penalty Advisory Note

At the end of every season, if the character sustained a significant wound penalty for 30 or more days, an advisory note is automatically appended to the log. This note tells the storyguide what activities were restricted during that period.

| Worst sustained penalty | What the character could and couldn't do                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **–1 or –2**            | Normal travel and study. No strenuous activity (no Fatigue-costing spells). Lab work and crafts are fine.                                 |
| **–3 or –4**            | Slow travel only (rates halved). Study possible but Advancement Total halved if at this level for a month or more. No lab work or crafts. |
| **–5 or worse**         | Can talk, eat, and move short distances with assistance only. No productive activities of any kind.                                       |

This note appears in the log **before** you click the diary button, so you can see it immediately and narrate accordingly.

---

## Practical Examples

### Example 1 — Simple Light Wound

**Situation:** Aldemar took a Light wound in Spring 1220. It is now the start of Summer 1220.

1. Open the Sanatorium for Aldemar.
2. Season shows **Spring 1220** (the wound's infliction season). Available Days: 92.
3. No magical or mundane help — leave modifiers at 0.
4. Click **"Roll for recovery"**.
   - Light wound rolls. Result: 8 vs stability threshold 6 → **improved**.
   - Log: "Light wound: Rolled 8 vs 6. Wound improvement in 15 days."
5. Progress bar advances to day 15. Roll again.
   - Light wound (trending lighter, effective bracket = Healthy). No die needed — automatic heal.
   - Log: "Light wound completely healed in 30 days."
6. Button shows **"End the season"**. Click it.
7. Diary entry created. Sanatorium closes.

---

### Example 2 — Medium Wound with a Chirurgeon

**Situation:** Isolde has a Medium wound from a battle in Summer 1220. A chirurgeon (Mundane Help +3) is attending her.

1. Open Sanatorium. Season: Summer 1220. Available Days: 92.
2. Set **Mundane Help to 3**.
3. Click **"Roll for recovery"** (day 1).
   - Medium wound rolls. Result: 7 (die) + 3 (chirurgeon) = 10 vs improvement threshold 9 → **improved**.
4. Click **"Roll for recovery"** (day 31 — Medium interval is 30 days).
   - Wound now effective as Light (trending lighter). Rolls as Light. Result: 5 vs 6 → **stable**. Bonus becomes +3.
5. Click **"Roll for recovery"** (day 46).
   - Light wound with +3 bonus. Result: 4 + 3 = 7 vs 6 → **improved**.
6. Auto-advance to Healthy on day 61. All rolls done.
7. Log appended: _"Wound penalty of –3 was sustained for 30 days this season."_ + advisory (lab work impossible for that period).
8. Click **"End the season"**. Done.

---

### Example 3 — Individual Roll for One Wound

**Situation:** Bertram has both a Heavy wound and a Light wound. The player wants to see specifically how the Light wound progresses this period.

1. Open Bertram's Light wound item sheet.
2. Click **"Roll wound recovery"**.
   - Sanatorium opens (if not already open).
   - Rolls for the Light wound only (Heavy is excluded — rank too high).
3. Result: Light wound is stable.
4. Sanatorium log shows the Light wound result. The Heavy wound icon shows no change.
5. Diary button now reads **"End the recovery"**. Player decides to also roll the Heavy wound:
6. Open the Heavy wound item sheet → click **"Roll wound recovery"**.
   - Now both Light and Heavy wounds (plus any Medium wounds) roll together.
7. After both sets of rolls, click **"End the recovery"** to commit the session.

---

### Example 4 — Catching Up Three Seasons

**Situation:** Gilles was badly wounded in Spring 1220 and was not treated until the storyguide remembers in Winter 1220. Wounds: one Incapacitating, one Heavy.

1. Open Sanatorium for Gilles. It detects the earliest treatment season: **Spring 1220**.
2. Use **"Fast recovery (auto-roll)"** for Spring 1220.
   - Incapacitating wound rolls: total 6 → stable. Heavy wound delayed (incap was treated this period).
   - Diary created automatically. Sanatorium resets for **Summer 1220**.
3. Fast recovery Summer 1220.
   - Incap wound rolls again: total 12 → trends to Heavy. Heavy wound now rolls.
   - Diary created. Sanatorium resets for **Autumn 1220**.
4. Fast recovery Autumn 1220.
   - Both Heavy wounds roll. One improves (trending Medium). One worsens.
   - Diary created. Sanatorium detects no more catch-up needed → closes.
5. Three diary entries created, one per season.

---

### Example 5 — Overstrain During Recovery

**Situation:** Renaud has a Medium wound but insists on fighting in a tournament.

1. Open the Sanatorium.
2. Click **"Overstrain check"**.
   - Medium wound is the worst active wound.
   - Stamina roll: result 3 vs stability threshold 6 → **below threshold**.
   - Medium wound worsens to Heavy. Warning notification appears. Wound icon updates. Wound description gets a dated note: _"Worsened by overstrain in Autumn 1220."_
3. The seasonal recovery roll still happens normally later. The Heavy wound now participates in recovery as Heavy.

---

## Common Situations and Tips

**The "Roll for recovery" button is greyed out.**  
Either all wounds are locked for this season (already treated the maximum number of times), the patient is fully healed, or the patient is dead. If wounds remain but are locked, the season is done — click the diary button.

**Available Days should I change?**  
Only if the wound was inflicted mid-season. If a character is wounded on day 23 of a 92-day season, set Available Days to 69 (= 92 − 23). Leave it at 92 if the wound was inflicted before or at the very start of the season.

**The season and year look wrong.**  
The Sanatorium picks the earliest season where wounds need treatment. If you've already processed some seasons via diary entries, it jumps past those automatically. If it still looks wrong, check whether the wound items have the correct `inflictedDate` and `recoveryTime` values in their data.

**A wound icon has a padlock and the roll button is still greyed out.**  
All unlock-able wounds have been treated the maximum number of times this season. The season is complete — click the diary button even though `nextRecoveryPeriod` hasn't reached `availableDays`. The penalty advisory note (if any) will be added at that point.

**Magical Help vs. Recovery Bonus — what's the difference?**  
_Recovery Bonus_ is the total of all passive active effects on the character (auto-read from actor data). _Magical Help_ is an additional bonus you add manually to represent active magical assistance from another character during this recovery session (e.g. a covenant physician with _Chiurgeon's Healing Touch_). Both are added to every roll.

**Can I reopen the Sanatorium mid-session?**  
The Sanatorium registers itself on the actor. As long as you don't close the window, it retains full session state. If you accidentally close it, reopening it (or clicking a wound's roll button) creates a fresh session — any rolled-but-uncommitted log is lost. Always commit via the diary button before closing.
