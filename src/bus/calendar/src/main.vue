<template>
  <div class="md-flex-calendar width-full">
    <!-- <slot name="title">
      <div class="calendar-title fb fb-cross-center fb-main-center c-111f2c">
        <span @click="methodToChooseDate"
          >{{ timeStr }}<i class="iconfont ml-8">&#xe702;</i></span
        >
      </div>
    </slot> -->
    <div class="calendar-main width-full">
      <ul class="calendar-main-title c-191F25-60 fb width-full mt-8">
        <li class="font-20 text-center"><span>日</span></li>
        <li class="font-20 text-center"><span>一</span></li>
        <li class="font-20 text-center"><span>二</span></li>
        <li class="font-20 text-center"><span>三</span></li>
        <li class="font-20 text-center"><span>四</span></li>
        <li class="font-20 text-center"><span>五</span></li>
        <li class="font-20 text-center"><span>六</span></li>
      </ul>
      <swiper
        class="calendar-slider"
        v-if="datesList.length"
        :options="swipeOptions"
        @change="handlerSlideChange"
        ref="myDateSwiper"
        :style="{ height: calendarHeight ? `${calendarHeight}px` : '100%' }"
      >
        <swiper-item
          v-for="(date, dateIndex) in datesList"
          :key="date.startDate"
        >
          <div class="calendar-main-content width-full">
            <ul
              class="calendar-content width-full fb font-28"
              :class="{ matched: dateIndex === currentIndex }"
            >
              <li
                class="ff-medium text-bold-500"
                v-for="(item, idx) in date.values"
                :key="idx"
                @click="methodSelectDate(date.month, item)"
                :class="{
                  selected: item.selectedType === 1,
                  darken: item.darken
                }"
              >
                <span>{{ item.number }}</span>
                <b
                  v-if="withStatus"
                  :style="{
                    visibility: item.status > -1 ? 'visible' : 'hidden'
                  }"
                  class="status iconfont inline-block"
                  :class="item.status ? 'normal' : 'unmormal'"
                >
                  &#xe67d;
                </b>
              </li>
            </ul>
          </div>
        </swiper-item>
      </swiper>
      <div class="expand-box mt-4">
        <div class="expand font-30 inline-block" @click="changeDateType">
          <span class="iconfont">{{
            !calendarType ? '&#xe6c3;' : '&#xe6c2;'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from '../../../components/swiper'
import SwiperItem from '../../../components/swiper-item'
import { timeFormat } from 'utils/comUtils'
export default {
  name: 'MdCalendar',
  components: { Swiper, SwiperItem },
  props: {
    value: {
      type: Date,
      default() {
        return new Date()
      }
    },
    mode: {
      type: Number,
      default: 0 // 0-周日历 1-月日历
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD'
    },
    withStatus: {
      type: Boolean,
      default: false
    },
    statusList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swipeOptions: {
        // 开始滚动位置
        startSlide: 1,
        // 滚动速度
        speed: 300,
        // 自动轮播时间
        autoplay: false,
        // 是否无限循环
        loop: true,
        // 横向
        horizontal: true
      },
      compareDate: new Date(this.value.getTime()),
      nowTime: new Date(),
      calendarBaseCss: 'calendar-main-content animated',
      showList: [], // 展示的日期的内容
      selectedDate: this.value, // 选择的日期
      yearMonth: 1, // 传到后端的数据
      yearMonthDay: 1,
      dataStatus: [],
      datesList: [], // 最近三个月的日期
      calendarType: this.mode,
      timeStr: '',
      currentIndex: 1,
      isSameMonth: true,
      calendarHeight: null
    }
  },
  computed: {},
  watch: {
    value: {
      immediate: true,
      handler() {
        this.init()
      }
    },
    // 通过放在watch中去获取当前选择的日期
    selectedDate(newVal) {
      this.timeStr = `${newVal.getFullYear()}年${newVal.getMonth() + 1}月`
      this.compareDate = newVal
    },
    computedSelectedDate(newVal) {
      this.$emit('getDate', newVal)
    },
    calendarType() {
      this.init()
      this.$nextTick(() => {
        this.$refs.myDateSwiper.refresh()
        this.$emit('changeCalendarType', {
          date: this.computedSelectedDate,
          startDate: this.datesList[this.currentIndex].startDate,
          calendarType: this.calendarType
        })
      })
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
    init() {
      let _targetDate = new Date(this.value.getTime())
      if (this.calendarType) {
        _targetDate.setDate(1)
      } else {
        _targetDate.setDate(_targetDate.getDate() - _targetDate.getDay())
      }
      this.calcDateList(_targetDate.getTime())
    },
    // 计算是否是周末
    methodColor(index) {
      let baseList = [0, 7, 14, 21, 28]
      let baseRuler =
        (this.noWorkDay &&
          typeof this.noWorkDay === 'string' &&
          this.noWorkDay.split('')) ||
        []
      let list = []
      baseRuler &&
        baseRuler.length &&
        baseRuler.forEach(valueItem => {
          baseList.forEach(workDay => {
            list.push(Number(workDay) + Number(valueItem))
          })
        })
      if (list.includes(index + 1)) {
        return false
      }
      return true
    },
    methodToCalDate(timeStr, dateIndex) {
      let timeStamp = new Date(`${timeStr} 00:00`)
      return !this.calendarType
        ? this.methodCountWeekDay(timeStamp, dateIndex)
        : this.methodCountMonthDay(timeStamp, dateIndex)
    },
    // 计算指定周日期
    methodCountWeekDay(timeStamp, dateIndex) {
      // 获取上个月的具体年份和月份
      let _list = []
      /* eslint-disable */
      let _dates = []
      for (let count = 0; count < 7; count++) {
        let _date = new Date(timeStamp.getTime())
        _date.setDate(_date.getDate() + count)
        _dates.push(timeFormat(_date))
      }
      for (let count = 0; count < 7; count++) {
        let _date = new Date(timeStamp.getTime())
        _date.setDate(_date.getDate() + count)
        _list.push({
          year: _date.getFullYear(),
          month: _date.getMonth() + 1,
          number: _date.getDate(),
          darken: true,
          selectedType:
            _dates.indexOf(timeFormat(this.compareDate)) > -1
              ? _date.getDate() === this.compareDate.getDate()
                ? 1
                : 0
              : !count
              ? 1
              : 0
        })
      }
      // 判断要不要加入状态
      if (this.withStatus && dateIndex === this.currentIndex) {
        _list.forEach((item, index) => {
          item.status = this.statusList[index]
        })
      }
      /* eslint-enable */
      return _list
    },
    // 计算指定月日期
    methodCountMonthDay(timeStamp, dateIndex) {
      let _prevList = []
      // 获取本月一号是星期几
      const firstDay = new Date(
        `${timeStamp.getFullYear()}/${timeStamp.getMonth() + 1}/1 00:00`
      )
      // 获取上个月的具体年份和月份
      const aheadTime = new Date(timeStamp.getTime())
      aheadTime.setMonth(aheadTime.getMonth() - 1)
      const aheadDays = new Date(
        aheadTime.getFullYear(),
        aheadTime.getMonth() + 1,
        0
      ).getDate()
      // 计算前面需要添加的空位日期
      let _addEmptyBefore = !firstDay.getDay() ? 0 : firstDay.getDay()
      for (
        let addEmptyCount = 0;
        addEmptyCount < _addEmptyBefore;
        addEmptyCount++
      ) {
        _prevList.unshift({
          year: aheadTime.getFullYear(),
          month: aheadTime.getMonth() + 1,
          number: aheadDays - addEmptyCount,
          selectedType: 0,
          darken: true
        })
      }

      // 中间填入当前月份的所有日期
      let _middleList = []
      const current = new Date(
        timeStamp.getFullYear(),
        timeStamp.getMonth() + 1,
        0
      ).getDate()
      let matched =
        this.compareDate.getMonth() === timeStamp.getMonth() &&
        this.compareDate.getFullYear() === timeStamp.getFullYear()
      console.log(`timeStamp -- > ${timeFormat(timeStamp)}`)
      for (let day = 0; day < current; day++) {
        /* eslint-disable */
        _middleList.push({
          year: timeStamp.getFullYear(),
          month: timeStamp.getMonth() + 1,
          number: day + 1,
          selectedType: matched
            ? day + 1 === this.compareDate.getDate()
              ? 1
              : 0
            : !day
            ? 1
            : 0
        })
        /* eslint-enable */
      }
      // 判断要不要加入状态
      console.log(
        `dateIndex --> ${dateIndex}  this.currentIndex --> ${this.currentIndex}`
      )
      if (this.withStatus && dateIndex === this.currentIndex) {
        _middleList.forEach((item, index) => {
          item.status = this.statusList[index]
        })
      }
      // 计算后面需要添加的空位日期 先获取本月的最后一天是周几 如果刚好是周日 就不用填充 否则 计算出来需要填充的日期
      let _lastList = []
      const lastDay = new Date(
        `${timeStamp.getFullYear()}/${timeStamp.getMonth() +
          1}/${current} 00:00`
      )
      const afterTime = new Date(timeStamp.getTime())
      afterTime.setMonth(afterTime.getMonth() + 1)
      let _addEmptyAfter = !lastDay.getDay() ? 6 : 6 - lastDay.getDay()
      for (
        let addEmptyCount = 0;
        addEmptyCount < _addEmptyAfter;
        addEmptyCount++
      ) {
        _lastList.push({
          year: afterTime.getFullYear(),
          month: afterTime.getMonth() + 1,
          number: addEmptyCount + 1,
          selectedType: 0,
          darken: true
        })
      }

      return _prevList.concat(_middleList).concat(_lastList)
    },
    // 选择日期
    methodSelectDate(month, item) {
      // 如果选择的不是当月的日期且不是周日历 就执行跳转
      this.isSameMonth = true
      if (+this.calendarType > 0 && item.month !== month) {
        if (item.month > month) {
          // 滑向下一个月
          this.$refs.myDateSwiper.next()
        } else {
          // 滑向上一个月
          this.$refs.myDateSwiper.prev()
        }
        this.isSameMonth = false
      }
      this.selectedDate = new Date(
        `${item.year}/${('0' + item.month).slice(-2)}/${(
          '0' + item.number
        ).slice(-2)}`
      )
      this.datesList
        .filter(date => item.month === date.month)[0]
        .values.forEach(date => {
          date.selectedType =
            item.month === date.month && item.number === date.number ? 1 : 0
        })
    },
    calcDateList(targetDateStamp, realIndex = 1) {
      // 计算相邻的三个容器对应的日期
      /* eslint-disable */
      let _list = [],
        _leftStartDate = null,
        _rightStartDate = null,
        _middleStartDate = null
      /* eslint-enable */
      if (this.calendarType) {
        // 上月日历
        _leftStartDate = new Date(targetDateStamp)
        _leftStartDate.setMonth(_leftStartDate.getMonth() - 1)
        _leftStartDate.setDate(1)
        // 本月日期
        _middleStartDate = new Date(targetDateStamp)
        _middleStartDate.setDate(1)
        // 下月日期
        _rightStartDate = new Date(targetDateStamp)
        _rightStartDate.setMonth(_rightStartDate.getMonth() + 1)
        _rightStartDate.setDate(1)
      } else {
        // 周日历 获取每周对应的周一的日期放入list
        // 1.先计算当前日期对应的周信息
        _middleStartDate = new Date(targetDateStamp)
        // 2.获取上一周的日期
        _leftStartDate = new Date(targetDateStamp)
        _leftStartDate.setDate(_middleStartDate.getDate() - 7)
        // 3.获取下一周的日期
        _rightStartDate = new Date(targetDateStamp)
        _rightStartDate.setDate(_middleStartDate.getDate() + 7)
      }
      /* eslint-disable */
      let prevDate =
        realIndex === 1
          ? _leftStartDate
          : realIndex === 2
          ? _rightStartDate
          : _middleStartDate
      let middleDate =
        realIndex === 1
          ? _middleStartDate
          : realIndex === 2
          ? _leftStartDate
          : _rightStartDate
      let nextDate =
        realIndex === 1
          ? _rightStartDate
          : realIndex === 2
          ? _middleStartDate
          : _leftStartDate
      /* eslint-enable */
      _list.push(
        {
          year: prevDate.getFullYear(),
          month: prevDate.getMonth() + 1,
          startDate: timeFormat(prevDate, 'YYYY/MM/DD'),
          values: this.methodToCalDate(timeFormat(prevDate, 'YYYY/MM/DD'), 0)
        },
        {
          year: middleDate.getFullYear(),
          month: middleDate.getMonth() + 1,
          startDate: timeFormat(middleDate, 'YYYY/MM/DD'),
          values: this.methodToCalDate(timeFormat(middleDate, 'YYYY/MM/DD'), 1)
        },
        {
          year: nextDate.getFullYear(),
          month: nextDate.getMonth() + 1,
          startDate: timeFormat(nextDate, 'YYYY/MM/DD'),
          values: this.methodToCalDate(timeFormat(nextDate, 'YYYY/MM/DD'), 2)
        }
      )
      this.datesList = _list
      console.log(this.datesList)
    },
    handlerSlideChange(realIndex = 0, typeChange = false) {
      this.currentIndex = realIndex
      let _target = new Date()
      // 重新计算日历展示
      if (!typeChange) {
        _target = new Date(`${this.datesList[realIndex].startDate} 00:00`)
        // 如果已经选择的日期和当前展示的不是一个月份 就默认为1号
        if (!this.calendarType) {
          // 如果当前日期在目标日期的七天内 就取当天日期 否则取每周的周日对应的日期
          let _end = new Date(_target.getTime())
          _end.setDate(_end.getDate() + 7)
          if (
            !(
              this.selectedDate.getTime() >= _target.getTime() &&
              this.selectedDate.getTime() <= _end.getTime()
            )
          ) {
            this.selectedDate = _target
          }
        } else {
          if (!this.isSameMonth) {
            // 月日历只要是同一个月份 目标月份就是当前选择日期的1号日期
            _target.setDate(1)
            // this.selectedDate = new Date(_target.getTime())
          } else {
            // 月日历只要不是同一个月份 目标月份就是当前选择日期的1号日期
            this.selectedDate =
              this.selectedDate.getMonth() === _target.getMonth()
                ? this.selectedDate
                : _target
          }
        }
        this.calcDateList(_target.getTime(), realIndex)
      } else {
        // 先获取最新的日期列表 如果
        if (realIndex !== 1) {
          _target = new Date(this.selectedDate.getTime())
          if (this.calendarType) {
            //  如果是周日历切换到月日历 就把目标日期设置为当月1号
            _target.setDate(1)
          } else {
            //  如果是月日历切换到周日历 就把目标日期对应的周展示出来
            _target.setDate(
              _target.getDate() - (!_target.getDay() ? 0 : _target.getDay())
            )
          }
          this.calcDateList(_target.getTime(), realIndex)
        }
      }
      this.$nextTick(() => {
        this.$refs.myDateSwiper.reset()
        // 纠正下选中的日期
        if (
          this.calendarType &&
          timeFormat(this.selectedDate, 'YYYY/MM') + '/01' !==
            this.datesList[this.currentIndex].startDate
        ) {
          this.selectedDate = new Date(
            `${this.datesList[this.currentIndex].startDate} 00:00:00`
          )
        }
        this.calendarHeight = this.getChildHeight()
        this.$emit('change', {
          date: this.computedSelectedDate,
          startDate: this.datesList[this.currentIndex].startDate,
          calendarType: this.calendarType
        })
      }, 100)
    },
    changeDateType() {
      this.calendarType = 1 - this.calendarType
    },
    methodToChooseDate() {
      this.$emit('choose')
    },
    getChildHeight() {
      let node = this.$refs.myDateSwiper.$el.childNodes[0].childNodes[
        this.currentIndex + 1
      ].childNodes[0]
      return (
        node.scrollHeight ||
        node.getBoundingClientRect().height ||
        node.offsetHight
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/sass/flex.scss';
.md-flex-calendar {
  .calendar-title {
    height: 40px;
    font-size: 15px;
    color: rgba(25, 31, 37, 0.6);
    background: #ffffff;
    border-bottom: 1px solid rgba(17, 31, 44, 0.12);
    .iconfont {
      color: #c7c7cc;
    }
  }

  .calendar-main {
    padding-top: 12px;
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    .my-slider {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      transition: all ease 0.5s;
    }
    .calendar-main-content {
      width: 100%;
      text-align: center;
      animation-duration: 1s;
      animation-delay: 100ms;
      -webkit-animation-duration: 500ms;
      -webkit-animation-delay: 100ms;
      padding: 0 16px;
      > .calendar-content {
        flex-flow: row wrap;
        > li {
          padding: 0 !important;
          color: rgba(17, 31, 44, 1);
          > span {
            display: block;
            margin: 0 auto;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            line-height: 28px;
            font-weight: 600;
            &:nth-of-type(1) {
              font-size: 14px;
            }
          }
          .status {
            position: absolute;
            bottom: -12px;
            font-size: 5px;
            left: 50%;
            margin-left: -5px;
            transform: scale(0.417);
            color: #0089ff;
            &.unmormal {
              color: #ff9d16;
            }
          }
          &:nth-child(7n + 1),
          &:nth-child(7n) {
            color: rgba(17, 31, 44, 0.28);
          }
          &:first-child,
          &:last-child {
            color: rgba(17, 31, 44, 0.28);
          }
        }
        &.matched {
          .selected {
            span {
              background: rgba(0, 106, 254, 1);
              color: #fff;
            }
          }
          .darken {
            color: rgba(17, 31, 44, 0.28);
          }
        }
      }
    }
    .calendar-main-title li,
    .calendar-main-content li {
      width: calc((100% / 7));
      text-align: center;
      flex-direction: column;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      margin-bottom: 12px;
      position: relative;
    }
    .calendar-main-title {
      padding: 0 16px;
      > li {
        margin-bottom: 8px;
        color: rgba(17, 31, 44, 0.56);
        &:last-child,
        &:first-child {
          color: rgba(17, 31, 44, 0.28);
        }
      }
    }
  }
  .calendar-slider {
    overflow-x: hidden;
    transition: all ease 0.3s;
  }
}
.expand-box {
  position: relative;
  text-align: center;
  overflow: hidden;
  font-size: 14px;
  color: #999;
  &:before,
  &:after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 1px;
    position: absolute;
    background: rgba(25, 31, 37, 0.12);
    top: 11px;
  }
  &:before {
    transform: translateX(-100%);
  }
  .expand {
    height: 24px;
    width: 24px;
    line-height: 24px;
    span {
      color: #c7c7cc;
    }
  }
}
</style>
