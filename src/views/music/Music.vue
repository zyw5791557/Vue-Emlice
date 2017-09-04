<template>
    <div class="music">
        <h3 id="tip" :style="{ opacity: auchorOpacity }">Emlice</h3>
        <div id="music">
            <input type="text" id="search" placeholder="请输入歌曲名或歌手" @blur="authorEvent" @focus="authorEvent" @keyup.enter="loadMusicData" v-model="searchData">
            <button id="btn" @click="loadMusicData">查询</button>
            <div id="box">
                <ul id="musicList">
                    <li  v-for="item in musicListData">
                        <router-link tag="span" :to="{ name: 'Player', query: { id: item.id, musicName: escape(item.name) } }">{{ item.name}} - {{ item.artists[0].name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <more></more>
    </div>
</template>
<script>
import more from '../../components/music/more.vue';
export default {
    components: {
        more
    },
    data() {
        return {
            searchData: '',
            musicListData: [],
            auchorOpacity: 0
        }
    },
    methods: {
        loadMusicData() {
            const url = this.$BASE_URL + '/search?keywords=' + this.searchData;
            this.$axios.get(url).then(res => {
                this.musicListData = res.data.result.songs;
            }).catch(err => {

            })
        },
        escape(val) {
            return window.escape(val);
        },
        authorEvent() {
            if(this.auchorOpacity == 0) {
                this.auchorOpacity = 1;
            } else {
                this.auchorOpacity = 0;
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.$NProgress.done();
        }, 0);
    }
}
</script>
<style lang="scss" scoped>
@import url('../../assets/style/music/music.css');
</style>
