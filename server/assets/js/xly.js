// 获取 url 参数的值
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var id = GetQueryString('id');
var Musicurl = '/music/url?id=' + id;
var Lyricurl = '/lyric?id=' + id;
var box = document.getElementById('box');
var audio = document.createElement('audio');
var title = document.getElementById('musicMsg');
title.textContent = unescape(GetQueryString('musicName'));
// ajax 请求方法
function ajax(url,fnc) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = function(){
　　　　if ( xhr.readyState == 4 && xhr.status == 200 ) {
　　　　    var res = JSON.parse( xhr.responseText );
            fnc(res);
　　　　}
　　};
};

function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');

        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
};


// ajax 请求渲染 audio
ajax(Musicurl, function(res) {
    audio.src = res.data[0].url;
    audio.controls = 'controls';
    audio.loop = 'loop';
    audio.autoplay = 'autoplay';
    box.appendChild(audio);
});

// 歌词
var lyric = document.getElementById('lyric');
var lyricLineHeight = '32';
var offset = lyric.parentNode.offsetHeight * 0.4;
ajax(Lyricurl, function(res) {
    var data = res.lrc.lyric;
    audio.lyrics = parseLyric(data);
    audio.lyricList = {};
    var i = 0;
    for(let k in audio.lyrics) {
        var txt = audio.lyrics[k];
        if(!txt) txt = '&nbsp;';
        audio.lyricList[k] = {
            index: i++,
            text: txt,
            top: i * lyricLineHeight - offset
        }
        var li = document.createElement('li');
        li.innerHTML = txt;
        lyric.appendChild(li);
        // 监听 audio 时间轴
        audio.addEventListener('timeupdate', lyricUpdate, false);
    };
});


var text_temp;
function lyricUpdate() {
    var currentTime = Math.round(this.currentTime);
    var data = audio.lyricList;
    if(!data) return;
    var lrc = data[currentTime];
    if(!lrc) return;
    var text = lrc.text;
    if(text !== text_temp) {
        locationLrc(lrc);
        text_temp = text;
    }
    function locationLrc(lrc) {
        var on = lyric.getElementsByClassName('on');
        if(on) {
            for(let i = 0; i < on.length; i++) {
                on[i].removeAttribute('class');
            }
        }
        var li = lyric.getElementsByTagName('li')[lrc.index];
        li.className = 'on';
        var top = Math.min(0, -lrc.top);
        lyric.style.transform = `translate(0,${-lrc.top}px)`
    }
}
