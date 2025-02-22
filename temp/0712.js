function(e, t, n) {
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
        d = n(73),
        p = n(6),
        h = n(20),
        f = n.n(h),
        m = n(19),
        g = n(105),
        y = n.n(g),
        v = n(3),
        b = n(39),
        _ = n(159),
        w = n(712),
        x = n.n(w),
        E = n(713),
        k = n.n(E),
        S = n(714),
        O = n.n(S),
        C = n(267),
        T = n.n(C),
        M = function() {
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
        A = Object(v.e)({
            withdraw_withdraw_issue: {
                id: "withdraw.withdraw_issue",
                defaultMessage: "\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432"
            },
            withdraw_total: {
                id: "withdraw.total",
                defaultMessage: "\u0412\u0441\u0435\u0433\u043e"
            },
            withdraw_amount_required: {
                id: "withdraw.amount_required",
                defaultMessage: "\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0443\u043c\u043c\u0430 {minAmount}"
            },
            withdraw_wallet_required: {
                id: "withdraw.wallet_required",
                defaultMessage: "\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u043e\u0448\u0435\u043b\u0435\u043a"
            },
            withdraw_not_enough_funds: {
                id: "withdraw.not_enough_funds",
                defaultMessage: "\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043d\u0430 \u0431\u0430\u043b\u0430\u043d\u0441\u0435"
            },
            withdraw_create_issue: {
                id: "withdraw.create_issue",
                defaultMessage: "\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443"
            },
            withdraw_get_funds: {
                id: "withdraw.get_funds",
                defaultMessage: "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u0441\u0432\u043e\u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430, \u043f\u043e\u0441\u043b\u0435 \u0447\u0435\u0433\u043e \u0412\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0437\u0430\u044f\u0432\u043a\u0443."
            },
            withdraw_sum: {
                id: "withdraw.sum",
                defaultMessage: "\u0421\u0443\u043c\u043c\u0430"
            },
            withdraw_wallet: {
                id: "training.wallet",
                defaultMessage: "\u041d\u043e\u043c\u0435\u0440 \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u0430"
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
                id: "withdraw.min_500",
                defaultMessage: "\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0443\u043c\u043c\u0430 {minAmount}"
            },
            withdraw_max: {
                id: "withdraw.max_2000000",
                defaultMessage: "\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0443\u043c\u043c\u0430 1 000 000"
            },
            withdraw_divide: {
                id: "withdraw.divide",
                defaultMessage: "\u0423\u043a\u0430\u0437\u044b\u0432\u0430\u0439\u0442\u0435 \u0441\u0443\u043c\u043c\u0443, \u043a\u0440\u0430\u0442\u043d\u0443\u044e 200 (200, 400, 600\u2026)"
            },
            withdraw_password_empty: {
                id: "profile.enter_pass",
                defaultMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            withdraw_password: {
                id: "withdraw.withdraw_password_error",
                defaultMessage: "\u041f\u0430\u0440\u043e\u043b\u044c \u0443\u043a\u0430\u0437\u0430\u043d \u043d\u0435\u0432\u0435\u0440\u043d\u043e"
            },
            withdraw_opex_instruction: {
                id: "withdraw.opex_instruction",
                defaultMessage: "\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u0434\u043b\u044f \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u0421\u041c\u0421 \u0441 \u043d\u043e\u043c\u0435\u0440\u043e\u043c \u0447\u0435\u043a\u0430 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex."
            },
            deposit_opex_text_3: {
                id: "deposit.opex.text_3",
                defaultMessage: "<b>2. \u0412 \u043f\u043b\u0430\u0442\u0435\u0436\u043d\u044b\u0445 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430\u0445 \xabUnipay\xbb</b> <br/><br/><b>\u041f\u043e\u043a\u0443\u043f\u043a\u0430 Opex</b><br/><br/>\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430 "
            },
            "-1": {
                id: "deposit.usdt.error.try_later",
                defaultMessage: "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435!"
            },
            "-2": {
                id: "deposit.usdt.error.active",
                defaultMessage: "\u0423 \u0412\u0430\u0441 \u0438\u043c\u0435\u0435\u0442\u0441\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432"
            },
            "-3": {
                id: "deposit.usdt.error.min_sum_invalid",
                defaultMessage: "\u0421\u0443\u043c\u043c\u0430 \u043c\u0435\u043d\u044c\u0448\u0435 \u043c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u043e \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0439"
            },
            "-6": {
                id: "deposit.usdt.error.password_invalid",
                defaultMessage: "\u041f\u0430\u0440\u043e\u043b\u044c \u0443\u043a\u0430\u0437\u0430\u043d \u043d\u0435\u0432\u0435\u0440\u043d\u043e"
            },
            "-7": {
                id: "deposit.usdt.error.currancy_invalid",
                defaultMessage: "\u041d\u0435\u0432\u0435\u0440\u043d\u0430\u044f \u0432\u0430\u043b\u044e\u0442\u0430"
            },
            "-8": {
                id: "deposit.usdt.error.chain_invalid",
                defaultMessage: "\u0421\u0435\u0442\u044c \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f"
            },
            "-9": {
                id: "deposit.usdt.error.address_invalid",
                defaultMessage: "\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u0430\u0434\u0440\u0435\u0441"
            },
            "-10": {
                id: "deposit.usdt.error.rate_not_found",
                defaultMessage: "\u041a\u0443\u0440\u0441 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d"
            },
            "-100": {
                id: "deposit.usdt.error.internal_error",
                defaultMessage: "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u044f\u044f \u043e\u0448\u0438\u0431\u043a\u0430"
            }
        }),
        P = [{
            name: "TRC20",
            icon: x.a,
            value: 4,
            enabled: !0
        }, {
            name: "ERC20",
            icon: k.a,
            value: 1,
            enabled: !1
        }, {
            name: "BEP20",
            icon: O.a,
            value: 3,
            enabled: !0
        }, {
            name: "ERC20 (Polygon)",
            icon: T.a,
            value: 2,
            enabled: ["7221517", "9144465"]
        }],
        N = 9,
        j = "WALLET_KEY_NAME",
        D = 1e6,
        R = function(e) {
            function t() {
                var e, n, i, s;
                o(this, t);
                for (var l = arguments.length, c = Array(l), u = 0; u < l; u++)
                    c[u] = arguments[u];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                    i.state = {
                        amount: "",
                        agree: !0,
                        amountError: !1,
                        password: "",
                        passwordError: !1,
                        amountIsMoreThanBalance: !1,
                        amountIsMoreThan: !1,
                        amountIsLessThan: !1,
                        wallet: localStorage.getItem(j) || "",
                        walletError: !1,
                        amountAlert: !1,
                        amountAlertUnvisible: localStorage.getItem("amountAlertUnvisible") || !1,
                        unvisibleChecked: !1,
                        network: P[0].value
                    },
                    i.toggleModal = function(e) {
                        i.setState({
                            isOpenModal: e
                        })
                    },
                    i.toggleAlert = function(e) {
                        i.setState({
                            amountAlert: e
                        })
                    },
                    i.unvisibleToggle = function(e) {
                        i.setState({
                                unvisibleChecked: e
                            }),
                            localStorage.setItem("amountAlertUnvisible", "true")
                    },
                    i.handleChange = function(e) {
                        var t;
                        i.setState((t = {},
                            r(t, e.target.name, e.target.value),
                            r(t, "amountError", !1),
                            r(t, "amountIsMoreThanBalance", !1),
                            r(t, "amountIsLessThan", !1),
                            t))
                    },
                    i.onSubmit = function() {
                        var e = i.state,
                            t = e.wallet,
                            n = e.password,
                            r = e.amount,
                            o = i.props.withdraw,
                            a = o.get("fetching"),
                            s = parseInt(r, 10) < i.props.minAmount * i.props.rate && "0" !== r[0],
                            l = parseInt(r, 10) > D;
                        i.setState({
                                amountError: "" === r || "0" === r[0],
                                amountIsMoreThanBalance: parseInt(r, 10) > i.props.balance,
                                amountIsMoreThan: l,
                                amountIsLessThan: s,
                                walletError: !t,
                                passwordError: !n
                            }),
                            "" !== r && parseInt(r, 10) <= i.props.balance && !s && !l && "0" !== r[0] && t && n && !a && (localStorage.setItem(j, t),
                                i.props.createWithdrawAction({
                                    amount: Number(r),
                                    providerId: 6,
                                    address: t,
                                    password: n,
                                    chain: i.state.network,
                                    currency: N
                                }))
                    },
                    i.onBlurWallet = function(e) {
                        var t = e.target.value;
                        i.setState({
                            walletError: !t
                        })
                    },
                    i.onBlurAmount = function(e) {
                        var t = e.target.value;
                        i.setState({
                            amountError: "0" === t[0],
                            amountIsMoreThanBalance: parseInt(t, 10) > i.props.balance,
                            amountIsLessThan: parseInt(t, 10) < i.props.minAmount * i.props.rate && "0" !== t[0],
                            amountIsMoreThan: parseInt(t, 10) > D,
                            amountAlert: parseInt(t, 10) > 5e4
                        })
                    },
                    i.onFocusPassword = function() {
                        i.setState({
                            passwordError: !1
                        })
                    },
                    i.handleChangePassword = function(e) {
                        i.setState({
                            password: e.target.value
                        })
                    },
                    i.handleClick = function() {
                        i.state.selectOpened ? document.removeEventListener("click", i.handleOutsideClick, !1) : document.addEventListener("click", i.handleOutsideClick, !1),
                            i.setState(function(e) {
                                return {
                                    selectOpened: !e.selectOpened
                                }
                            })
                    },
                    i.handleOutsideClick = function(e) {
                        i.node.contains(e.target) && i.handleClick()
                    },
                    i.handleCheckboxChange = function(e) {
                        e.stopPropagation(),
                            i.setState({
                                agree: !i.state.agree
                            })
                    },
                    i.handleChangeNetwork = function(e) {
                        i.setState({
                                network: e.value
                            }),
                            i.props.getRate({
                                chain: e.value,
                                currency: N
                            })
                    },
                    s = n,
                    a(i, s)
            }
            return i(t, e),
                M(t, [{
                    key: "componentWillUnmount",
                    value: function() {}
                }, {
                    key: "componentDidMount",
                    value: function() {
                        var e = this.state.network;
                        this.props.getRate({
                            chain: e,
                            currency: N
                        })
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
                            i = t.accountNumber,
                            c = this.state,
                            u = c.amount,
                            p = c.amountError,
                            h = c.password,
                            g = c.passwordError,
                            _ = c.amountIsMoreThanBalance,
                            w = c.amountIsLessThan,
                            x = c.amountIsMoreThan,
                            E = c.walletError,
                            k = c.wallet,
                            S = "" === u || "" === k || w || x,
                            O = n.get("withdrawStatus"),
                            C = n.get("fetching"),
                            T = this.props.minAmount * this.props.rate,
                            M = "",
                            N = void 0 !== O && -4 !== O,
                            j = -4 === O || -6 === O,
                            D = P.filter(function(e) {
                                return "boolean" === typeof e.enabled ? e.enabled : !!Array.isArray(e.enabled) && e.enabled.includes(i)
                            });
                        return N && O && (M = l.a.createElement("span", {
                                className: "withdraw-status-title-text"
                            }, l.a.createElement(v.b, A[O]))),
                            l.a.createElement(b.a, {
                                pageName: "withdraw.unipay",
                                emptyDescr: !0
                            }, l.a.createElement("div", {
                                className: "withdraw",
                                ref: function(t) {
                                    e.node = t
                                }
                            }, C && l.a.createElement(m.a, null), l.a.createElement("div", {
                                className: "withdraw-content"
                            }, l.a.createElement("div", {
                                className: "withdraw-content-left"
                            }, l.a.createElement("div", {
                                className: "withdraw-stats"
                            }, l.a.createElement("div", {
                                className: "withdraw-stats-item"
                            }, l.a.createElement("div", {
                                className: "withdraw-stats-item-title"
                            }, l.a.createElement(v.b, A.withdraw_total)), l.a.createElement("div", {
                                className: "withdraw-stats-item-amount"
                            }, r, "\xa0")), l.a.createElement("div", {
                                className: "withdraw-stats-item"
                            }, l.a.createElement("div", {
                                className: "withdraw-stats-item-title"
                            }, l.a.createElement(v.b, A.withdraw_trading)), l.a.createElement("div", {
                                className: "withdraw-stats-item-amount"
                            }, a.toFixed(2), "\xa0"))), l.a.createElement("div", {
                                className: "withdraw-form"
                            }, l.a.createElement("h2", {
                                style: {
                                    textAlign: "center"
                                }
                            }, l.a.createElement(v.b, A.withdraw_withdraw_issue)), l.a.createElement("div", {
                                className: "withdraw-networks"
                            }, D.map(function(t) {
                                return l.a.createElement("div", {
                                    key: t.name,
                                    className: f()("withdraw-networks-item", {
                                        active: e.state.network === t.value
                                    }),
                                    onClick: function() {
                                        e.handleChangeNetwork(t)
                                    }
                                }, l.a.createElement("img", {
                                    src: t.icon,
                                    alt: t.name
                                }), l.a.createElement("span", null, t.name))
                            })), l.a.createElement("input", {
                                type: "hidden"
                            }), l.a.createElement("input", {
                                type: "password",
                                style: {
                                    display: "none"
                                }
                            }), l.a.createElement("div", {
                                className: "withdraw-form-item" + (p || _ || w ? " withdraw-form-item--error" : "")
                            }, l.a.createElement(d.a, {
                                className: "form-control-input",
                                placeholder: o.formatMessage(A.withdraw_sum),
                                name: "amount",
                                value: u,
                                mask: "*******",
                                maskChar: "",
                                autoComplete: "off",
                                type: "tel",
                                formatChars: {
                                    "*": "[0-9]"
                                },
                                onBlur: this.onBlurAmount,
                                onChange: this.handleChange
                            }), p && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(v.b, Object.assign({
                                values: {
                                    minAmount: T
                                }
                            }, A.withdraw_amount_required))), _ && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(v.b, A.withdraw_not_enough_funds)), x && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(v.b, A.withdraw_max)), w && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(v.b, Object.assign({
                                values: {
                                    minAmount: T
                                }
                            }, A.withdraw_min))), l.a.createElement("div", {
                                className: "common-form__row__message",
                                style: {
                                    color: "#626262",
                                    textAlign: "left",
                                    padding: "10px",
                                    fontSize: "14px"
                                }
                            }, "1 USDT = ", this.props.rate || 0, " OPX", l.a.createElement("br", null), "\u0421\u0443\u043c\u043c\u0430 \u043e\u0442 ", T || 0, " OPX", this.props.rateFetching ? l.a.createElement(m.a, null) : null)), l.a.createElement("div", {
                                className: "withdraw-form-item" + (E ? " withdraw-form-item--error" : "")
                            }, l.a.createElement("textarea", {
                                multiple: !0,
                                rows: "2",
                                className: "form-control-input",
                                placeholder: o.formatMessage(A.withdraw_wallet),
                                name: "wallet",
                                value: k,
                                type: "text",
                                onBlur: this.onBlurWallet,
                                onChange: this.handleChange
                            }), E && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(v.b, A.withdraw_wallet_required))), l.a.createElement("div", {
                                className: "withdraw-form-item" + (g || j ? " withdraw-form-item--error" : "")
                            }, l.a.createElement("input", {
                                autoComplete: "off",
                                className: "form-control-input",
                                type: "password",
                                value: h,
                                placeholder: o.formatMessage({
                                    id: "auth.form.pass"
                                }),
                                onFocus: this.onFocusPassword,
                                onChange: this.handleChangePassword
                            }), g && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(v.b, A.withdraw_password_empty)), j && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(v.b, A.withdraw_password))), l.a.createElement("button", {
                                disabled: S,
                                className: "common-form__submit",
                                onClick: this.onSubmit,
                                style: {
                                    maxWidth: "100%",
                                    width: "280px"
                                }
                            }, l.a.createElement(v.b, A.withdraw_create_issue)), N && l.a.createElement(s.Fragment, null, l.a.createElement("br", null), l.a.createElement("h2", {
                                className: "withdraw-status-title"
                            }, l.a.createElement("img", {
                                className: "withdraw-status-title-icon",
                                src: y.a,
                                alt: ""
                            }), M)))))))
                    }
                }]),
                t
        }(s.Component);
    R.propTypes = {
        createWithdrawAction: u.a.func.isRequired,
        clearWithdrawalAction: u.a.func.isRequired,
        withdraw: u.a.object.isRequired,
        languageId: u.a.number.isRequired,
        intl: u.a.object.isRequired,
        balance: u.a.number.isRequired,
        tradingBalance: u.a.number.isRequired
    };
    var I = function(e) {
            return {
                minAmount: e.application.get("withdraw").get("minAmount"),
                rate: e.application.get("withdraw").get("rate"),
                rateFetching: e.application.get("withdraw").get("rateFetching"),
                rateError: e.application.get("withdraw").get("rateError"),
                accountNumber: e.application.get("user") && e.application.get("user").accountNumber
            }
        },
        L = function(e) {
            return {
                getRate: function(t) {
                    return e(Object(_.d)(t))
                }
            }
        };
    t.a = Object(v.f)(Object(p.b)(I, L)(R))
}