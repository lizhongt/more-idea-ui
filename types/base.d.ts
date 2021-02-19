import Vue, { PluginObject } from 'vue'

/** 声明所有组件的基类（都要包含install方法） */
export declare class MdUIBaseComponent extends Vue {
  static install(vue: typeof Vue): void
}

/** 组件大小定义 */
export type MdUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** 水平对齐方式 */
export type MdUIHorizontalAlignment = 'left' | 'center' | 'right'
