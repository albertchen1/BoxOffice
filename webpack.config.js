const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/index.js',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js',
    publicPath: 'js/'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env']
          }
        },
      }
    ]
  },
  devtool: 'source-map'
};