const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies;

module.exports = {
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
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts','.jsx', '.js', '.json', '.mjs'],
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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'prefab_footer_module',
      filename: 'RemoteEntry.js',
      exposes: {
        './PrefabFooter': './src/App', 
      },
      shared: {
        // react: {
        //   singleton: true,
        //   eager: true,
        //   requiredVersion: dependencies.react,
        // },
        // 'react-dom': {
        //   singleton: true,
        //   eager: true,
        //   requiredVersion: dependencies['react-dom'],
        // },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 8082,
    hot: true,
    headers: {
      'Cache-Control': 'no-store', // Prevents browser caching
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
};
