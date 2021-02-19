/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 17:23:24
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 17:24:29
 */
import { MdUIBaseComponent } from './base'

export interface MdScroll extends MdUIBaseComponent {
  /* 选项 */
  horizontal: Boolean

  /* 滚动显示 */
  autoshow: Boolean

  /* 显示滚动条 */
  showBar: Boolean
}

export const MdScroll: MdScroll
