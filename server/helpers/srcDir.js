import { dirname } from "path";

let path = new URL(import.meta.url).pathname;
while (!path.endsWith("/server")) {
  if (path == "/") {
    console.error("src folder not found!");
    process.exit(1);
  }
  console.debug(`current path: ${path}, walking up...`);
  path = dirname(path);
}
export const srcDir = path;
