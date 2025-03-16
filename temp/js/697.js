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
        p = n(159),
        h = n(117),
        f = n(698),
        m = n(701),
        g = n(74),
        y = n(19),
        v = function () {
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
        b = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                v(t, [{
                    key: "componentDidMount",
                    value: function () {
                        this.props.getWithdrawalAction()
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function (e) {
                        e.withdraw.get("withdrawalCreated") !== this.props.withdraw.get("withdrawalCreated") && !0 === e.withdraw.get("withdrawalCreated") && (this.props.getWithdrawalAction(),
                            this.props.getBalanceAction())
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.withdraw,
                            n = e.balance,
                            r = e.withdrawalAmount,
                            o = e.tradingBalance,
                            a = e.createWithdrawAction,
                            i = e.cancelWithdrawAction,
                            l = e.clearWithdrawalAction,
                            c = e.user,
                            u = e.languageId;
                        if (void 0 === c.accountNumber)
                            return !1;
                        var d = c.accountNumber,
                            p = c.phone,
                            h = t.get("fetching"),
                            v = t.get("isDetailsOpen"),
                            b = {
                                accountNumber: d,
                                balance: n,
                                withdrawalAmount: r,
                                phone: p,
                                tradingBalance: o,
                                createWithdrawAction: a,
                                cancelWithdrawAction: i,
                                clearWithdrawalAction: l,
                                withdraw: t,
                                languageId: u,
                                user: c
                            },
                            _ = s.a.createElement(f.a, b);
                        return "/withdraw/elsom" !== this.props.match.path && "/withdraw/opex" !== this.props.match.path && "/withdraw/trade" !== this.props.match.path && "/withdraw/delivery" !== this.props.match.path && "/withdraw/unipay" !== this.props.match.path && "/withdraw/usdt" !== this.props.match.path || (_ = s.a.createElement(m.a, Object.assign({}, b, {
                            pathname: this.props.match.path
                        }))),
                            s.a.createElement("div", {
                                className: "withdraw-wrapper"
                            }, h && s.a.createElement(y.a, null), !v && s.a.createElement(g.a, {
                                user: c
                            }), _)
                    }
                }]),
                t
        }(s.a.Component);
    b.propTypes = {
        withdraw: c.a.object.isRequired,
        balance: c.a.number.isRequired,
        tradingBalance: c.a.number.isRequired,
        createWithdrawAction: c.a.func.isRequired,
        getWithdrawalAction: c.a.func.isRequired,
        cancelWithdrawAction: c.a.func.isRequired,
        languageId: c.a.number.isRequired,
        user: c.a.object.isRequired
    };
    var _ = function (e) {
        return {
            withdraw: e.application.get("withdraw"),
            balance: e.application.get("balance").balance,
            withdrawalAmount: e.application.get("balance").withdrawalAmount,
            tradingBalance: e.application.get("balance").tradingBalance,
            user: e.application.get("user"),
            languageId: e.application.get("languageId"),
            routing: e.routing
        }
    },
        w = function (e) {
            return Object(d.bindActionCreators)({
                getWithdrawalAction: p.e,
                createWithdrawAction: p.c,
                cancelWithdrawAction: p.a,
                clearWithdrawalAction: p.b,
                getBalanceAction: h.a
            }, e)
        };
    t.a = Object(u.b)(_, w)(b)
}