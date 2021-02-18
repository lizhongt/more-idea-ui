import UploadFile from '../upload/src/file.vue'

/* istanbul ignore next */
UploadFile.install = function(Vue) {
  Vue.component(UploadFile.name, UploadFile)
}

export default UploadFile
