'use strict'

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//webpack插件
var plugins = [
    // //提公用js到common.js文件中
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    // //将样式统一发布到style.css中
    // new ExtractTextPlugin("style.css", {
    //     allChunks: true,
    //     disable: false
    // }),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
      $: 'webpack-zepto'
    })
];

module.exports = {
  entry: './src/main.js',//入口文件
  output: {//输出配置
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  babel: {
      //es6转码为es5
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime']
  },
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extension: ['', '.js'],
    //别名
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  plugins:plugins,
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
