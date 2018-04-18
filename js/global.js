var whenReady = (function() {
    var funcs = [];
    var ready = false;

    function handler(e) {
        if (ready) return;
        if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
            return;
        }
        for (var i = 0; i < funcs.length; i++) {
            funcs[i].call(document);
        }
        ready = true;
        funcs = null;
    }
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', handler, false);
        document.addEventListener('readystatechange', handler, false); //IE9+
        window.addEventListener('load', handler, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', handler);
        window.attachEvent('onload', handler);
    }
    return function whenReady(fn) {
        if (ready) {
            fn.call(document);
        } else {
            funcs.push(fn);
        }
    }
})();

//自适应设置
function setResize() {
    var doc = document,
        win = window;
    var docEl = doc.documentElement,
        con = doc.getElementById("container"),
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = con.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            document.body.style.visibility = "visible"
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
whenReady(setResize);


var home = {
    init: function() {
        var imgs = ["bg.jpg","bg2.jpg","bg3.jpg","bg4.jpg","a1.png","a2.png","a3.png","a4.png","a5.png"];
        $.preloadimg(imgs, function() {
            $("#loading").delay(500).fadeOut(500, function() {
                $(this).remove();
                $(".page1").addClass("in");

            });
        });
       $(".snow-canvas").snow();
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical',
            onSlideChangeEnd: function(swiper) {
                var i = swiper.activeIndex+1;
                $(".page"+i).addClass("in")
            }
        });
        $(".b2").click(function() {
            swiper.slideNext();
        })
        $(".b1").click(function() {
            swiper.slideNext();
        })
        $(".audioBox").click(function() {
            $(this).toggleClass("scrollR")
            if ($(this).hasClass("scrollR")) {
                audioAutoPlay('myMusic', true);
            }
            else {
                audioAutoPlay('myMusic', false);
            }
        })
        $(".close,.maskbg,.b4").click(function() {
            $(".dialogError").removeClass("din");
        })
        $(".close").click(function() {
            $(".dialogError,.dialog").removeClass("din");
        })
        $(".b3").click(function() {
            $(".dialog").addClass("din");
            $(".prompt").hide();
            $(".name").show();
        })
         $("#jw").click(function(){
            $("#hhd,#hhs").attr("checked",false);
        })
        $("#hhd,#hhs").click(function(){
            $("#jw").attr("checked",false);
            $("#kb").attr("checked",true);
        })
        function audioAutoPlay(id, isplay) {
            var audio = document.getElementById(id),
                play = function() {
                    audio.play();
                    document.removeEventListener("touchstart", play, false);
                };
            if (isplay) {
                audio.play();
                document.addEventListener("WeixinJSBridgeReady", function() {
                    play();
                }, false);
                document.addEventListener('YixinJSBridgeReady', function() {
                    play();
                }, false);
                document.addEventListener("touchstart", play, false);
            }
            else {
                audio.pause();   
            }
        }
        audioAutoPlay('myMusic', true);
    }
}

$.extend({
    isWeiXin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false;
    },
    preloadimg: function(arr, comp) {
        var flag = true,
            n = 0;
        var loadImg = function(src) {
            var img = new Image();
            img.onload = function() {
                n++;
                var t = Math.round(n / l * 100);
                $("#loading span").text(t + "%");
                if (t >= 80 && flag) {
                    comp();
                    flag = false;
                }
            }
            img.src = src;
        }
        if (typeof(arr) == "string") {
            var l = 1;
            var w = new loadImg(arr);
        } else {
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                var w = new loadImg("images/" + arr[i]);
            }
        }
    }
});