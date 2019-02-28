<template lang="pug">
  .page-aboutme-more-text
    p(v-for="(v,i) in content",:key="i") {{v}}
</template>

<script>
export default {
  name: 'aboutme-more-text',
  props: ['content'],
  mounted () {
    this.$nextTick(() => {
      let text = new SplitText(document.querySelectorAll('.page-aboutme-more-text p'), {type: 'chars'})
      let tl = new TimelineMax()
      tl.staggerFrom(text.chars, 0.6, {scale: 4, autoAlpha: 0, rotationX: -180, transformOrigin: "100% 50%", ease: Back.easeOut}, 0.02)
    })
  }
}
</script>

<style lang="scss">
</style>
