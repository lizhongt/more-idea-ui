/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 15:15:17
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 15:41:45
 */

import { MdUIBaseComponent } from './base'

/** SearchBar Component */
export interface MdSearchBar extends MdUIBaseComponent {
  /** 双向绑定值类型 */
  value: String

  /** 带入右侧按钮  */
  withButton: Boolean

  /** 带入返回按钮 */
  withBack: boolean

  placeholder: String
}

export const MdSearchBar: MdSearchBar
