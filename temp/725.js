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
        c = n(109),
        u = n(110),
        d = function () {
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
        p = 6,
        h = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.onClick = function (e) {
                        var t = a.props,
                            n = t.amount,
                            r = t.balance,
                            o = t.coupon,
                            i = t.status,
                            s = t.couponAmount,
                            l = t.config,
                            c = [];
                        if (e > p / 2)
                            for (var d = e - 3, h = 12 * d - 11; h <= 12 * d; h++)
                                c.push({
                                    cell: h
                                });
                        else
                            for (var f = e, m = 1; m <= 12; m++)
                                c.push({
                                    cell: f
                                }),
                                    f = 3 * m + e;
                        Object(u.a)(o, c.length, c.map(function (e) {
                            return e.cell
                        }), n, r, i, s, l) && a.props.addToCouponFactors({
                            factors: c,
                            amount: n
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                d(t, [{
                    key: "render",
                    value: function () {
                        for (var e = this, t = [], n = 1; n <= p; n++)
                            ! function (n) {
                                t.push(s.a.createElement("button", {
                                    key: n,
                                    className: "block block-" + n,
                                    onClick: function () {
                                        return e.onClick(n)
                                    }
                                }, s.a.createElement("span", null)))
                            }(n);
                        return t
                    }
                }]),
                t
        }(s.a.Component),
        f = function (e) {
            return {
                balance: e.application.get("balance").balance,
                couponAmount: e.application.get("balance").couponAmount,
                amount: e.traderoom.get("amount"),
                status: e.traderoom.getIn(["round", "status"]),
                coupon: e.traderoom.getIn(["coupon", "actual"]),
                config: e.traderoom.get("config")
            }
        };
    t.a = Object(l.b)(f, {
        addToCouponFactors: c.a
    })(h)
}