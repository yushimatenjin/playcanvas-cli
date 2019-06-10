import "dotenv/config";
import inquirer from "inquirer";
import spawn from "cross-spawn";
import puppeteer from "puppeteer";
import chalkPipe from "chalk-pipe";
export const create = async projectName => {
  console.log(projectName);
  const auth = {
    email: process.env.PC_EMAIL,
    password: process.env.PC_PASSWORD
  };
  const { email, password } = auth;

  const questions = [
    {
      type: "input",
      name: "projectName",
      message: "What's your project name",
      default: projectName
    }
  ];
  if (!email && !password) {
    questions.unshift(
      {
        type: "input",
        name: "email",
        message: "What's your email"
      },
      {
        type: "password",
        name: "password",
        message: "What's your password",
        mask: "≶"
      }
    );
  }

  const answer = await inquirer.prompt(questions);
  console.log(answer);
};
