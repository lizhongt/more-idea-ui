const fs = require('fs')
const path = require('path')
const join = path.join
const resolve = dir => path.join(__dirname, '../', dir)

function getComponentEntries(path) {
  console.log(resolve(path))
  let files = fs.readdirSync(resolve(path))
  const componentEntries = files.reduce((ret, item) => {
    const itemPath = join(path, item)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      ret[item] = resolve(join(itemPath, 'index.js'))
    } else {
      const [name] = item.split('.')
      ret[name] = resolve(`${itemPath}`)
    }
    return ret
  }, {})
  console.dir(componentEntries)
  return componentEntries
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
    pub: {
      entry: 'src/components/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'fly-ui components'
    }
  },
  configureWebpack: {
    entry: {
      ...getComponentEntries('src/components'),
      index: resolve('src/components/index.js')
    },
    output: {
      // 配置每个组件打包后生成对应文件名称,多入口文件配置为[name].index.js
      filename: '[name]/index.js',
      // 配置为commonjs2，入口文件的返回值将分配给module.exports对象，使其组件库在webpack构建的环境下使用
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
      library: 'fly-ui'
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      filename: '[name]/style.css'
    },
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        additionalData: `@import "src/assets/sass/common_mixin.scss";@import "src/assets/sass/flex.scss";@import "src/assets/sass/common_var.scss";@import "src/assets/sass/common.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
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
