import "dotenv/config";
import inquirer from "inquirer";
import spawn from "cross-spawn";
import puppeteer from "puppeteer";
import chalkPipe from "chalk-pipe";
import { login } from "./utils/browser/login";

export const create = async projectName => {
  console.log(projectName);
  const auth = {
    apiKey: process.env.PC_API_KEY
  };
  const { apiKey } = auth;

  const questions = [
    {
      type: "input",
      name: "projectName",
      message: "What's your project name",
      default: projectName
    }
  ];
  if (apiKey) {
    questions.unshift({
      type: "input",
      name: "api key",
      message: "What's your key"
    });
  }
  const answer = await inquirer.prompt(questions);
  console.log(answer);
};
