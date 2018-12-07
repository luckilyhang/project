<template>
  <div>
    <mt-header title="首页">
      <router-link
        to="/home"
        slot="left"
      >
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button
        icon="more"
        slot="right"
      ></mt-button>
    </mt-header>
    <div class="lunbo">
      <mt-swipe :show-indicators="false">
        <mt-swipe-item>
          <img
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2443651471,3753535290&fm=200&gp=0.jpg"
            alt=""
          >
        </mt-swipe-item>
        <mt-swipe-item><img
            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4243239694,1996254031&fm=26&gp=0.jpg"
            alt=""
          ></mt-swipe-item>
        <mt-swipe-item><img
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2786254089,271334605&fm=26&gp=0.jpg"
            alt=""
          ></mt-swipe-item>
      </mt-swipe>
      <p @click="increment">增加</p>{{number}}
      <p @click="apart">减少</p>{{me=me=0?0:me}}
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from "./tabBar.vue";
import mint from "mint-ui";
import { mapState, mapMutations,mapActions } from "vuex";
export default {
  components: {
    tabBar,
    mint
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["number",'me'])
  },
  methods: {
    ...mapMutations(["add",'educe']),
    ...mapActions(["increment",'apart']),
  },
  mounted() {
    let num = 123;
    this.changnum(num);
  },
  created() {
    // this.$store.commit('add')
    console.log();
  }
};
</script>
<style scoped>
.lunbo {
  overflow: hidden;
  width: 100%;
  height: 150px;
  padding-bottom: 30%;
}
</style>


