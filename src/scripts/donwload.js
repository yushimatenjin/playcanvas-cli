import 'dotenv/config';
import fs from 'fs-extra';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import PlayCanvas from 'playcanvas-node';

export const download = async () => {
  let accessToken = process.env.PC_API_KEY;
  const questions = [
    {
      type: 'input',
      name: 'projectId',
      message: `What's your project id`,
    },
    {
      type: 'input',
      name: 'name',
      message: `What's your project name`,
      default: 'playcanvas-app',
    },
  ];

  if (!accessToken) {
    const authenticate = {
      type: 'input',
      name: 'accessToken',
      message: "What's your accessToken",
    };

    questions.unshift(authenticate);
  }

  const ans = await inquirer.prompt(questions);
  const projectName = ans.name;
  accessToken = accessToken || ans.accessToken;

  const projectId = Number(ans.projectId);
  const playcanvas = new PlayCanvas({
    accessToken,
    projectId,
    projectName,
  });

  const app = await playcanvas.listScenes();
  console.log(app);
};
