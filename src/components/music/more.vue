<template>
    <div id="font">
        <span id="moreBtn" class="iconfont icon-gengduo" @click.stop="moreClick"></span>
        <div id="more" :style="moreStyle">
            <ul id="moreList">
                <li v-for="item in moreListData">
                    <span :id="item.id">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            moreListData: [
                { name: '花默', id: 'huaFont' }
            ],
            moreStyle: ''
        }
    },
    methods: {
        moreClick() {
            this.moreStyle = 'height:auto;opacity:1'
        },
        // fontTranslate() {
        //     const fontBaseURL = '../../assets/font/AaMissLemon/';
        //     var s = document.createElement('style');
        //     s.id = 'styleFont';
        //     const txt = `
        //         @font-face {
        //             font-family: 'AaMissLemon';
        //             src: url('${fontBaseURL}AaMissLemon.eot');
        //             src: url('${fontBaseURL}AaMissLemon.woff2') format('woff2'),
        //                 url('${fontBaseURL}AaMissLemon.woff') format('woff'),
        //                 url('${fontBaseURL}AaMissLemon.ttf') format('truetype'),
        //                 url('${fontBaseURL}AaMissLemon.svg#AaMissLemon') format('svg'),
        //                 url('${fontBaseURL}AaMissLemon.eot?#iefix') format('embedded-opentype');
        //             font-weight: normal;
        //             font-style: normal;
        //         }`;
        //     document.getElementsByTagName('head')[0].appendChild(s);
        // },
        docStop() {
            const _this = this;
            function i() {
                _this.moreStyle = 'height:0;opacity:0'
            }
            document.onclick = i;
            document.ontouchstart = i;
        }
    },
    mounted() {
        this.docStop();
    }
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_176319_btl1warj8vbzkt9.css');

/* 更多 */
#font {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
}

#moreBtn {
    height: 36px;
    line-height: 36px;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
}

#font #more {
    position: absolute;
    top: 46px;
    right: 0;
    left: 0;
    opacity: 0;
    height: 0;
    transition: all .3s;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
}

#font #more ul span {
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    display: block;
    line-height: 2rem;
}
</style>
