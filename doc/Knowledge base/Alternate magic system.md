
## Disclaimer: EXPERIMENTAL. 
This is an experimental feature, it is usable and functional but it may drastically change under the hood in the future. Until the experimental flag is removed and even if I will try to avoid it, I won't guarantee backward compatibility in future versions.

## Hedge magic user guide

### To enable it on a character:
Add an active effect:
Character features => Alternate magic system

It will add a new tab, go to the configuration subtab to customize your magic system:

![](images/AlternateMagicSystemConfig.webp)

Not everything is used yet, but you can see that it impacts the name of some of the new tabs.

### Alternate arts

In the next section you can define alternate verbs and nouns (ie: techniques and forms). Those are like abilities but have no specialty and are usually not used independently (eg: you don't roll Sta + Creo or Dex + Ignem). If accelerated they progress like hermetic arts
![](images/AlternateArts.webp)

![](images/AlternateArt.webp)

It is an important distinction as some traditions don't use alternate arts but abilities (usually supernatural) with specialities etc.

### Template definitions

Hedge magic traditions often have a different set of magic rolls where rules differ slightly (Hermetic analogy would be: formulaic, ritual, spontaneous). 
You define those in templates:

In order of apparition:

- **Template name**: a new section of this name will appear in the effect sub-tab for alternate magic system
- **Target type** Only simple type for now. (ie: only a simple target number to reach for the supernatural effect to succeed, instead of a spell-like form with ranges, duration, etc...)
- **Roll type** the kind of roll allowed for casting the effect (simple, stress, both, no roll)
- **Use fatigue**: Whether it uses fatigue on cast.
  - **Characteristic** to use for casting total (none is possible).
- **Verb** can be:
   - Alternate technique defined above, with the option to leave open all existing ones for the effects of this template.
   - An ability, which doesn't need to be owned by the caster, yet. see below
- **Noun** same as verb
- **Others** 
  - Multiplier : no implemented yet
  - Modifier : flat modifier to the casting total, it can be named to reflect its source
  - **Bonus ability:** some tradition have a bonus ability to add to the verb and noun.