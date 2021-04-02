/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 16:12:00
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 16:16:47
 */
import { MdUIBaseComponent } from './base'

export type FieldType =
  | 'text'
  | 'number'
  | 'tel'
  | 'choose'
  | 'password'
  | 'textarea'
export type Align = 'horizontal' | 'vertical'

/** Field Component */
export interface MdField extends MdUIBaseComponent {
  /** 绑定值 */
  value: Boolean

  /* 占位文字 */
  placeholder: String

  /*	文字说明 */
  label: String

  /* field 类型 */
  type: FieldType

  /** 是否必输 */
  required: Boolean

  /*是否只读 */
  readOnly: Boolean

  /* 带有清空功能 */
  clearable: Boolean

  /*文字最大长度 */
  maxlength: Number

  /* 左侧说明文字的宽度 */
  width: Number

  /* textarea 的高度 */
  height: Number

  /* 表单的对齐方式 */
  align: Align
}

export const MdField: MdField
