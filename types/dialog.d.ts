/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 16:46:16
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 17:15:52
 */
import { MdUIBaseComponent } from './base'

interface Prompt {
  value: String
  placeholder: String
}

type dialogType = 'alert' | 'confirm' | 'prompt'

export interface button {
  type: String
  color: String
  text: String
}

export interface MdDialog extends MdUIBaseComponent {
  /** 对话框类型 */
  type: dialogType

  /* prompt */
  prompt: Prompt

  /* 标题 */
  title: String

  /* 文字 */
  content: String

  /* 点击背景关闭对话框 */
  maskClosable: String

  /* 取消按钮 */
  cancelBtn: String | button

  /* 确认按钮 */
  confirmBtn: Boolean | button

  /* 传入图标 */
  icon: String
}

export const MdDialog: MdDialog
