import "server-only";
import fs from "fs";
import path from "path";

export function getAppRootDir() {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, ".env"))) {
    currentDir = path.join(currentDir, "..");
  }
  return currentDir;
}
