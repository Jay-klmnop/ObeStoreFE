export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'refactor', 'style', 'docs', 'build', 'ci', 'perf'],
    ],
    'subject-case': [0],
    'header-max-length': [2, 'always', 72],
    'type-case': [2, 'always', 'lower-case'],
  },
};
