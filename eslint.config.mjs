import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next’s recommended rules (TypeScript + Core Web Vitals)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Optional: helps eslint-plugin-import resolve TS aliases via tsconfig
  {
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
  },
];

export default eslintConfig;
