var ParticleEffect=function(){var t=function(t){function i(){window.requestAnimationFrame(i),s.globalCompositeOperation="source-over",s.clearRect(0,0,a,o),s.globalCompositeOperation="lighter",Math.random()>r&&new n;for(var t in v)v[t].draw()}function n(){this.x=u,this.y=w,this.vx=e(f)*m*Math.random(),this.vy=e(g)*m*Math.random(),this.growth=.01*(Math.abs(this.vx)+Math.abs(this.vy)),p++,v[p]=this,this.id=p,this.size=Math.random()*d}function e(t){var i,t=1*t;return i=t&&t>0||!t&&Math.random()-.5>0?1:-1}var a,o,s,r,h,c,d,m,u,w,l,v={},p=0,f=0,g=0;if(this.options=$.extend({count:5,speed:2,size:2,startColor:"rgba(255,255,255,1)",endColor:"rgba(255,255,255,0.3)"},t),this.canvas=this.options.canvas.get(0),s=this.canvas.getContext("2d"),r=(10-this.options.count)/10,d=this.options.size,m=this.options.speed,a=this.canvas.width,o=this.canvas.height,u=a/2,w=o/2,h=this.options.startColor,c=this.options.endColor,l=this.options.canvas.find("img"),this.options.direction){var x=this.options.direction.split(",");x[1]&&(f=x[0],g=x[1])}if(this.options.startPoint){var A=this.options.startPoint.split(",");A[1]&&(u=1*A[0],w=1*A[1])}Date.now||(Date.now=function(){return(new Date).getTime()});for(var C=["webkit","moz"],b=0;b<C.length&&!window.requestAnimationFrame;++b){var y=C[b];window.requestAnimationFrame=window[y+"RequestAnimationFrame"],window.cancelAnimationFrame=window[y+"CancelAnimationFrame"]||window[y+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var F=0;window.requestAnimationFrame=function(t){var i=Date.now(),n=Math.max(F+16,i);return setTimeout(function(){t(F=n)},n-i)},window.cancelAnimationFrame=clearTimeout}n.prototype.draw=function(){if(this.x+=this.vx,this.y+=this.vy,this.size+=this.growth,(this.x>a||this.y>o)&&(p--,delete v[this.id]),l.attr("src"))return void s.drawImage(l.get(0),this.x,this.y,this.size,this.size);var t=s.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size);t.addColorStop(0,h),t.addColorStop(1,c),s.fillStyle=t,s.beginPath(),s.arc(this.x,this.y,this.size,0*Math.PI,2*Math.PI),s.fill()},window.requestAnimationFrame(i)};return{create:function(i,n){document.createElement("canvas").getContext&&$(i).each(function(i,e){var a=$.extend({},n);return $.each(e.attributes,function(t,i){a[$.camelCase(i.name)]=Number(Number(i.value))?Number(i.value):i.value}),a.canvas=$(e),new t(a)})}}}();

