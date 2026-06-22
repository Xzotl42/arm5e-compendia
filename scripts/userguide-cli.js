#!/usr/bin/env node
// scripts/userguide-cli.js
import { prepareForImport, prepareForCommit } from "./userguideMgr.js";

function parseKV(name) {
  const arg = process.argv.find((a) => a.startsWith(`--${name}=`));
  return arg && arg.split("=")[1];
}
function boolFlag(...names) {
  return names.some((n) => process.argv.includes(n));
}

(async function main() {
  const cmd = process.argv[2];
  const dryRun = boolFlag("--dry", "--dry-run");
  const moduleName = parseKV("module") || "arm5e-compendia";
  const docDir = parseKV("docDir"); // optional
  const exts = parseKV("ext") || parseKV("extensions");
  const extensions = exts
    ? exts
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;

  try {
    if (cmd === "import") {
      const res = await prepareForImport({ docDir, moduleName, dryRun, extensions });
      console.log(JSON.stringify(res, null, 2));
    } else if (cmd === "commit") {
      const res = await prepareForCommit({ docDir, moduleName, dryRun, extensions });
      console.log(JSON.stringify(res, null, 2));
    } else {
      console.log("Usage: node ./scripts/userguide-cli.js <import|commit> [--dry] [--module=NAME] [--ext=png,jpg]");
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
})();
