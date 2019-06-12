import 'dotenv/config';
import fs from 'fs-extra';
import PlayCanvas from 'playcanvas-node';
import { sleep } from './utils/sleep';
import axios from 'axios';
import extract from 'extract-zip';
import path from 'path';

const getDownloadUrl = async (jobId, count, playcanvas) => {
  const { data } = await playcanvas.getJob(jobId);
  const { download_url } = data;
  if (download_url) {
    return download_url;
  } else if (!download_url && count === 10) {
    return null;
  } else {
    return await getDownloadUrl(jobId, ++count, playcanvas);
  }

  await sleep(1000);
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
    console.log('Please waiting');
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
      axios({
        url: download_url,
        method: 'GET',
        responseType: 'stream',
      }).then(response => {
        response.data
          .pipe(fs.createWriteStream(zipFilePath))
          .on('close', function() {
            extract(zipFilePath, { dir: projectFilePath }, function(err) {
              fs.removeSync(zipFilePath);
              console.log(`created >>>  ${projectName}`);
            });
          });
      });
    } catch (e) {
      console.log(e);
      console.log('Download is failed.');
    }
  } else {
    console.log('Please, run "playcanvas-cli init"');
  }
};
