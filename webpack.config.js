const path = require('path');

module.exports = {
  //entry
  //output
  //mode
  //module
  // // rules

  entry: './client/src/components/Index.jsx',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, './client/src/components')],
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};