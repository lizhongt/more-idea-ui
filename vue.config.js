const fs = require('fs')
const path = require('path')
const join = path.join
const resolve = dir => path.join(__dirname, './', dir)

function getComponentEntries(path) {
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

const buildEnv = process.env.BUILD

module.exports = {
  // 基本路径
  publicPath: './',

  // 输出文件目录
  outputDir: buildEnv === 'doc' ? 'dist' : 'lib',

  // 静态资源目录
  assetsDir: 'static',

  // 修改 src 为 examples
  pages: {
    index: {
      entry:
        buildEnv === 'doc' ? 'examples/main.js' : 'src/components/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'md-ui'
    }
  },

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // webpack配置

  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 添加别名
    config.resolve.alias
      .set('~', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('examples', resolve('examples'))
    if (buildEnv === 'pub') {
      const components = { ...getComponentEntries('src/components') }
      for (const key in components) {
        config.entry(key).add(components[key])
      }
      // 所有组件打包到dist根目录
      config.entry('./').add(resolve('src/components/index.js'))
      config.output
        .path(path.resolve(process.cwd(), './lib'))
        .filename('[name]/index.js')
        .library('more-idea-ui')
        .libraryTarget('commonjs2')
        .libraryExport('default')

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
    }
  },
  configureWebpack: config => {
    config.externals = {}
  },
  // vue-loader 配置项

  // https://vue-loader.vuejs.org/en/options.html

  // vueLoader: {},

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

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
        additionalData: `@import "~/assets/sass/theme.scss";@import "~/assets/sass/icon.scss";`
      },
      css: {
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        modules: {
          getLocalIdent: (context, localIdentName, localName) => {
            return `${localName}`
          }
        },
        localsConvention: 'camelCase'
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
  },

  // use thread-loader for babel & TS in production build

  // enabled by default if the machine has more than 1 cores

  parallel: require('os').cpus().length > 1,

  // 是否启用dll

  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode

  // dll: false,

  // PWA 插件相关配置

  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

  pwa: {},

  // webpack-dev-server 相关配置

  devServer: {
    open: true,

    host: 'localhost',

    port: 9999,

    https: false,

    hotOnly: false,
    // 设置代理
    // proxy: {},

    // eslint-disable-next-line
    before: app => {
      console.log(app)
    }
  },

  // 第三方插件配置

  pluginOptions: {}
}
