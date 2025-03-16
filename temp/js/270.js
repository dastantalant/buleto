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
        u = n(40),
        d = n.n(u),
        p = n(105),
        h = n.n(p),
        f = n(699),
        m = n.n(f),
        g = n(160),
        y = n(3),
        v = n(271),
        b = function () {
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
        _ = Object(y.e)({
            withdraw_issue_created: {
                id: "withdraw.issue_created",
                defaultMessage: "\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0441\u043e\u0437\u0434\u0430\u043d\u0430!"
            },
            withdraw_payout_waiting: {
                id: "withdraw.payout_waiting",
                defaultMessage: '\u0412\u0440\u0435\u043c\u044f \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0438 \u0437\u0430\u044f\u0432\u043a\u0438 \u043c\u043e\u0436\u0435\u0442 \u0437\u0430\u043d\u044f\u0442\u044c \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u043c\u0438\u043d\u0443\u0442. \u0415\u0441\u043b\u0438 \u0437\u0430\u044f\u0432\u043a\u0443 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u044f\u0442, \u0442\u043e \u0447\u0435\u043a \u043f\u043e\u044f\u0432\u0438\u0442\u0441\u044f \u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435 <a href="/opex-checks">\u0427\u0435\u043a\u0438 Opex</a>'
            },
            withdraw_issue_active: {
                id: "withdraw.issue_active",
                defaultMessage: "\u0423 \u0412\u0430\u0441 \u0438\u043c\u0435\u0435\u0442\u0441\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432"
            },
            withdraw_get_funds: {
                id: "withdraw.get_funds",
                defaultMessage: "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u0441\u0432\u043e\u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430, \u043f\u043e\u0441\u043b\u0435 \u0447\u0435\u0433\u043e \u0412\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0437\u0430\u044f\u0432\u043a\u0443."
            },
            withdraw_confirmation_code: {
                id: "withdraw.confirmation_code",
                defaultMessage: "\u041a\u043e\u0434 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f"
            },
            withdraw_issue_to_cashier: {
                id: "withdraw.issue_to_cashier",
                defaultMessage: "\u041f\u0440\u0435\u0434\u044a\u044f\u0432\u0438\u0442\u0435 \u043a\u0430\u0441\u0441\u0438\u0440\u0443 \u043f\u0440\u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432"
            },
            withdraw_unipay_issue_to_cashier: {
                id: "withdraw.unipay_issue_to_cashier",
                defaultMessage: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0439 \u043a\u043e\u0434 \u0434\u043b\u044f \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0432 \u0441\u0435\u0442\u0438 \u043f\u043b\u0430\u0442\u0435\u0436\u043d\u044b\u0445 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432 \xabUnipay\xbb"
            },
            locations: {
                id: "withdraw.terminals_location",
                defaultMessage: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432"
            },
            withdraw_number: {
                id: "withdraw.number",
                defaultMessage: "\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u044f\u0432\u043a\u0438"
            },
            withdraw_active: {
                id: "withdraw.active",
                defaultMessage: "\u0417\u0430\u044f\u0432\u043a\u0430 \u0432 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435, \u043e\u0436\u0438\u0434\u0430\u0439\u0442\u0435 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f"
            },
            withdraw_sum: {
                id: "withdraw.sum",
                defaultMessage: "\u0421\u0443\u043c\u043c\u0430"
            },
            withdraw_cashbox: {
                id: "withdraw.cashbox",
                defaultMessage: "\u041a\u0430\u0441\u0441\u0430"
            },
            withdraw_account_number: {
                id: "withdraw.account_number",
                defaultMessage: "\u2116 \u0441\u0447\u0451\u0442\u0430"
            },
            withdraw_issue_date: {
                id: "withdraw.issue_date",
                defaultMessage: "\u0414\u0430\u0442\u0430 \u0437\u0430\u044f\u0432\u043a\u0438"
            },
            traderoom_error_not_found: {
                id: "traderoom.error.not_found",
                defaultMessage: "\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430"
            },
            traderoom_error_try_again: {
                id: "traderoom.error.try_again",
                defaultMessage: "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435!"
            },
            traderoom_error_unable_to_cancel: {
                id: "traderoom.error.unable_to_cancel",
                defaultMessage: "\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443"
            },
            traderoom_error_limit_to_cancel: {
                id: "traderoom.error.limit_to_cancel",
                defaultMessage: "\u0412\u044b \u043f\u0440\u0435\u0432\u044b\u0441\u0438\u043b\u0438 \u043b\u0438\u043c\u0438\u0442 \u043e\u0442\u043c\u0435\u043d"
            },
            traderoom_cancel: {
                id: "traderoom.cancel",
                defaultMessage: "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443"
            },
            locations_hide: {
                id: "withdraw.terminals_location_hide",
                defaultMessage: "\u0421\u043a\u0440\u044b\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432"
            }
        }),
        w = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        addressToggled: !1
                    },
                    a.toggleAddress = function (e) {
                        a.setState({
                            addressToggled: e
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                b(t, [{
                    key: "render",
                    value: function () {
                        var e = this,
                            t = this.props,
                            n = this.state.addressToggled,
                            r = t.withdrawalCreated,
                            o = t.cancelStatus,
                            a = t.withdrawal.state,
                            i = r ? m.a : h.a,
                            l = r ? t.intl.formatMessage({
                                id: "withdraw.issue_created"
                            }) : t.intl.formatMessage({
                                id: "withdraw.issue_active"
                            }),
                            c = "";
                        void 0 !== o && (c = -2 === o ? t.intl.formatMessage(_.traderoom_error_not_found) : -3 === o ? t.intl.formatMessage(_.traderoom_error_limit_to_cancel) : -100 === o ? t.intl.formatMessage(_.traderoom_error_try_again) : t.intl.formatMessage(_.traderoom_error_unable_to_cancel));
                        var u = t.withdrawal.providerId && 3 === t.withdrawal.providerId,
                            p = t.withdrawal.providerId && 5 === t.withdrawal.providerId,
                            f = u ? s.a.createElement(y.b, _.withdraw_unipay_issue_to_cashier) : s.a.createElement(y.b, _.withdraw_issue_to_cashier),
                            b = [];
                        return a === g.b && (u && b.push(s.a.createElement(s.a.Fragment, null, s.a.createElement("h3", null, s.a.createElement(y.b, _.withdraw_confirmation_code)), s.a.createElement("p", null, f), s.a.createElement("div", {
                            className: "withdraw-status-content-left-code"
                        }, t.withdrawal.code))),
                            p && b.push(s.a.createElement(s.a.Fragment, null, s.a.createElement("p", null, s.a.createElement(y.a, _.withdraw_payout_waiting)))),
                            u && (b.push(s.a.createElement("p", {
                                className: "unipay-locations-link",
                                style: {
                                    marginTop: "35px",
                                    textAlign: "left"
                                },
                                onClick: function () {
                                    return e.toggleAddress(!n)
                                }
                            }, !n && s.a.createElement(y.b, _.locations), n && s.a.createElement(y.b, _.locations_hide))),
                                n && b.push(s.a.createElement(v.a, null)))),
                            a === g.a && b.push(s.a.createElement("div", {
                                className: "withdraw-status-content-left",
                                style: {
                                    width: "280px"
                                }
                            }, s.a.createElement("h3", null, "\u0417\u0430\u044f\u0432\u043a\u0430 \u0432 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435, \u043e\u0436\u0438\u0434\u0430\u0439\u0442\u0435 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f"))),
                            s.a.createElement("div", {
                                className: "withdraw-status"
                            }, void 0 !== o && s.a.createElement("div", {
                                className: "common-form__message text-center",
                                style: {
                                    marginBottom: 20
                                }
                            }, c), s.a.createElement("h2", {
                                className: "withdraw-status-title"
                            }, s.a.createElement("img", {
                                className: "withdraw-status-title-icon",
                                src: i,
                                alt: ""
                            }), s.a.createElement("span", {
                                className: "withdraw-status-title-text"
                            }, l, !r && s.a.createElement("span", {
                                className: "withdraw-status-title-text-sub"
                            }, s.a.createElement("br", null), s.a.createElement(y.b, _.withdraw_get_funds)))), s.a.createElement("div", {
                                className: "withdraw-status-content"
                            }, s.a.createElement("div", {
                                className: "withdraw-status-content-left",
                                style: {
                                    width: "280px"
                                }
                            }, b), s.a.createElement("div", {
                                className: "withdraw-status-content-right"
                            }, s.a.createElement("table", {
                                className: "withdraw-summary"
                            }, s.a.createElement("tbody", null, p && s.a.createElement("tr", null, s.a.createElement("td", null, s.a.createElement(y.b, _.withdraw_number)), s.a.createElement("td", null, t.withdrawal.id)), s.a.createElement("tr", null, s.a.createElement("td", null, s.a.createElement(y.b, _.withdraw_sum)), s.a.createElement("td", null, t.withdrawal.amount, " \u0443.\u0435.")), !u && !p && s.a.createElement("tr", null, s.a.createElement("td", null, s.a.createElement(y.b, _.withdraw_cashbox)), s.a.createElement("td", null, t.withdrawal.address)), !p && s.a.createElement("tr", null, s.a.createElement("td", null, s.a.createElement(y.b, _.withdraw_account_number)), s.a.createElement("td", null, t.accountNumber)), s.a.createElement("tr", null, s.a.createElement("td", null, s.a.createElement(y.b, _.withdraw_issue_date)), s.a.createElement("td", null, d()(t.withdrawal.date).format("DD.MM.YYYY HH:mm"))))))), s.a.createElement("div", {
                                className: "withdraw-status-footer"
                            }, (a === g.a || a === g.b) && !(p && a === g.b) && s.a.createElement("button", {
                                onClick: function () {
                                    return t.cancelWithdrawAction(t.withdrawal.id)
                                }
                            }, s.a.createElement(y.b, _.traderoom_cancel))))
                    }
                }]),
                t
        }(s.a.Component);
    w.propTypes = {
        cancelStatus: c.a.any,
        cancelWithdrawAction: c.a.func.isRequired,
        withdrawalCreated: c.a.bool.isRequired,
        withdrawal: c.a.object.isRequired,
        intl: c.a.object.isRequired,
        accountNumber: c.a.any
    },
        t.a = Object(y.f)(w)
}