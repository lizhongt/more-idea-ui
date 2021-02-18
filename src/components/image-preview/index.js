import ImagePreview from './src/main'
import createAPI from '~/plugins/create-api'

/* istanbul ignore next */
ImagePreview.install = function(Vue) {
  Vue.component(ImagePreview.name, ImagePreview)
  createAPI(Vue, ImagePreview, ['change'], true)
}

export default ImagePreview
