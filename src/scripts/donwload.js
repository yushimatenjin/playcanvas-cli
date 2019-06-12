import 'dotenv/config';
import fs from 'fs-extra';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import PlayCanvas from 'playcanvas-node';
import { sleep } from './utils/sleep';
import request from 'request';
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
    try {
      const file = await playcanvas.downloadApp();

      const jobId = file.id;
      await sleep(5000);
      const { data } = await playcanvas.getJob(jobId);
      const { download_url } = data;
      await request({ url: download_url, encoding: null }, function(
        err,
        resp,
        body
      ) {
        if (err) throw err;
        fs.writeFile(`${projectName}.zip`, body, function(err) {});
      });
    } catch (e) {
      console.log(e);
      console.log('Download is failed.');
    }
  } else {
    console.log('Please, run "playcanvas-cli init"');
  }
};
