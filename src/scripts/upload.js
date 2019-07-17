import axios from 'axios';
import fs from 'fs-extra';
import PlayCanvas from 'playcanvas-node';
import path from 'path';
export const upload = async download_url => {
  const options = require(path.join(process.cwd(), './', 'playcanvas.json'));
  const playcanvas = new PlayCanvas(options);
  const { data } = await axios({
    url: download_url,
    method: 'GET',
    responseType: 'stream',
  });

  const fileNameIndex = download_url.lastIndexOf('/') + 1;
  const filename = download_url.substr(fileNameIndex);
  await data.pipe(fs.createWriteStream(filename)).on('close', async () => {
    await playcanvas.updateAssets(
      options.remotePath,
      filename,
      path.join(process.cwd(), './', filename)
    );
  });
};
