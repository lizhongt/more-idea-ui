import CreateAPI from 'vue-create-api'

export default function createAPI(Vue, Component, events, single) {
  Vue.use(CreateAPI, { componentPrefix: 'Md', apiPrefix: '$' })
  const api = Vue.createAPI(Component, events, single)
  return api
}
