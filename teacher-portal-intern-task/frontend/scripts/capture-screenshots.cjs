const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const base = "http://localhost:5173";
  const out = path.resolve(__dirname, "../../docs/demo/screenshots");
  const unique = Date.now();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto(`${base}/register`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${out}/01-register-page.png`, fullPage: true });

  const registerEmail = `interview_${unique}@example.com`;
  await page.fill('input >> nth=0', "Aarav");
  await page.fill('input >> nth=1', "Mehta");
  await page.fill('input[type="email"]', registerEmail);
  await page.fill('input[type="password"]', "Password@123");

  await Promise.all([
    page.waitForURL(`${base}/`),
    page.click('button:has-text("Register")')
  ]);

  const teacherEmail = `teacher_${unique}@example.com`;
  await page.fill('input >> nth=0', "Naina");
  await page.fill('input >> nth=1', "Kapoor");
  await page.fill('input[type="email"]', teacherEmail);
  await page.fill('input[type="password"]', "Password@123");
  await page.fill('input >> nth=4', "Delhi University");
  await page.selectOption('select', "female");
  await page.fill('input[type="number"]', "2022");
  await page.click('button:has-text("Create Record")');
  await page.waitForSelector('.success-text', { timeout: 15000 });

  await page.screenshot({ path: `${out}/03-dashboard-create-form.png`, fullPage: true });

  await page.goto(`${base}/users`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${out}/04-users-table.png`, fullPage: true });

  await page.goto(`${base}/teachers`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${out}/05-teachers-table.png`, fullPage: true });

  await page.click('.profile-card button');
  await page.waitForURL(`${base}/login`);
  await page.screenshot({ path: `${out}/02-login-page.png`, fullPage: true });

  await browser.close();
  console.log("Screenshots generated at docs/demo/screenshots");
})();
