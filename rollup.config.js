import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import { uglify } from "rollup-plugin-uglify";

const targets = [
  { src: "package.json", dest: "dist" },
  {
    src: "public/styles/DimmedComponents.css",
    dest: "dist/styles",
  },
  { src: "README.md", dest: "dist" },
];

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      uglify(),
      typescript({ exclude: ["**/test", "**/jest.config.ts"] }),
      babel({ babelrc: true }),
    ],
  },
  {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts(),
      copy({
        targets: targets,
      }),
    ],
  },
];
