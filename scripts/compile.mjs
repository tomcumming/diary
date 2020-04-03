import * as fs from "fs";
import * as rollup from "rollup";
import rollupTypescript from "rollup-plugin-typescript";

import template from "../src/index.html.mjs";

/** @param path {string} */
async function includeFile(path) {
  if (path.endsWith(".ts")) {
    return includeTypescript(path);
  } else {
    return fs.readFileSync(path, "utf8");
  }
}

async function includeTypescript(path) {
  /** @type {rollup.InputOptions} */
  const inputOptions = {
    input: path,
    plugins: [rollupTypescript()],
  };

  const bundle = await rollup.rollup(inputOptions);

  /** @type {rollup.OutputOptions} */
  const outputOptions = {
    format: "es",
  };
  const { output } = await bundle.generate(outputOptions);

  if (output.length !== 1) throw new Error(`Expected one chunk`);

  const [singleOutput] = output;
  return singleOutput.code;
}

export default async function main() {
  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync("dist/index.html", await template(includeFile), "utf8");
}

main();
