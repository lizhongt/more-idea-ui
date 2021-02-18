/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 15:50:18
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 15:53:39
 */
import { MdUIBaseComponent } from './base'

export type TipType = 'primary' | 'transparent'

export interface MdTip extends MdUIBaseComponent {
  /** 绑定值 */
  type: TipType

  /* 可关闭 */
  closabe: Boolean
}

export const MdTip: MdTip
