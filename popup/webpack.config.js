const path = require('path');

module.exports = {

  entry: [
    './popup/src/scripts/index.tsx'
  ],

  output: {
    filename: 'popup.js',
    path: path.join(__dirname, '../', 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json', '.tsx', '.ts'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.tsx?|\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        options: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
