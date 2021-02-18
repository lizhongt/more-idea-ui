/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 15:15:17
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 15:34:09
 */

import { MdUIBaseComponent } from './base'

/** TabBar Component */
export interface MdTabBar extends MdUIBaseComponent {
  /** 双向绑定值类型 */
  value: String

  /** 选项是否为固定数字  */
  fixed: Boolean

  /** 当前激活的栏目字体颜色 */
  activeColor: boolean

  /** 未激活的栏目字体颜色 */
  inactiveColor: boolean

  /** 指示器的颜色 */
  indicatorColor: boolean
}

export const MdTabBar: MdTabBar
