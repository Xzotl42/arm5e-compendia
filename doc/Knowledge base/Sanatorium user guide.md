# Sanatorium — User Guide

This guide explains how to use the Sanatorium wound-recovery interface in Ars Magica 5e for Foundry VTT.

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

![](images/SanatoriumUI.webp)

### Top row — Roll modifiers

| Field          | Editable? | Description                                                      |
| -------------- | --------- | ---------------------------------------------------------------- |
| Stamina        | Read-only | Character's Stamina score; used automatically in every roll      |
| Recovery Bonus | Read-only | Active spell/effect bonuses on the character (auto-populated)    |
| Mundane Help   | **Yes**   | Flat bonus from a chirurgeon, physician, or other mundane career |
| Magical Help   | **Yes**   | Flat bonus from magical assistance (e.g. a _Purification_ spell) |
| Sanctum        | Read-only | Lab Health bonus for linked sanctum (magi only; auto-populated)  |

**Mundane Help and Magical Help are the only two fields you need to set manually.** Set them before the first roll of the season; they cannot be meaningfully changed mid-session because the session fields lock after the first roll.

### Wound icons

Each wound appears as a small icon. The icon reflects the wound's **committed** gravity — improvement and worsening are deferred by one period. A single improving roll sets a trend (the icon border glows) but does not change the gravity rank yet; the rank only changes when the trend is confirmed on the following roll.

Icon border styles show the outcome of the most recent roll:

- **Normal** — wound is waiting for its next roll.
- **Improved** (glowing / highlighted) — wound improved on the last roll.
- **Worsened** (darkened / marked) — wound worsened on the last roll.
- **Padlock overlay** — wound is locked for this season (already treated the maximum number of times, or excluded due to individual-roll severity rules).

### Season day

Defaults to **1** (first day of the season — full season available). Change this only if the wound was inflicted **partway through the current season**: enter the day of the season on which the injury occurred (e.g. the character was injured on day 30 of spring — set Season day to 30). The Sanatorium computes the number of available days automatically from the season's length. This field locks after the first roll.

Season lengths (medieval conventional equinox/solstice dates):

| Season | Days |
| ------ | ---- |
| Spring | 92   |
| Summer | 92   |
| Autumn | 91   |
| Winter | 90   |

### Progress bar and "days left" label

Shows how far through the season the recovery has advanced. The label reads _"X days left on next recovery roll"_ — this is the number of days remaining in the season when the **next** roll is due.

> **Note:** If the world date changes while the Sanatorium is open (e.g. the storyguide advances the season), the **Next season / End the season** button updates automatically to reflect whether further catch-up seasons are now available.

### Four action buttons

| Button                                              | When active                                          | What it does                                                      |
| --------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| **Roll for recovery**                               | Wounds are due for treatment                         | Rolls one recovery period                                         |
| **Fast recovery (auto-roll)**                       | Wounds are due for treatment                         | Rolls all remaining periods automatically                         |
| **Overstrain check**                                | Any active wound exists, **rolling not yet started** | Rolls Stamina to see if exertion worsens the worst wound          |
| **End the season / Next season / End the recovery** | Season complete, or individual roll done             | Creates the diary entry and advances to the next season if needed |

---

## Before You Roll — Setting Up the Session

1. **Open the Sanatorium** for the character.
2. **Check the season and year.** The Sanatorium auto-detects the correct treatment season based on when wounds were last treated. If this is the first season of recovery, it matches the current world date.
3. **Set Season day** if the wound was inflicted mid-season (enter the day of the season the wound was received; otherwise leave it at 1).
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

For each Light / Medium / Heavy wound, improvement and worsening are **deferred by one period** — the first trigger sets a trend and keeps the wound in its current state; the second consecutive trigger commits to the new gravity rank.

| Roll vs threshold                       | Outcome for this roll                                           | What happens next period                                                         |
| --------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ≥ Improvement (no prior trend)          | **Trending better** — wound stays in current state, icon glows  | Next roll rolls as one lighter bracket; improves again → commits to lighter rank |
| ≥ Improvement (already trending better) | **Commits lighter** — gravity drops one rank                    | Normal roll from the new, lighter bracket                                        |
| ≥ Stability                             | **Stable** — cumulative +3 bonus; trend cleared                 | Normal roll at current gravity                                                   |
| < Stability (no prior trend)            | **Trending worse** — wound stays in current state, icon darkens | Next roll rolls as one heavier bracket; worsens again → commits to heavier rank  |
| < Stability (already trending worse)    | **Commits heavier** — gravity rises one rank                    | Normal roll from the new, heavier bracket                                        |

> **"Stays in current state"**: the wound's displayed gravity does not change yet. The icon border shows the trend direction. The gravity shift only happens when the wound is next due and rolls again.

