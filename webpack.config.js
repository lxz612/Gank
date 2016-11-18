'use strict'

var path = require('path');
var webpack = require('webpack');

//webpack插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
      $: 'webpack-zepto'
    })
];

module.exports = {
  entry: './src/main.js', //入口文件
  output: {               //输出配置
    path: path.resolve(__dirname, './dist'),//生成文件的存储路径
    publicPath: '/dist/',                   //？？？
    filename: 'build.js'                    //生成的文件名
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
        exclude: /node_modules/
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
  devtool: '#eval-source-map'
}

//生产环境
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
