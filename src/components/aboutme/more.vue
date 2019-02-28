<template lang="pug">
  .page.page-aboutme-more.text-center.swiper-no-swiping
    .page-header
      .h1
        i.iconfont.iconworld
        | {{title}}
      .sub
        span.goback(@click="changeActive")
          i.iconfont.iconhand
          | 返回
    .page-body
      .navbar
        .navbar-item(
          v-for="(v,i) in contentsList",
          :key="i",
          :class="{active: i==activeIndex}",
          @click="changeActiveIndex(i)"
        )
          .navbar-item-icon.iconfont(:class="v.icon")
          .navbar-item-text {{v.tag}}
      .content
        .content-bg
          img(src="../../assets/imgs/gaishiyingxiong.jpg")
        .content-text
          moretext(v-if="show && showContent",:content="content")
    .page-footer
      span(v-for="(v,i) in footerText",:key="i") {{v}}
</template>

<script>
import {mapState} from 'vuex'
import moretext from './more-text'
export default {
  name: 'aboutme-more',
  components: {
    moretext
  },
  data () {
    return {
      show: false,
      showContent: true,
      activeIndex: 0
    }
  },
  computed: {
    ...mapState(['userInfo', 'baseUrl']),
    title () {
      return (this.userInfo.aboutme_more || {})['title'] || ''
    },
    initIndex () {
      return (this.userInfo.aboutme_more || {})['initIndex'] || []
    },
    contentsList () {
      return (this.userInfo.aboutme_more || {})['content'] || []
    },
    content () {
      return (this.contentsList[this.activeIndex] || {})['content'] || []
    },
    footerText () {
      let result = (this.userInfo.aboutme_more || {})['footertext'] || []
      return result
    }
  },
  created () {
    this.activeIndex = this.initIndex
  },
  methods: {
    pageShow () {
      this.show = true
    },
    pageHide () {
      this.show = false
    },
    changeActive () {
      this.$emit('changeActive', 0)
    },
    changeActiveIndex (index) {
      this.activeIndex = index
      this.showContent = false
      this.$nextTick(() => {
        this.showContent = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/color";
  $titleH: 3.6rem;
  .page-aboutme-more {
    background: #fff;
    .page-header {
      padding: 3vw 5vw;
      .h1 {
        height: 3rem;
        line-height: 3rem;
        font-size: 2rem;
        font-family: 黑体;
        color: #55acd7;
        .iconfont {
          font-size: 2.6rem;
          vertical-align: bottom;
          margin-right: .5rem;
        }
      }
      .sub {
        height: 2rem;
        line-height: 2rem;
        .goback {
          color: #536998;
          cursor: pointer;
          .iconhand {
            margin-right: .5rem;
            animation: moreShake 1s infinite;
          }
        }
        @keyframes moreShake{
          0%,100%{ transform: translate3d(0,0,0) }
          25%{ transform: translate3d(-.3rem,0,0) }
          75%{ transform: translate3d(.3rem,0,0) }
        }
      }
    }
    .page-body {
      display: flex;
      flex-direction: column;
      padding: 0 5vw 5vw;
      .navbar {
        display: flex;
        padding-bottom: 5vw;
        justify-content: space-between;
        color: #fff;
        .navbar-item {
          width: 15.5vw;
          height: 15.5vw;
          padding: 1.5vw;
          border-radius: .5rem;
          text-shadow: 0 1px 1px $Grey;
          background: #dedede;
          cursor: pointer;
          &.active {
            background: $danger;
          }
          .navbar-item-icon {
            height: 8.5vw;
            line-height: 8.5vw;
            font-size: 6vw;
          }
          .navbar-item-text {
            height: 4vw;
            line-height: 4vw;
            font-size: 3.5vw;
          }
        }
      }
      .content {
        flex-grow: 1;
        position: relative;
        border-radius: .5rem;
        font-size: 1.2rem;
        color: $Blackest;
        text-align: left;
        text-shadow: 1px 1px 0 #fff;
        background: rgba(239,178,23,.5);
        .content-text {
          position: absolute;
          left: 1.5rem;
          top: 1.5rem;
          right: 1.5rem;
          bottom: 1.5rem;
          overflow: auto;
        }
        .content-bg {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          /*background: rgba(239,178,23,.5) url('../../../static/imgs/gaishiyingxiong.jpg') no-repeat center center;*/
          /*background-size: 100% 100%;*/
          opacity: .35;
          filter: grayscale(100%) blur(2px);
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .page-footer {
      height: 4rem;
      line-height: 3.8rem;
      color: #556981;
      background: #d8e0e7;
      span {
        margin: 0 .25rem;
      }
    }
  }
</style>
