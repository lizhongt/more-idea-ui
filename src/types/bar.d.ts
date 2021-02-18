/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 15:48:17
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 15:50:09
 */
import { MdUIBaseComponent } from './base'

export type BarType = 'info' | 'warning'

export interface MdBar extends MdUIBaseComponent {
  /** 绑定值 */
  type: BarType

  /**/
  closabe: Boolean
}

export const MdBar: MdBar
