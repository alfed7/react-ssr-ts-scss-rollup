import pkg from "./package.json" assert { type: "json" };

import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";
import svgr from '@svgr/rollup';
import json from "@rollup/plugin-json";
import dotenv from "dotenv";
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url'
import path from 'path'
import { generateSW } from 'rollup-plugin-workbox'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const parseResult = dotenv.config();
if (parseResult.error) {
  console.log(parseResult.error);
}

const production = !process.env.ROLLUP_WATCH;
const devServer = process.env.DEV_SERVER;
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

const externalForClient = [
  "node-fetch",
];
const globalForClient = {
  "node-fetch": 'null'
};

const sassOptions = {
  to: 'build/client/static/',
  plugins: [
    autoprefixer(),
    postcssUrl({
      url: 'copy',
      assetsPath: 'static/'
    }),
    postcssUrl({
      url (asset) {
        const rebasedUrl = `/static/files/${path.basename(asset.absolutePath)}`
        return rebasedUrl
      }
    })
  ]
}
const main = {
  input: "./src/main.tsx",
  output: [
    {
      file: "build/client/static/main.js",
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
    replace({preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify(process.env.CLIENT_API_URL),
    }),
    copy({
      targets: [{ src: "src/index.html", dest: "build/client" }],
      copyOnce: true
    }),
    copy({
      targets: [{ src: "src/assets/static/*", dest: "build/client/static" }],
      copyOnce: true
    }),
    postcss({extract: true, ...sassOptions}),
    production && terser(),
    production && generateSW({
      swDest: './build/client/static/sw.js',
      globDirectory: './build/client',
      globPatterns: [
        '**/*.js',
        '**/*.css',
        '**/*.svg'
      ]
    }),
    devServer && serve({ contentBase: ['', 'build/client'], historyApiFallback: true, open: true, verbose: true }),
    devServer && livereload({ watch: "build/client" })
  ],
  watch: {
    chokidar: {
        paths: pathsToWatch
    }
  }
};

const index = {
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
    postcss({extract: false}),
    production && terser(),
  ],
  watch: {
    paths: pathsToWatch
  }
};

export default devServer ? [main] : [
  main,
  index
];
