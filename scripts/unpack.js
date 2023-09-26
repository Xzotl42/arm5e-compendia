import { extractPack } from "@foundryvtt/foundryvtt-cli";
import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";
export async function unpackDatabases(inputdir, unpacksdir, packNeDB, packClassicLevel) {
  return readdir(inputdir)
    .then(async (dir) => {
      for (const subdir of dir) {
        if (statSync(`${inputdir}/${subdir}`).isDirectory()) {
          if (packClassicLevel) {
            // Compile a LevelDB compendium pack.
            await extractPack(`${inputdir}/${subdir}`, `${unpacksdir}/${subdir}`)
              .then(() => {
                console.info(`Unpacked ${subdir} from a classic LevelDB`);
              })
              .catch((err) => {
                console.error(`Error packing ${subdir} as a classic LevelDB`);
                throw err;
              });
          }
          if (packNeDB) {
            await extractPack(`${inputdir}/${subdir}`, `${unpacksdir}/${subdir}`)
              .then(() => {
                console.info(`Unpacked ${subdir} from a NeDB`);
              })
              .catch((err) => {
                console.error(`Error packing ${subdir} as a NeDB`);
                throw err;
              });
          }
        }
      }
    })
    .catch((err) => {
      console.error("Error reading input directory");
      throw err;
    });
}

await unpackDatabases("packs", "unpacked", false, true);
// Extract a NeDB compendium pack.
//await extractPack("mymodule/packs/actors.db", "mymodule/packs/src/actors", { nedb: true });

// Compile a LevelDB compendium pack.
// await compilePack("mymodule/packs/src/actors", "mymodule/packs/actors");
