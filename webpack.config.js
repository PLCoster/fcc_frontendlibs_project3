const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  // Take index.html as a template, inject the bundle script and move it into the dist folder
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  // Tell webpack how to look for files - check for .js and .jsx extensions for imported files
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
