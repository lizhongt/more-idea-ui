// 基础组件
import Button from './button'
import Badge from './badge'
import List from './list'
import ListItem from './list/src/item'
import SearchBar from './searchbar'
import TabBar from './tabbar'
import TabBarItem from './tabbar/src/item'

// 表单
import Checkbox from './checkbox'
import Form from './form'
import Input from './input'
import RadioGroup from './radio-group'
import Radio from './radio'
import Switch from './switch'
import TextArea from './textarea'
import Upload from './upload'

// 操作反馈
import ActionSheet from './actionsheet'
import Dialog from './dialog'
import Tips from './tips'
import Toast from './toast'
import Swiper from './swiper'
import SwiperItem from './swiper-item'

const PlainApp = {
  install(Vue) {
    Vue.component(Button.name, Button)
  }
}

// 暴露给example文件夹使用
export {
  Button,
  Badge,
  List,
  ListItem,
  SearchBar,
  TabBar,
  TabBarItem,
  Checkbox,
  Input,
  RadioGroup,
  Radio,
  Switch,
  TextArea,
  Upload,
  Form,
  ActionSheet,
  Dialog,
  Tips,
  Toast,
  Swiper,
  SwiperItem
}

export default PlainApp
