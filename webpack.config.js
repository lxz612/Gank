'use strict'

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//webpack插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    //将样式统一打包到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
      $: 'webpack-zepto'
    })
];

module.exports = {
  debug: true,
  entry: './src/main',                        //入口文件
  output: {                                   //输出配置
    path: path.resolve(__dirname,'/dist/'),   //生成文件的存储路径
    filename: 'build.js',                     //生成的文件名
    publicPath: '/dist/',                     //打包时所需配置的路径（打包才用到）
    chunkFilename: '[id].build.js?[chunkhash]'//按需加载的文件               
  },
  //配置loader
  module: {
    loaders: [
      {//处理.vue文件
        test: /\.vue$/,
        loader: 'vue'
      },
      {//处理.js文件
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|vue\/dist/
      },
      {//处理文件中各种图片资源
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  vue:{
    loaders: {
      //将vue文件中的css提取出来单独打包
      css: ExtractTextPlugin.extract("css")
    }
  },
  babel: {
      //es6转码为es5
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime']
  },
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extension: ['', '.js'],
  },
  plugins:plugins,
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#source-map'
}
