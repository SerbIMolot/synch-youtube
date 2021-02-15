const path = require('path');
//var webpack = require('webpack');

//const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './Scripts/util.js',
  mode: 'development',
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    //new CleanWebpackPlugin()
    
   // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'Scripts'),
  },
};