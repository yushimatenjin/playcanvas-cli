import 'dotenv/config';
import fs from 'fs-extra';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import PlayCanvas from 'playcanvas-node';

export const download = async () => {
  const options = fs.readJSONSync('./playcanvas.json');

  const {
    accessToken,
    scenes,
    projectId,
    branchId,
    projectName,
    remotePath,
  } = options;

  if (
    accessToken ||
    scenes ||
    projectId ||
    branchId ||
    projectName ||
    remotePath
  ) {
    console.log('Please waiting');
    const playcanvas = new PlayCanvas(options);
    const file = await playcanvas.downloadApp();
    console.log(options);
    console.log(file);
  } else {
    console.log('Please, run "playcanvas-cli init"');
  }
};
