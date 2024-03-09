export class FileTools {
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async fetchFile(url, filename, contentType) {
    try {
      const myHeaders = new Headers();
      const request = new Request(url, {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        cache: "default"
      });
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const blob = await response.blob();
      return new File([blob], filename, { type: contentType });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async uploadToServer(file, path) {
    const response = await FilePicker.upload("data", path, file, {}, { notify: false });
  }

  static async uploadDataToServer(data, filename, type, path) {
    try {
      const blob = new Blob([data], { type: type });
      const file = new File([blob], filename, { type: type });
      return await FilePicker.upload("data", path, file, {}, { notify: false });
    } catch (exc) {
      console.warn(`Unable to upload ${path}`, exc);
    }
  }

  static async copyFile(srcPath, targetPath) {
    try {
      const srcFolder = srcPath.substring(0, srcPath.lastIndexOf("/"));
      const srcFilename = srcPath.substring(srcPath.lastIndexOf("/") + 1);

      const targetFolder = targetPath.substring(0, targetPath.lastIndexOf("/"));
      const targetFilename = targetPath.substring(targetPath.lastIndexOf("/") + 1);
      const srcFile = await this.fetchFile(srcPath, targetFilename);
      // srcFile.name = targetFilename;
      const response = await this.uploadToServer(srcFile, targetPath);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  /**
   * Creates a new folder
   */
  static async createFolderIfMissing(parent, folder) {
    const parentFolder = await FilePicker.browse("data", parent, {});
    const path = `${parent}/${folder}`;
    if (!parentFolder.dirs.includes(path)) {
      try {
        await FilePicker.createDirectory("data", path, {});
      } catch (exc) {
        console.warn(`Unable to create ${path}`, exc);
      }
    }
  }

  /**
   * Checks if a file exists
   */
  static async fileExists(path) {
    const source = "data";
    try {
      let parentFolderPath = path.substring(0, path.lastIndexOf("/"));
      const parentFolder = await FilePicker.browse(source, parentFolderPath, {});
      const decodedPaths = parentFolder.files.map((f) => decodeURIComponent(f));

      return parentFolder.files.includes(path) || decodedPaths.includes(path);
    } catch (exc) {
      console.log(exc);
      return false;
    }
  }

  static async directoryExists(path) {
    const source = "data";
    try {
      let parentFolderPath = path.substring(0, path.lastIndexOf("/"));
      const parentFolder = await FilePicker.browse(source, parentFolderPath, {});
      const decodedPaths = parentFolder.dirs.map((f) => decodeURIComponent(f));

      return parentFolder.dirs.includes(path) || decodedPaths.includes(path);
    } catch (exc) {
      console.log(exc);
      return false;
    }
  }

  static async createFolderRecursive(path) {
    const source = "data";

    const folders = path.split("/");
    let curFolder = "";
    for (const f of folders) {
      if (f.length == 0) continue;
      const parentFolder = await FilePicker.browse(source, curFolder, {});
      curFolder += (curFolder.length > 0 ? "/" : "") + f;
      const dirs = parentFolder.dirs.map((d) => decodeURIComponent(d));
      if (!dirs.includes(decodeURIComponent(curFolder))) {
        try {
          console.log(`Create folder ${curFolder}`);
          await FilePicker.createDirectory(source, curFolder, {});
        } catch (exc) {
          console.warn(`Unable to create ${curFolder}`, exc);
        }
      }
    }
  }

  static slugify(str) {
    return String(str)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "") // remove all accents.
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove consecutive hyphens
  }
}
