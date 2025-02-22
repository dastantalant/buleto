function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function a(e, t) {
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

    function i(e) {
        switch (e) {
            case m.e:
                return {
                    cls: "green",
                    color: "#52e72d"
                };
            case m.b:
            case m.c:
            case m.a:
                return {
                    cls: "red",
                    color: "#ff4122"
                };
            default:
                return {
                    cls: "init",
                    color: "#d9dbdf"
                }
        }
    }

    function s(e, t) {
        return d()(t).diff(d()(e), "seconds")
    }
    var l = n(0),
        c = n.n(l),
        u = n(40),
        d = n.n(u),
        p = n(6),
        h = n(2),
        f = n.n(h),
        m = n(31),
        g = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                    r && e(t, r),
                    t
            }
        }(),
        y = function(e) {
            function t(e) {
                r(this, t);
                var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return n.tick = function(e) {
                        var t = n.props,
                            r = t.startDate,
                            o = t.endDate,
                            a = t.status,
                            l = n.size / 2,
                            c = s(r, o),
                            u = s(r, o),
                            d = s(new Date, o),
                            p = u - d;
                        e.clearRect(0, 0, n.size, n.size),
                            e.lineWidth = n.size / 100;
                        for (var h = i(a).color, f = 0; f < c; f++) {
                            h = p > f ? "#6b6b6b" : i(a).color,
                                a === m.c && (h = i(m.c).color),
                                a === m.d && (h = i(m.d).color),
                                e.strokeStyle = h,
                                e.save(),
                                e.beginPath(),
                                e.translate(l, l);
                            var g = 4.5 * f * Math.PI / 180;
                            e.rotate(g),
                                e.translate(0, -l),
                                e.moveTo(0, 0),
                                e.lineTo(0, n.size / 10),
                                e.stroke(),
                                e.closePath(),
                                e.restore()
                        }
                    },
                    n.state = {
                        currentTime: new Date,
                        totalSeconds: 0
                    },
                    n.interval = null,
                    n.size = e.size,
                    n
            }
            return a(t, e),
                g(t, [{
                    key: "componentDidMount",
                    value: function() {
                        var e = this,
                            t = this.props.status,
                            n = this.refs.canvas,
                            r = n.getContext("2d"),
                            o = 0;
                        if (t === m.d || t === m.e) {
                            o = d()(this.props.bettingCloseDate).diff(this.state.currentTime, "seconds")
                        }
                        if (t === m.c || t === m.a) {
                            o = d()(this.props.endDate).diff(this.state.currentTime, "seconds")
                        }
                        this.interval = setInterval(function() {
                                e.tick(r),
                                    e.setState({
                                        currentTime: new Date,
                                        totalSeconds: e.state.totalSeconds - 1
                                    })
                            }, 1e3),
                            this.setState({
                                currentTime: new Date,
                                totalSeconds: o - 6
                            })
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        null !== this.interval && clearInterval(this.interval)
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function(e) {
                        var t = this.props.status;
                        if (t !== e.status && e.status === m.e) {
                            var n = d()(e.bettingCloseDate),
                                r = n.diff(e.startDate, "seconds");
                            this.setState({
                                totalSeconds: r
                            })
                        }
                        if (t !== e.status && e.status === m.a) {
                            var o = d()(e.endDate),
                                a = o.diff(e.bettingCloseDate, "seconds");
                            this.setState({
                                totalSeconds: a
                            })
                        }
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.props,
                            t = e.size,
                            n = e.status,
                            r = this.state.totalSeconds;
                        return r < 0 ? r = "00" : r < 10 && (r = "0" + r),
                            r > 40 && window.location.reload(),
                            c.a.createElement("div", {
                                className: "can-timer"
                            }, c.a.createElement("canvas", {
                                ref: "canvas",
                                width: t,
                                height: t
                            }), c.a.createElement("span", {
                                className: i(n).cls,
                                style: {
                                    fontSize: .4 * t
                                }
                            }, r))
                    }
                }]),
                t
        }(c.a.Component),
        v = function(e) {
            return {
                status: e.traderoom.getIn(["round", "status"]),
                startDate: e.traderoom.getIn(["round", "startDate"]),
                endDate: e.traderoom.getIn(["round", "endDate"]),
                bettingCloseDate: e.traderoom.getIn(["round", "bettingCloseDate"])
            }
        };
    y.propTypes = {
            size: f.a.number.isRequired
        },
        t.a = Object(p.b)(v)(function(e) {
            return e.startDate ? c.a.createElement(y, e) : null
        })
}