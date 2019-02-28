<template lang="pug">
  swiper(:options="swiperOption",ref="mySwiper")
    swiper-slide(v-for="(v,i) in mySwiperSlides",:key="i")
      div(:is="v",:ref="v",@changeActive="changeActiveHandler",@slideNext="$emit('slideNext')")
</template>

<script>
import {mapState} from 'vuex'
import less from './less'
import more from './more'
export default {
  name: 'aboutme',
  components: {
    less,
    more
  },
  data () {
    return {
      swiperOption: {
        effect: 'flip',
        on: {
          slideChangeTransitionEnd: () => {
            this.slideChangeHandler(this.mySwiper.previousIndex, this.mySwiper.activeIndex)
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    showMore () {
      return (this.userInfo.aboutme || {})['showMore'] || false
    },
    mySwiperSlides () {
      let result = this.showMore ? ['less', 'more'] : ['less']
      return result
    },
    mySwiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    pageShow () {
      this.slideChangeHandler(null, 0)
    },
    pageHide () {
      this.slideChangeHandler(0, null)
    },
    slideChangeHandler (prev, cur) {
      let prevComRef = this.mySwiperSlides[prev]
      let curComRef = this.mySwiperSlides[cur]
      let prevComObj = (this.$refs[prevComRef] instanceof Array) ? this.$refs[prevComRef][0] : this.$refs[prevComRef]
      let curComObj = (this.$refs[curComRef] instanceof Array) ? this.$refs[curComRef][0] : this.$refs[curComRef]
      if (prevComObj && prevComObj.pageHide) {
        prevComObj.pageHide()
      }
      if (curComObj && curComObj.pageShow) {
        curComObj.pageShow()
      }
    },
    changeActiveHandler (active) {
      this.mySwiper.slideTo(active)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
