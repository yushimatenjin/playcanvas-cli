import path from "path";
import fs from "fs-extra";

export const projectInit = (
  projectName: string,
  settingsJson: Object,
  template = "hot-reload"
) => {
  const templatePath = path.join(__dirname, "..", "template", template);
  const distPath = path.join(".", projectName);

  if (!fs.existsSync(distPath)) {
    fs.copySync(templatePath, distPath);
    const settingsFilePath = path.join(distPath, "playcanvas.json");
    fs.writeFileSync(settingsFilePath, JSON.stringify(settingsJson), "utf8");
  } else {
    console.log("Project already exists");
  }
};
