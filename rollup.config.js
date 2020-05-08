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

// import json from 'rollup-plugin-json';
// import { terser } from 'rollup-plugin-terser';

const rootDir = path.resolve(__dirname);
const dist = path.join(rootDir, 'dist');
const globals = {
  url: 'url',
};
const extensions = ['.ts', '.js'];

export default {
  // input: {
  //   entity1: './src/entity1.ts',
  //   entity2: './src/entity2.ts',
  // },
  input: 'src/index.ts',
  output: [
    {
      file: `${dist}/index.cjs.js`,
      format: 'cjs',
      sourcemap: true,
      globals,
    },
    {
      file: `${dist}/index.esm.js`,
      format: 'esm',
      sourcemap: true,
      globals,
    },
    {
      name: 'youtubeApiSearchTyped',
      file: `${dist}/index.umd.js`,
      format: 'umd',
      sourcemap: true,
      globals,
    },
    {
      file: './dist/index.module.js',
      format: 'es',
      globals,
      sourcemap: true,
      plugins: [
        typescript({
          target: 'ES2015',
          // tsconfig: 'tsconfig.json',
          dir: ['src'],
          declarations: true,
        }),
      ],
    },
  ],
  plugins: [
    // typescript({
    //   declaration: true,
    //   dir: true,
    //   declarationDir: `${dist}/types/`,
    //   // baseUrl: 'src',
    // }),
    commonjs({
      include: '**/node_modules/**',
      namedExports: {},
      sourceMap: true,
    }),
    // json(),
    // terser({
    //   compress: true,
    // }),
    resolve({
      jsnext: true,
      extensions,
      browser: true,
      preferBuiltins: true,
    }),
    babel({
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
    }),
  ],
  external: Object.keys(globals),
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
