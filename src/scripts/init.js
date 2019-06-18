import 'dotenv/config';
import inquirer from 'inquirer';
import PlayCanvas from 'playcanvas-node';
import path from 'path';
import fs from 'fs-extra';

export const init = async options => {
  {
    const {
      accessToken,
      scenes,
      projectId,
      branchId,
      projectName,
      remotePath,
    } = options;

    if (
      accessToken &&
      scenes &&
      projectId &&
      branchId &&
      projectName &&
      remotePath
    ) {
      const settingsJson = {
        accessToken,
        scenes: [Number(scenes)],
        projectId: Number(projectId),
        branchId,
        projectName,
        remotePath,
      };

      const distPath = path.join('.');
      const settingsFilePath = path.join(distPath, 'playcanvas.json');
      fs.writeFileSync(settingsFilePath, JSON.stringify(settingsJson), 'utf8');
      console.log('created', `${distPath} > playcanvas.json`);
      return;
    }
  }
  try {
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
    accessToken = accessToken || ans.accessToken;
    const projectId = ans.projectId;
    const playcanvas = new PlayCanvas({
      accessToken,
      projectId,
    });

    const branches = await playcanvas.listBranches();
    const branchChoices = branches.map(branch => {
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
        message: 'Please select a branch.',
        choices: branchChoices,
      },
    ]);
    const branchId = branchAnswer.selectedBranch;
    const playcanvas2 = new PlayCanvas({ accessToken, projectId, branchId });

    const remoteSecnes = await playcanvas2.listScenes();

    const scenesChoices = remoteSecnes.map(scene => {
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
        message: 'Please select a scence.',
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
      const pn = await playcanvas3.getProjectApp();
      remoteProjectName = pn[0].name;
    } catch (e) {
      remoteProjectName = 'my-app';
    }
    const projectNameAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'inputProjectName',
        message: 'Please input a projectName',
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
      scenes: [Number(scenes)],
      projectId: Number(projectId),
      branchId,
      projectName,
      remotePath,
    };
    const distPath = path.join('.');
    const settingsFilePath = path.join(distPath, 'playcanvas.json');
    fs.writeFileSync(settingsFilePath, JSON.stringify(settingsJson), 'utf8');
    console.log('created', `${distPath} > playcanvas.json`);
  } catch (e) {
    console.log(e);
  }
};
