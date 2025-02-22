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
    t.__esModule = !0;
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
        u = n(625),
        d = n(32),
        p = r(d),
        h = n(635),
        f = r(h),
        m = n(252),
        g = r(m),
        y = n(637),
        v = r(y),
        b = v.default && n(638),
        _ = function(e) {
            function t(n) {
                o(this, t);
                var r = a(this, e.call(this, n));
                return r.innerSliderRefHandler = function(e) {
                        return r.innerSlider = e
                    },
                    r.slickPrev = function() {
                        return r.innerSlider.slickPrev()
                    },
                    r.slickNext = function() {
                        return r.innerSlider.slickNext()
                    },
                    r.slickGoTo = function(e) {
                        return r.innerSlider.slickGoTo(e)
                    },
                    r.slickPause = function() {
                        return r.innerSlider.pause()
                    },
                    r.slickPlay = function() {
                        return r.innerSlider.autoPlay()
                    },
                    r.state = {
                        breakpoint: null
                    },
                    r._responsiveMediaHandlers = [],
                    r
            }
            return i(t, e),
                t.prototype.media = function(e, t) {
                    b.register(e, t),
                        this._responsiveMediaHandlers.push({
                            query: e,
                            handler: t
                        })
                },
                t.prototype.componentWillMount = function() {
                    var e = this;
                    if (this.props.responsive) {
                        var t = this.props.responsive.map(function(e) {
                            return e.breakpoint
                        });
                        t.sort(function(e, t) {
                                return e - t
                            }),
                            t.forEach(function(n, r) {
                                var o = void 0;
                                o = 0 === r ? (0,
                                        f.default)({
                                        minWidth: 0,
                                        maxWidth: n
                                    }) : (0,
                                        f.default)({
                                        minWidth: t[r - 1] + 1,
                                        maxWidth: n
                                    }),
                                    v.default && e.media(o, function() {
                                        e.setState({
                                            breakpoint: n
                                        })
                                    })
                            });
                        var n = (0,
                            f.default)({
                            minWidth: t.slice(-1)[0]
                        });
                        v.default && this.media(n, function() {
                            e.setState({
                                breakpoint: null
                            })
                        })
                    }
                },
                t.prototype.componentWillUnmount = function() {
                    this._responsiveMediaHandlers.forEach(function(e) {
                        b.unregister(e.query, e.handler)
                    })
                },
                t.prototype.render = function() {
                    var e, t, n = this;
                    this.state.breakpoint ? (t = this.props.responsive.filter(function(e) {
                                return e.breakpoint === n.state.breakpoint
                            }),
                            e = "unslick" === t[0].settings ? "unslick" : (0,
                                p.default)({}, g.default, this.props, t[0].settings)) : e = (0,
                            p.default)({}, g.default, this.props),
                        e.centerMode && (e.slidesToScroll,
                            e.slidesToScroll = 1),
                        e.fade && (e.slidesToShow,
                            e.slidesToScroll,
                            e.slidesToShow = 1,
                            e.slidesToScroll = 1);
                    var r = c.default.Children.toArray(this.props.children);
                    return r = r.filter(function(e) {
                            return "string" === typeof e ? !!e.trim() : !!e
                        }),
                        "unslick" === e ? (e = (0,
                                p.default)({
                                unslick: !0
                            }, g.default, this.props),
                            e.slidesToShow = r.length) : r.length <= e.slidesToShow && (e.unslick = !0,
                            e.slidesToShow = r.length),
                        c.default.createElement(u.InnerSlider, s({
                            ref: this.innerSliderRefHandler
                        }, e), r)
                },
                t
        }(c.default.Component);
    t.default = _
}