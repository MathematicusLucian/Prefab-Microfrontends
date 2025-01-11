const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies;

module.exports = {
  name: "prefab-shared-styles-module",
  filename: "prefab-shared-styles.js", 
  plugins: [
    new ModuleFederationPlugin({
      name: 'prefab_shared_styles_module',
      filename: 'RemoteEntry.js',
      exposes: {
        // Expose the shared styles module to other microfrontends
        'styles': '.', 
        'ui': path.resolve(__dirname, 'src/components/ui'),  // Exposing UI components 
        'utils': path.resolve(__dirname, 'src/lib/utils'),  // Exposing utility functions
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          // requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          // requiredVersion: dependencies['react-dom'],
        },
      },
      // Any other libraries to share between microfrontends (e.g., tailwindcss, etc.)
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 8085,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Cache-Control': 'no-store', // Prevents browser caching
    },
  },
};
