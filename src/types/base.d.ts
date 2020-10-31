import Vue, { PluginObject } from 'vue'

/** 声明所有组件的基类（都要包含install方法） */
export declare class FlyUIBaseComponent extends Vue {
  static install(vue: typeof Vue): void
}

/** 组件大小定义 */
export type FlyUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** 水平对齐方式 */
export type FlyUIHorizontalAlignment = 'left' | 'center' | 'right'
