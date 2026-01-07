import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintPluginPrettierRecommended,
  eslintPluginImport.configs.recommended,
  eslintPluginPromise.configs.recommended,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': 'error',
      'promise/always-return': 'warn',
      'promise/catch-or-return': 'error',
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'warn',
      'no-duplicate-imports': 'error',
    },
  },
]);

export default eslintConfig;
