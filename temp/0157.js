function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = (t.getOnDemandLazySlides = function(e) {
                for (var t = [], n = r(e), a = o(e), i = n; i < a; i++)
                    e.lazyLoadedList.indexOf(i) < 0 && t.push(i);
                return t
            },
            t.getRequiredLazySlides = function(e) {
                for (var t = [], n = r(e), a = o(e), i = n; i < a; i++)
                    t.push(i);
                return t
            },
            t.lazyStartIndex = function(e) {
                return e.currentSlide - a(e)
            }
        ),
        o = t.lazyEndIndex = function(e) {
            return e.currentSlide + i(e)
        },
        a = t.slidesOnLeft = function(e) {
            return e.centerMode ? Math.floor(e.slidesToShow / 2) + (parseInt(e.centerPadding) > 0 ? 1 : 0) : 0
        },
        i = t.slidesOnRight = function(e) {
            return e.centerMode ? Math.floor((e.slidesToShow - 1) / 2) + 1 + (parseInt(e.centerPadding) > 0 ? 1 : 0) : e.slidesToShow
        }
}