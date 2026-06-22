import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively collect all .md files under `dir`, skipping any file
 * whose name appears in `excludeFiles`.
 * @param {string} dir
 * @param {string[]} [excludeFiles] - file names to skip (case-insensitive)
 * @returns {Promise<string[]>}
 */
async function collectMdFiles(dir, excludeFiles = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (ent) => {
      const res = path.join(dir, ent.name);
      if (ent.isDirectory()) return collectMdFiles(res, excludeFiles);
      if (ent.isFile() && res.toLowerCase().endsWith(".md")) {
        if (excludeFiles.some((ex) => ent.name.toLowerCase() === ex.toLowerCase())) return [];
        return [res];
      }
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
 * @param {string[]} [options.excludeFiles] - file names to skip entirely (defaults to ['Userguide delivery process.md'])
 * @returns {Promise<{changedFiles: string[], summary: {checked: number, changed: number}}>}
 */
export async function prepareForImport({
  docDir,
  moduleName = "arm5e-compendia",
  dryRun = false,
  extensions = ["webp", "png", "jpg", "jpeg", "gif", "svg", "bmp", "avif"],
  excludeFiles = ["Userguide delivery process.md"]
} = {}) {
  // Default docDir to repo relative: assume this file sits in scripts/
  if (!docDir) {
    // go up one directory from scripts to module root, then into doc
    const moduleRoot = path.resolve(__dirname, "..");
    console.log(`No docDir specified, defaulting to ${moduleRoot}\\doc`);
    docDir = path.join(moduleRoot, "doc");
  }

  // Normalize paths for replacement target
  const replacementPrefix = `modules/${moduleName}/doc/images/`;

  // Build extension pattern safely (escape any special chars)
  const extPattern = extensions.map(_escapeForRegex).join("|");

  // Regex to match both formats:
  // 1. ![alt text](images/FILENAME.<ext>) — markdown links (with or without alt text)
  // 2. ![[images/FILENAME.<ext>]] — wiki-style links
  // - captures filename (including possible subpaths) ending with a configured extension
  // - case-insensitive to match .JPG, .WebP, etc.
  const regexMarkdown = new RegExp(`!\\[.*?\\]\\(\\s*images\\/([^\\)\\s]+?\\.(${extPattern}))\\s*\\)`, "gi");
  const regexWiki = new RegExp(`!\\[\\[\\s*images\\/([^\\]\\s]+?\\.(${extPattern}))\\s*\\]\\]`, "gi");

  const mdFiles = await collectMdFiles(docDir, excludeFiles);
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

    // Replace markdown-style links (keep as markdown, preserve alt text)
    newContent = newContent.replace(regexMarkdown, (match, p1) => {
      const altMatch = match.match(/!\[([^\]]*)\]/);
      const altText = altMatch ? altMatch[1] : "";
      return `![${altText}](${replacementPrefix}${p1})`;
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
 * @param {string[]} [options.excludeFiles] - file names to skip entirely (defaults to ['Userguide delivery process.md'])
 * @returns {Promise<{changedFiles: string[], summary: {checked: number, changed: number}}>}
 */
export async function prepareForCommit({
  docDir,
  moduleName = "arm5e-compendia",
  dryRun = false,
  extensions = ["webp", "png", "jpg", "jpeg", "gif", "svg", "bmp", "avif"],
  excludeFiles = ["Userguide delivery process.md"]
} = {}) {
  if (!docDir) {
    const moduleRoot = path.resolve(__dirname, "..");
    docDir = path.join(moduleRoot, "doc");
  }

  const extPattern = extensions.map(_escapeForRegex).join("|");
  const modNamePattern = _escapeForRegex(moduleName);

  // Match both formats:
  // 1. ![alt text](modules/<moduleName>/doc/images/FILENAME.<ext>) — markdown links (with or without alt text)
  // 2. ![[modules/<moduleName>/doc/images/FILENAME.<ext>]] — wiki-style links
  const regexMarkdown = new RegExp(
    `!\\[.*?\\]\\(\\s*modules\\/${modNamePattern}\\/doc\\/images\\/([^\\)\\s]+?\\.(${extPattern}))\\s*\\)`,
    "gi"
  );
  const regexWiki = new RegExp(
    `!\\[\\[\\s*modules\\/${modNamePattern}\\/doc\\/images\\/([^\\]\\s]+?\\.(${extPattern}))\\s*\\]\\]`,
    "gi"
  );

  const mdFiles = await collectMdFiles(docDir, excludeFiles);
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

    // Replace markdown-style links (preserve alt text)
    newContent = newContent.replace(regexMarkdown, (match, p1) => {
      const altMatch = match.match(/!\[([^\]]*)\]/);
      const altText = altMatch ? altMatch[1] : "";
      return `![${altText}](images/${p1})`;
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
