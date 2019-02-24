<template lang="pug">
  swiper(:options="swiperOption",ref="mySwiper")
    swiper-slide.swiper-slide-0
      mySwiperSlide0(ref="mySwiperSlide0",@slideNext="slideNext")
    swiper-slide.swiper-slide-1
      mySwiperSlide1(ref="mySwiperSlide1",@slideNext="slideNext")
    swiper-slide.swiper-slide-2
      mySwiperSlide2(ref="mySwiperSlide2",@slideNext="slideNext")
</template>

<script>
import mySwiperSlide0 from './mySwiperSlide0'
import mySwiperSlide1 from './mySwiperSlide1'
import mySwiperSlide2 from './mySwiperSlide2'
export default {
  name: 'mySwiper',
  components: {
    mySwiperSlide0,
    mySwiperSlide1,
    mySwiperSlide2
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        effect: 'coverflow',
        on: {
          slideChangeTransitionEnd: () => {
            this.slideChangeHandler(this.mySwiper.previousIndex, this.mySwiper.activeIndex)
          }
        }
      }
    }
  },
  computed: {
    mySwiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.slideChangeHandler(0, this.mySwiper.activeIndex || 0)
      }, 500)
    })
  },
  methods: {
    slideChangeHandler (prev, cur) {
      if (this.$refs['mySwiperSlide' + prev] && this.$refs['mySwiperSlide' + prev].pageHide) {
        this.$refs['mySwiperSlide' + prev].pageHide()
      }
      if (this.$refs['mySwiperSlide' + cur] && this.$refs['mySwiperSlide' + cur].pageShow) {
        this.$refs['mySwiperSlide' + cur].pageShow()
      }
    },
    slideNext () {
      this.mySwiper.slideNext()
    }
  }
}
</script>

<style lang="scss">
  .swiper-container {
    height: 100%;
    .swiper-slide-0 { background: linear-gradient(top,#6a3cc0 0%,#e242a2 30%,#ea798f 100%); }
    .swiper-slide-0 { background: #f3ddd7; }
    .swiper-slide-1 { background: linear-gradient(top,#ba2823 0%,#d55726 30%,#f2c710 100%); }
    .swiper-slide-1 { background: #aad7f8; }
    .swiper-slide-2 { background: linear-gradient(top,#5f5875 0%,#c6aba2 100%); }
    .swiper-slide-2 { background: #e242a2; }
  }
</style>
