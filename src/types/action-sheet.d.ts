/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 16:27:05
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 16:51:59
 */
import { MdUIBaseComponent } from './base'

interface actionSheetItem {
  name: String
  [propName: string]: any
}

export interface MdActionSheet extends MdUIBaseComponent {
  /** 选项列表 */
  actions: Array<actionSheetItem>

  /* 支持上传的文件类型 */
  active: String | Number

  /* 标题 */
  title: String

  /* 文字 */
  cancelText: String
}

export const MdActionSheet: MdActionSheet
