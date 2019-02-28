<template lang="pug">
  .page.page-familyinfo.text-center
    .page-header
    .page-body
      .content-box
        .content-title
          .h3 {{title}}
        .content-main
          p(v-if="show",v-for="(v,i) in content",:key="i") {{v}}
    .page-footer
      .page-footer-text-box
        .page-footer-text
          transition(name="fade",enter-active-class="animated fadeInLeft",leave-active-class="animated fadeOutLeft")
            .h2(v-if="show") {{footerText.title}}
          transition(name="fade",enter-active-class="animated fadeInRight",leave-active-class="animated fadeOutRight")
            p(v-if="show") {{footerText.content}}
        .page-footer-next-btn(@click="$emit('slideNext')")
          img(src="../assets/imgs/next.png")
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'familyinfo',
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'baseUrl']),
    title () {
      return (this.userInfo.familyinfo || {})['title'] || ''
    },
    content () {
      return (this.userInfo.familyinfo || {})['content'] || []
    },
    footerText () {
      let result = (this.userInfo.familyinfo || {})['footertext'] || {}
      return result
    }
  },
  methods: {
    pageShow () {
      this.show = true
      this.$nextTick(() => {
        let text = new SplitText(document.querySelectorAll('.page-familyinfo .content-main p'), {type: 'chars'})
        let tl = new TimelineMax()
        tl.staggerFrom(text.chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin: "0% 50% -50", ease:Back.easeOut}, 0.01)
      })
    },
    pageHide () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
  $titleH: 3.6rem;
  .page {
    background: #EDD0BE;
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
          overflow: auto;
        }
      }
    }
    .page-footer {
      background: #E03636;
    }
  }
</style>
