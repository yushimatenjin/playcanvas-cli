import 'dotenv/config';
import fs from 'fs-extra';
import PlayCanvas from 'playcanvas-node';
import { sleep } from './utils/sleep';
import axios from 'axios';
import extract from 'extract-zip';
import path from 'path';
import { promisify } from 'util';

const getDownloadUrl = async (jobId, count, playcanvas) => {
  const { data } = await playcanvas.getJob(jobId);
  const { download_url } = data;
  if (download_url) {
    return download_url;
  } else if (!download_url && count === 10) {
    return null;
  } else {
    await sleep(1000);
    return await getDownloadUrl(jobId, ++count, playcanvas);
  }
};

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
    console.log('Please wait');
    const playcanvas = new PlayCanvas(options);
    try {
      const zipFileName = `${projectName}.zip`;
      const zipFilePath = path.join(path.resolve(''), zipFileName);
      const projectFilePath = path.join(path.resolve(''), projectName);

      if (fs.existsSync(projectFilePath)) {
        console.log(`${projectName} is already exists`);
        return;
      }

      const file = await playcanvas.downloadApp();
      const jobId = file.id;

      const download_url = await getDownloadUrl(jobId, 0, playcanvas);

      if (!download_url) {
        console.log('Please one more try.');
        return;
      }
      const { data } = await axios({
        url: download_url,
        method: 'GET',
        responseType: 'stream',
      });

      await data
        .pipe(fs.createWriteStream(zipFilePath))
        .on('close', async () => {
          const unzip = promisify(extract);
          await unzip(zipFilePath, { dir: projectFilePath });
          fs.removeSync(zipFilePath);
          console.log(`created >>>  ${projectName}`);
        });
    } catch (e) {
      console.log('Download failed.');
    }
  } else {
    console.log('Please run "playcanvas-cli init"');
  }
};
