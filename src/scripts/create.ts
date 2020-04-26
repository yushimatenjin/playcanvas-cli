import "dotenv/config";
import { generateFromTemplate } from "./utils/";
import path from "path";

export const create = async () => {
  try {
    const options = require(path.join(process.cwd(), "./", "playcanvas.json"));

    generateFromTemplate(options.projectName, options);
  } catch (e) {
    console.log(`*** Please run "playcanvas-cli init" ***`);
  }
};
