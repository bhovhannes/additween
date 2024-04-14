import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

import {createRequire} from 'node:module'
const pkg = createRequire(import.meta.url)('./package.json')

const isProduction = process.env.NODE_ENV === "production";

const globals = {};

const extensions = [".ts", ".js"];

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "umd",
            name: "additween",
            sourcemap: true,
            globals,
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true,
            globals,
        },
    ],
    external: [],
    plugins: [
        nodeResolve({
            extensions,
        }),
        commonjs(),
        babel({
            extensions,
            babelHelpers: "runtime",
        }),
    ].concat(isProduction ? terser() : []),
};
