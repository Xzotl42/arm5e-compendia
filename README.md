# Ars Magica Compendia

Module name : arm5e-compendia

![Latest Release Download Count](https://img.shields.io/github/downloads/Xzotl42/arm5e-compendia/latest/arm5e-compendia.zip)

Reference and template for personal shared compendia used with the [Ars Magica 5th Edition system for Foundry VTT](https://foundryvtt.com/packages/arm5e)

## Legalese stuff

- Based on the material for Ars Magica, ©1993–2024, licensed by Trident, Inc. d/b/a Atlas Games®, under [Creative Commons Attribution-ShareAlike 4.0 International license 4.0](https://creativecommons.org/licenses/by-sa/4.0/) ("CC-BY-SA 4.0")

- Ars Magica Open License Logo ©2024 Trident, Inc. The Ars Magica Open License Logo, Ars Magica, and Mythic Europe are trademarks of Trident, Inc., and are used with permission.

- Order of Hermes, Tremere, Doissetep, and Grimgroth are trademarks of Paradox Interactive AB and are used with permission.

- The use and inclusion of the logo, icon and art elements, as well as the use of terms, has been expressly authorized in written form by Holocubierta Ediciones, S.L. (https://www.holocubierta.com/), the licensee of the game Ars Magica 5th Edition for its publication in Spanish.

- Versión Española : La utilización e inclusión del logo, iconos y elementos artísticos, así como el uso de terminología, ha sido autorizado expresamente y por escrito por Holocubierta Ediciones, S.L. (https://www.holocubierta.com), licenciataria del juego Ars Magica 5ª Edición para su publicación en castellano.

Even if most of the line is under the open license above you can still get physical soft-cover sourcebooks at the [Atlas Games website](https://atlas-games.com).

## Support this project

If you like what I do and want to show support, you can buy me a coffee here:
[![Ko-fi](https://img.shields.io/badge/Ko--fi-xzotl-00B9FE?logo=kofi)](https://ko-fi.com/xzotl)

Big thanks to those who do!

[Join our Discord server!](https://discord.gg/DdDetc9SYP).

## Why this module?

- Since the open license is active, a way to distribute all the available content without disturbing the development of new features was needed.
- This new module can be updated without the need of a system release. Typos and errors can be easily fixed and the risk to break anything is very low
- It will serve as a template for your own shared compendia, with your own descriptions filled, in the language you prefer (see below for instructions)
- A setting will allow you to choose the reference module to be used by the system (it will fallback to the system reference if something is missing).

## Credits

A lot of people contributed to the compendium content, you can find a list as exhaustive as possible [here](Credits.md)

## Usage

Find below the different ways to use the module in incremental technical complexity. I recommand at least the "nobility" one for long term use.

Once you have done one of the methods below, go to the system configuration and select your new compendium:

![Reference compendium configuration](./assets/compendiaRefCfg.webp)

### Usage for the nobility

This will demand a little work on your side, but it should only be done once. Support and data migration will be provided "in app" for this one.

- Install the module using the manifest link above (update: it should be done automatically now)
- As a GM run the macro named "CreateCompendiaModule"

  ![Macro compendium](./assets/ModuleGenerator.webp)

- Fill the fields of the dialog:

  ![Generator dialog](./assets/GeneratorDialog.webp)

- Click the "Generate button
- **Important step : quit the Foundry app or stop the Foundry server**
- Go in the Foundry VTT data folder
- In the module subfolder, you will find the arm5e-compendia subfolder and your newly created module skeleton.
- COPY (ie: not move) the following folders from arm5e-compendia to the new module.

It should look like this:

- assets
- css
- lang
- packs
- scripts
- templates

![New module content](./assets/newModuleContent.webp)

- Start Foundry VTT, your world, activate your new personal module and you are done!

#### The good

- You can add customization to the system by editing the module script.
- You get support and migration scripts when new features are added.
- You can add new descriptions and translations as needed.

#### The bad

- Harder to contribute to the system

### Usage for the Hermetic Magus

This step demands a little technical knowledge but offers more possibilities and control

- Install node version 18+

Optionally:

- Install git
- Have a github account
- Fork the repository
- Check out the repository locally `git clone git@github.com:<MY_USERNAME>/arm5e-compendia.git`

Check [here](https://gist.github.com/Chaser324/ce0505fbed06b947d962) for more information on GIT usage in that context

Warning and reminder: Unless you have private repository, you cannot put the content of your compendia with full description on github for copyright reasons.

#### Installing

In a terminal, go the directory of the project and install all dependencies (ie: Foundry CLI)

```
npm install
```

#### Unpacked documents repository

The "unpacked" directory contains all the documents of all the compendia of the module. One file in json format per document, one subfolder per compendium.
You could edit them by hand, but don't unless you know what you are doing.

#### Packing the file into Foundry VTT databases

Warning: For convenience you can have the repository directly in the modules folder but do NOT run those scripts when a world is open in Foundry!

At that stage, the module is not usable as there is no compendium.

```shell
npm run pack
```

The command above will generate compendium files for Foundry V10 and V11 based on the content of the unpacked directory.

You can then load Foundry and edit as you wish.

#### Unpacking the databases to json files

After editing, close the world and run (V11 only)

```shell
npm run unpack
```

It will create or update files in the unpacked folder based on your changes.

## Contributing

This is an open-source project and we encourage fellow developers to contribute and help improve it!

1. Fork it.
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Contribute!
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a pull request.

You can also [join our Discord community](https://discord.gg/DdDetc9SYP).
