const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  name: 'deployment',
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    usedExports: true,
    minimize: false
  },
  plugins: [
    new Dotenv()
  ]
};
