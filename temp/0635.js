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
        t.NextArrow = t.PrevArrow = void 0;
    var s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        l = n(0),
        c = r(l),
        u = n(20),
        d = r(u),
        p = n(155),
        h = r(p);
    t.PrevArrow = function(e) {
            function t() {
                return o(this, t),
                    a(this, e.apply(this, arguments))
            }
            return i(t, e),
                t.prototype.clickHandler = function(e, t) {
                    t && t.preventDefault(),
                        this.props.clickHandler(e, t)
                },
                t.prototype.render = function() {
                    var e = {
                            "slick-arrow": !0,
                            "slick-prev": !0
                        },
                        t = this.clickHandler.bind(this, {
                            message: "previous"
                        });
                    !this.props.infinite && (0 === this.props.currentSlide || this.props.slideCount <= this.props.slidesToShow) && (e["slick-disabled"] = !0,
                        t = null);
                    var n = {
                            key: "0",
                            "data-role": "none",
                            className: (0,
                                d.default)(e),
                            style: {
                                display: "block"
                            },
                            onClick: t
                        },
                        r = {
                            currentSlide: this.props.currentSlide,
                            slideCount: this.props.slideCount
                        };
                    return this.props.prevArrow ? c.default.cloneElement(this.props.prevArrow, s({}, n, r)) : c.default.createElement("button", s({
                        key: "0",
                        type: "button"
                    }, n), " Previous")
                },
                t
        }(c.default.Component),
        t.NextArrow = function(e) {
            function t() {
                return o(this, t),
                    a(this, e.apply(this, arguments))
            }
            return i(t, e),
                t.prototype.clickHandler = function(e, t) {
                    t && t.preventDefault(),
                        this.props.clickHandler(e, t)
                },
                t.prototype.render = function() {
                    var e = {
                            "slick-arrow": !0,
                            "slick-next": !0
                        },
                        t = this.clickHandler.bind(this, {
                            message: "next"
                        });
                    h.default.canGoNext(this.props) || (e["slick-disabled"] = !0,
                        t = null);
                    var n = {
                            key: "1",
                            "data-role": "none",
                            className: (0,
                                d.default)(e),
                            style: {
                                display: "block"
                            },
                            onClick: t
                        },
                        r = {
                            currentSlide: this.props.currentSlide,
                            slideCount: this.props.slideCount
                        };
                    return this.props.nextArrow ? c.default.cloneElement(this.props.nextArrow, s({}, n, r)) : c.default.createElement("button", s({
                        key: "1",
                        type: "button"
                    }, n), " Next")
                },
                t
        }(c.default.Component)
}