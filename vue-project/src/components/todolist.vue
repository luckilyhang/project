<template>
  <div>
    <div class="list">
      <input
        type="text"
        @keyup.enter="submit"
        v-model="cont"
        class="text-keyword"
        placeholder="输入小目标后，按回车确认"
      />
      <p>共有{{index}}个目标</p>
      <p>
        <input
          type="radio"
          name="chooseType"
          checked="true"
        /><label>所有目标</label>
        <input
          type="radio"
          name="chooseType"
        /><label>已完成目标</label>
        <input
          type="radio"
          name="chooseType"
        /><label>未完成目标</label>
      </p>
    </div>
    <ul>
      <!-- item.isactive=!item.isactive -->
      <li
        class="li1"
        v-for="(item,index) in arrlist"
        :key="index"
      >
        <div>
          <span
            class="type-span"
            @click="item.status=!item.status"
            :class="{'del':item.status,}"
          ></span>
          <span
            @click="drop(item)"
            v-show="item.isactive"
          >{{item.name}}</span>
          <input
            type="text"
            v-model="cc"
            @keyup.enter="change(item)"
            v-show="!item.isactive"
          >
          <span
            class="close"
            @click="del(index)"
          >X</span>
        </div>
      </li>
    </ul>
  </div>

</template>
<script>
export default {
  data() {
    return {
      cont: "",
      index: "",
      cc: "",
      arrlist: [
        {
          name: "html",
          status: false,
          isactive: true
        },
        {
          name: "css",
          status: false,
          isactive: true
        },
        {
          name: "js",
          status: false,
          isactive: true
        }
      ]
    };
  },
  methods: {
    submit() {
      if (this.cont) {
        this.arrlist.push({
          name: this.cont,
          status: false,
          isactive: true
        });
        this.add();
        console.log(this.arrlist);
        this.arrlist.forEach(function(i, k) {
          i.isactive = true;
        });
      }
    },
    del(index) {
      this.arrlist.splice(index, 1);
      this.add();
    },
    add() {
      this.index = this.arrlist.length;
    },
    fn(dd) {
      dd = !dd;
    },
    change(a) {
      a.isactive = true;
      if (this.cc) {
        a.name = this.cc;
      }
    },
    drop(a) {
      a.isactive = !a.isactive;
      this.cc = "";
    }
  },
  created() {
    this.add();
  }
};
</script>
<style>
body {
  font-family: "微软雅黑";
  font-size: 14px;
}
input {
  font-size: 14px;
}
body,
ul,
div,
html {
  padding: 0;
  margin: 0;
}
.hidden {
  display: none;
}
.main {
  width: 800px;
  margin: 0 auto;
}
li {
  list-style-type: none;
  line-height: 40px;
  position: relative;
  border: 1px solid transparent;
  padding: 0 20px;
}
li .type-span {
  display: block;
  width: 10px;
  height: 10px;
  background: #ccc;
  margin: 14px 10px 0 0;
  float: left;
}
li .del {
  display: block;
  width: 10px;
  height: 10px;
  background: red;
  margin: 14px 10px 0 0;
  float: left;
}
li .close {
  position: absolute;
  color: #f00;
  font-size: 20px;
  line-height: 40px;
  height: 40px;
  right: 20px;
  cursor: pointer;
  display: none;
  top: 0;
}
li:hover {
  border: 1px solid #09f;
}
li:hover .close {
  display: block;
}
li .text-keyword {
  height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
  margin-left: 10px;
  width: 80%;
  display: none;
}
.text-keyword {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-left: 10px;
  outline: none;
}
</style>


