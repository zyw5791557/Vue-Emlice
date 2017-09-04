// localStorage 加速
var fontCDN = localStorage.getItem('fontCDN', true);
if(fontCDN) {
    styleFont();
}else {
    $('#styleFont').remove();
}

// jquery3.2.1 
$('#moreBtn').on('click', function(e) {
    var e = e || event;
    $('#more').css({
        'height': 'auto',
        'opacity': '1'
    });
    e.stopPropagation();
});

$(document).on('click', function(e) {
    $('#more').css({
        'height': '0px',
        'opacity': '0'
    })
});

$('#huaFont').on('click', function() {
    styleFont();
    localStorage.setItem('fontCDN', true);
});

$('#defaultFont').on('click', function() {
    $('#styleFont').remove();
    localStorage.setItem('fontCDN', false);
});

function styleFont() {
    var baseURL = '../assets/font/complete/';  
    var txt = `
    @font-face {
        font-family: 'AaMissLemon';
        src: url('${baseURL}AaMissLemon.eot');
        src: url('${baseURL}AaMissLemon.woff2') format('woff2'),
             url('${baseURL}AaMissLemon.woff') format('woff'),
             url('${baseURL}AaMissLemon.ttf') format('truetype'),
             url('${baseURL}AaMissLemon.svg#AaMissLemon') format('svg'),
             url('${baseURL}AaMissLemon.eot?#iefix') format('embedded-opentype');
        font-weight: normal;
        font-style: normal;
    }
    `;
    $('head').append('<style id="styleFont">'+ txt +'</style>');
}