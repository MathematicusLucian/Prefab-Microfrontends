module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript' // Ensures TypeScript is handled
  ],
  plugins: [
    '@babel/plugin-transform-typescript', // Ensures TypeScript is transformed properly
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@lib': './src/lib',
      },
    }]
  ]
}