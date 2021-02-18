/*
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-19 15:21:01
 */
import { MdUIBaseComponent, MdUIComponentSize } from './base'

/** Button type */
export type ButtonType =
  | 'primary'
  | 'submary'
  | 'warning'
  | 'default'
  | 'info'
  | 'text'

/** Button Component */
export interface MdButton extends MdUIBaseComponent {
  /** Button size */
  size: MdUIComponentSize

  /** Button type */
  type: ButtonType

  /** Determine whether it's a plain button */
  plain: boolean

  /** Determine whether it's a round button */
  round: boolean

  /** Determine whether it's loading */
  loading: boolean

  /** Disable the button */
  disabled: boolean

  /** Button icon, accepts an icon name of Element icon component */
  icon: string
}

export const MdButton: MdButton
