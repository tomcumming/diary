import * as fs from "fs";
import * as path from "path";
import * as rollup from "rollup";
import rollupTypescript from "rollup-plugin-typescript";

import template from "../src/index.html.mjs";

export const TEMPLATES = Symbol("templates");

/** @param item {string} */
async function includeItem(item) {
  if (item === TEMPLATES) {
    return includeTemplates();
  } else if (item.endsWith(".ts")) {
    return includeTypescript(item);
  } else {
    return fs.readFileSync(item, "utf8");
  }
}

function findAllTemplates(initialPath) {
  const files = fs.readdirSync(initialPath);
  return files.flatMap((file) => {
    const filePath = path.join(initialPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) return findAllTemplates(filePath);
    else if (file.endsWith(".template.html"))
      return [fs.readFileSync(filePath, "utf8")];
    else return [];
  });
}

async function includeTemplates() {
  return findAllTemplates("src").join("\n");
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
  fs.writeFileSync("dist/index.html", await template(includeItem), "utf8");
}

main();
