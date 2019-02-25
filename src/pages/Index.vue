<template lang="pug">
  .page
    .introduction
      p 本站试图打造一个小巧漂亮的相亲简历模板，用户提供相关数据后就可快速创立一个简历。
      p
        | 如果你不懂开发，我倒是愿意把你的简历挂到本站上展示（
        span.text-danger 点击姓名访问
        | ），但是希望你能提供一些有益的点子、建议或是别的让你眼前一亮的炫酷特效来丰富和改善本站的页面效果。
      p 邮箱：461399479@qq.com
    .list-card.boys
      .list-card-title 帅哥
      ul.list-card-content.clearfix
        li(v-for="(v,i) in boys",:key="i")
          span.link(@click="clickUserHandler(v.userId)")
            i.iconfont(:class="'icon'+v.sex")
            span {{v.name}}
    .list-card.girls
      .list-card-title 美女
      ul.list-card-content.clearfix
        li(v-for="(v,i) in girls",:key="i")
          span.link(@click="clickUserHandler(v.userId)")
            i.iconfont(:class="'icon'+v.sex")
            span {{v.name}}
    .reward.text-center
      p 点赞是美意，打赏是鼓励
      img(src="../assets/imgs/weixin.png")
</template>

<script>
import {getUsersList} from '../services/ajax'
export default {
  name: 'Index',
  data () {
    return {
      boys: [],
      girls: []
    }
  },
  created () {
    this.getUsersListHandler()
  },
  methods: {
    getUsersList,
    getUsersListHandler () {
      this.getUsersList().then((res) => {
        if (res && res.success) {
          this.boys = res.data.boys
          this.girls = res.data.girls
        }
      })
    },
    clickUserHandler (userId) {
      this.$router.push({
        name: 'User',
        params: { userId: userId }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    padding: 1rem 1.5rem;
    color: #5a5a5a;
    background: #fff;
    overflow: auto;
    .introduction {
      font-size: 1.2rem;
      text-indent: 2em;
      text-shadow: 1px 1px 0 #eee,1px 1px 1px rgba(0,0,0,.3);
    }
    .list-card {
      display: flex;
      flex-direction: column;
      min-height: 10rem;
      max-height: 40vh;
      margin-top: 1rem;
      border: 1px solid #eaeaea;
      background: #fff;
      &.boys {
        border-left: 5px solid #4d9cc8;
      }
      &.girls {
        border-left: 5px solid #e44d37;
      }
      .list-card-title {
        flex-grow: 0;
        padding-left: .5rem;
        height: 3rem;
        line-height: 3rem;
        font-weight: 600;
        border-bottom: 1px solid #eaeaea;
        background: #f6f6f6;
      }
      .list-card-content {
        flex-grow: 1;
        padding: .5rem;
        overflow-y: auto;
        li {
          float: left;
          width: 25%;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          overflow: hidden;
          .link {
            padding: .4rem;
            cursor: pointer;
          }
          .iconfont {
            margin-right: 5px;
            vertical-align: bottom;
            &.iconboy { color: #4d9cc8; }
            &.icongirl { color: #e44d37; }
          }
        }
      }
    }
    .reward {
      margin-top: 1rem;
      img {
        display: inline-block;
        max-width: 40%;
      }
    }
  }
</style>
