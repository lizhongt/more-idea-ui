/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 17:16:32
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 17:18:31
 */
import { MdUIBaseComponent } from './base'

export type TipType = 'text' | 'success' | 'fail'

export interface MdToast extends MdUIBaseComponent {
  /* 绑定值 */
  type: TipType

  /* 对话框内容 */
  content: Boolean

  /* 自动关闭时间 */
  duration: Number

  /* 传入图标 */
  icon: String
}

export const MdToast: MdToast
