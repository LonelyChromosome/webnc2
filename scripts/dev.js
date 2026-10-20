const { spawn } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const frontend = path.join(root, "react-news-frontend");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

const back = spawn(process.execPath, ["server.js"], {
  cwd: root,
  stdio: "inherit"
});
const front = spawn(npm, ["exec", "--", "vite", "--host", "0.0.0.0"], {
  cwd: frontend,
  stdio: "inherit",
  shell: process.platform === "win32"
});

let ending = false;
function stop(code = 0) {
  if (ending) return;
  ending = true;
  if (!back.killed) back.kill();
  if (!front.killed) front.kill();
  process.exitCode = code;
}

process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
back.on("exit", (code) => stop(code || 0));
front.on("exit", (code) => stop(code || 0));
back.on("error", (error) => { console.error(error); stop(1); });
front.on("error", (error) => { console.error(error); stop(1); });
