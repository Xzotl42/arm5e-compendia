import { once } from "events";
import { createReadStream } from "fs";
import { createInterface } from "readline";

function slugify(str) {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove all accents.
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}
(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: createReadStream("../ArM5IndexS&MbyShape.txt"),
      crlfDelay: Infinity
    });
    let count = 0;
    let SHAPES = {};
    let shapeRE =
      /^(?<shape>[a-zA-Z,\(\)\/'\s\-]+)\s{2,}(?<effect>[a-zA-Z\,\(\)\s\/'\-]+\w+)\s{3,}(?<bonus>\d+)\s{3,}(?<source>[a-zA-Z:&]+\w+)\sp(?<page>\d+)/;
    // /^(?<shape>[a-zA-Z\,\(\)\s\/'\-]+[\)\w]+)\s{2,}(?<effect>[a-zA-Z\,\(\)\s\/'\-]+\w+)\s{3,}(?<bonus>\d+)\s{3,}(?<source>[a-zA-Z\,\(\)\s\/'\-]+\w+)\sp(?<page>\d+)$/;
    rl.on("line", (line) => {
      if (line.length == 0) return;
      if (/^\-{1,}\sPage.*/.test(line)) return;
      if (/^\s+Page\s\d+\sof.*/.test(line)) return;
      // if (/^([a-zA-Z\,\(\)\s\/]+\w+)\s{2,}([a-zA-Z\,\(\)\s]+\w+)(\d+)\s+(.*)$/.test(line)) {
      if (shapeRE.test(line)) {
        let matched = line.match(shapeRE);
        let slug1 = slugify(matched.groups.shape);
        let slug2 = slugify(matched.groups.effect);
        let capitalized = matched.groups.effect.trim();
        capitalized = capitalized.charAt(0).toUpperCase() + capitalized.slice(1);
        if (SHAPES.hasOwnProperty(slug1)) {
          SHAPES[slug1].effects[slug2] = {
            name: capitalized,
            bonus: +matched.groups.bonus
          };
        } else {
          SHAPES[slug1] = {
            name: matched.groups.shape.trim(),
            src: matched.groups.source,
            page: matched.groups.page,
            effects: {
              [slug2]: {
                name: capitalized,
                bonus: +matched.groups.bonus
              }
            }
          };
        }
        console.log(
          `shape: ${matched.groups.shape}, effect: ${matched.groups.effect}, bonus : ${matched.groups.bonus}, src: ${matched.groups.source}, page: ${matched.groups.page}`
        );
        // console.log(`Match ${line}`);
      } else {
        console.log(`No match ${count++}: ${line}`);
      }
    });

    await once(rl, "close");
    console.log(`${JSON.stringify(SHAPES)}`);
    console.log(`No match count: ${count}`);
    console.log("Reading file line by line with readline done.");
  } catch (err) {
    console.error(err);
  }
})();
