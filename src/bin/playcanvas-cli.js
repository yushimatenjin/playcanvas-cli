#!/usr/bin/env node
import { create, init, login, download } from '../scripts/commands';
import meow from 'meow';

const cli = meow(
  `
	Usage
	  $ playcanvas-cli <input>

	Options(required)
    --accessToken -t
    --projectId -p
    --scene -s
    --branchId -b
    --projectName -n 
    --remotePath -r

  Examples
    CircleCI
    --------
    $ playcanvas-cli --accessToken "$PLAYCANVAS_ACCESS_TOKEN" --projectId "$PLAYCANVAS_PROJECT_ID" --scene "$PLAYCANVAS_SCENE" --branchId "PLAYCANVAS_BRANCH_ID" --projectId "$PLAYCANVAS_PROJECT_ID" --remotePath "$PLAYCANVAS_REMOTE_PATH"
    $ playcanvas-cli -t "$PLAYCANVAS_ACCESS_TOKEN" -p "$PLAYCANVAS_PROJECT_ID" -s "$PLAYCANVAS_SCENE" -b "PLAYCANVAS_BRANCH_ID" -n "$PLAYCANVAS_PROJECT_NAME" --r "$PLAYCANVAS_REMOTE_PATH"
    --------
    $ playcanvas-cli -t token -p projectId -s scene -b branchId -n projectName -r remotePath 

`,
  {
    flags: {
      accessToken: {
        type: 'string',
        alias: 't',
      },
      projectId: {
        type: 'string',
        alias: 'p',
      },
      scene: {
        type: 'string',
        alias: 's',
      },
      branchId: {
        type: 'string',
        alias: 'b',
      },
      projectName: {
        type: 'string',
        alias: 'n',
      },
      remotePath: {
        type: 'string',
        alias: 'r',
      },
    },
  }
);

// const args = process.argv.slice(2);

// const scriptIndex = args.findIndex(
//   x =>
//     x === 'create' ||
//     x === 'init' ||
//     x === 'download' ||
//     x === 'login' ||
//     x === 'logout'
// );
// const script = scriptIndex === -1 ? args[0] : args[scriptIndex];

const script = cli.input[0];

switch (script) {
  case 'create': {
    create();
    break;
  }
  case 'init': {
    init(cli.flags);
    break;
  }
  case 'download': {
    download();
    break;
  }
  default: {
    console.log(`Unknown script ${script} .`);
    break;
  }
}
