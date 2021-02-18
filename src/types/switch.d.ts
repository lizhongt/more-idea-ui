/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 16:16:36
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 16:18:04
 */
import { MdUIBaseComponent } from './base'

export interface MdSwitch extends MdUIBaseComponent {
  /** 绑定值 */
  value: Boolean

  /*	文字说明 */
  label: String

  /** 禁用 */
  disabled: Boolean

  /* 选中展示颜色 */
  activeColor: String

  /* 未选中展示颜色 */
  inactiveColor: String
}

export const MdSwitch: MdSwitch
