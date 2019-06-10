#!/usr/bin/env node
import { create } from "../scripts/commands";
const args = process.argv.slice(2);

const scriptIndex = args.findIndex(x => x === "create" || x === "init");
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
switch (script) {
  case "create": {
    const projectName = args[1];
    create(projectName);

    break;
  }
  case "init": {
    break;
  }
  default: {
    console.log(`Unknown script ${script} .`);
    break;
  }
}
