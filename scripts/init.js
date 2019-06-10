import "dotenv/config";
import inquirer from "inquirer";
import PlayCanvas from "playcanvas-node";
import { config } from "dotenv";

export const init = async () => {
  try {
    let accessToken = process.env.PC_API_KEY;
    const questions = [
      {
        type: "input",
        name: "projectId",
        message: `What's your project id https://playcanvas.com/project/`
      }
    ];

    if (!accessToken) {
      const authenticate = 
        {
          type: "input",
          name: "accessToken",
          message: "What's your accessToken"
        }
      ;
      questions.unshift(authenticate);
    } else {
    }
    const { projectId } = await inquirer.prompt(questions);

    // ここでプロジェクトの一覧を取得
    const playcanvas = new PlayCanvas({ accessToken, projectId });

    const branches = await playcanvas.listBranches();
    const branchChoices = branches.result.map(branch => {
      const { id, name, permanent } = branch;
      return {
        value: id,
        name: `${name} | ${id}`
      };
    });
    const branchAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedBranch",
        message: "Please select use branche.",
        choices: branchChoices
      }
    ]);
    const branchId = branchAnswer.selectedBranch;
    const playcanvas2 = new PlayCanvas({ accessToken, projectId, branchId });

    const remoteSecnes = await playcanvas2.listScenes();

    const scenesChoices = remoteSecnes.result.map(scene => {
      const { id, name } = scene;
      return {
        name: `${name} | ${id} `,
        value: id
      };
    });

    const sceneAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedScenes",
        message: "Please select use scenes.",
        choices: scenesChoices
      }
    ]);

    const scenes = sceneAnswer.selectedScenes;

    const playcanvas3 = new PlayCanvas({
      accessToken,
      projectId,
      branchId,
      scenes
    });

    const pn = await playcanvas3.getProjectApp();
    const remoteProjectName = pn.result[0].name;

    const projectNameAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "inputProjectName",
        message: "Please input projectName",
        default: remoteProjectName
      },
      {
        type: "input",
        name: "remotePath",
        message: "",
        default: "dev"
      }
    ]);
    const projectName = projectNameAnswer.inputProjectName;
    const configJson = {
      accessToken,
      scenes,
      projectId,
      branchId,
      projectName,
      remotePath
    };
    console.log(configJson);
  } catch (e) {
    console.log("Project Id is invalid.",e);
  }
};
