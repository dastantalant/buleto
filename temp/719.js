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
        c = n(3),
        u = n(720),
        d = n.n(u),
        p = n(275),
        h = n(31),
        f = n(276),
        m = n(277),
        g = function () {
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
        y = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                g(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.status,
                            n = e.roundId,
                            r = e.lastFactorValue,
                            o = e.lastFactorCell,
                            a = e.balance,
                            i = e.contractReceived,
                            l = e.wonAmount,
                            c = e.intl,
                            u = e.results,
                            g = e.isMobile,
                            y = !i || t !== h.c && t !== h.d ? 0 : l;
                        return g ? s.a.createElement("div", {
                            className: "traderoom-header"
                        }, s.a.createElement("div", {
                            className: "hamburger",
                            onClick: this.props.toggleMenu
                        }, s.a.createElement("span", null, n), s.a.createElement("img", {
                            src: d.a,
                            alt: ""
                        })), s.a.createElement(p.a, {
                            style: {
                                minWidth: 60
                            },
                            title: c.formatMessage({
                                id: "controls.balance"
                            }),
                            value: a.balance,
                            isHidable: !0
                        }), s.a.createElement(p.a, {
                            title: c.formatMessage({
                                id: "controls.contract2"
                            }),
                            value: a.couponAmount
                        }), s.a.createElement(p.a, {
                            title: c.formatMessage({
                                id: "controls.income"
                            }),
                            value: y
                        }), s.a.createElement(f.a, {
                            size: 50
                        }), s.a.createElement("div", {
                            className: "currency"
                        }, s.a.createElement("span", null, "XPM/RUB"), s.a.createElement("div", {
                            className: "currency__value"
                        }, s.a.createElement("p", null, r, "\xa0\xa0\xa0"), s.a.createElement("p", null, o))), s.a.createElement(m.a, {
                            results: u
                        })) : s.a.createElement("div", {
                            className: "traderoom-header"
                        })
                    }
                }]),
                t
        }(i.Component),
        v = function (e) {
            var t = 0,
                n = e.traderoom.getIn(["round", "result"]),
                r = n ? 37 === n.c ? 0 : n.c : null;
            n && e.traderoom.getIn(["coupon", "prev", r]) && (t = e.traderoom.getIn(["coupon", "prev", r]).amount);
            var o = e.traderoom.get("factors"),
                a = e.traderoom.getIn(["round", "factors"]),
                i = "",
                s = "";
            if (o.length > 0 && a) {
                i = o[o.length - 1].v;
                var l = a.find(function (e) {
                    return e.vt >= i && e.vf < i
                });
                l && (s = l.c)
            }
            return {
                balance: e.application.get("balance"),
                results: e.traderoom.get("lastRounds"),
                roundId: e.traderoom.getIn(["round", "id"]),
                status: e.traderoom.getIn(["round", "status"]),
                contractReceived: e.traderoom.getIn(["round", "contractReceived"]),
                coupon: e.traderoom.getIn(["coupon", "actual"]),
                languageId: e.application.get("languageId"),
                lastFactorValue: i,
                lastFactorCell: s,
                wonAmount: t
            }
        };
    t.a = Object(l.b)(v)(Object(c.f)(y))
}