// JavaScript Document
(function ($) {
    //for html5 canvas;
    var $window = window,
        $timeout = setTimeout;

    var supportCanvas = function () {
        var eCan = document.createElement("canvas");
        return (typeof eCan.getContext) == "function";
    };
    window.Snow = function (element, settings) {
        (function () {
            var lastTime = 0;
            var vendors = ['webkit', 'moz'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                    window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = function (callback, element) {
                    /*
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                    var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                     */
                    var timeToCall = 14; //freezes in safari for windows ,and mac to , so i change time to call with 14;
                    var id = window.setTimeout(function () {
                        callback(timeToCall);
                    }, timeToCall);

                    return id;
                };
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
            }
        }());
        this.settings = settings,
            this.flakes = [],
            this.flakeCount = settings.count,
            this.mx = -100,
            this.my = -100,
            this.init(element)
    };
    Snow.prototype.init = function (element) {
        this.canvas = element.get(0), this.ctx = this.canvas.getContext("2d"), this.canvas.width = $window.innerWidth, this.canvas.height = $window.innerHeight, this.flakes = [];
        for (var i = 0; i < this.flakeCount; i++) {
            var x = Math.floor(Math.random() * this.canvas.width),
                y = Math.floor(Math.random() * this.canvas.height),
                size = Math.floor(100 * Math.random()) % this.settings.size + 2,
                speed = Math.floor(100 * Math.random()) % this.settings.speed + Math.random() * size / 10 + .5,
                opacity = .5 * Math.random() + this.settings.opacity;
            this.flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: Math.random() / 30,
                step: 0,
                angle: 180,
                opacity: opacity
            })
        }
        1 == this.settings.interaction && this.canvas.addEventListener("mousemove", function (e) {
            this.mx = e.clientX, this.my = e.client
        });
        var thiz = this;
        $($window).resize(function () {
            thiz.ctx.clearRect(0, 0, thiz.canvas.width, thiz.canvas.height), thiz.canvas.width = $window.innerWidth, thiz.canvas.height = $window.innerHeight
        });
        if (typeof this.settings.image === "string") {
            this.image = $("<img src='" + this.settings.image + "' style='display: none'>");
        }
        ;

        this.snow();
    }, Snow.prototype.snow = function () {
        var thiz = this,
            render = function () {
                thiz.ctx.clearRect(0, 0, thiz.canvas.width, thiz.canvas.height);
                for (var i = 0; i < thiz.flakeCount; i++) {
                    var flake = thiz.flakes[i],
                        x = thiz.mx,
                        y = thiz.my,
                        minDist = 100,
                        x2 = flake.x,
                        y2 = flake.y,
                        dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));
                    if (minDist > dist) {
                        var force = minDist / (dist * dist),
                            xcomp = (x - x2) / dist,
                            ycomp = (y - y2) / dist,
                            deltaV = force / 2;
                        flake.velX -= deltaV * xcomp, flake.velY -= deltaV * ycomp
                    } else
                        switch (flake.velX *= .98, flake.velY <= flake.speed && (flake.velY = flake.speed), thiz.settings.windPower) {
                            case !1:
                                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                                break;
                            case 0:
                                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                                break;
                            default:
                                flake.velX += .01 + thiz.settings.windPower / 100
                        }
                    if (flake.y += flake.velY, flake.x += flake.velX, (flake.y >= thiz.canvas.height || flake.y <= 0) && thiz.resetFlake(flake), (flake.x >= thiz.canvas.width || flake.x <= 0) && thiz.resetFlake(flake), 0 == thiz.settings.image) {
                        var grd = thiz.ctx.createRadialGradient(flake.x, flake.y, 0, flake.x, flake.y, flake.size - 1);
                        grd.addColorStop(0, thiz.settings.startColor), grd.addColorStop(1, thiz.settings.endColor), thiz.ctx.fillStyle = grd, thiz.ctx.beginPath(), thiz.ctx.arc(flake.x, flake.y, flake.size, 0, 2 * Math.PI), thiz.ctx.fill()
                    } else
                        thiz.ctx.drawImage(thiz.image.get(0), flake.x, flake.y, 2 * flake.size, 2 * flake.size)
                }
                $window.cancelAnimationFrame(render), $window.requestAnimationFrame(render)
            };
        render()
    }, Snow.prototype.resetFlake = function (flake) {
        if (0 == this.settings.windPower || 0 == this.settings.windPower)
            flake.x = Math.floor(Math.random() * this.canvas.width), flake.y = 0;
        else if (this.settings.windPower > 0) {
            var xarray = Array(Math.floor(Math.random() * this.canvas.width), 0),
                yarray = Array(0, Math.floor(Math.random() * this.canvas.height)),
                allarray = Array(xarray, yarray),
                selected_array = allarray[Math.floor(Math.random() * allarray.length)];
            flake.x = selected_array[0], flake.y = selected_array[1]
        } else {
            var xarray = Array(Math.floor(Math.random() * this.canvas.width), 0),
                yarray = Array(this.canvas.width, Math.floor(Math.random() * this.canvas.height)),
                allarray = Array(xarray, yarray),
                selected_array = allarray[Math.floor(Math.random() * allarray.length)];
            flake.x = selected_array[0], flake.y = selected_array[1]
        }
        flake.size = Math.floor(100 * Math.random()) % this.settings.size + 2, flake.speed = Math.floor(100 * Math.random()) % this.settings.speed + Math.random() * flake.size / 10 + .5, flake.velY = flake.speed, flake.velX = 0, flake.opacity = .5 * Math.random() + this.settings.opacity
    };

    $.fn.snow = function () {
        var userCanvas = supportCanvas();
        userCanvas && $(this).each(function (i, e) {
            var scope = {};
            $.each(e.attributes, function (index, key) {
                scope[ $.camelCase(key.name) ] = Number(Number(key.value)) ? Number(key.value) : key.value
            });
            if (typeof scope.image === "string" && scope.image === "false") {
                scope.image = false
            }
            ;

            new Snow($(e), {
                speed: 1 || 0,
                interaction: scope.interaction || !0,
                size: scope.size || 2,
                count: scope.count || 200,
                opacity: scope.opacity || 1,
                startColor: scope.startColor || "rgba(255,255,255,1)",
                endColor: scope.endColor || "rgba(255,255,255,0)",
                windPower: scope.windPower || 0,
                image: scope.image || !1
            });
        });
        if (!userCanvas) {
            var setting = {};
            $(this).each(function (i, e) {
                //setting["image"] = $(e).attr("img") || "./img/snow.png";
                setting["img"] = $(e).find("img");
                $(this).remove();
                createSnow("", 40);
            });
        }
        ;
    };

    //for ie678
    /**
     * method createSnow("", 40);
     * method removeSnow();
     */
    function k(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, false);
        else a.attachEvent && a.attachEvent("on" + b, c)
    }

    function g(a) {
        if (typeof window.onload != "function") window.onload = a;
        else {
            var b = window.onload;
            window.onload = function () {
                b();
                a()
            }
        }
    }

    function h() {
        var a = {};
        for (type in {
            Top: "",
            Left: ""
        }) {
            var b = type == "Top" ? "Y" : "X";
            if (typeof window["page" + b + "Offset"] != "undefined")
                a[type.toLowerCase()] = window["page" + b + "Offset"];
            else {
                b = document.documentElement.clientHeight ? document.documentElement : document.body;
                a[type.toLowerCase()] = b["scroll" + type]
            }
        }
        return a
    }

    function l() {
        var a = document.body,
            b;
        if (window.innerHeight) b = window.innerHeight;
        else if (a.parentElement.clientHeight) b = a.parentElement.clientHeight;
        else if (a && a.clientHeight) b = a.clientHeight;
        return b
    };
    var j = true;
    var f = true;
    var m = null;
    var c = [];
    var createSnow = function (a, b) {
        clearInterval(m);
        c = [];
        m = setInterval(function () {
            f && b > c.length && Math.random() < b * 0.0025 && c.push(new i(a));
            !f && !c.length && clearInterval(m);
            for (var e = h().top, n = l(), d = c.length - 1; d >= 0; d--)
                if (c[d])
                    if (c[d].top < e || c[d].top + c[d].size + 1 > e + n) {
                        c[d].remove();
                        c[d] = null;
                        c.splice(d, 1)
                    } else {
                        c[d].move();
                        c[d].draw()
                    }
        }, 40);
        k(window, "scroll",
            function () {
                for (var e = c.length - 1; e >= 0; e--) c[e].draw()
            })
    };
    var removeSnow = function () {
        clearInterval(m);
        do {
            c.pop().remove();
        } while (c.length);
    };

    //雪花的构造函数;
    function i(a) {
        this.parent = document.body;
        this.createEl(this.parent, a);
        this.size = Math.random() * 5 + 5;
        this.el.style.width = Math.round(this.size) + "px";
        this.el.style.height = Math.round(this.size) + "px";
        this.maxLeft = document.body.offsetWidth - this.size;
        this.maxTop = document.body.offsetHeight - this.size;
        this.left = Math.random() * this.maxLeft;
        this.top = h().top + 1;
        this.angle = 1.4 + 0.2 * Math.random();
        this.minAngle = 1.4;
        this.maxAngle = 1.6;
        this.angleDelta = 0.01 * Math.random();
        this.speed = 2 + Math.random()
    }

    i.prototype = {
        createEl: function (a, b) {
            this.el = document.createElement("img");
            this.el.classname = "nicesnowclass";
            this.el.setAttribute("src", b || "./img/snow.png");
            this.el.style.position = "absolute";
            this.el.style.display = "block";
            this.el.style.zIndex = "99999";
            this.parent.appendChild(this.el)
        },
        move: function () {
            if (this.angle < this.minAngle || this.angle > this.maxAngle)
                this.angleDelta = -this.angleDelta;
            this.angle += this.angleDelta;
            this.left += this.speed * Math.cos(this.angle * Math.PI);
            this.top -= this.speed * Math.sin(this.angle * Math.PI);
            if (this.left < 0) this.left = this.maxLeft;
            else if (this.left > this.maxLeft) this.left = 0
        },
        draw: function () {
            this.el.style.top = Math.round(this.top) + "px";
            this.el.style.left = Math.round(this.left) + "px"
        },
        remove: function () {
            this.parent.removeChild(this.el);
            this.parent = this.el = null
        }
    };
})(jQuery);