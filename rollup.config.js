import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  external: ['react'],
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      name: 'NanatriReact',
      plugins: [terser()],
      globals: { react: 'React' },
    },
  ],
};
