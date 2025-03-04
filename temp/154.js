 function (e, t, n) {
    "use strict";

    function r(e) {
        var t = e.slideCount,
            n = e.variableWidth,
            r = e.slidesToShow,
            o = e.centerMode;
        return e.unslick ? 0 : n ? t : r + (o ? 1 : 0)
    }

    function o(e) {
        var t = e.slideCount;
        return e.unslick ? 0 : t
    }

    function a(e) {
        var t = e.variableWidth,
            n = e.slideCount,
            a = e.slidesToShow,
            i = e.centerMode,
            s = e.unslick;
        return 1 === n ? 1 : r({
            slideCount: n,
            variableWidth: t,
            slidesToShow: a,
            centerMode: i,
            unslick: s
        }) + n + o({
            slideCount: n,
            unslick: s
        })
    }

    function i(e) {
        var t = e.currentSlide,
            n = e.targetSlide,
            r = e.slidesToShow,
            o = e.centerMode,
            a = e.rtl;
        return n > t ? n > t + s(r, o, a) ? "left" : "right" : n < t - l(r, o, a) ? "right" : "left"
    }

    function s(e, t, n) {
        if (t) {
            var r = (e - 1) / 2 + 1;
            return n && e % 2 === 0 && (r += 1),
                r
        }
        return n ? 0 : e - 1
    }

    function l(e, t, n) {
        if (t) {
            var r = (e - 1) / 2 + 1;
            return n || e % 2 !== 0 || (r += 1),
                r
        }
        return n ? e - 1 : 0
    }
    t.__esModule = !0,
        t.getPreClones = r,
        t.getPostClones = o,
        t.getTotalSlides = a,
        t.siblingDirection = i,
        t.slidesOnRight = s,
        t.slidesOnLeft = l
}