<template>
    <div class="player">
        <div id="box">
            <h1 id="user"></h1>
            <h2 id="musicMsg">{{ musicTitle }}</h2>
            <div id="container">
                <ul id="lyric">
                    <li v-for="item in lyricList">{{ item.text }}</li>
                </ul>
            </div>
            <audio :src="audioURL" controls loop autoplay></audio>
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
            musicTitle: '',
            lyricList: {},
            audioURL: '',
            lyricsObj: {}
        }
    },
    methods: {
        loadData() {
            const _this = this;
            function parseLyric(lrc) {
                var lyrics = lrc.split("\n");
                var lrcObj = {};
                for (var i = 0; i < lyrics.length; i++) {
                    var lyric = decodeURIComponent(lyrics[i]);
                    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                    var timeRegExpArr = lyric.match(timeReg);
                    if (!timeRegExpArr) continue;
                    var clause = lyric.replace(timeReg, '');

                    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                        var t = timeRegExpArr[k];
                        var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                            sec = Number(String(t.match(/\:\d*/i)).slice(1));
                        var time = min * 60 + sec;
                        lrcObj[time] = clause;
                    }
                }
                return lrcObj;
            };

             var text_temp;
            function lyricUpdate() {
                var currentTime = Math.round(this.currentTime);
                var data = _this.lyricList;
                if (!data) return;
                var lrc = data[currentTime];
                if (!lrc) return;
                var text = lrc.text;
                if (text !== text_temp) {
                    locationLrc(lrc);
                    text_temp = text;
                }
                function locationLrc(lrc) {
                    var on = lyric.getElementsByClassName('on');
                    if (on) {
                        for (let i = 0; i < on.length; i++) {
                            on[i].removeAttribute('class');
                        }
                    }
                    var li = lyric.getElementsByTagName('li')[lrc.index];
                    if(li === undefined) {
                        _this.loadData();
                        return;
                    }
                    li.className = 'on';
                    var top = Math.min(0, -lrc.top);
                    lyric.style.transform = `translate(0,${-lrc.top}px)`
                }
            }

            var id = this.$route.query.id;
            var Musicurl = this.$BASE_URL + '/music/url?id=' + id;
            var Lyricurl = this.$BASE_URL + '/lyric?id=' + id;
            this.musicTitle = unescape(this.$route.query.musicName);

            // audio 播放器
            this.$axios.get(Musicurl).then(res => {
                if(res.data.data[0].url) {
                    this.audioURL = res.data.data[0].url.replace('http', 'https');
                }
            }).catch(err => {
                console.log(err);
            })

            // 歌词
            var lyric = document.getElementById('lyric');
            var audio = document.getElementsByTagName('audio')[0];
            var lyricLineHeight = '32';
            var offset = lyric.parentNode.offsetHeight * 0.4;

            // 歌词
            this.$axios.get(Lyricurl).then(res => {
                if(res.data.nolyric) {
                    return;
                }
                const data = res.data.lrc.lyric;
                this.lyricsObj = parseLyric(data);
                var i = 0;
                for (let k in this.lyricsObj) {
                    var txt = this.lyricsObj[k];
                    if (!txt) txt = ' ';
                    this.lyricList[k] = {
                        index: i++,
                        text: txt,
                        top: i * lyricLineHeight - offset
                    };
                    // 监听 audio 时间轴
                    audio.addEventListener('timeupdate', lyricUpdate, false);
                };
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.loadData();
		setTimeout(() => {
            this.$NProgress.done();
        }, 0);
    }
}
</script>
<style lang="scss" scoped>
@import url('../../assets/style/music/player.css');
</style>
