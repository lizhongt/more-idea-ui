const fs = require('fs')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const getComponentEntries = () => {
  let files = fs.readdirSync(resolve(path))
  const entries = files.reduce((ret, item) => {
    const itemPath = path.join(path, item)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      ret[item] = resolve(path.join(itemPath, 'index.js'))
    } else {
      const [name] = item.split('.')
      ret[name] = resolve(`${itemPath}`)
    }
    return ret
  }, {})
  return entries
}

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'lib',
  // 静态资源目录
  assetsDir: 'static',
  // 修改 src 为 examples
  pages: {
    doc: {
      entry: 'src/components/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'md-ui demo'
    }
  },
  configureWebpack: {
    entry: {
      ...getComponentEntries('components')
    },
    output: {
      // 配置每个组件打包后生成对应文件名称,多入口文件配置为[name].index.js
      filename: '[name]/index.js',
      // 配置为commonjs2，入口文件的返回值将分配给module.exports对象，使其组件库在webpack构建的环境下使用
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
      library: 'md-ui'
    }
  },
  css: {
    sourceMap: true,
    extract: {
      filename: '[name]/style.css'
    }
  },
  chainWebpack: config => {
    // 删除splitChunks，因为每个组件是独立打包，不需要抽离每个组件的公共js出来。
    config.optimization.delete('splitChunks')
    // 删除copy，不要复制public文件夹内容到lib文件夹中。
    config.plugins.delete('copy')
    // 删除preload以及prefetch，因为不生成html页面，所以这两个也没用。
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 删除html，只打包组件，不生成html页面。
    config.plugins.delete('html')
    // 删除hmr，删除热更新。
    config.plugins.delete('hmr')
    // 删除自动加上的入口App。
    config.entryPoints.delete('app')

    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
        return option
      })
  }
}
