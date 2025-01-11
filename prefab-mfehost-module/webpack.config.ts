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
};

module.exports = {
  name: "prefab-mfehost-module",

  remotes: {
    // Import shared styles and components from the shared-styles module
    sharedStyles: "shared-styles@http://localhost:3001/shared-styles.js", // URL where shared-styles is hosted
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
    // Add other shared dependencies here
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
      '@shared-styles': path.resolve(__dirname, '../shared-styles'),
      'ui': path.resolve(__dirname, '../shared-styles/src/components/ui'),
      'components': path.resolve(__dirname, '../shared-styles/src/components'),
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
        include: path.resolve(__dirname, "node_modules/shared-styles"), // Include shared-styles in processing
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'prefab_mfehost_module',
      filename: 'remoteEntry.js',
      // Dev Envs
      remotes,
        // Prod Envs
        // prefab_header_module: 'prefab_header_module@https://prefab-header-module.vercel.app/RemoteEntry.js',
        // prefab_footer_module: 'prefab_footer_module@https://prefab-footer-module.vercel.app/RemoteEntry.js',
        // prefab_appcontent_module: 'prefab_appcontent_module@https://prefab-appcontent-module.vercel.app/RemoteEntry.js',
      exposes: {
      },
      shared: {
        react: { 
          requiredVersion: false,
          singleton: true,
        },
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
};
