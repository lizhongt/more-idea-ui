/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 16:18:19
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 16:27:18
 */
import { MdUIBaseComponent } from './base'

import { button } from './dialog'

type resultType = 'base64' | 'blob' | 'rawcanvas' | 'canvas'

export interface MdCutter extends MdUIBaseComponent {
  /* 文件 */
  file: String

  /* 宽度 */
  width: Number

  /* 高度 */
  height: Number

  /* 取消按钮 */
  cancelBtn: String | button

  /* 确认按钮 */
  confirmBtn: Boolean | button

  /* 返回数据类型 */
  resultType: resultType
}

export const MdCutter: MdCutter
