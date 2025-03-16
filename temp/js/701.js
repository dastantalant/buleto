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
        l = n(2),
        c = n.n(l),
        u = n(270),
        d = n(702),
        p = n(707),
        h = n(711),
        f = n(160),
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
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                m(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.withdraw,
                            n = e.accountNumber,
                            r = e.phone,
                            o = e.createWithdrawAction,
                            a = e.clearWithdrawalAction,
                            i = e.cancelWithdrawAction,
                            l = e.tradingBalance,
                            c = e.balance,
                            m = e.withdrawalAmount,
                            g = e.languageId,
                            y = e.pathname,
                            v = t.get("withdrawal"),
                            b = t.get("withdrawalCreated"),
                            _ = t.get("cancelStatus");
                        if (v && (v.state === f.a || v.state === f.b))
                            return s.a.createElement(u.a, {
                                cancelStatus: _,
                                withdrawal: v,
                                accountNumber: n,
                                withdrawalCreated: b,
                                cancelWithdrawAction: i
                            });
                        var w = {
                            clearWithdrawalAction: a,
                            createWithdrawAction: o,
                            withdraw: t,
                            phone: r,
                            balance: c,
                            withdrawalAmount: m,
                            tradingBalance: l,
                            languageId: g
                        };
                        return "/withdraw/opex" === y ? s.a.createElement(p.a, w) : "/withdraw/trade" === y ? s.a.createElement(d.a, w) : "/withdraw/usdt" === y ? s.a.createElement(h.a, w) : null
                    }
                }]),
                t
        }(i.Component);
    g.propTypes = {
        accountNumber: c.a.any,
        createWithdrawAction: c.a.func.isRequired,
        languageId: c.a.number.isRequired,
        cancelWithdrawAction: c.a.func.isRequired,
        clearWithdrawalAction: c.a.func.isRequired,
        withdraw: c.a.object.isRequired,
        balance: c.a.number.isRequired,
        tradingBalance: c.a.number.isRequired
    },
        t.a = g
}