import spawn from "cross-spawn";
import path from "path";
import fs from "fs";
// console.log(path.dirname)
const template = "hot-reload";
const templatePath = path.join(__dirname, "..", "template", template);
