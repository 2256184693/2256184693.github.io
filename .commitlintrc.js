module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 下面是我自己追加的type
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'enhance',
        'style',
        'refactor',
        'test',
        'demo',
        'release',
        'chore',
      ],
    ],
  },
};
