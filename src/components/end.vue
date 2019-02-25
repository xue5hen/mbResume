<template lang="pug">
  .page.end.text-center
    .page-header
    .page-body
      .content-box
        .content-title(v-if="show")
          span(v-for="(v,i) in smokeContent",:key="i") {{v}}
        .content-svg(ref="svgbox",v-if="show")
    .page-footer
      .page-footer-text-box
        transition(name="fade",enter-active-class="animated fadeIn",leave-active-class="animated fadeOut")
          .page-footer-text(v-if="show")
            .h2 {{footerText.title}}
            p {{footerText.content}}
</template>

<script>
import {mapState} from 'vuex'
import {getSwingsSVG} from '../services/ajax'
export default {
  name: 'end',
  data () {
    return {
      smokeContent: ` 韶华易逝，莫负流年`,
      show: false,
      svgHtml: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    footerText () {
      let result = (this.userInfo.end || {})['footertext'] || {}
      return result
    }
  },
  methods: {
    getSwingsSVG,
    loadSVG () {
      let svgbox = this.$refs.svgbox
      if (this.svgHtml) {
        svgbox.innerHTML = this.svgHtml
      } else {
        this.getSwingsSVG().then((res) => {
          this.svgHtml = res || ''
          svgbox.innerHTML = this.svgHtml
        })
      }
    },
    pageShow () {
      this.show = true
      this.$nextTick(() => {
        this.loadSVG()
      })
    },
    pageHide () {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
  .end {
    background: #e242a2;
    .page-body {
      display: flex;
      flex-direction: column;
      padding: 3rem;
      color: #fff;
      .content-box {
        flex-grow: 1;
        position: relative;
        border: .5rem solid #fff;
        background: rgba(0,0,0,.5);
        overflow: hidden;
        .content-svg {
          position: absolute;
          left: 5%;
          bottom: 2rem;
          width: 90%;
          svg {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            path {
              fill: transparent;
              stroke: #3ff;
              stroke-width: 2px;
              stroke-linecap: round;
              stroke-dasharray: 2000;
              stroke-dashoffset: -2000;
            }
            @keyframes paint {
              0% { fill: transparent;stroke-dashoffset: -2000; }
              60% { fill: transparent;stroke-width: 1px;stroke-dashoffset: 0; }
              100% { fill: #3ff;stroke-width: 0;stroke-dashoffset: 0; }
            }
            path {animation: paint 3s ease forwards;}
          }
        }
      }
    }
    .page-footer {
      background: #6a3cc0;
    }
  }
</style>
<style lang="scss" scoped>
  /* 文字样式 */
  .content-title{
    position:absolute;
    top: 4rem;
    left: 0;
    z-index: 2;
    width:100%;
    font: 600 1.6rem 仿宋;
    line-height: 2;
    color: transparent;
    backface-visibility: hidden;
    span{
      display: inline-block;
      text-shadow: 0 0 40px whitesmoke;
      animation: smoky 1s 1s both;
      &:nth-child(even) { animation-name: smoky-mirror; }
      &:nth-of-type(1) { animation-delay: 0.1s; }
      &:nth-of-type(2) { animation-delay: 0.2s; }
      &:nth-of-type(3) { animation-delay: 0.3s; }
      &:nth-of-type(4) { animation-delay: 0.4s; }
      &:nth-of-type(5) { animation-delay: 0.5s; }
      &:nth-of-type(6) { animation-delay: 0.6s; }
      &:nth-of-type(7) { animation-delay: 0.7s; }
      &:nth-of-type(8) { animation-delay: 0.8s; }
      &:nth-of-type(9) { animation-delay: 0.9s; }
    }
  }
  @keyframes smoky {
    0% {
      transform: translate3d(15rem, -8rem, 0) rotate(-40deg) skewX(70deg) scale(1.5);
      text-shadow: 0 0 20px whitesmoke;
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0) rotate(0deg) skewX(0deg) scale(1);
      text-shadow: 0 0 0 whitesmoke;
      opacity: 1;
    }
  }
  @keyframes smoky-mirror {
    0% {
      transform: translate3d(18rem, -8rem, 0) rotate(-40deg) skewX(-70deg) scale(2);
      text-shadow: 0 0 20px whitesmoke;
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0) rotate(0deg) skewX(0deg) scale(1);
      text-shadow: 0 0 0 whitesmoke;
      opacity: 1;
    }
  }
</style>
