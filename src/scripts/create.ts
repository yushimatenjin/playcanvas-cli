import "dotenv/config";
import inquirer from "inquirer";
import PlayCanvas from "playcanvas-node";
import { projectInit } from "./project-create";
import { Branch, Scene } from "../types/data";

export const create = async () => {
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
      const authenticate = {
        type: "input",
        name: "accessToken",
        message: "What's your accessToken"
      };

      questions.unshift(authenticate);
    } else {
    }
    const ans = await inquirer.prompt(questions);
    accessToken = accessToken || (ans.accessToken as string);
    const projectId = ans.projectId as number;
    const playcanvas = new PlayCanvas({
      accessToken,
      projectId
    });

    const branches = await playcanvas.listBranches();
    const branchChoices = branches.map((branch: Branch) => {
      const { id, name } = branch;
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

    const scenesChoices = remoteSecnes.map((scene: Scene) => {
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

    let remoteProjectName;
    try {
      const pn = await playcanvas3.getProjectApp();
      remoteProjectName = pn[0].name;
    } catch (e) {
      remoteProjectName = "my-app";
    }
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
    const remotePath = projectNameAnswer.remotePath;

    const settingsJson = {
      accessToken,
      scenes: [scenes],
      projectId,
      branchId,
      projectName,
      remotePath
    };

    projectInit(projectName, settingsJson);
  } catch (e) {
    console.log("Not found");
  }
};
