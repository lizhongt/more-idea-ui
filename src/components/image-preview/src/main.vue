<!--
 * @Descripttion:
 * @version:
 * @Author: lizt
 * @Date: 2020-11-02 09:54:44
 * @LastEditors: lizt
 * @LastEditTime: 2021-01-07 10:02:03
-->
<template>
  <transition name="fade-zoom">
    <popup
      v-show="isVisible"
      @mask-click="isVisible = false"
      :mask-closable="true"
      center
    >
      <div
        class="md-image-preview"
        :style="previewStyle"
        @click="isVisible = false"
      >
        <div class="md-preview-wrap h-full fb fb-cross-center">
          <swiper
            v-if="showPreviewer"
            :options="computedOptions"
            @change="change"
            ref="swiper"
            class="h-full"
          >
            <swiper-item v-for="(image, index) in images" :key="index">
              <div class="preiview-image-item fb fb-cross-center">
                <div class="fb fb-cross-center">
                  <img :src="image" />
                </div>
              </div>
            </swiper-item>
          </swiper>
        </div>
        <div class="md-preview-indicator">
          <span
            class="md-preview-bullet"
            v-for="item in images.length"
            :key="item"
            :class="{ 'md-preview-bullet-active': item === position + 1 }"
          ></span>
        </div>
      </div>
    </popup>
  </transition>
</template>

<script>
import Swiper from '../../swiper'
import SwiperItem from '../../swiper-item'
import Popup from '../../popup'
import visibleMixin from '~/mixins/visible'
export default {
  mixins: [visibleMixin],
  name: 'MdImagePreview',
  components: { Swiper, SwiperItem, Popup },
  props: {
    images: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    speed: {
      type: [String, Number],
      default: 400
    },
    start: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      position: +this.start,
      showPreviewer: false
    }
  },
  computed: {
    computedOptions() {
      return {
        // 开始滚动位置
        startSlide: this.position,
        // 滚动速度
        speed: this.speed,
        // 自动轮播时间
        autoplay: false,
        // 是否无限循环
        loop: this.loop,
        // 横向
        horizontal: true
      }
    },
    previewStyle() {
      return {
        height: `${document.body.clientHeight}px`
      }
    }
  },
  watch: {
    isVisible(val) {
      this.showPreviewer = val
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    change(index) {
      this.position = index
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/flex.scss';
.md-image-preview {
  width: 100%;
  .md-preview-wrap {
    position: relative;
    height: 100%;
    .preiview-image-item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .md-preview-indicator {
    position: absolute;
    bottom: 12px;
    left: 50%;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    text-shadow: 0 1px 1px #323233;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    .md-preview-bullet {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 5px;
      background: #fff;
      margin: 0 4px;
      opacity: 0.8;
      cursor: pointer;
      &.md-preview-bullet-active {
        @include background('PRIMARY');
      }
    }
  }
}
.fade-zoom-enter-active {
  animation: dialog-fadein 0.4s;
  .md-dialog-container {
    animation: dialog-zoom 0.4s;
  }
}

@keyframes dialog-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
