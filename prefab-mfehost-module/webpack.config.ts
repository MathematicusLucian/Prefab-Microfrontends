const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies;

// Function to generate a random query string
const generateRandomParam = () => {
  return `?cacheBust=${Math.random().toString(36).substring(2, 15)}`;
};

// Add random parameters to the remotes URLs
const remotes = {
  prefab_header_module: `prefab_header_module@http://localhost:8081/remoteEntry.js${generateRandomParam()}`,
  prefab_footer_module: `prefab_footer_module@http://localhost:8082/remoteEntry.js${generateRandomParam()}`,
  prefab_appcontent_module: `prefab_appcontent_module@http://localhost:8083/remoteEntry.js${generateRandomParam()}`,
  // Authentication service
  prefab_auth_service_module: `prefab_auth_service_module@http://localhost:8084/remoteEntry.js${generateRandomParam()}`,
  // Import shared styles and components from the shared-styles module
  prefab_shared_styles_module: `prefab_shared_styles_module@http://localhost:8085/remoteEntry.js${generateRandomParam()}`,
  // Prod Envs
  // prefab_header_module: 'prefab_header_module@https://prefab-header-module.vercel.app/RemoteEntry.js',
  // prefab_footer_module: 'prefab_footer_module@https://prefab-footer-module.vercel.app/RemoteEntry.js',
  // prefab_appcontent_module: 'prefab_appcontent_module@https://prefab-appcontent-module.vercel.app/RemoteEntry.js',
};

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'prefab_mfehost_module',
      filename: 'remoteEntry.js',
      // Dev Envs
      remotes,
      exposes: {
      },
      shared: {
        react: { 
          requiredVersion: false,
          singleton: true,
        },
        "react-dom": { singleton: true },
        // Add other shared dependencies here
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Cache-Control': 'no-store', // Prevents browser caching
    },
  },
  entry: {
    app: {
      import: './src/index',
    }
  },
  cache: false,
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  output: {
    publicPath: 'auto', 
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias for the src folder
      '@shared-styles': path.resolve(__dirname, '../prefab-shared-styles-module'),
      'ui': path.resolve(__dirname, '../prefab-shared-styles-module/src/components/ui'),
      'components': path.resolve(__dirname, '../prefab-shared-styles-module/src/components'),
    },
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.ts$|tsx|js$|jsx/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",  // Ensure Tailwind is processed correctly
        ],
        include: path.resolve(__dirname, "node_modules/prefab-shared-styles-module"), // Include shared-styles in processing
      },
    ],
  },
};
