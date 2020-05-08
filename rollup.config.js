// @ts-check

// import commonjs from 'rollup-plugin-commonjs';
// import resolve from 'rollup-plugin-node-resolve';
// import json from 'rollup-plugin-json';
// import { terser } from 'rollup-plugin-terser';

// const dist = 'dist';
// const globals = {
//   url: 'url',
// };

// export default {
//   input: 'tsbuild/index.js',
//   output: [
//     {
//       file: `${dist}/index.cjs.js`,
//       format: 'cjs',
//       globals,
//     },
//     {
//       file: `${dist}/index.esm.js`,
//       format: 'esm',
//       globals,
//     },
//     {
//       name: 'youtubeApiSearchTyped',
//       file: `${dist}/index.umd.js`,
//       format: 'umd',
//       globals,
//     },
//   ],
//   plugins: [
//     resolve({
//       browser: true,
//       preferBuiltins: true,
//     }),
//     commonjs({
//       include: 'node_modules/**',
//     }),
//     json(),
//     terser({
//       compress: true,
//     }),
//   ],
// };

// NEW
import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

const rootDir = path.resolve(__dirname);
const dist = path.join(rootDir, 'dist');
// const globals = {
//   url: 'url',
// };
const extensions = ['.ts', '.js', '.d.ts'];

const TsConfig = {
  target: 'ES2015',
  // tsconfig: 'tsconfig.json',
  dir: `${dist}`,
  declarations: true,
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `${dist}/index.cjs.js`,
      format: 'cjs',
      sourcemap: false,
      plugins: [typescript(TsConfig)],
      // globals,
    },
    {
      file: `${dist}/index.esm.js`,
      format: 'esm',
      name: 'youtubeApiSearch',
      sourcemap: false,
      // globals,
      plugins: [typescript(TsConfig)],
    },
    {
      file: `${dist}/index.umd.js`,
      name: 'youtubeApiSearch',
      format: 'umd',
      sourcemap: false,
      plugins: [typescript(TsConfig)],
      // globals,
    },
    {
      file: `${dist}/index.js`,
      name: 'youtubeApiSearch',
      format: 'es',
      sourcemap: false,
      plugins: [typescript(TsConfig)],
    },
  ],
  plugins: [
    typescript(),
    commonjs({
      // include: '**/node_modules/**',
      include: '**/src/**',
      // namedExports: {},
      // sourceMap: false,
      extensions: ['.js', '.ts', '.d.ts'],
    }),
    json(),
    terser({
      compress: true,
    }),
    resolve({
      mainFields: ['module', 'main', 'browser'],
      extensions,
      // browser: true,
      // preferBuiltins: true,
    }),
    babel({
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
    }),
  ],
  // external: Object.keys(globals),
};

// export default [
//   // CommonJS
//   {
//     input: 'src/index.ts',
//     output: {
//       dir: './',
//       entryFileNames: 'lib/my-pkg.js',
//       format: 'cjs',
//     },
//     plugins: [
//       typescript({
//         declaration: true,
//         declarationDir: 'types/',
//         rootDir: 'src/'
//       }),
//     ]
//   },

//   // ES
//   {
//     input: 'src/index.ts',
//     output: { file: 'es/my-pkg.js', format: 'es' },
//     plugins: [
//       typescript(),
//     ]
//   },
// ]
