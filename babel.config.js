module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      '@babel/typescript',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
