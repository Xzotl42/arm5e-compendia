import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively collect all .md files under `dir`.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function collectMdFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (ent) => {
      const res = path.join(dir, ent.name);
      if (ent.isDirectory()) return collectMdFiles(res);
      if (ent.isFile() && res.toLowerCase().endsWith(".md")) return [res];
      return [];
    })
  );
  return Array.prototype.concat(...files);
}

function _escapeForRegex(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

/**
 * Replace image links in markdown files:
 *  from: ![](images/FILENAME.<ext>) or ![[images/FILENAME.<ext>]]
 *  to:   ![](modules/<moduleName>/doc/images/FILENAME.<ext>)
 *
 * @param {Object} options
 * @param {string} [options.docDir] - path to `doc` directory (defaults one level up: module/doc)
 * @param {string} [options.moduleName] - module folder name (defaults 'arm5e-compendia')
 * @param {boolean} [options.dryRun] - if true, do not write files; return planned changes
 * @param {string[]} [options.extensions] - image extensions to match (defaults common image types)
 * @returns {Promise<{changedFiles: string[], summary: {checked: number, changed: number}}>}
 */
export async function prepareForImport({
  docDir,
  moduleName = "arm5e-compendia",
  dryRun = false,
  extensions = ["webp", "png", "jpg", "jpeg", "gif", "svg", "bmp", "avif"]
} = {}) {
  // Default docDir to repo relative: assume this file sits in scripts/
  if (!docDir) {
    // go up one directory from scripts to module root, then into doc
    const moduleRoot = path.resolve(__dirname, "..");
    docDir = path.join(moduleRoot, "doc");
  }

  // Normalize paths for replacement target
  const replacementPrefix = `modules/${moduleName}/doc/images/`;

  // Build extension pattern safely (escape any special chars)
  const extPattern = extensions.map(_escapeForRegex).join("|");

  // Regex to match both formats:
  // 1. ![](images/FILENAME.<ext>) — markdown links
  // 2. ![[images/FILENAME.<ext>]] — wiki-style links
  // - captures filename (including possible subpaths) ending with a configured extension
  // - case-insensitive to match .JPG, .WebP, etc.
  const regexMarkdown = new RegExp(`!\\[\\]\\(\\s*images\\/([^\\)\\s]+?\\.(${extPattern}))\\s*\\)`, "gi");
  const regexWiki = new RegExp(`!\\[\\[\\s*images\\/([^\\]\\s]+?\\.(${extPattern}))\\s*\\]\\]`, "gi");

  const mdFiles = await collectMdFiles(docDir);
  let checked = 0;
  const changedFiles = [];

  for (const filePath of mdFiles) {
    checked++;
    let content;
    try {
      content = await fs.readFile(filePath, "utf8");
    } catch (err) {
      console.warn(`Could not read ${filePath}: ${err.message}`);
      continue;
    }

    let newContent = content;

    // Replace markdown-style links (keep as markdown)
    newContent = newContent.replace(regexMarkdown, (match, p1) => {
      return `![](${replacementPrefix}${p1})`;
    });

    // Replace wiki-style links (convert to markdown)
    newContent = newContent.replace(regexWiki, (match, p1) => {
      return `![](${replacementPrefix}${p1})`;
    });

    if (newContent !== content) {
      changedFiles.push(filePath);
      if (!dryRun) {
        try {
          await fs.writeFile(filePath, newContent, "utf8");
        } catch (err) {
          console.error(`Failed to write ${filePath}: ${err.message}`);
        }
      }
    }
  }

  return {
    changedFiles,
    summary: {
      checked,
      changed: changedFiles.length
    }
  };
}

/**
 * Replace image links in markdown files in reverse:
 *  from: ![](modules/<moduleName>/doc/images/FILENAME.<ext>) or ![[modules/<moduleName>/doc/images/FILENAME.<ext>]]
 *  to:   ![](images/FILENAME.<ext>)
 *
 * @param {Object} options
 * @param {string} [options.docDir] - path to `doc` directory (defaults one level up: module/doc)
 * @param {string} [options.moduleName] - module folder name (defaults 'arm5e-compendia')
 * @param {boolean} [options.dryRun] - if true, do not write files; return planned changes
 * @param {string[]} [options.extensions] - image extensions to match (defaults common image types)
 * @returns {Promise<{changedFiles: string[], summary: {checked: number, changed: number}}>}
 */
export async function prepareForCommit({
  docDir,
  moduleName = "arm5e-compendia",
  dryRun = false,
  extensions = ["webp", "png", "jpg", "jpeg", "gif", "svg", "bmp", "avif"]
} = {}) {
  if (!docDir) {
    const moduleRoot = path.resolve(__dirname, "..");
    docDir = path.join(moduleRoot, "doc");
  }

  const extPattern = extensions.map(_escapeForRegex).join("|");
  const modNamePattern = _escapeForRegex(moduleName);

  // Match both formats:
  // 1. ![](modules/<moduleName>/doc/images/FILENAME.<ext>) — markdown links
  // 2. ![[modules/<moduleName>/doc/images/FILENAME.<ext>]] — wiki-style links
  const regexMarkdown = new RegExp(
    `!\\[\\]\\(\\s*modules\\/${modNamePattern}\\/doc\\/images\\/([^\\)\\s]+?\\.(${extPattern}))\\s*\\)`,
    "gi"
  );
  const regexWiki = new RegExp(
    `!\\[\\[\\s*modules\\/${modNamePattern}\\/doc\\/images\\/([^\\]\\s]+?\\.(${extPattern}))\\s*\\]\\]`,
    "gi"
  );

  const mdFiles = await collectMdFiles(docDir);
  let checked = 0;
  const changedFiles = [];

  for (const filePath of mdFiles) {
    checked++;
    let content;
    try {
      content = await fs.readFile(filePath, "utf8");
    } catch (err) {
      console.warn(`Could not read ${filePath}: ${err.message}`);
      continue;
    }

    let newContent = content;

    // Replace markdown-style links
    newContent = newContent.replace(regexMarkdown, (match, p1) => {
      return `![](images/${p1})`;
    });

    // Replace wiki-style links (convert to markdown)
    newContent = newContent.replace(regexWiki, (match, p1) => {
      return `![](images/${p1})`;
    });

    if (newContent !== content) {
      changedFiles.push(filePath);
      if (!dryRun) {
        try {
          await fs.writeFile(filePath, newContent, "utf8");
        } catch (err) {
          console.error(`Failed to write ${filePath}: ${err.message}`);
        }
      }
    }
  }

  return {
    changedFiles,
    summary: {
      checked,
      changed: changedFiles.length
    }
  };
}
