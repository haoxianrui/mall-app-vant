'use strict'
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    proxy: {
      // 配置跨域处理
      ['/api']: {
        target: 'http://www.youlai.store:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    name: "有来超市",
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    // 移除预加载插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    // 设置 svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/assets/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/assets/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  }
}
