<template lang="pug">
  swiper(:options="swiperOption",ref="mySwiper")
    swiper-slide(v-for="(v,i) in mySwiperSlides",:key="i")
      div(:is="v",:ref="v",@slideNext="slideNext")
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import http from '@/utils/http'
import welcome from '@/components/welcome'
import familyinfo from '@/components/familyinfo'
import userinfo from '@/components/userinfo'
import aboutme from '@/components/aboutme'
import end from '@/components/end'
export default {
  name: 'User',
  components: {
    welcome,
    userinfo,
    familyinfo,
    aboutme,
    end
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
  created () {
    this.getUserInfo()
  },
  computed: {
    ...mapState(['userInfo', 'baseUrl']),
    mySwiper () {
      return this.$refs.mySwiper.swiper
    },
    mySwiperSlides () {
      return this.userInfo.components || ['welcome', 'end']
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
    ...mapMutations(['userInfoSetter']),
    getUserInfo () {
      console.log(this.$route)
      if (this.$route.params.userId) {
        http.get(`/api/users/${this.$route.params.userId}/userinfo.json`).then((res) => {
          if (res && res.success) {
            this.userInfoSetter(res.data)
          } else {
            alert('请求错误！')
            this.$router.push({name: 'Index'})
          }
        })
      } else {
        alert('用户编号不能为空！')
        this.$router.push({name: 'Index'})
      }
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
    slideNext () {
      this.mySwiper.slideNext()
    }
  }
}
</script>

<style lang="scss">
  .swiper-container {
    height: 100%;
  }
</style>
