import pkg from "./package.json" assert { type: "json" };

import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import svgr from '@svgr/rollup';
import json from "@rollup/plugin-json";
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url'
import path from 'path'

const production = !process.env.ROLLUP_WATCH;
const extensions = [ ".js", ".jsx", ".ts", ".tsx" ];
const pathsToWatch =[ 'src/**' ];

process.env.NODE_ENV = production ? 'production' : '';

console.log("production", production)
const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  "@babel/runtime",
  "react/jsx-runtime",
  //, "react-router-dom/server",
  //"react-dom/server"
];

const sassOptions = {
  to: 'build/client',
  plugins: [
    autoprefixer(),
    postcssUrl({
      url: 'copy',
      assetsPath: 'client'
    }),
    postcssUrl({
      url (asset) {
        const rebasedUrl = `/files/${path.basename(asset.absolutePath)}`
        return rebasedUrl
      }
    })
  ]
}
export default [
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
      replace({preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      postcss({extract: true, ...sassOptions}),
      production && terser(),
    ],
    watch: {
      paths: pathsToWatch
    }
  }
];
