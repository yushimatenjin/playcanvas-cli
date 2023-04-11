#!/usr/bin/env node
import { archive, download, init, sw, upload, webp } from "../scripts/commands";
import meow from "meow";

const cli = meow(
  `
	Usage
	  $ playcanvas-cli <input>

	Argments(optional)
    --accessToken -t
    --projectId -p
    --scenes -s
    --branchId -b
    --projectName -n 
    --remotePath -r
  
  WebP options
  # webp options
    --quality -q # default 80
    --alphaQuality # Quality of alpha layer, number from 0-100 (optional, default 100)
    --lossless -l #  Use near_lossless compression mode (optional, default false)
    --nearLossless # Near lossless encoding, number from 0-100 (optional, default 100)
    --smartSubsample # Use smart subsampling (optional, default false)

  # convert options
    --font # default true
    --texture # default true
    --textureatlas # default true
    --removeSource # remove source file after conversion default false
    --configFilePath # config file path default ./config.json
    --outputConfigFilePath # output config file path default ./config_webp.json

  Examples
    CircleCI
    --------
    $ playcanvas-cli --accessToken "$PLAYCANVAS_ACCESS_TOKEN" --projectId "$PLAYCANVAS_PROJECT_ID" --scenes "$PLAYCANVAS_SCENES" --branchId "PLAYCANVAS_BRANCH_ID" --projectId "$PLAYCANVAS_PROJECT_ID" --remotePath "$PLAYCANVAS_REMOTE_PATH"
    $ playcanvas-cli -t "$PLAYCANVAS_ACCESS_TOKEN" -p "$PLAYCANVAS_PROJECT_ID" -s "$PLAYCANVAS_SCENES" -b "PLAYCANVAS_BRANCH_ID" -n "$PLAYCANVAS_PROJECT_NAME" --r "$PLAYCANVAS_REMOTE_PATH"
    --------
    $ playcanvas-cli -t token -p projectId -s scenes -b branchId -n projectName -r remotePath 

    WebP
    $ playcanvas-cli webp -q 80 --lossless

`,
  {
    flags: {
      accessToken: {
        type: "string",
        alias: "t",
      },
      projectId: {
        type: "string",
        alias: "p",
      },
      scenes: {
        type: "string",
        alias: "s",
      },
      branchId: {
        type: "string",
        alias: "b",
      },
      projectName: {
        type: "string",
        alias: "n",
      },
      remotePath: {
        type: "string",
        alias: "r",
      },
      url: {
        type: "string",
        alias: "u",
      },
      name: {
        type: "string",
      },
      quality: {
        type: "number",
        alias: "q",
        default: 80,
      },
      alphaQuality: {
        type: "number",
        default: 100,
      },
      lossless: {
        type: "boolean",
        default: false,
      },
      nearLossless: {
        type: "boolean",
        default: false,
      },
      smartSubsample: {
        type: "boolean",
        default: false,
      },
      font: {
        type: "boolean",
        default: true,
      },
      texture: {
        type: "boolean",
        default: true,
      },
      textureatlas: {
        type: "boolean",
        default: true,
      },
      removeSource: {
        type: "boolean",
        default: false,
      },

      configFilePath: {
        type: "string",
        default: "./config.json",
      },
      outputConfigFilePath: {
        type: "string",
        default: "./config_webp.json",
      }
    },
  }
);

const script = cli.input[0];
switch (script) {
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
  case "archive": {
    archive();
    break;
  }
  case "webp": {
    const {
      quality,
      alphaQuality,
      lossless,
      nearLossless,
      smartSubsample,
      font,
      texture,
      textureatlas,
      removeSource,
      configFilePath,
      outputConfigFilePath
    } = cli.flags;
    const webpOptions = {
      quality,
      alphaQuality,
      lossless,
      nearLossless,
      smartSubsample,
    };
    const flags = {
      webpOptions,
      convertOptions: {
        font,
        texture,
        textureatlas,
        removeSource,
        configFilePath,
        outputConfigFilePath
      },
    };
    webp(flags);
    break;
  }
  default: {
    console.log(`Unknown script ${script} .`);
    break;
  }
}
