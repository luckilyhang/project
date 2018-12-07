<template>
  <div>
    <p>{{dd}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dd: ""
    };
  },
  created() {
    this.dd = this.$route.query.name;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