A wound that improves enough eventually reaches **Healthy** and heals with no further roll needed.
A wound that worsens enough may become **Incapacitating**.

For **Incapacitating** wounds, all incap wounds share a single die per period and use a **two-step improvement**:

| Roll result                     | Outcome                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| ≤ 0 (botch)                     | Patient **dies** immediately                                                                 |
| ≥ Improvement                   | Wound stays incap, now **trending better**; one **Heavy-grade roll** resolves it next period |
| ≥ Stability                     | Stable; bonus decrements by 1 and carries into the sunset roll                               |
| < Stability (first time)        | Worsening trend                                                                              |
| < Stability (already worsening) | Patient **dies**                                                                             |

The Heavy-grade roll on a trending-better incap wound follows normal Heavy rules:

| Heavy-grade roll result | Outcome                              | Next roll due in                                                          |
| ----------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| ≥ Improvement           | Commits to **Medium**                | 30 days (Medium interval)                                                 |
| ≥ Stability             | Commits to **Heavy**                 | 90 days (Heavy interval)                                                  |
| < Stability             | Reverts to **Incap** (trend cleared) | 90 days (Heavy interval — the roll was Heavy-grade regardless of outcome) |

> **Important:** When an incap wound is **trending better**, it rolls as a Heavy-grade wound and is **no longer a blocking incap wound**. Light, Medium, and Heavy wounds that are due in the same period **also roll normally** — they are not delayed by the incap interval that day.

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
3. Wounds of **strictly higher** severity are **left completely untouched** — their next roll date, bonus, and trend are not modified in any way. They recover entirely independently, on their own schedule, with whatever modifiers apply when they are eventually rolled.
4. Sets the Sanatorium into "individual roll done" state — the **"End the recovery"** diary button becomes available immediately.

