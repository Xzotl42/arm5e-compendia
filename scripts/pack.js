import { compilePack, extractPack } from "@foundryvtt/foundryvtt-cli";
import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";
export async function packDatabases(inputdir, packsdir, packNeDB, packClassicLevel) {
  return readdir(inputdir)
    .then(async (dir) => {
      for (const subdir of dir) {
        if (statSync(`${inputdir}/${subdir}`).isDirectory()) {
          if (packClassicLevel) {
            // Compile a LevelDB compendium pack.
            await compilePack(`${inputdir}/${subdir}`, `${packsdir}/${subdir}`)
              .then(() => {
                console.info(`Packed ${subdir} as a classic LevelDB`);
              })
              .catch((err) => {
                console.error(`Error packing ${subdir} as a classic LevelDB`);
                throw err;
              });
          }
        }
        if (packNeDB) {
          await compilePack(`${inputdir}/${subdir}`, `${packsdir}/${subdir}.db`, {log: true,nedb: true})
            .then(() => {
              console.info(`Packed ${subdir} as a NeDB`);
            })
            .catch((err) => {
              console.error(`Error packing ${subdir} as a NeDB`);
              throw err;
            });
        }
      }
    })
    .catch((err) => {
      console.error("Error reading input directory");
      throw err;
    });
}


await packDatabases("unpacked", "packs", true, true);
// Extract a NeDB compendium pack.
//await extractPack("mymodule/packs/actors.db", "mymodule/packs/src/actors", { nedb: true });

// Compile a LevelDB compendium pack.
// await compilePack("mymodule/packs/src/actors", "mymodule/packs/actors");
