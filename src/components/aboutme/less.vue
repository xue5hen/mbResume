<template lang="pug">
  .page.page-aboutme-less.text-center
    .page-header
    .page-body
      .content-box
        .content-title
          .h3 {{title}}
        .content-main
          template(v-if="show")
            .content-main-text-box
              .content-main-text
                p(v-for="(v,i) in content",:key="i") {{v}}
            .content-main-fragments
              .content-main-fragments-item(v-for="i in fragmentsTotal",:key="i",:style="{background:colorArr[i%6]}")
        .content-footer.text-center(v-if="show && showMore")
          span.more(@click="changeActive")
            i.iconfont.iconhand
            | 想了解更多
    .page-footer
      .page-footer-text-box
        .page-footer-text
          transition(name="fade",enter-active-class="animated fadeInLeft",leave-active-class="animated fadeOutLeft")
            .h2(v-if="show") {{footerText.title}}
          transition(name="fade",enter-active-class="animated fadeInRight",leave-active-class="animated fadeOutRight")
            p(v-if="show") {{footerText.content}}
        .page-footer-next-btn(@click="$emit('slideNext')")
          img(src="../../assets/imgs/next.png")
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'aboutme-less',
  data () {
    return {
      show: false,
      colorArr: ['#020e4e','#dbe3f3','#6581bf','#8da2d2','#ffffff','#6b86c3'],
      fragmentsTotal: 90
    }
  },
  computed: {
    ...mapState(['userInfo', 'baseUrl']),
    showMore () {
      return (this.userInfo.aboutme || {})['showMore'] || false
    },
    title () {
      return (this.userInfo.aboutme || {})['title'] || ''
    },
    content () {
      return (this.userInfo.aboutme || {})['content'] || []
    },
    footerText () {
      let result = (this.userInfo.aboutme || {})['footertext'] || {}
      return result
    }
  },
  methods: {
    pageShow () {
      this.show = true
      this.$nextTick(() => {
        this.fragmentsFly()
      })
    },
    pageHide () {
      this.show = false
    },
    changeActive () {
      this.$emit('changeActive', 1)
    },
    fragmentsFly () {
      let fragmentsTl = new TimelineMax()
      let textBoxTl = new TimelineMax()
      let fragments = document.querySelectorAll('.page-aboutme-less .content-main-fragments-item')
      let textBoxObj = document.querySelectorAll('.page-aboutme-less .content-main-text')
      fragmentsTl.set(fragments, { opacity:1, x:900, y:800, z:2050, transformPerspective:2000 })
      textBoxTl.set(textBoxObj, { height:0, overflow:'hidden' })
      fragmentsTl.staggerTo(fragments, 2, {
        cycle: {
          bezier: function () {
            return [
              {x:Math.random()*300+400, y:Math.random()*200+500,z:1050},
              {x:Math.random()*300+200, y:Math.random()*200+300,z:550},
              {x:Math.random()*100, y:Math.random()*200+300,z:500},
              {x:Math.random()*100-300, y:Math.random()*100+200,z:450},
              {x:Math.random()*100-300, y:Math.random()*20+60,z:400},
              {x:Math.random()*50-150, y:Math.random()*100-200,z:350},
              {x:Math.random()*100+150, y:Math.random()*100-200,z:300},
              {x:Math.random()*100+220, y:Math.random()*100+20,z:400},
              {x:Math.random()*10+100, y:Math.random()*100+30,z:350},
              {x:0,y:0,z:0}
            ]
          },
          rotationX: function(){
            return Math.random()*70
          },
          rotationY: function(){
            return Math.random()*70
          }
        },
        onComplete: function() {
          this.target.style.opacity = 0
        }
      }, .011)
      textBoxTl.to(textBoxObj, 2, {
        height: '40vh', overflow:'hidden'
      }, 2).to(textBoxObj, 0.5, {
        height: 'auto'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $titleH: 3.6rem;
  .page {
    background: #DAF9CA;
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
        .content-main {
          flex-grow: 1;
          position: relative;
          font-size: 1.2rem;
          display: flex;
          flex-direction: column;
          .content-main-text-box {
            height: 0;
            flex-grow: 1;
            overflow: hidden;
          }
          .content-main-fragments {
            position: absolute;
            left: 1rem;
            top: 1rem;
            right: 1rem;
            .content-main-fragments-item {
              display: inline-block;
              width: 0;
              height: 0;
              margin: 0.35%;
              padding: 3.5%;
              border-radius: 50%;
            }
          }
        }
        .content-footer {
          height: 3rem;
          padding-top: 1rem;
          font-size: 1.2rem;
          line-height: 2rem;
          .more {
            cursor: pointer;
            .iconhand {
              margin-right: .5rem;
              animation: moreShake 1s infinite;
            }
          }
        }
        @keyframes moreShake{
          0%,100%{ transform: translate3d(0,0,0) }
          25%{ transform: translate3d(-.3rem,0,0) }
          75%{ transform: translate3d(.3rem,0,0) }
        }
      }
    }
    .page-footer {
      background: #199475;
    }
  }
</style>
