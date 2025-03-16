 function (e, t, n) {
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
    var i = n(0),
        s = n.n(i),
        l = n(6),
        c = n(20),
        u = n.n(c),
        d = n(109),
        p = n(110),
        h = n(724),
        f = n(31),
        m = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
            }
            return function (t, n, r) {
                return n && e(t.prototype, n),
                    r && e(t, r),
                    t
            }
        }(),
        g = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.onClick = function () {
                        var e = a.props.factor,
                            t = [],
                            n = e.c;
                        if (h.a.includes(n))
                            for (var r = 0; r < 3; r++)
                                t.push({
                                    cell: n + r
                                });
                        else
                            t.push({
                                cell: e.c
                            }),
                                t.push({
                                    cell: e.c - 1
                                });
                        a.addToCoupon([{
                            cell: e.c
                        }])
                    },
                    a.onClickRow = function () {
                        var e = a.props.factor,
                            t = [],
                            n = e.c;
                        if (h.a.includes(n))
                            for (var r = 0; r < 3; r++)
                                t.push({
                                    cell: n + r
                                });
                        else
                            t.push({
                                cell: e.c
                            }),
                                t.push({
                                    cell: e.c - 1
                                });
                        a.addToCoupon(t)
                    },
                    a.onClickTop = function () {
                        for (var e = a.props.factor, t = [], n = e.c, r = n; r > n - 3; r--)
                            t.push({
                                cell: r
                            });
                        a.addToCoupon(t)
                    },
                    a.onClickRight = function () {
                        var e = a.props.factor,
                            t = [];
                        t.push({
                            cell: e.c
                        }),
                            t.push({
                                cell: e.c + 3
                            }),
                            a.addToCoupon(t)
                    },
                    a.onClickBottomRight = function () {
                        var e = a.props.factor,
                            t = [],
                            n = e.c;
                        if (h.a.includes(n))
                            for (var r = 0; r < 6; r++)
                                t.push({
                                    cell: n + r
                                });
                        else
                            t.push({
                                cell: n
                            }),
                                t.push({
                                    cell: n - 1
                                }),
                                t.push({
                                    cell: n + 2
                                }),
                                t.push({
                                    cell: n + 3
                                });
                        a.addToCoupon(t)
                    },
                    a.onClickTopRight = function () {
                        for (var e = a.props.factor, t = [], n = e.c - 2, r = n; r <= n + 5; r++)
                            t.push({
                                cell: r
                            });
                        a.addToCoupon(t)
                    },
                    a.addToCoupon = function (e) {
                        var t = a.props,
                            n = t.coupon,
                            r = t.amount,
                            o = t.balance,
                            i = t.status,
                            s = t.couponAmount,
                            l = t.config;
                        Object(p.a)(n, e.length, e.map(function (e) {
                            return e.cell
                        }), r, o, i, s, l) && a.props.addToCouponFactors({
                            factors: e,
                            amount: r
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                m(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.i,
                            n = e.factor,
                            r = e.isInCoupon,
                            o = e.showFactorAmount,
                            a = e.roundResult,
                            i = e.status,
                            l = e.activeFactor,
                            c = e.coupon,
                            d = h.b.includes(t),
                            p = 34 !== t && 35 !== t && 36 !== t,
                            m = a && n.c === a.c && (i === f.c || i === f.d),
                            g = u()("cell cell--flex div" + t, {
                                "cell-victory": m,
                                "player-not-win": m && c.size > 0 && !o,
                                "player-victory": m && o,
                                "is-in-coupon": r,
                                "active-cell": l === t && [3, 4].some(function (e) {
                                    return e === i
                                }),
                                "dis-cell": [3, 4, 5].some(function (e) {
                                    return e === i
                                }) && !r && !m
                            });
                        return s.a.createElement("div", {
                            className: g
                        }, s.a.createElement("span", {
                            className: "cell__stake"
                        }, "\xa0", o > 0 && o, "\xa0"), s.a.createElement("span", {
                            className: "cell__factor",
                            onClick: this.onClick
                        }, n && n.vf), s.a.createElement("span", {
                            className: "cell__count"
                        }, t), s.a.createElement("button", {
                            className: "choose-btn choose-btn__bottom",
                            onClick: this.onClickRow
                        }), p && s.a.createElement("button", {
                            className: "choose-btn choose-btn__right",
                            onClick: this.onClickRight
                        }), d && s.a.createElement("button", {
                            className: "choose-btn choose-btn__top",
                            onClick: this.onClickTop
                        }), p && s.a.createElement("button", {
                            className: "choose-btn choose-btn__right-bottom",
                            onClick: this.onClickBottomRight
                        }), d && p && s.a.createElement("button", {
                            className: "choose-btn choose-btn__right-top",
                            onClick: this.onClickTopRight
                        }))
                    }
                }]),
                t
        }(s.a.Component),
        y = function (e, t) {
            var n = 0,
                r = e.traderoom.getIn(["coupon", "actual"]).has(t.i);
            return r && (n = Object(p.b)(e.traderoom.getIn(["coupon", "actual", t.i]).amount / 36, 2)), {
                balance: e.application.get("balance").balance,
                couponAmount: e.application.get("balance").couponAmount,
                amount: e.traderoom.get("amount"),
                status: e.traderoom.getIn(["round", "status"]),
                roundResult: e.traderoom.getIn(["round", "result"]),
                coupon: e.traderoom.getIn(["coupon", "actual"]),
                config: e.traderoom.get("config"),
                showFactorAmount: n,
                isInCoupon: r
            }
        };
    t.a = Object(l.b)(y, {
        addToCouponFactors: d.a
    })(g)
}