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
        u = n(6),
        d = n(15),
        p = n(804),
        h = n(805),
        f = function () {
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
        m = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                f(t, [{
                    key: "componentWillUnmount",
                    value: function () {
                        this.props.initDepositAction()
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.balance,
                            n = e.tradingBalance,
                            r = e.makeDepositAction,
                            o = e.makeWithdrawAction,
                            a = e.deposit,
                            i = {
                                makeDepositAction: r,
                                makeWithdrawAction: o,
                                deposit: a,
                                balance: t,
                                tradingBalance: n
                            };
                        return s.a.createElement(h.a, i)
                    }
                }]),
                t
        }(i.Component);
    m.propTypes = {
        makeDepositAction: c.a.func.isRequired,
        makeWithdrawAction: c.a.func.isRequired,
        deposit: c.a.object.isRequired,
        balance: c.a.number.isRequired,
        tradingBalance: c.a.number.isRequired
    };
    var g = function (e) {
        return {
            balance: e.application.get("balance").balance,
            tradingBalance: e.application.get("balance").tradingBalance,
            deposit: e.application.get("deposit")
        }
    },
        y = function (e) {
            return Object(d.bindActionCreators)({
                makeDepositAction: p.b,
                makeWithdrawAction: p.c,
                initDepositAction: p.a
            }, e)
        };
    t.a = Object(u.b)(g, y)(m)
}