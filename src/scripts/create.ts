import "dotenv/config";
import { projectInit } from "./project-create";
import path from "path";

export const create = async () => {
  try {

    const options = require(path.join(process.cwd(), "./", "playcanvas.json"));

    projectInit(options.projectName, options);
  } catch (e) {
    console.log("Not found");
  }
};
