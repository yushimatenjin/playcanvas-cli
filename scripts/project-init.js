import spawn from "cross-spawn";
import path from "path";
import fs from "fs-extra";

export const projectInit = (
  projectName,
  settingsJson,
  template = "hot-reload"
) => {
  const templatePath = path.join(__dirname, "..", "template", template);
  const distPath = path.join(".", projectName);

  if (!fs.existsSync(distPath)) {
    fs.copySync(templatePath, distPath);
    const settingsFilePath = path.join(distPath, "playcanvas.json");
    fs.writeFileSync(settingsFilePath, JSON.stringify(settingsJson), "utf8");

    const packageJson = path.join(distPath, "package.json");
    if (fs.existsSync(packageJson)) {
      spawn("npm", ["install", "--prefix", distPath], {
        stdio: "inherit"
      });
    }
  } else {
    console.log("This project already exists");
  }
};
