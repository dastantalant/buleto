function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function i(e, t) {
        if ("function" !== typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    t.__esModule = !0,
        t.Dots = void 0;
    var s = n(0),
        l = r(s),
        c = n(20),
        u = r(c),
        d = function(e) {
            return e.infinite ? Math.ceil(e.slideCount / e.slidesToScroll) : Math.ceil((e.slideCount - e.slidesToShow) / e.slidesToScroll) + 1
        };
    t.Dots = function(e) {
        function t() {
            return o(this, t),
                a(this, e.apply(this, arguments))
        }
        return i(t, e),
            t.prototype.clickHandler = function(e, t) {
                t.preventDefault(),
                    this.props.clickHandler(e)
            },
            t.prototype.render = function() {
                var e = this,
                    t = d({
                        slideCount: this.props.slideCount,
                        slidesToScroll: this.props.slidesToScroll,
                        slidesToShow: this.props.slidesToShow,
                        infinite: this.props.infinite
                    }),
                    n = Array.apply(null, Array(t + 1).join("0").split("")).map(function(t, n) {
                        var r = n * e.props.slidesToScroll,
                            o = n * e.props.slidesToScroll + (e.props.slidesToScroll - 1),
                            a = (0,
                                u.default)({
                                "slick-active": e.props.currentSlide >= r && e.props.currentSlide <= o
                            }),
                            i = {
                                message: "dots",
                                index: n,
                                slidesToScroll: e.props.slidesToScroll,
                                currentSlide: e.props.currentSlide
                            },
                            s = e.clickHandler.bind(e, i);
                        return l.default.createElement("li", {
                            key: n,
                            className: a
                        }, l.default.cloneElement(e.props.customPaging(n), {
                            onClick: s
                        }))
                    });
                return l.default.cloneElement(this.props.appendDots(n), {
                    className: this.props.dotsClass
                })
            },
            t
    }(l.default.Component)
}