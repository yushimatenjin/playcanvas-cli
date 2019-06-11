import 'dotenv/config';
import inquirer from 'inquirer';
import PlayCanvas from 'playcanvas-node';
import { projectInit } from './project-init';

export const init = async () => {
  try {
    console.log(process.env.PC_API_KEY);
    console.log(typeof process.env.PC_API_KEY);

    let accessToken = process.env.PC_API_KEY;

    const questions = [
      {
        type: 'input',
        name: 'projectId',
        message: `What's your project id https://playcanvas.com/project/`,
      },
    ];

    if (!accessToken) {
      const authenticate = {
        type: 'input',
        name: 'accessToken',
        message: "What's your accessToken",
      };

      questions.unshift(authenticate);
    } else {
    }
    const ans = await inquirer.prompt(questions);

    const playcanvas = new PlayCanvas({
      accessToken: accessToken || ans.accessToken,
      projectId: ans.projectId,
    });

    const branches = await playcanvas.listBranches();
    const branchChoices = branches.result.map(branch => {
      const { id, name } = branch;
      return {
        value: id,
        name: `${name} | ${id}`,
      };
    });
    const branchAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedBranch',
        message: 'Please select use branche.',
        choices: branchChoices,
      },
    ]);
    const branchId = branchAnswer.selectedBranch;
    const playcanvas2 = new PlayCanvas({ accessToken, projectId, branchId });

    const remoteSecnes = await playcanvas2.listScenes();

    const scenesChoices = remoteSecnes.result.map(scene => {
      const { id, name } = scene;
      return {
        name: `${name} | ${id} `,
        value: id,
      };
    });

    const sceneAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedScenes',
        message: 'Please select use scenes.',
        choices: scenesChoices,
      },
    ]);

    const scenes = sceneAnswer.selectedScenes;
    const playcanvas3 = new PlayCanvas({
      accessToken,
      projectId,
      branchId,
      scenes,
    });

    let remoteProjectName;
    try {
      const pn = await playcanvas3.getPrimaryApp();
      remoteProjectName = pn.result[0].name;
    } catch (e) {
      remoteProjectName = 'my-app';
    }
    const projectNameAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'inputProjectName',
        message: 'Please input projectName',
        default: remoteProjectName,
      },
      {
        type: 'input',
        name: 'remotePath',
        message: '',
        default: 'dev',
      },
    ]);
    const projectName = projectNameAnswer.inputProjectName;
    const remotePath = projectNameAnswer.remotePath;

    const settingsJson = {
      accessToken,
      scenes,
      projectId,
      branchId,
      projectName,
      remotePath,
    };

    projectInit(projectName, settingsJson);
  } catch (e) {
    console.log(e);
  }
};
