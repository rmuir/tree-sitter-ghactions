import eslint from '@eslint/js';
import treesitter from 'eslint-config-treesitter';

export default [
  eslint.configs.recommended,
  ...treesitter,
  {
    files: ['grammar.js'],
    languageOptions: {
      globals: {
        'alias': 'readonly',
        'choice': 'readonly',
        'field': 'readonly',
        'grammar': 'readonly',
        'optional': 'readonly',
        'prec': 'readonly',
        'repeat': 'readonly',
        'repeat1': 'readonly',
        'reserved': 'readonly',
        'seq': 'readonly',
        'token': 'readonly',
      },
    },
  },
];
