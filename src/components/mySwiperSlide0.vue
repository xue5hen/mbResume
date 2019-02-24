<template lang="pug">
  .page.text-center
    .page-header
      .page-header-text-box(:class="{'fold':!show}")
        span(v-for="(v,i) in title",:key="i",:style="{color:v.color}") {{v.text}}
    .page-body
      transition(name="zoom",enter-active-class="animated zoomInUp",leave-active-class="animated zoomOutUp")
        .img-box(v-if="show")
          img(src="../assets/imgs/yuanbiao.png",alt="头像")
    .page-footer
      img.buildings(src="../assets/imgs/buildings.svg",:class="{show: show}")
      .page-footer-text-box
        transition(name="fade",enter-active-class="animated fadeIn",leave-active-class="animated fadeOut")
          .page-footer-text(v-if="show")
            .h2 WELCOME
            p Create A Happy Life With Me
        .page-footer-next-btn(@click="$emit('slideNext')")
          img(src="../assets/imgs/next.png")
</template>

<script>
export default {
  name: 'mySwiperSlide0',
  data () {
    return {
      title: [
        {text: '相', color: '#fff'},
        {text: '亲', color: '#fff'},
        {text: '💗', color: '#f00'},
        {text: '简', color: '#fff'},
        {text: '历', color: '#fff'}
      ],
      show: false
    }
  },
  methods: {
    pageShow () {
      this.show = true
    },
    pageHide () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    padding-top: 7rem;
    .page-header {
      width: 100%;
      height: 4rem;
      font-size: 2rem;
      line-height: 4rem;
      z-index: 2;
      .page-header-text-box {
        display: inline-block;
        height: 100%;
        transition: all .5s;
        box-shadow: 0 8px 8px rgba(0,0,0,.3);
        &.fold {
          transform: scaleX(0);
        }
      }
      span {
        display: inline-block;
        width: 3rem;
        height: 100%;
        transition: all .5s;
        background: #185a81;
        &:nth-child(odd) {
          transform: skewY(15deg);
          transform-origin: 0 100%;
        }
        &:nth-child(even) {
          transform: skewY(-15deg);
          transform-origin: 100% 0;
          background: #144c6e;
        }
      }
    }
    .page-body {
      padding-top: 3.5rem;
      .img-box {
        display: inline-block;
        width: 10rem;
        height: 10rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: .5rem solid #fff;
          background: #6cf;
          animation: img_shine 3s linear infinite;
        }
      }
      @keyframes img_shine {
        0% { box-shadow: 0 0 0 0.5rem #39f, 0 0 15rem #6cf; }
        50% { box-shadow: 0 0 0 0.5rem #39f, 0 0 1rem #6cf; }
        100% { box-shadow: 0 0 0 0.5rem #39f, 0 0 15rem #6cf; }
      }
    }
    .page-footer {
      background: #fcac3c;
      .buildings {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        transform: translateY(0);
        transition: all .5s;
        &.show {
          transform: translateY(-100%);
        }
      }
      .page-footer-text-box {
        background: #fcac3c;
      }
    }
  }
</style>
