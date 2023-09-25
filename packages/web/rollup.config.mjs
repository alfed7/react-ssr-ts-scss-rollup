import pkg from "./package.json" assert { type: "json" };

import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";
import svgr from '@svgr/rollup';
import json from "@rollup/plugin-json";
import sass from 'rollup-plugin-sass';
import dotenv from "dotenv";
const parseResult = dotenv.config();
if (parseResult.error) {
  console.log(parseResult.error);
}

const production = !process.env.ROLLUP_WATCH;
const extensions = [ ".js", ".jsx", ".ts", ".tsx" ];
const pathsToWatch =[ 'src/**' ];

process.env.NODE_ENV = production ? 'production' : '';

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  "@babel/runtime"
  //, "react-router-dom/server",
  //"react-dom/server"
];

const externalForClient = [
  "node-fetch",
];
const globalForClient = {
  "node-fetch": 'null'
};

export default [
  {
    input: "./src/main.tsx",
    output: [
      {
        file: "build/client/main.js",
        format: "iife",
        name: "main",
        sourcemap: !production,
        // https://rollupjs.org/guide/en/#outputglobals
        globals: globalForClient,
      },
    ],
    external: externalForClient,
    plugins: [
      resolve({
        extensions,
      }),
      commonjs(),
      svgr(),
      babel({
        exclude: /^(.+\/)?node_modules\/.+$/,
        extensions,
        babelHelpers: "bundled",
        sourceMaps: !production,
        skipPreflightCheck: true
      }),
      json(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.API_URL": JSON.stringify(process.env.CLIENT_API_URL),
      }),
      copy({
        targets: [{ src: "src/index.html", dest: "build/client" }],
        copyOnce: true
      }),
      copy({
        targets: [{ src: "src/assets/static/*", dest: "build/client" }],
        copyOnce: true
      }),
      sass({output: true}),
      production && terser(),
    ],
    watch: {
      chokidar: {
          paths: pathsToWatch
      }
    }
  },

  {
    input: "./src/index.tsx",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: !production,
      },
      {
        file: pkg.module,
        format: "es",
        exports: "named",
        sourcemap: !production,
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
        sourcemap: !production,
        skipPreflightCheck: true
      }),
      json(),
      sass({output: false}),
      production && terser(),
    ],
    watch: {
      paths: pathsToWatch
    }
  }
];
