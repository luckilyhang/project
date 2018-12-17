<template>
  <div>
    <h4>图片上传预览</h4>
    <div class="rz-picter">
      <ul style="display:flex;justify-content:space-between">
        <li
          v-for='(item,index) in arr'
          :key="index"
        >
            <img
            :src=item
            class="img-avatar"
            preview="0"
            preview-text=index
          >
             <i>{{index}}.png</i>
          <span @click="del(index)">x</span>
        </li>
      </ul>
          <input
        type="file"
        name="avatar"
        id="uppic"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        @change="changeImage($event)"
        ref="avatarInput"
        class="uppic"
      >
      <img src="./../../../static/img/car.png" preview="0" preview-text="描述文字">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avatar: require("./../../../static/img/car.png"),
      arr: []
    };
  },
  methods: {
    changeImage(e) {
      var _this = this;
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        if (_this.arr.length < 3) {
          _this.arr.push(this.result);
        } else {
          alert("一次只能上传3张");
        }
        console.log(_this.arr);
      };
    },
    del(index) {
      this.arr.splice(index, 1);
    }
  }
};
</script>
<style>
</style>


