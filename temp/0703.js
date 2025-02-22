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
    var i = n(0),
        s = n.n(i),
        l = n(2),
        c = n.n(l),
        u = n(703),
        d = n(73),
        p = n(19),
        h = n(105),
        f = n.n(h),
        m = n(3),
        g = n(705),
        y = n(159),
        v = n(6),
        b = n(39),
        _ = n(706),
        w = function() {
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
        x = Object(m.e)({
            withdraw_withdraw_issue: {
                id: "withdraw.withdraw_issue",
                defaultMessage: "\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432"
            },
            withdraw_total: {
                id: "withdraw.total",
                defaultMessage: "\u0412\u0441\u0435\u0433\u043e"
            },
            withdraw_in_deals: {
                id: "withdraw.in_deals",
                defaultMessage: "\u0412 \u0441\u0434\u0435\u043b\u043a\u0430\u0445"
            },
            withdraw_available: {
                id: "withdraw.available",
                defaultMessage: "\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e"
            },
            withdraw_specify: {
                id: "withdraw.specify",
                defaultMessage: "\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u0430\u0441\u0441\u0443"
            },
            withdraw_specify_amount: {
                id: "withdraw.specify_amount",
                defaultMessage: "\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u0434\u043b\u044f \u0432\u044b\u0432\u043e\u0434\u0430"
            },
            withdraw_not_enough_funds: {
                id: "withdraw.not_enough_funds",
                defaultMessage: "\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043d\u0430 \u0431\u0430\u043b\u0430\u043d\u0441\u0435"
            },
            withdraw_create_issue: {
                id: "withdraw.create_issue",
                defaultMessage: "\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443"
            },
            withdraw_available_on_ringotrade: {
                id: "withdraw.available_on_ringotrade",
                defaultMessage: "\u0412 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u043c\u0438 \u043d\u0430 \u043a\u0430\u0441\u0441\u0430\u0445 \u0431\u0440\u043e\u043a\u0435\u0440\u0441\u043a\u0438\u0445 \u043a\u043b\u0443\u0431\u043e\u0432 \xabBuleto\xbb."
            },
            withdraw_choose_location: {
                id: "withdraw.choose_location",
                defaultMessage: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u043d\u0430\u0438\u0431\u043e\u043b\u0435\u0435 \u0443\u0434\u043e\u0431\u043d\u043e\u0435 \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043a\u043b\u0443\u0431\u0430 \u0438 \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u0432\u044b\u0432\u043e\u0434\u0430."
            },
            withdraw_get_funds: {
                id: "withdraw.get_funds",
                defaultMessage: "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u0441\u0432\u043e\u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430, \u043f\u043e\u0441\u043b\u0435 \u0447\u0435\u0433\u043e \u0412\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0437\u0430\u044f\u0432\u043a\u0443."
            },
            withdraw_sum: {
                id: "withdraw.sum",
                defaultMessage: "\u0421\u0443\u043c\u043c\u0430"
            },
            withdraw_issue_active: {
                id: "withdraw.issue_active",
                defaultMessage: "\u0423 \u0412\u0430\u0441 \u0438\u043c\u0435\u0435\u0442\u0441\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432"
            },
            withdraw_error: {
                id: "withdraw.error",
                defaultMessage: "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435!"
            },
            withdraw_trading: {
                id: "withdraw.trading",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u0441\u0447\u0451\u0442"
            },
            withdraw_min: {
                id: "withdraw.min",
                defaultMessage: "\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0443\u043c\u043c\u0430 "
            },
            withdraw_password_empty: {
                id: "profile.enter_pass",
                defaultMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            withdraw_password: {
                id: "withdraw.withdraw_password_error",
                defaultMessage: "\u041f\u0430\u0440\u043e\u043b\u044c \u0443\u043a\u0430\u0437\u0430\u043d \u043d\u0435\u0432\u0435\u0440\u043d\u043e"
            },
            withdraw_not_verified: {
                id: "withdraw.not_verified",
                defaultMessage: "\u041f\u0440\u043e\u0439\u0434\u0438\u0442\u0435 \u0432\u0435\u0440\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044e"
            }
        }),
        E = function(e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        selectOpened: !1,
                        selectedSalepoint: {},
                        amount: "",
                        salepointError: !1,
                        amountError: !1,
                        amountIsMoreThanBalance: !1,
                        amountIsLessThanFive: !1
                    },
                    a.componentDidMount = function() {
                        var e = a.props.withdraw,
                            t = e.get("salepoints").filter(function(e) {
                                var t = e.Id;
                                return !g.a.ringobet.ids.includes(t)
                            });
                        t[0] && a.props.setSelectedSalepoint(t[0])
                    },
                    a.toggleSelect = function() {
                        a.handleClick(),
                            a.setState({
                                selectOpened: !a.state.selectOpened
                            })
                    },
                    a.select = function(e) {
                        a.setState({
                                salepointError: !1
                            }),
                            a.props.setSelectedSalepoint(e),
                            a.handleClick()
                    },
                    a.handleChange = function(e) {
                        a.setState({
                            amount: e.target.value,
                            amountError: !1,
                            amountIsMoreThanBalance: !1,
                            amountIsLessThanFive: !1
                        })
                    },
                    a.handleChangePassword = function(e) {
                        a.setState({
                            password: e.target.value
                        })
                    },
                    a.onSubmit = function() {
                        var e = a.props.withdraw,
                            t = e.get("fetching"),
                            n = e.get("selectedSalepoint"),
                            r = parseInt(a.state.amount, 10) < n.WithdrawalMinAmount;
                        a.setState({
                                salepointError: void 0 === n.Id,
                                amountError: "" === a.state.amount || "0" === a.state.amount[0],
                                amountIsMoreThanBalance: parseInt(a.state.amount, 10) > a.props.balance,
                                amountIsLessThanFive: r && "0" !== a.state.amount[0]
                            }),
                            void 0 !== n.Id && "" !== a.state.amount && !r && parseInt(a.state.amount, 10) <= a.props.balance && "0" !== a.state.amount[0] && !t && a.props.createWithdrawAction({
                                cashdeskId: n.Id,
                                amount: a.state.amount,
                                providerId: 1
                            })
                    },
                    a.handleClick = function() {
                        a.state.selectOpened ? document.removeEventListener("click", a.handleOutsideClick, !1) : document.addEventListener("click", a.handleOutsideClick, !1),
                            a.setState(function(e) {
                                return {
                                    selectOpened: !e.selectOpened
                                }
                            })
                    },
                    a.handleOutsideClick = function(e) {
                        a.node.contains(e.target) && a.handleClick()
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                w(t, [{
                    key: "componentWillUnmount",
                    value: function() {
                        this.props.setSelectedSalepoint(null),
                            this.props.clearWithdrawalAction()
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this,
                            t = this.props,
                            n = t.withdraw,
                            r = t.balance,
                            o = t.intl,
                            a = t.tradingBalance,
                            i = this.state,
                            l = i.selectOpened,
                            c = i.amount,
                            h = i.salepointError,
                            y = i.amountError,
                            v = i.amountIsMoreThanBalance,
                            w = i.amountIsLessThanFive,
                            E = n.get("selectedSalepoint") || {},
                            k = "" === c || 0 === Object.keys(E).length,
                            S = n.get("salepoints").filter(function(e) {
                                var t = e.Id;
                                return !g.a.ringobet.ids.includes(t)
                            }),
                            O = n.get("withdrawStatus"),
                            C = n.get("fetching"),
                            T = l ? "select-replacement active" : "select-replacement",
                            M = {
                                salepoints: S,
                                selectOpened: l,
                                selectedSalepoint: E,
                                selectClass: T,
                                toggleSelect: this.toggleSelect,
                                select: this.select
                            },
                            A = "",
                            P = void 0 !== O,
                            N = -10 === O;
                        return P && (-2 === O ? A = s.a.createElement("span", {
                                className: "withdraw-status-title-text"
                            }, s.a.createElement(m.b, x.withdraw_issue_active), s.a.createElement("span", {
                                className: "withdraw-status-title-text-sub"
                            }, s.a.createElement("br", null), s.a.createElement(m.b, x.withdraw_get_funds))) : -4 === O ? A = "" : N ? (P = !1,
                                A = "") : A = s.a.createElement("span", {
                                className: "withdraw-status-title-text"
                            }, s.a.createElement(m.b, x.withdraw_error))),
                            s.a.createElement(b.a, {
                                pageName: "withdraw.ringotrade",
                                emptyDescr: !0
                            }, s.a.createElement("div", {
                                className: "withdraw",
                                ref: function(t) {
                                    e.node = t
                                }
                            }, C && s.a.createElement(p.a, null), P && s.a.createElement("h2", {
                                className: "withdraw-status-title"
                            }, s.a.createElement("img", {
                                className: "withdraw-status-title-icon",
                                src: f.a,
                                alt: ""
                            }), A), s.a.createElement("h2", null, s.a.createElement(m.b, x.withdraw_withdraw_issue)), s.a.createElement("div", {
                                className: "withdraw-content"
                            }, s.a.createElement("div", {
                                className: "withdraw-content-left"
                            }, s.a.createElement("div", {
                                className: "withdraw-stats"
                            }, s.a.createElement("div", {
                                className: "withdraw-stats-item"
                            }, s.a.createElement("div", {
                                className: "withdraw-stats-item-title"
                            }, s.a.createElement(m.b, x.withdraw_total)), s.a.createElement("div", {
                                className: "withdraw-stats-item-amount"
                            }, r, "\xa0", s.a.createElement("span", {
                                className: "withdraw-stats-item-amount-currency"
                            }, "c"))), s.a.createElement("div", {
                                className: "withdraw-stats-item"
                            }, s.a.createElement("div", {
                                className: "withdraw-stats-item-title"
                            }, s.a.createElement(m.b, x.withdraw_trading)), s.a.createElement("div", {
                                className: "withdraw-stats-item-amount"
                            }, a.toFixed(2), "\xa0", s.a.createElement("span", {
                                className: "withdraw-stats-item-amount-currency"
                            }, "c")))), s.a.createElement("div", {
                                className: "withdraw-form"
                            }, s.a.createElement("div", {
                                className: "withdraw-form-item" + (h ? " withdraw-form-item--error" : "")
                            }, s.a.createElement(u.a, M), h && s.a.createElement("div", {
                                className: "common-form__row__message"
                            }, s.a.createElement(m.b, x.withdraw_specify))), s.a.createElement("div", {
                                className: "withdraw-form-item" + (y || v || w || N ? " withdraw-form-item--error" : "")
                            }, s.a.createElement(d.a, {
                                className: "form-control-input",
                                name: "amount",
                                placeholder: o.formatMessage(x.withdraw_sum),
                                value: c,
                                mask: "9999999",
                                maskChar: "",
                                type: "tel",
                                formatChars: {
                                    9: "[0-9]"
                                },
                                onChange: this.handleChange
                            }), y && s.a.createElement("div", {
                                className: "common-form__row__message"
                            }, s.a.createElement(m.b, x.withdraw_specify_amount)), N && s.a.createElement("div", {
                                className: "common-form__row__message"
                            }, s.a.createElement(m.b, x.withdraw_not_verified)), v && s.a.createElement("div", {
                                className: "common-form__row__message"
                            }, s.a.createElement(m.b, x.withdraw_not_enough_funds)), w && !y && !v && s.a.createElement("div", {
                                className: "common-form__row__message"
                            }, s.a.createElement(m.b, Object.assign({}, x.withdraw_min, {
                                values: {
                                    amount: s.a.createElement("b", null, E.WithdrawalMinAmount)
                                }
                            })))), s.a.createElement("button", {
                                disabled: k,
                                className: "common-form__submit",
                                onClick: this.onSubmit
                            }, s.a.createElement(m.b, x.withdraw_create_issue)))), N ? s.a.createElement(_.a, null) : s.a.createElement("div", {
                                className: "withdraw-content-right"
                            }, s.a.createElement(m.b, Object.assign({
                                tagName: "p"
                            }, x.withdraw_choose_location))))))
                    }
                }]),
                t
        }(i.Component);
    E.propTypes = {
            clearWithdrawalAction: c.a.func.isRequired,
            createWithdrawAction: c.a.func.isRequired,
            withdraw: c.a.object.isRequired,
            intl: c.a.object.isRequired,
            balance: c.a.number.isRequired,
            tradingBalance: c.a.number.isRequired
        },
        t.a = Object(v.b)(function(e) {
            return e
        }, {
            setSelectedSalepoint: y.f
        })(Object(m.f)(E))
}