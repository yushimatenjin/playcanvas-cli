import puppeteer from "puppeteer";

export const login = async (email, password) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://login.playcanvas.com/login");

  await page.setViewport({ width: 1920, height: 1057 });

  await page.waitForSelector(
    ".middle > .signup-widget > .widget-body > #login-form > input:nth-child(1)"
  );
  await page.click(
    ".middle > .signup-widget > .widget-body > #login-form > input:nth-child(1)"
  );

  await page.type(
    ".middle > .signup-widget > .widget-body > #login-form > input:nth-child(1)",
    email
  );

  await page.waitForSelector(
    ".middle > .signup-widget > .widget-body > #login-form > button"
  );
  await page.click(
    ".middle > .signup-widget > .widget-body > #login-form > button"
  );

  await navigationPromise;

  await browser.close();
};
