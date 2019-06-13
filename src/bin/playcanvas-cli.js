#!/usr/bin/env node
import { create, init, login, download } from '../scripts/commands';
import meow from 'meow';

const cli = meow(
  `
	Usage
	  $ foo <input>

	Options
	  --rainbow, -r  Include a rainbow

	Examples
	  $ foo unicorns --rainbow
	  🌈 unicorns 🌈
`,
  {
    flags: {
      rainbow: {
        type: 'string',
        alias: 'r',
      },
    },
  }
);

console.log(cli.input[0], cli.flags);

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x =>
    x === 'create' ||
    x === 'init' ||
    x === 'download' ||
    x === 'login' ||
    x === 'logout'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
switch (script) {
  case 'create': {
    create();
    break;
  }
  case 'init': {
    init();
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
