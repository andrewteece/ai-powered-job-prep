// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Ignore Next's generated env types file (contains triple-slash refs)
const eslintConfig = [
  { ignores: ['next-env.d.ts'] },

  // Next’s recommended rules (TypeScript + Core Web Vitals)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Optional: resolve TS path aliases if using eslint-plugin-import
  {
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
  },
];

export default eslintConfig;
