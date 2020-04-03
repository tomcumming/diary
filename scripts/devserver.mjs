import fs from "fs";
import http from "http-server";
import rebuild from "./compile.mjs";

async function main() {
  console.log(http);
  const server = http.createServer({ root: "dist" });
  server.listen("1234");

  rebuild();

  let handle;

  fs.watch("src", () => {
    clearTimeout(handle);
    handle = setTimeout(async () => {
      console.info("Rebuilding...");
      await rebuild();
      console.info("Rebuilt");
    }, 500);
  });
}

main();
