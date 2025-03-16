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
        u = n(73),
        d = n(3),
        p = function () {
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
        h = Object(d.e)({
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
            },
            transfer_less_than_5: {
                id: "transfer.less_than_5",
                defaultMessage: "\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u043d\u0435 \u043c\u0435\u043d\u044c\u0448\u0435 5"
            }
        }),
        f = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        selectOpened: !1
                    },
                    a.toggleSelect = function () {
                        a.setState(function (e) {
                            return {
                                selectOpened: !e.selectOpened
                            }
                        })
                    },
                    a.onSelectAccount = function (e) {
                        a.props.selectAccount(e.type),
                            a.handleClick()
                    },
                    a.handleClick = function () {
                        a.state.selectOpened ? document.removeEventListener("click", a.handleOutsideClick, !1) : document.addEventListener("click", a.handleOutsideClick, !1),
                            a.setState(function (e) {
                                return {
                                    selectOpened: !e.selectOpened
                                }
                            })
                    },
                    a.handleClick = function () {
                        a.state.selectOpened ? document.removeEventListener("click", a.handleOutsideClick, !1) : document.addEventListener("click", a.handleOutsideClick, !1),
                            a.setState(function (e) {
                                return {
                                    selectOpened: !e.selectOpened
                                }
                            })
                    },
                    a.handleOutsideClick = function (e) {
                        a.node.contains(e.target) && a.handleClick()
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.error,
                            n = e.errorMsg,
                            r = e.tradingBalance,
                            o = e.amountError,
                            a = e.amountLessThanFive,
                            i = e.handleSubmit,
                            l = e.balance,
                            c = e.amount,
                            p = e.handleChange,
                            f = e.intl,
                            m = e.fetching,
                            g = "" === c || m,
                            y = [{
                                name: f.formatMessage(h.transfer_main) + " - " + l + " KGS",
                                type: 1
                            }, {
                                name: f.formatMessage(h.transfer_trading) + " - " + r + " KGS",
                                type: 2
                            }];
                        return s.a.createElement("div", {
                            className: "transfer__form"
                        }, t && s.a.createElement("div", {
                            className: "common-form__message text-center"
                        }, n), s.a.createElement("div", {
                            className: "transfer__form__row"
                        }, s.a.createElement("span", {
                            className: "transfer__form__label"
                        }, s.a.createElement(d.b, h.transfer_from)), s.a.createElement("input", {
                            className: "form-control-input",
                            type: "text",
                            name: "amount",
                            disabled: !0,
                            value: y[1].name
                        })), s.a.createElement("div", {
                            className: "transfer__form__row"
                        }, s.a.createElement("span", {
                            className: "transfer__form__label"
                        }, s.a.createElement(d.b, h.transfer_to)), s.a.createElement("div", {
                            className: "form-control form-control--phone"
                        }, s.a.createElement("input", {
                            className: "form-control-input",
                            type: "text",
                            name: "amount",
                            disabled: !0,
                            value: y[0].name
                        }))), s.a.createElement("div", {
                            className: "transfer__form__row"
                        }, s.a.createElement("span", {
                            className: "transfer__form__label"
                        }, s.a.createElement(d.b, h.transfer_sum)), s.a.createElement("div", {
                            className: o || a ? "form-control form-control--phone form-control--error" : "form-control form-control--phone"
                        }, s.a.createElement(u.a, {
                            className: "form-control-input",
                            name: "amount",
                            value: c,
                            mask: "9999999",
                            maskChar: "",
                            formatChars: {
                                9: "[0-9]"
                            },
                            onChange: p
                        }), o && s.a.createElement("div", {
                            className: "form-control-error"
                        }, s.a.createElement(d.b, h.transfer_no_funds)), a && s.a.createElement("div", {
                            className: "form-control-error"
                        }, s.a.createElement(d.b, h.transfer_less_than_5)))), s.a.createElement("div", {
                            className: "transfer__form__row"
                        }, s.a.createElement("div", {
                            className: "transfer__form__input"
                        }, s.a.createElement("button", {
                            onClick: i,
                            className: "form-control-submit",
                            disabled: g
                        }, s.a.createElement(d.b, h.transfer_submit)))))
                    }
                }]),
                t
        }(s.a.Component);
    f.propTypes = {
        amount: c.a.any,
        selectedAccount: c.a.number.isRequired,
        selectAccount: c.a.func.isRequired,
        error: c.a.bool.isRequired,
        errorMsg: c.a.string.isRequired,
        balance: c.a.number.isRequired,
        tradingBalance: c.a.number.isRequired,
        amountError: c.a.bool.isRequired,
        amountLessThanFive: c.a.bool.isRequired,
        fetching: c.a.bool.isRequired,
        handleSubmit: c.a.func.isRequired,
        intl: c.a.object.isRequired
    },
        t.a = Object(d.f)(f)
}