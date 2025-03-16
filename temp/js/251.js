 function (e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0,
        t.getTrackLeft = t.getTrackAnimateCSS = t.getTrackCSS = void 0;
    var o = n(53),
        a = r(o),
        i = n(32),
        s = r(i),
        l = n(154),
        c = function (e, t) {
            return t.reduce(function (t, n) {
                return t && e.hasOwnProperty(n)
            }, !0) ? null : console.error("Keys Missing", e)
        },
        u = t.getTrackCSS = function (e) {
            c(e, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth"]);
            var t, n, r = e.slideCount + 2 * e.slidesToShow;
            e.vertical ? n = r * e.slideHeight : t = (0,
                l.getTotalSlides)(e) * e.slideWidth;
            var o = {
                opacity: 1,
                WebkitTransform: e.vertical ? "translate3d(0px, " + e.left + "px, 0px)" : "translate3d(" + e.left + "px, 0px, 0px)",
                transform: e.vertical ? "translate3d(0px, " + e.left + "px, 0px)" : "translate3d(" + e.left + "px, 0px, 0px)",
                transition: "",
                WebkitTransition: "",
                msTransform: e.vertical ? "translateY(" + e.left + "px)" : "translateX(" + e.left + "px)"
            };
            return e.fade && (o = {
                opacity: 1
            }),
                t && (0,
                    s.default)(o, {
                        width: t
                    }),
                n && (0,
                    s.default)(o, {
                        height: n
                    }),
                window && !window.addEventListener && window.attachEvent && (e.vertical ? o.marginTop = e.left + "px" : o.marginLeft = e.left + "px"),
                o
        };
    t.getTrackAnimateCSS = function (e) {
        c(e, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth", "speed", "cssEase"]);
        var t = u(e);
        return t.WebkitTransition = "-webkit-transform " + e.speed + "ms " + e.cssEase,
            t.transition = "transform " + e.speed + "ms " + e.cssEase,
            t
    },
        t.getTrackLeft = function (e) {
            if (e.unslick)
                return 0;
            c(e, ["slideIndex", "trackRef", "infinite", "centerMode", "slideCount", "slidesToShow", "slidesToScroll", "slideWidth", "listWidth", "variableWidth", "slideHeight"]);
            var t, n, r = e.slideIndex,
                o = e.trackRef,
                i = e.infinite,
                s = e.centerMode,
                u = e.slideCount,
                d = e.slidesToShow,
                p = e.slidesToScroll,
                h = e.slideWidth,
                f = e.listWidth,
                m = e.variableWidth,
                g = e.slideHeight,
                y = e.fade,
                v = e.vertical,
                b = 0,
                _ = 0;
            if (y || 1 === e.slideCount)
                return 0;
            var w = 0;
            if (i ? (w = -(0,
                l.getPreClones)(e),
                u % p !== 0 && r + p > u && (w = -(r > u ? d - (r - u) : u % p)),
                s && (w += parseInt(d / 2))) : (u % p !== 0 && r + p > u && (w = d - u % p),
                    s && (w = parseInt(d / 2))),
                b = w * h,
                _ = w * g,
                t = v ? r * g * -1 + _ : r * h * -1 + b, !0 === m) {
                var x, E = a.default.findDOMNode(o).children[u - 1],
                    k = -E.offsetLeft + f - E.offsetWidth;
                if (x = r + (0,
                    l.getPreClones)(e),
                    n = a.default.findDOMNode(o).childNodes[x],
                    t = n ? -1 * n.offsetLeft : 0, !0 === s) {
                    x = i ? r + (0,
                        l.getPreClones)(e) : r,
                        n = a.default.findDOMNode(o).children[x],
                        t = 0;
                    for (var S = 0; S < x; S++)
                        t -= a.default.findDOMNode(o).children[S].offsetWidth;
                    t += (f - n.offsetWidth) / 2
                } !1 === e.infinite && t < k && (t = k)
            }
            return t
        }
}