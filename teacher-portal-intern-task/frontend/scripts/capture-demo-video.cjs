const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const base = "http://localhost:5173";
  const outDir = path.resolve(__dirname, "../../docs/demo/gif");
  const targetVideo = path.join(outDir, "teacher-portal-demo.webm");
  const unique = Date.now();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    recordVideo: {
      dir: outDir,
      size: { width: 1366, height: 768 }
    }
  });

  const page = await context.newPage();
  const video = page.video();

  await page.goto(`${base}/register`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const registerEmail = `video_${unique}@example.com`;
  await page.fill('input >> nth=0', "Ishita");
  await page.fill('input >> nth=1', "Khanna");
  await page.fill('input[type="email"]', registerEmail);
  await page.fill('input[type="password"]', "Password@123");

  await Promise.all([
    page.waitForURL(`${base}/`),
    page.click('button:has-text("Register")')
  ]);

  await page.waitForTimeout(1000);

  const teacherEmail = `video_teacher_${unique}@example.com`;
  await page.fill('input >> nth=0', "Dev");
  await page.fill('input >> nth=1', "Arora");
  await page.fill('input[type="email"]', teacherEmail);
  await page.fill('input[type="password"]', "Password@123");
  await page.fill('input >> nth=4', "Delhi University");
  await page.selectOption('select', "male");
  await page.fill('input[type="number"]', "2021");
  await page.click('button:has-text("Create Record")');
  await page.waitForSelector('.success-text', { timeout: 15000 });
  await page.waitForTimeout(1200);

  await page.goto(`${base}/users`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  await page.goto(`${base}/teachers`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  await page.click('.profile-card button');
  await page.waitForURL(`${base}/login`);
  await page.waitForTimeout(800);

  await context.close();
  const recordedPath = await video.path();

  if (fs.existsSync(targetVideo)) {
    fs.unlinkSync(targetVideo);
  }
  fs.renameSync(recordedPath, targetVideo);

  await browser.close();
  console.log(`Video generated at ${targetVideo}`);
})();
