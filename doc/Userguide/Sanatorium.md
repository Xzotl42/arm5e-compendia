The sanatorium is a dialog to manage the recovery of wounds during a season. It is accessible in Description.Vitals&Combat by clicking the bandaged icon.

![](modules/arm5e-compendia/doc/images/Health.webp)

For the sake of simplicity or until a deeper integration with Simple Calendar is done:

- One season equals 92 days
- Heavy wound recovery is 90 days
- Medium wound recovery is 30 days
- Light wound recovery is 7 days

### Interface

![](modules/arm5e-compendia/doc/images/sanatorium.webp)

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
- Button "Roll for recovery" : click until there is no more days available or wounds to recover from
- Button "End of season" : Clickable only when it is not possible to roll anymore. It will create a new diary entry in the patient calendar containing the medical log for the season.

### Patient's file

- A log of all the rolls made for the season is created. It shows for each wound whether a roll has succeeded or failed and the wound penalty at the end of the period.
  Note: The RAW states that if more than a month is spent at a given wound penalty it can impact the seasonal activities for the season:
- -6 or greater : no other activity possible
- -3 to -5 : No lab activity or crafting possible
- -1 to -2 : No spells that cost fatigue (important if you intent to cast spontaneous CrCo spells for further recovery)
- Dev note: Unfortunately, between wound getting worse and better during a season and multiple recovery activities the same season, it has become too complex to compute reliably if the penalty lasted a month during the season (not that it is impossible to do, but it is simpler to do the math... for now)

### Medical history

All healed wounds are kept in the medical history next to the bandaged hand in the Vitals&Combat tab. You can clear it all using the Perdo hand gesture on the top-right.

![](modules/arm5e-compendia/doc/images/MedicalHistory.webp)
