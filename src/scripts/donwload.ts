import "dotenv/config";
import fs from "fs-extra";
import PlayCanvas from "playcanvas-node";
import { sleep } from "./helpers/sleep";
import axios from "axios";
import extract from "extract-zip";
import path from "path";
import ProgressBar from "progress";
import meow from "meow";
const error = meow("error", {});

const getDownloadUrl = async (
  jobId: number,
  count: number,
  playcanvas: PlayCanvas,
): Promise<string | null> => {
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
  const options = fs.readJSONSync("./playcanvas.json");
  const progress = new ProgressBar("downloading [:bar] :percent :etas", {
    complete: "≶",
    total: 50,
  });
  const { accessToken, scenes, projectId, branchId, projectName } = options;

  if (accessToken && scenes && projectId && branchId && projectName) {
    const playcanvas = new PlayCanvas(options);
    try {
      const zipFileName = `${projectName}.zip`;
      const zipFilePath = path.join(path.resolve(""), zipFileName);
      const projectFilePath = path.join(path.resolve(""), projectName);

      if (fs.existsSync(projectFilePath)) {
        console.log(`${projectName} already exists`);
        return;
      }
      progress.tick(5);
      const file = await playcanvas.downloadApp();
      const jobId = file.id;
      progress.tick(10);

      const download_url = await getDownloadUrl(jobId, 0, playcanvas);

      if (!download_url) {
        console.log("Please one more try.");
        return;
      }

      const { data } = await axios({
        url: download_url,
        method: "GET",
        responseType: "stream",
      });

      await data
        .pipe(fs.createWriteStream(zipFilePath))
        .on("close", async () => {
          progress.tick(15);
          await extract(zipFilePath, { dir: projectFilePath });
          progress.tick(20);

          fs.remove(zipFilePath);
          console.log(`created >>>  ${projectName}`);
        });
    } catch (e) {
      console.log(e);
      console.log("Download failed.");
      error.showHelp(2);
    }
  } else {
    console.log('*** Please run "playcanvas-cli init" ***');
  }
};
// ≶
