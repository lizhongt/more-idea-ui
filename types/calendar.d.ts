/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 17:23:24
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 17:26:45
 */
import { MdUIBaseComponent } from './base'

export interface MdCalendar extends MdUIBaseComponent {
  /* v-model 双向绑定 */
  value: Date

  /* 日历类型， 0-周日历， 1-月日历 */
  mode: Number

  /* 日期格式化 */
  format: String

  /* 带入状态 */
  withStatus: Boolean

  /* 状态列表  0-正常，1-不正常 */
  statusList: Array<0 | 1>
}

export const MdCalendar: MdCalendar
