#!/usr/bin/env node
import { create, init, download, upload, sw } from "../scripts/commands";
import meow from "meow";

const cli = meow(
  `
	Usage
	  $ playcanvas-cli <input>

	Options(required)
    --accessToken -t
    --projectId -p
    --scenes -s
    --branchId -b
    --projectName -n 
    --remotePath -r

  Examples
    CircleCI
    --------
    $ playcanvas-cli --accessToken "$PLAYCANVAS_ACCESS_TOKEN" --projectId "$PLAYCANVAS_PROJECT_ID" --scenes "$PLAYCANVAS_SCENES" --branchId "PLAYCANVAS_BRANCH_ID" --projectId "$PLAYCANVAS_PROJECT_ID" --remotePath "$PLAYCANVAS_REMOTE_PATH"
    $ playcanvas-cli -t "$PLAYCANVAS_ACCESS_TOKEN" -p "$PLAYCANVAS_PROJECT_ID" -s "$PLAYCANVAS_SCENES" -b "PLAYCANVAS_BRANCH_ID" -n "$PLAYCANVAS_PROJECT_NAME" --r "$PLAYCANVAS_REMOTE_PATH"
    --------
    $ playcanvas-cli -t token -p projectId -s scenes -b branchId -n projectName -r remotePath 

`,
  {
    flags: {
      accessToken: {
        type: "string",
        alias: "t"
      },
      projectId: {
        type: "string",
        alias: "p"
      },
      scenes: {
        type: "string",
        alias: "s"
      },
      branchId: {
        type: "string",
        alias: "b"
      },
      projectName: {
        type: "string",
        alias: "n"
      },
      remotePath: {
        type: "string",
        alias: "r"
      },
      url: {
        type: "string",
        alias: "u"
      },
      name: {
        type: "string"
      }
    }
  }
);

const script = cli.input[0];

switch (script) {
  case "create": {
    create();
    break;
  }
  case "init": {
    init(cli.flags);
    break;
  }
  case "download": {
    download();
    break;
  }
  case "upload": {
    upload(cli.flags.url);
    break;
  }
  case "sw": {
    sw(cli.flags.name);
    break;
  }
  default: {
    console.log(`Unknown script ${script} .`);
    break;
  }
}
