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
        t.Track = void 0;
    var s = n(0),
        l = r(s),
        c = n(32),
        u = r(c),
        d = n(20),
        p = r(d),
        h = n(154),
        f = n(156),
        m = function(e) {
            var t, n, r, o, a;
            a = e.rtl ? e.slideCount - 1 - e.index : e.index,
                r = a < 0 || a >= e.slideCount,
                e.centerMode ? (o = Math.floor(e.slidesToShow / 2),
                    n = (a - e.currentSlide) % e.slideCount === 0,
                    a > e.currentSlide - o - 1 && a <= e.currentSlide + o && (t = !0)) : t = e.currentSlide <= a && a < e.currentSlide + e.slidesToShow;
            var i = a === e.currentSlide;
            return (0,
                p.default)({
                "slick-slide": !0,
                "slick-active": t,
                "slick-center": n,
                "slick-cloned": r,
                "slick-current": i
            })
        },
        g = function(e) {
            var t = {};
            return void 0 !== e.variableWidth && !1 !== e.variableWidth || (t.width = e.slideWidth),
                e.fade && (t.position = "relative",
                    e.vertical ? t.top = -e.index * e.slideHeight : t.left = -e.index * e.slideWidth,
                    t.opacity = e.currentSlide === e.index ? 1 : 0,
                    t.transition = "opacity " + e.speed + "ms " + e.cssEase + ", visibility " + e.speed + "ms " + e.cssEase,
                    t.WebkitTransition = "opacity " + e.speed + "ms " + e.cssEase + ", visibility " + e.speed + "ms " + e.cssEase),
                t
        },
        y = function(e, t) {
            return e.key || t
        },
        v = function(e) {
            var t, n = [],
                r = [],
                o = [],
                a = l.default.Children.count(e.children),
                i = (0,
                    f.lazyStartIndex)(e),
                s = (0,
                    f.lazyEndIndex)(e);
            return l.default.Children.forEach(e.children, function(c, d) {
                    var f = void 0,
                        v = {
                            message: "children",
                            index: d,
                            slidesToScroll: e.slidesToScroll,
                            currentSlide: e.currentSlide
                        };
                    f = !e.lazyLoad || e.lazyLoad && e.lazyLoadedList.indexOf(d) >= 0 ? c : l.default.createElement("div", null);
                    var b = g((0,
                            u.default)({}, e, {
                            index: d
                        })),
                        _ = f.props.className || "";
                    if (n.push(l.default.cloneElement(f, {
                            key: "original" + y(f, d),
                            "data-index": d,
                            className: (0,
                                p.default)(m((0,
                                u.default)({
                                index: d
                            }, e)), _),
                            tabIndex: "-1",
                            style: (0,
                                u.default)({
                                outline: "none"
                            }, f.props.style || {}, b),
                            onClick: function(t) {
                                f.props && f.props.onClick && f.props.onClick(t),
                                    e.focusOnSelect && e.focusOnSelect(v)
                            }
                        })),
                        e.infinite && !1 === e.fade) {
                        var w = a - d;
                        w <= (0,
                                h.getPreClones)(e) && a !== e.slidesToShow && (t = -w,
                                t >= i && (f = c),
                                r.push(l.default.cloneElement(f, {
                                    key: "precloned" + y(f, t),
                                    "data-index": t,
                                    tabIndex: "-1",
                                    className: (0,
                                        p.default)(m((0,
                                        u.default)({
                                        index: t
                                    }, e)), _),
                                    style: (0,
                                        u.default)({}, f.props.style || {}, b),
                                    onClick: function(t) {
                                        f.props && f.props.onClick && f.props.onClick(t),
                                            e.focusOnSelect && e.focusOnSelect(v)
                                    }
                                }))),
                            a !== e.slidesToShow && (t = a + d,
                                t < s && (f = c),
                                o.push(l.default.cloneElement(f, {
                                    key: "postcloned" + y(f, t),
                                    "data-index": t,
                                    tabIndex: "-1",
                                    className: (0,
                                        p.default)(m((0,
                                        u.default)({
                                        index: t
                                    }, e)), _),
                                    style: (0,
                                        u.default)({}, f.props.style || {}, b),
                                    onClick: function(t) {
                                        f.props && f.props.onClick && f.props.onClick(t),
                                            e.focusOnSelect && e.focusOnSelect(v)
                                    }
                                })))
                    }
                }),
                e.rtl ? r.concat(n, o).reverse() : r.concat(n, o)
        };
    t.Track = function(e) {
        function t() {
            return o(this, t),
                a(this, e.apply(this, arguments))
        }
        return i(t, e),
            t.prototype.render = function() {
                var e = v(this.props);
                return l.default.createElement("div", {
                    className: "slick-track",
                    style: this.props.trackStyle
                }, e)
            },
            t
    }(l.default.Component)
}