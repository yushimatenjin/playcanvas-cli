#!/usr/bin/env node
import { create, init } from "../scripts/commands";
const args = process.argv.slice(2);

const scriptIndex = args.findIndex(x => x === "create" || x === "init");
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
switch (script) {
  case "create": {
    const projectName = args[1] ? args[1] : "my-app";
    create(projectName);

    break;
  }
  case "init": {
    init();
    break;
  }
  default: {
    console.log(`Unknown script ${script} .`);
    break;
  }
}
