 function (e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
            e
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
    var s = n(0),
        l = n.n(s),
        c = n(2),
        u = n.n(c),
        d = n(19),
        p = n(21),
        h = (n.n(p),
            n(806)),
        f = n.n(h),
        m = n(807),
        g = n(3),
        y = function () {
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
        v = Object(g.e)({
            transfer_no_funds: {
                id: "transfer.no_funds",
                defaultMessage: "\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043d\u0430 \u0441\u0447\u0451\u0442\u0435 \u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f"
            },
            transfer_error: {
                id: "transfer.error",
                defaultMessage: "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430!"
            },
            transfer_title: {
                id: "transfer.title",
                defaultMessage: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u043c\u0435\u0436\u0434\u0443 \u0441\u0447\u0435\u0442\u0430\u043c\u0438"
            },
            transfer_description: {
                id: "transfer.description",
                defaultMessage: "\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f \xabBuleto\xbb \u043f\u0440\u0435\u0434\u043b\u0430\u0433\u0430\u0435\u0442 \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u0443\u044e \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0443 \u0434\u043b\u044f \u0431\u0438\u0440\u0436\u0435\u0432\u043e\u0439 \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u0438 \u043d\u0430 \u0440\u044b\u043d\u043a\u0435 \u0424\u043e\u0440\u0435\u043a\u0441 \u0438 \u0431\u0438\u043d\u0430\u0440\u043d\u044b\u0445 \u043e\u043f\u0446\u0438\u043e\u043d\u043e\u0432 \u0441 \u0448\u0438\u0440\u043e\u043a\u0438\u043c \u0441\u043f\u0435\u043a\u0442\u0440\u043e\u043c \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0445 \u0430\u043a\u0442\u0438\u0432\u043e\u0432."
            },
            transfer_heading: {
                id: "transfer.heading",
                defaultMessage: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u043c\u0435\u0436\u0434\u0443 \u0441\u0447\u0435\u0442\u0430\u043c\u0438"
            },
            transfer_success: {
                id: "transfer.success",
                defaultMessage: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043c\u0435\u0436\u0434\u0443 \u0441\u0447\u0435\u0442\u0430\u043c\u0438 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043d!"
            },
            transfer_from: {
                id: "transfer.from",
                defaultMessage: "\u0421\u0447\u0451\u0442 \u0441\u043f\u0438\u0441\u0430\u043d\u0438\u044f"
            },
            transfer_main: {
                id: "transfer.main",
                defaultMessage: "\u041e\u0441\u043d\u043e\u0432\u043d\u043e\u0439"
            },
            transfer_trading: {
                id: "transfer.trading",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0439"
            },
            transfer_to: {
                id: "transfer.to",
                defaultMessage: "\u0421\u0447\u0451\u0442 \u0437\u0430\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u044f"
            },
            transfer_sum: {
                id: "transfer.sum",
                defaultMessage: "\u0421\u0443\u043c\u043c\u0430"
            },
            transfer_value_error: {
                id: "transfer.value_error",
                defaultMessage: "\u041d\u0435\u0434\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u043e\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435"
            },
            transfer_submit: {
                id: "transfer.submit",
                defaultMessage: "\u041f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438"
            }
        }),
        b = function (e) {
            function t() {
                var e, n, i, s;
                o(this, t);
                for (var l = arguments.length, c = Array(l), u = 0; u < l; u++)
                    c[u] = arguments[u];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                    i.state = {
                        amount: "",
                        amountError: !1,
                        amountLessThanFive: !1,
                        selectedAccount: 2
                    },
                    i.handleChange = function (e) {
                        i.setState(r({}, e.target.name, e.target.value))
                    },
                    i.handleSubmit = function () {
                        var e = i.state,
                            t = e.amount,
                            n = e.selectedAccount,
                            r = i.props.deposit,
                            o = 1 === n ? i.props.balance : i.props.tradingBalance,
                            a = r.get("fetching"),
                            s = t > o || " " === t,
                            l = t < 5;
                        i.setState({
                            amountError: s,
                            amountLessThanFive: l
                        }),
                            s || l || a || (1 === n ? i.props.makeDepositAction({
                                amount: t
                            }) : i.props.makeWithdrawAction({
                                amount: t
                            }))
                    },
                    i.onSelectClick = function (e) {
                        i.setState({
                            selectedAccount: e
                        })
                    },
                    s = n,
                    a(i, s)
            }
            return i(t, e),
                y(t, [{
                    key: "renderSuccessMsg",
                    value: function () {
                        return l.a.createElement("div", {
                            className: "transfer-success"
                        }, l.a.createElement("img", {
                            src: f.a,
                            alt: ""
                        }), l.a.createElement("span", null, l.a.createElement(g.b, v.transfer_success)))
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this.state,
                            t = e.amount,
                            n = e.amountError,
                            r = e.amountLessThanFive,
                            o = e.selectedAccount,
                            a = this.props,
                            i = a.balance,
                            c = a.deposit,
                            u = a.tradingBalance,
                            h = a.intl,
                            f = c.get("status"),
                            y = c.get("fetching"),
                            b = -3 === f || -100 === f,
                            _ = 0 === f,
                            w = -3 === f ? h.formatMessage(v.transfer_no_funds) : h.formatMessage(v.transfer_error),
                            x = {
                                balance: i,
                                amount: t,
                                error: b,
                                errorMsg: w,
                                tradingBalance: u,
                                amountError: n,
                                amountLessThanFive: r,
                                fetching: y,
                                selectedAccount: o,
                                handleSubmit: this.handleSubmit,
                                handleChange: this.handleChange,
                                selectAccount: this.onSelectClick
                            };
                        return l.a.createElement(s.Fragment, null, l.a.createElement(p.Helmet, null, l.a.createElement("title", null, h.formatMessage(v.transfer_title)), l.a.createElement("meta", {
                            name: "description",
                            content: ""
                        })), l.a.createElement("section", {
                            className: "transfer"
                        }, y && l.a.createElement(d.a, null), l.a.createElement("div", {
                            className: "container"
                        }, l.a.createElement("div", {
                            className: "transfer__head"
                        }, l.a.createElement("h3", {
                            className: "transfer__heading"
                        }, l.a.createElement(g.b, v.transfer_heading))), l.a.createElement("div", {
                            className: "transfer__body"
                        }, _ ? this.renderSuccessMsg() : l.a.createElement(m.a, x)))))
                    }
                }]),
                t
        }(s.Component);
    b.propTypes = {
        balance: u.a.number.isRequired,
        tradingBalance: u.a.number.isRequired,
        makeDepositAction: u.a.func.isRequired,
        makeWithdrawAction: u.a.func.isRequired,
        deposit: u.a.object.isRequired,
        intl: u.a.object.isRequired
    },
        t.a = Object(g.f)(b)
}