/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 15:39:27
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 15:43:54
 */
import { MdUIBaseComponent } from './base'

/** List Component */
export interface MdList extends MdUIBaseComponent {
  /** 展示右侧箭头 */
  arrow: String

  /** 展示行数  */
  textLine: Boolean
}

/** ListImte Component */
export interface MdListItem extends MdUIBaseComponent {
  /** 展示头像 */
  avator: Boolean

  /** 第1行文字  */
  title: String

  /** 第2行文字  */
  subTitle: String

  /** 第3行文字  */
  thirdTitle: String
}

export const MdListItem: MdListItem
