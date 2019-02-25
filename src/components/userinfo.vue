<template lang="pug">
  .page.text-center
    .page-header
    .page-body
      .content-box
        .content-title
          .h3 基本信息
        transition(name="myzoom",mode="out-in")
          .content-circle(v-if="show && !isPanelShow",key="contentCircle")
            .circle-word-box
              ul(v-for="(v,i) in contentCircleArr",:key="i",:style="{transform:'rotateY(' + i * 15 + 'deg)'}")
                li(v-for="(word,index) in v",:key="index",:style="word.style") {{word.value}}
          .content-panel(v-else-if="show && isPanelShow",key="contentPanel")
            p(v-for="(v,i) in content",:key="i") {{v}}
    .page-footer
      .page-footer-text-box
        transition(name="fade",enter-active-class="animated fadeIn",leave-active-class="animated fadeOut")
          .page-footer-text(v-if="show")
            .h2 {{footerText.title}}
            p {{footerText.content}}
        .page-footer-next-btn(@click="$emit('slideNext')")
          img(src="../assets/imgs/next.png")
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'userinfo',
  data () {
    return {
      circleR: 150,
      show: false,
      isPanelShow: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'baseUrl']),
    content () {
      return (this.userInfo.userinfo || {})['content'] || []
    },
    footerText () {
      let result = (this.userInfo.userinfo || {})['footertext'] || {}
      return result
    },
    contentCircleArr () {
      let result = []
      let content = this.content.join('')
      content = content.replace(/[^\u4e00-\u9fa5]/gi, '')
      if (content.length < 360) {
        content = content.padEnd(360, content || '字数不够我来凑数')
      }
      let unitX = (Math.PI / 180) * 12
      let r = this.circleR
      for (let i = 0; i < 12; i++) {
        let arr = []
        for (let j = 0; j < 30; j++) {
          let word = {}
          word.value = content[i * 30 + j] || 'YB'
          word.style = {
            transform: `translate3d(${Math.cos(j * unitX) * r}px,${-Math.sin(j * unitX) * r}px,0px) rotateZ(-${j * 12}deg) rotateY(-90deg)`
          }
          arr.push(word)
        }
        result.push(arr)
      }
      return result
    }
  },
  methods: {
    pageShow () {
      this.show = true
      setTimeout(() => {
        this.isPanelShow = true
      }, 1500)
    },
    pageHide () {
      this.show = false
      this.isPanelShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  $titleH: 3.6rem;
  .page {
    background: #aad7f8;
    .page-body {
      display: flex;
      flex-direction: column;
      padding: 3rem;
      color: #fff;
      .content-box {
        flex-grow: 1;
        position: relative;
        padding: 5rem 1rem 1rem;
        border: .5rem solid #fff;
        color: #fff;
        text-align: left;
        background: rgba(0,0,0,.5);
        display: flex;
        flex-direction: column;
        .content-title {
          position: absolute;
          top: .75rem;
          left: -1.2rem;
          width: 60%;
          height: 0;
          border: $titleH/2 solid #a20000;
          border-right-color: transparent;
          box-shadow: 0 .4rem .4rem -.3rem rgba(0,0,0,.75);
          &:after {
            content: '';
            position: absolute;
            left: -$titleH/2;
            top: $titleH/2;
            width: 0;
            height: 0;
            border: .35rem solid #000;
            border-left-color: transparent;
            border-bottom-color: transparent;
          }
          .h3 {
            position: absolute;
            left: -.5rem;
            top: -$titleH/2;
            font-size: 1.8rem;
            line-height: $titleH;
          }
        }
        .content-circle {
          padding: 150px 50%;
          transform-style: preserve-3d;
          perspective: 900px;
          .circle-word-box {
            transform-style: preserve-3d;
            font-size: 1.2rem;
            font-weight: bold;
            animation: circleRotate 10s linear infinite;
            ul {
              position: relative;
              transform-style: preserve-3d;
              li {
                position: absolute;
              }
            }
          }
          @keyframes circleRotate {
            0% {transform: rotateY(0deg) scale(1);}
            100% {transform: rotateY(360deg) scale(1);}
          }
        }
        .content-panel {
          flex-grow: 1;
          position: relative;
          font-size: 1.2rem;
          overflow: auto;
        }
      }
    }
    .page-footer {
      background: #3a5fe4;
    }
  }
</style>
