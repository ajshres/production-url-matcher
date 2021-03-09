const path = require('path');

module.exports = {

  entry: [
    './content/src/scripts/index.tsx'
  ],
  // mode: 'development',

  output: {
    filename: 'content.js',
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
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          {
            loader: "css-loader"
          },
          "sass-loader"
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          {
            loader: "css-loader",
          }
        ],
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
