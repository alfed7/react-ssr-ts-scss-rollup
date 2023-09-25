import pkg from "./package.json" assert { type: "json" };

import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import svgr from '@svgr/rollup';
import json from "@rollup/plugin-json";
import dotenv from "dotenv";
const parseResult = dotenv.config();
if (parseResult.error) {
  console.log(parseResult.error);
}

const production = !process.env.ROLLUP_WATCH;
const extensions = [ ".js", ".jsx", ".ts", ".tsx" ];
const pathsToWatch =[ 'src/**', '../web/build/**' ];

process.env.NODE_ENV = production ? 'production' : '';

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  "@babel/runtime"
  // , "react-router-dom/server",
  // "react-dom/server"
];

export default [
  {
    input: "./src/server/index.ts",
    output: [
      {
        file: "build/server/index.esm.js", //pkg.module,
        format: "es",
        exports: "named",
        sourcemap: !production,
        // https://rollupjs.org/guide/en/#outputglobals
        globals: {},
      },
    ],
    external,
    plugins: [
      resolve({
        extensions,
      }),
      commonjs(),
      svgr(),
      babel({
        exclude: /^(.+\/)?node_modules\/.+$/,
        extensions,
        babelHelpers: "runtime",
        sourceMaps: !production,
        skipPreflightCheck: true
      }),
      json(),
      production && terser(),
    ],
    watch: {
      paths: pathsToWatch
    }
  },
];
