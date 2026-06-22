The sanatorium is a dialog to manage the recovery of wounds during a season. It is accessible in Description.Vitals&Combat by clicking the bandaged icon.

Note: A more complete userguide is available offline in the github wiki. However, part of it was created using AI so in order to keep this module free of AI user-facing content, it will stay there.

![](images/Health.webp)

For the sake of simplicity or until a deeper integration with Simple Calendar is done:

Season lengths (medieval conventional equinox/solstice dates):

| Season | Days |
| ------ | ---- |
| Spring | 92   |
| Summer | 92   |
| Autumn | 91   |
| Winter | 90   |

- Heavy wound recovery is 90 days
- Medium wound recovery is 30 days
- Light wound recovery is 7 days

### Interface

![](images/sanatorium.webp)

From top to bottom:

- A small vignette to show who is the patient
- The patient stamina (read only)
- **Recovery bonus**: Any modifier to recovery given by active effect (read only)
- **Mundane help**: Used for the chirurgy or medicine score of the physician
- **Magical help**: Used for Creo Corpus effects on the patient
- **Sanctum help**: Health modifier provided by the sanctum if any (read only).

All of the above can be changed in the middle of the season between recovery rolls (eg: if the physician is no longer available and/or a Corpus effect is cast afterward)

- The date is computed automatically using the oldest untreated wound not in the future. This will permit the recovery of wound inflicted during recovery.
  _For example: While recovering from a medium wound, Thibault fell badly in the stairs while trying to reach the latrines. Opening the sanatorium will allow the recovery of the new wound on the same season_

- The current wounds are displayed by increased gravity. A green aura means that the wound will improve at the end of the recovery period and a red aura indicates that it will get worse.
- If there is not enough days to do a recovery roll for this season or if the wound is fully healed, the wound icon will get a small lock icon on the top right corner.
- Hovering with the mouse on a wound will show the modifier to the next roll.
- For wounds inflicted mid-season, it is possible to adjust the number of days remaining before the first recovery roll.
- Button "Roll for recovery" : click until there is no more days available or wounds to recover from.
- Button "Fast recovery" : Same as above but all the rolls possible for the current season will be chained.
- Button "Overstrain check" : A stamina roll to check if the worst wound will get worse due to ill advised activity during recovery.
- Button "End of season" : Clickable only when it is not possible to roll anymore. It will create a new diary entry in the patient calendar containing the medical log for the season.

### Individual Wound Recovery from the Wound Sheet

Any wound item has a **"Roll wound recovery"** button on its item sheet. It will roll for recovery **only for that wound** and all wounds of equal or lesser severity, with the exception of incapacitating wounds that always need to be treated first.

Examples of when it is useful:

- A surgeon treating light wounds for 14 days does not interfere with a heavy wound recovering on its own 90-day rhythm. Set Mundane Help for the wound being treated; heavier wounds will be rolled later with their own separate modifiers.
- An incapacitating wound needs to be treated the same day, when a skilled physician or Creo Corpus specialist is still far away. It is possible to roll for recovery just for that until proper help arrives.

Important: this assumes that any mundane or magical help will be available during the whole recovery period. If a roll fails, you can stop the season at any time.

### Patient's file

- A log of all the rolls made for the season is created. It shows for each wound whether a roll has succeeded or failed and the wound penalty at the end of the period.
  Note: The RAW states that if more than a month is spent at a given wound penalty it can impact the seasonal activities for the season:
- -6 or greater : no other activity possible
- -3 to -5 : No lab activity or crafting possible
- -1 to -2 : No spells that cost fatigue (important if you intent to cast spontaneous CrCo spells for further recovery)
- At the end of each season, it will indicate what was the highest wound penalty endured for 30+ days.

### Medical history

All healed wounds are kept in the medical history next to the bandaged hand in the Vitals&Combat tab. You can clear it all using the Perdo hand gesture on the top-right.

![](images/MedicalHistory.webp)
