![](images/CanvasMenu.webp)

The Ars Magica system has its own set of tools available in the canvas menu on the left.

- The Aura management tool
- A button to quickly clear auras from the current scene
- The Astrolabium to manage everything time related.
- The Scriptorium to manage everything book related.
- More to come as needed

The above will be detailed below.

## Aura management (GM only)

This dialog allows to define an aura for the current scene. The type of aura will impact the use of magic, supernatural abilities (soon) and powers as the realm interaction table in the core book.

- To be impacted by an aura, a character must be a magus, a NPC entity with a might in a specific realm or have the realm alignment active effect (see [[Active effects]])
- **Important:** An aura is only effective in the current _active_ scene. You can have multiple scenes with their own aura but only the active scene will be effective.
- **Limitation:** It is not possible at the moment to have multiple supernatural abilities aligned with different realms.

## The Astrolabium (GM only)

Manage everything time related**Dev note:** This dialog is still rough at the angles and its design is still unfinished, but I needed to put some preliminary useful tools in. It will be rearranged in the future, when time related features like spell effects are in place. Also expect some basic "Simple Calendar" module integration in the future.

- **Set world date** button will the set the configured date to be the world current date. All new actors will have it at creation.
- **Update actors:** Update all world actors to the current date.

## The Scriptorium

This dialog is managing all things book related.

**Dev note:** Only reading is implemented for now, but expect writing and book crafting tabs in the future.

![](images/Scriptorium1.webp)

The instructions are pretty clear: drop a character to act as a reader, optionally you can drop a book to fill all the fields automatically or invent a virtual book on the spot.

- After dropping a book, the fields become read only. If you wanted to use the book as a template, you can unlink it by clicking on the chain link icon and edit it again.
- You can reset the reader by clicking on the chain link icon.
- A faster and more convenient way to open the Scriptorium is from the book sheet (eye icon). The book will automatically be selected and if it is owned by a character, the reader too.
- A number of checks are made before before being able to read a book:

  - The "reader" must be able to read (ie: Artes Liberales 1+)
  - It must know a language at level 4. (It is too complex/impossible for the system to check whether it is the right language. Subject to GM approval)
  - The book level (for summa) must be greater than the reader skill in the topic.

- The quality increase will be capped to the level of the book. You will be warned and any excess will be discarded.

![](images/Scriptorium2.webp)

- For spell masteries and generic abilities, it is difficult to have an exact match of the name of the spell (eg: translation) or ability option. The choice is given to pick the correct one with GM approval.
- Once everything is set up properly, the "Create activity" button will be enabled to create a new diary entry. The latter can then be applied and rollbacked if needed (see [[Long term activities]] )
