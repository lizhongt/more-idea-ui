import { FlyUIBaseComponent, FlyUIComponentSize } from './base'

/** Button type */
export type ButtonType =
  | 'primary'
  | 'submary'
  | 'warning'
  | 'default'
  | 'info'
  | 'text'

/** Button Component */
export declare class ElButton extends FlyUIBaseComponent {
  /** Button size */
  size: FlyUIComponentSize

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
