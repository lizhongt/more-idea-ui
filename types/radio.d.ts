/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 16:06:03
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 16:11:21
 */
import { MdUIBaseComponent } from './base'

import { BoxType } from './checkbox'

export interface radioOption {
  name: String
  label: String
  [propName: string]: any
}

/** List Component */
export interface MdRadio extends MdUIBaseComponent {
  /** 绑定值 */
  value: Boolean

  /* 选项列表 */
  options: Array<radioOption>

  /*	复选框文字*/
  label: String

  /** 绑定值 */
  position: BoxType

  /*	水平方向*/
  horizontal: Boolean

  /** 是否禁用 */
  disabled: Boolean

  /*	复选框文字*/
  color: String
}

export const MdRadio: MdRadio
