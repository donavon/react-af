/* eslint-disable flowtype/require-valid-file-annotation, no-console, import/extensions */
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import flow from 'rollup-plugin-flow';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

// const cjs = {
//   format: 'cjs',
//   exports: 'named',
// };

const commonPlugins = [
  flow({
    pretty: true, // Needed for sourcemaps to be properly generated.
  }),
  json(),
  nodeResolve(),
  sourceMaps(),
  commonjs({
    ignoreGlobal: true,
  }),
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [
      ['env', { modules: false }],
    ],
    plugins: [
      'transform-object-rest-spread',
      'external-helpers',
    ],
  }),
];

if (process.env.NODE_ENV === 'production') {
  commonPlugins.push(uglify());
}

const configBase = {
  input: 'src/index.js',
  external: ['react'].concat(Object.keys(pkg.dependencies || {})),
  plugins: commonPlugins,
};

const esConfig = Object.assign({}, configBase, {
  output: {
    format: 'es',
    file: pkg.module,
    globals: { react: 'React' },
    // sourcemap: true,
  },
});

const cjsConfig = Object.assign({}, configBase, {
  output: {
    format: 'cjs',
    file: pkg.main,
    exports: 'named',
    globals: { react: 'React' },
    // sourcemap: true,
  },
});

// const otherConfig = Object.assign({}, configBase, {
//   output: [
//     {
//       format: 'es',
//       file: pkg.module,
//       globals: { react: 'React' },
//       sourcemap: true,
//     },
//     {
//       format: 'cjs',
//       file: pkg.main,
//       exports: 'named',
//     },
//   ],
// });

export default [
  esConfig,
  cjsConfig,
];