> **Why this matters:** A surgeon treating light wounds for 14 days does not interfere with a heavy wound recovering on its own 90-day rhythm. Set Mundane Help for the wound being treated; heavier wounds will be rolled later with their own separate modifiers.

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
  - If any wound targeted in the session is currently **trending better** (it improved on the last roll but hasn't committed to a lighter rank yet), clicking "End the recovery" **automatically commits it one rank lighter** without requiring an additional roll. You do not need to wait for the next period to see the improvement take effect.
- **Click "Roll wound recovery"** on a different wound from its item sheet to do another individual roll (e.g. treat the Incapacitating wound separately).
- **Click "Roll for recovery"** to roll the next period for the same set of wounds. The severity rank ceiling set by the original target wound is **preserved** — wounds of strictly higher rank remain excluded. This is not a switch to a full standard roll.

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

> **This button is only available before any recovery rolling has started in the current session** (general or individual). Once a recovery roll is made, the Overstrain button is disabled — wound history must not be altered mid-recovery.

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
2. Season shows **Spring 1220** (the wound's infliction season). Season day: 1 (full 92 days available).
3. No magical or mundane help — leave modifiers at 0.
4. Click **"Roll for recovery"**.
   - Light wound rolls. Result: 8 vs stability threshold 6 → **improved**.
   - Log: "Light wound: Rolled 8 vs 6. Wound improvement in 7 days."
5. Progress bar advances to day 8. Roll again.
   - Light wound (trending lighter, effective bracket = Healthy). No die needed — automatic heal.
   - Log: "Light wound completely healed."
6. Button shows **"End the season"**. Click it.
7. Diary entry created. Sanatorium closes.

---

### Example 2 — Medium Wound with a Chirurgeon

**Situation:** Isolde has a Medium wound from a battle in Summer 1220. A chirurgeon (Mundane Help +3) is attending her.

1. Open Sanatorium. Season: Summer 1220. Season day: 1 (full 92 days available).
2. Set **Mundane Help to 3**.
3. Click **"Roll for recovery"** (day 1).
   - Medium wound rolls. Result: 7 (die) + 3 (chirurgeon) = 10 vs improvement threshold 9 → **improved** (trending lighter).
4. Click **"Roll for recovery"** (day 31 — Medium interval is 30 days).
   - Wound rolls as Light-grade (trending lighter). Result: 5 (die) + 3 (chirurgeon) = 8 vs Light improvement threshold 6 → **improved** (commits to Light).
5. Click **"Roll for recovery"** (day 38 — Light interval is 7 days).
   - Light wound rolls. Result: 4 (die) + 3 (chirurgeon) = 7 vs 6 → **improved** (trending lighter).
6. Auto-advance to Healthy on day 45. All rolls done.
7. Log appended: _"Wound penalty of –3 was sustained for 30 days this season."_ + advisory (lab work impossible for that period).
8. Click **"End the season"**. Done.

---

### Example 3 — Individual Roll for One Wound

**Situation:** Bertram has both a Heavy wound and a Light wound. The player wants to see specifically how the Light wound progresses this period.

1. Open Bertram's Light wound item sheet.
2. Click **"Roll wound recovery"**.
   - Sanatorium opens (if not already open).
   - Rolls for the Light wound only. The Heavy wound is **left completely untouched** — its schedule, bonus, and trend are unchanged.
3. Result: Light wound is stable.
4. Sanatorium log shows the Light wound result. The Heavy wound icon shows no change.
5. Diary button now reads **"End the recovery"**. Player decides to also roll the Heavy wound:
6. Open the Heavy wound item sheet → click **"Roll wound recovery"**.
   - Rolls for Heavy and all lower-severity wounds (Light and Medium if any).
7. After both sets of rolls, click **"End the recovery"** to commit the session.

> **Tip:** Set Mundane Help separately for each individual roll. A chirurgeon attending the Light wound (Help +3, roll Light) and no chirurgeon for the Heavy wound (Help 0, roll Heavy) is perfectly valid.

---

### Example 4 — Catching Up Three Seasons

**Situation:** Gilles was badly wounded in Spring 1220 and was not treated until the storyguide remembers in Winter 1220. Wounds: one Incapacitating, one Heavy.

1. Open Sanatorium for Gilles. It detects the earliest treatment season: **Spring 1220**.
2. Use **"Fast recovery (auto-roll)"** for Spring 1220 (91 days).
   - **Day 1:** The Incapacitating wound rolls at sunrise and sunset (1-day interval). Both sub-rolls are stable. The wound's bonus decrements by 1 per stable sub-roll: after two stable sub-rolls, bonus = −2. The Heavy wound's next scheduled roll is pushed forward by 1 day.
   - **Day 2:** Bonus is now −2; total roll = die + Stamina − 2. Both sub-rolls stable again → bonus = −4.
   - **Day 3:** Bonus = −4; total = die + Stamina − 4. Sunrise sub-roll is above the improvement threshold → wound is now **trending better**, stays in incap state, sunset skipped.
   - **Day 4:** Wound is now **trending better**. It rolls once as a **Heavy-grade** wound. The roll is above Heavy's improvement threshold → commits to Medium. There is no incapacitating wound left.
     - Because the wound is no longer a blocking incap wound, the Heavy wound **also rolls** this same period. Say it is stable.
   - No more incap-priority wounds — the Medium wound (former incap) and the Heavy wound roll normally for the rest of the season.
   - **End of Spring 1220:** Diary created automatically. Sanatorium resets for **Summer 1220**.
3. Fast recovery Summer 1220.
   - The Medium wound (former incap) rolls on its 30-day cadence; the Heavy wound on its 90-day cadence. Both proceed independently.
   - Diary created. Sanatorium resets for **Autumn 1220**.
4. Fast recovery Autumn 1220.
   - Both wounds roll. Medium improves to Light; Heavy stabilises.
   - Diary created. Sanatorium detects no more catch-up needed → closes.
5. Three diary entries created, one per season.

> **Note:** The −1 bonus per stable sub-roll (two sub-rolls per day) means the incap wound's roll total falls by 2 every stable day. Within three to five days a patient with no medical help will likely either improve (lucky die) or die (total ≤ 0), making incapacitating wounds genuinely lethal without prompt treatment. Good Mundane Help (+3 from a chirurgeon) or Magical Help buys a few extra days before the decrement overwhelms the roll.

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

**Should I change Season day?**  
Only if the wound was inflicted mid-season. If a character is wounded on day 23, set Season day to 23 and the Sanatorium computes the remaining available days automatically (e.g. 92 − 23 + 1 = 70 for a spring wound). Leave it at 1 if the wound was inflicted before or at the very start of the season.

**The season and year look wrong.**  
The Sanatorium picks the earliest season where wounds need treatment. If you've already processed some seasons via diary entries, it jumps past those automatically. If it still looks wrong, check whether the wound items have the correct date of injury and last treatment date recorded in their data.

**A wound icon has a padlock and the roll button is still greyed out.**  
All unlock-able wounds have been treated the maximum number of times this season. The season is complete — click the diary button even though the season still has days remaining. The penalty advisory note (if any) will be added at that point.

**Magical Help vs. Recovery Bonus — what's the difference?**  
_Recovery Bonus_ is the total of all passive active effects on the character (auto-read from actor data). _Magical Help_ is an additional bonus you add manually to represent active magical assistance from another character during this recovery session (e.g. a covenant Magus with Creo Corpus effect). Both are added to every roll.

**Can I reopen the Sanatorium mid-session?**  
The Sanatorium registers itself on the actor. As long as you don't close the window, it retains full session state. If you accidentally close it, reopening it (or clicking a wound's roll button) creates a fresh session — any rolled-but-uncommitted log is lost. Always commit via the diary button before closing.

_Reviewed by Xzotl 2026.03.13_
