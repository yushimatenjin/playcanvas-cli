import fs from "fs";

const readdirRecursively = (dir: string, files: Array<string> = [""]) => {
  const dirents: fs.Dirent[] = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = [];
  for (const dirent of dirents) {
    if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`);
    if (dirent.isFile()) {
      const filePath = `${dir}/${dirent.name}`;
      files.push(filePath);
    }
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files);
  }
  return files;
};
export { readdirRecursively };
