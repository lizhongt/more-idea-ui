// 基础组件
import Button from './button'
import Badge from './badge'
import List from './list'
import ListItem from './list-item'
import Searchbar from './searchbar'
import Tabbar from './tabbar'
import TabbarItem from './tabbar-item'
import Anchor from './anchor'
import Tip from './tip'
import Bar from './bar'

// 表单
import Checkbox from './checkbox'
// import Form from './form'
import Field from './field'
import RadioGroup from './radio-group'
import Radio from './radio'
import Switch from './switch'
import Upload from './upload'
import UploadFile from './upload-file'
import UploadButton from './upload-button'
import ImagePreivew from './image-preview'

// 操作反馈
import ActionSheet from './actionsheet'
import Dialog from './dialog'
import Toast from './toast'
import Picker from './picker'
import Swiper from './swiper'
import SwiperItem from './swiper-item'
import Scroll from './scroll'

// 业务组件
import Calendar from '../bus/calendar'
import Cutter from '../bus/cutter'

// 暴露给example文件夹使用
export const components = {
  Button,
  Badge,
  List,
  ListItem,
  Searchbar,
  Tabbar,
  TabbarItem,
  Anchor,
  Bar,
  Checkbox,
  Field,
  RadioGroup,
  Radio,
  Switch,
  Upload,
  UploadFile,
  UploadButton,
  ImagePreivew,
  // Form,
  ActionSheet,
  Dialog,
  Tip,
  Toast,
  Picker,
  Swiper,
  SwiperItem,
  Scroll,
  Calendar,
  Cutter
}

export default function install(Vue) {
  window.document.documentElement.setAttribute('data-theme', 'default')
  Object.keys(components).forEach(item => {
    components[item].install(Vue)
  })
}
