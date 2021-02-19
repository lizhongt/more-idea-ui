/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 15:52:20
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 16:05:46
 */
import { MdUIBaseComponent } from './base'

export type BoxType = 'follow' | 'left' | 'right'

export interface MdCheckbox extends MdUIBaseComponent {
  /** 绑定值 */
  value: Boolean

  /*	复选框文字*/
  label: String

  /** 绑定值 */
  position: BoxType

  /*	圆形复选框*/
  circle: Boolean

  /** 是否禁用 */
  disabled: Boolean

  /*	复选框文字*/
  color: String
}

export const MdCheckbox: MdCheckbox
