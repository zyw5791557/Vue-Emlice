var btn = document.getElementById('btn');
var box = document.getElementById('box');
var search = document.getElementById('search');
btn.onclick = function() {
    var s = document.getElementById('musicList');
    if(s) {
        s.parentNode.removeChild(s);
    }
    var ul = document.createElement('ul');
    ul.id = 'musicList';
    var val = search.value;
    var musicUrlList = [];
    console.log(val);
    if(val.trim().length != 0) {
        var xhr = new XMLHttpRequest();
        var url = '/search?keywords=' + val;
        xhr.open('GET', url)
        xhr.send();
        xhr.onreadystatechange = function(){
    　　　　if ( xhr.readyState == 4 && xhr.status == 200 ) {
                var res = JSON.parse(xhr.responseText);
                musicUrlList = res.result.songs;
                for(var i = 0; i < musicUrlList.length; i++) {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    var msg = musicUrlList[i].name + '-' + musicUrlList[i].artists[0].name;
                    a.textContent = msg;
                    a.href = '/xly?id=' + musicUrlList[i].id + '&musicName=' + escape(msg);
                    // a.target = '_blank';
                    li.appendChild(a);
                    ul.appendChild(li);
                }
                setTimeout(function() {
                    box.appendChild(ul);
                }, 0)
    　　　　}
    　　};
    }
};

// 回车搜索歌曲
search.onkeydown = function(e) {
    if(e.keyCode === 13 ) {
        btn.click();
    }
}
var tip = document.getElementById('tip');
// 特效
search.onfocus = function() {
    tip.style.opacity = '1';
}
search.onblur = function() {
    tip.style.opacity = '0';
}
