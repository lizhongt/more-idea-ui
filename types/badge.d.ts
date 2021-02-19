/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 15:44:12
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 17:27:28
 */
import { MdUIBaseComponent } from './base'
export interface MdBadge extends MdUIBaseComponent {
  /** 文字内容 */
  content: String

  /** 徽章背景颜色 */
  color: String

  /** 圆形徽章 */
  circle: Boolean

  /** 徽章大小 */
  size: Number
}

export const MdBadge: MdBadge
