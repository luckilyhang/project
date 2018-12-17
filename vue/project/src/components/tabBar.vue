<template>
    <div class="tap">
        <ul>
            <li v-for="item in footNav" @click="selectMapNav(item.title)">
                <router-link :to="item.router">
                    <img :src="isSelect === item.title ? item.url1 : item.url" alt="">
                    <p :class="{active:isSelect === item.title}">{{item.title}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSelect: "首页",
            footNav: [
                {
                    router: "/Home",
                    title: "首页",
                    url: "/static/img/home_normal.png",
                    url1: "/static/img/home_active.png"
                },
                {
                    router: "/Fx",
                    title: "发现",
                    url: "/static/img/fx_normal.png",
                    url1: "/static/img/fx_active.png"
                },
                {
                    router: "/Order",   
                    title: "订单",
                    url: "/static/img/order_normal.png",
                    url1: "/static/img/order_active.png"
                },
                {
                    router: "/Mine",
                    title: "我的",
                    url: "/static/img/mine_normal.png",
                    url1: "/static/img/mine_active.png"
                }
            ]
        };
    },
    methods: {
        selectMapNav(title) {
            this.isSelect = title;
        }
    },
    mounted() {
        this.isSelect = this.$route.name;
    }
};
</script>
<style>
.active {
    color: #33a7e2;
}
.norActive {
    color: #000;
}
.tap {
    border-top: 1px solid #ccc;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: #fff;
}
.tap > ul {
    padding-left: 0;
}
.tap > ul > li {
    padding: 0.3rem 0;
    float: left;
    width: 25%;
    list-style: none;
}
.tap > ul > li p {
    margin: 0;
    font-size: 0.5rem;
}
.tap > ul > li img {
    width: 1rem;
    height: 1rem;
}
a {
    text-decoration: none;
}
</style>

