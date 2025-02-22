function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(0),
        o = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(r),
        a = {
            className: "",
            accessibility: !0,
            adaptiveHeight: !1,
            arrows: !0,
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(e) {
                return o.default.createElement("button", null, e + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: !1,
            pauseOnHover: !0,
            responsive: null,
            rtl: !1,
            slide: "div",
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            variableWidth: !1,
            vertical: !1,
            waitForAnimate: !0,
            afterChange: null,
            beforeChange: null,
            edgeEvent: null,
            init: null,
            swipeEvent: null,
            nextArrow: null,
            prevArrow: null,
            appendDots: function(e) {
                return o.default.createElement("ul", {
                    style: {
                        display: "block"
                    }
                }, e)
            }
        };
    t.default = a
}