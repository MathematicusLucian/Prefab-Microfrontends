const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies;

module.exports = {
  name: "prefab-auth-service-module",
  filename: "prefab-auth-service.js", 
  plugins: [
    new ModuleFederationPlugin({
      name: 'prefab_auth_service_module',
      filename: 'RemoteEntry.js',
      exposes: {
        // Expose auth service to the microfrontends
        'useAuth': path.resolve(__dirname, 'AuthContext.tsx'), 
        'AuthService': path.resolve(__dirname, 'AuthService.ts'), 
        'ProtectedRoute.tsx': path.resolve(__dirname, 'ProtectedRoute.tsx'),  
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
    port: 8084,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Cache-Control': 'no-store', // Prevents browser caching
    },
  },
};
