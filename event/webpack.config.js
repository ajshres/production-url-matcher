const path = require('path');

module.exports = {

  entry: [
    './event/src/index.ts'
  ],

  // mode: 'development',

  output: {
    filename: 'event.js',
    path: path.join(__dirname, '../', 'build')
  },

  resolve: {
    extensions: ['.js', '.json', '.ts'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)?$/,
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
