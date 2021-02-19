/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 17:21:21
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 17:23:45
 */
import { MdUIBaseComponent } from './base'

interface option {
  /* 选项数组 */
  startSlide: Number
  /* 标题文字 */
  speed: Number

  /* 	确认按钮文字 */
  autoplay: Number

  /* 	取消按钮文字 */
  loop: Boolean

  /* 默认激活的选项下标 */
  disableScroll: Boolean

  /* 展示高亮选择 bar */
  stopPropagation: Boolean

  /* 选项高度 */
  horizontal: Boolean
}

export interface MdSwiper extends MdUIBaseComponent {
  // 选项
  option: option

  /* 可视选项个数 */
  showIndicators: Number
}

export const MdSwiper: MdSwiper
