/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2021-01-19 16:18:19
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 16:27:18
 */
import { MdUIBaseComponent } from './base'

interface valueType {
  url: String
  name: String
  [propName: string]: any
}

type resultType = 'dataUrl' | 'file' | 'text'

export interface MdUpload extends MdUIBaseComponent {
  /** 绑定值 */
  value: Boolean

  /* 支持上传的文件类型 */
  accept: String

  /* 文件最大限制 */
  maxSize: Number

  /* 文件个数 */
  maxCount: Number

  /* 多个上传 */
  multiple: Boolean

  /* 压缩文件 */
  compress: Number

  /* 是否可以删除 */
  previewImage: Boolean

  /* 多个上传 */
  deletable: Boolean

  /* 删除文件的钩子函数 */
  beforeDelete: Function

  /* 选择文件后触发的上传事件 */
  onSubmit: Function

  /* 返回数据类型 */
  resultType: resultType
}

export const MdUpload: MdUpload
