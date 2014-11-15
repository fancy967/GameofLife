/*
 * Create new game instance and start the game when the website is loaded.
 */
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try { d.documentElement.doScroll('left'); run(); }
                catch (err) { setTimeout(arguments.callee, 0); }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();

document.ready(function(){
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    if(typeof pageWidth != "number"){
        if(document.compatMode == "number"){
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        }else{
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }
    pageWidth = pageWidth < 1000? 1000: pageWidth;
    var can = document.getElementById("canvas");
    can.width = pageWidth;
    can.height = pageHeight;
    game = new Game(pageWidth, pageHeight);
    game.init();
});
