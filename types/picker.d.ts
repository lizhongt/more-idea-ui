/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 17:18:40
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 17:21:03
 */
import { MdUIBaseComponent } from './base'

export type TipType = 'primary' | 'transparent'

export interface MdPicker extends MdUIBaseComponent {
  /* 选项数组 */
  columns: Array<String>

  /* 标题文字 */
  title: String

  /* 	确认按钮文字 */
  confirmText: String

  /* 	取消按钮文字 */
  cancelText: String

  /* 默认激活的选项下标 */
  defaultActive: Number

  /* 展示高亮选择 bar */
  showBar: Boolean

  /* 选项高度 */
  itemHeight: Number

  /* 可视选项个数 */
  visibleItemCount: Number
}

export const MdPicker: MdPicker
