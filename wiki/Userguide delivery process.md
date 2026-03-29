# Userguide Delivery Process

## For Contributors and Developers

The userguide documentation is maintained in Markdown format in the `doc/Userguide/` directory and uses a two-step process to handle image links correctly for both Obsidian editing and Foundry VTT display.

## Editing the Documentation

When editing the userguide in Obsidian or any markdown editor, use **relative image paths**:

```markdown
![](modules/arm5e-compendia/doc/images/ActiveEffectConfig.webp)
```

This allows images to display correctly in Obsidian and other markdown editors while editing.

## Preparing for Foundry Import

Before importing the userguide into Foundry VTT, run the **import** command to convert image paths to module-relative paths:

```bash
node ./scripts/userguide-cli.js import [--dry-run] [--module=arm5e-compendia]
```

**What it does**: Converts relative image paths to absolute module paths that Foundry can display:

- From: `![](images/FILENAME.webp)`
- To: `![](modules/arm5e-compendia/doc/images/FILENAME.webp)`

**Options**:

- `--dry-run` or `--dry`: Preview changes without modifying files
- `--module=NAME`: Specify module name (defaults to `arm5e-compendia`)
- `--ext=png,jpg,webp`: Specify image extensions to process (defaults to common formats)

**Example with dry run**:

```bash
node ./scripts/userguide-cli.js import --dry-run
```

This will show you which files would be changed without actually modifying them.

## Preparing for Commit

Before committing changes to the repository, run the **commit** command to restore relative paths:

```bash
node ./scripts/userguide-cli.js commit [--dry-run] [--module=arm5e-compendia]
```

**What it does**: Converts module-relative paths back to relative paths for version control:

- From: `![](modules/arm5e-compendia/doc/images/FILENAME.webp)`
- To: `![](images/FILENAME.webp)`

This ensures that:

- The repository contains editor-friendly relative paths
- Images display correctly in Obsidian for editing
- The version control history isn't cluttered with path changes

**Example with dry run**:

```bash
node ./scripts/userguide-cli.js commit --dry-run
```

## Complete Workflow

### Step-by-Step Process

1. **Edit** documentation using relative paths (`images/file.webp`)
   - Work in Obsidian or your preferred markdown editor
   - Images will display correctly with relative paths

2. **Import** - Convert to module paths before importing to Foundry

   ```bash
   node ./scripts/userguide-cli.js import
   ```

3. **Test** in Foundry VTT
   - Import the userguide journal entry user LavaFlow module

   ```js
   // workaround to start the module on V13
   const m = await import("../modules/lava-flow/src/lava-flow.js");
   m.default.createForm();
   ```

   - Verify all images display correctly
   - Check all links work properly

4. **Commit** - Convert back to relative paths before committing

   ```bash
   node ./scripts/userguide-cli.js commit
   ```

5. **Commit** changes to version control
   - Review the git diff to ensure only content changes
   - Commit and push to repository

### Quick Reference

| Task                               | Command                                            |
| ---------------------------------- | -------------------------------------------------- |
| Check what would change for import | `node ./scripts/userguide-cli.js import --dry-run` |
| Convert for Foundry import         | `node ./scripts/userguide-cli.js import`           |
| Check what would change for commit | `node ./scripts/userguide-cli.js commit --dry-run` |
| Convert back for repository        | `node ./scripts/userguide-cli.js commit`           |

## Technical Details

### Supported Link Formats

Both commands support and convert the following image link formats:

**Standard Markdown**:

```markdown
![](modules/arm5e-compendia/doc/images/filename.webp)
![Alt text](modules/arm5e-compendia/doc/images/filename.webp)
```

**Wiki-style Links** (automatically converted to markdown):

```markdown
![](modules/arm5e-compendia/doc/images/filename.webp)
```

### Supported Image Extensions

By default, the following image extensions are processed:

- `.webp` (recommended for web)
- `.png`
- `.jpg` / `.jpeg`
- `.gif`
- `.svg`
- `.bmp`
- `.avif`

You can specify custom extensions:

```bash
node ./scripts/userguide-cli.js import --ext=webp,png,svg
```

### Directory Structure

```
arm5e-compendia/
├── doc/
│   ├── Userguide/
│   │   ├── Settings.md
│   │   ├── Active effects.md
│   │   └── ...
│   ├── images/
│   │   ├── ActiveEffectConfig.webp
│   │   └── ...
│   └── Knowledge base/
│       └── Userguide delivery process.md (this file)
└── scripts/
    ├── userguide-cli.js
    └── userguideMgr.js
```

## Troubleshooting

### Images Not Showing in Foundry

**Cause**: Forgot to run the import command before importing to Foundry

**Solution**:

```bash
node ./scripts/userguide-cli.js import
```

Then re-import the journal entry into Foundry.

### Git Shows Many Path Changes

**Cause**: Forgot to run the commit command before committing

**Solution**:

```bash
node ./scripts/userguide-cli.js commit
```

Then review the git diff before committing.

### Images Not Showing in Obsidian

**Cause**: Module paths are in the markdown files (import was run but commit wasn't)

**Solution**:

```bash
node ./scripts/userguide-cli.js commit
```

### Module Name Changed

If you rename the module, update the `--module` parameter:

```bash
node ./scripts/userguide-cli.js import --module=new-module-name
node ./scripts/userguide-cli.js commit --module=new-module-name
```

## Best Practices

1. **Always use relative paths** when editing in Obsidian
2. **Always run dry-run first** to preview changes:
   ```bash
   node ./scripts/userguide-cli.js import --dry-run
   ```
3. **Test in Foundry** after import conversion
4. **Always run commit** before pushing to git
5. **Review git diff** to ensure only intended changes
6. **Keep this workflow** documented for other contributors

## Related Scripts

- **userguide-cli.js**: Command-line interface for the conversion process
- **userguideMgr.js**: Core conversion logic (prepareForImport, prepareForCommit functions)

Both scripts are located in the `scripts/` directory.
