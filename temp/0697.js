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

    function s(e) {
        var t = e.application.get("user"),
            n = e.application.get("recharge");
        return {
            user: t,
            accountNumber: t && t.accountNumber,
            networkFetching: n.get("usdtNetworkAddressFetching"),
            networkAddress: n.get("usdtNetworkAddress"),
            networkError: n.get("usdtNetworkAddressError"),
            rechargeError: n.get("usdtRechargeError"),
            rechargeFetching: n.get("usdtRechargeFetching"),
            rechargeStatus: n.get("usdtRechargeStatus")
        }
    }
    var l = n(0),
        c = n.n(l),
        u = n(6),
        d = n(7),
        p = n(20),
        h = n.n(p),
        f = n(3),
        m = n(108),
        g = n.n(m),
        y = n(259),
        v = n.n(y),
        b = n(158),
        _ = n.n(b),
        w = n(265),
        x = n.n(w),
        E = n(266),
        k = n.n(E),
        S = n(268),
        O = n.n(S),
        C = n(269),
        T = n(107),
        M = n(19),
        A = function() {
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
        P = Object(f.e)({
            deposit_opex_name: {
                id: "deposit.opex.name",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0435 \u0437\u0430\u043b\u044b Buleto"
            },
            locations: {
                id: "withdraw.terminals_location",
                defaultMessage: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432"
            },
            locations_hide: {
                id: "withdraw.terminals_location_hide",
                defaultMessage: "\u0421\u043a\u0440\u044b\u0442\u044c \u043a\u0430\u0440\u0442\u0443 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432"
            },
            locations_cashdesks: {
                id: "withdraw.cashdesks_location",
                defaultMessage: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u043a\u0430\u0441\u0441"
            },
            locations_cashdesks_hide: {
                id: "withdraw.cashdesks_location_hide",
                defaultMessage: "\u0421\u043a\u0440\u044b\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u043a\u0430\u0441\u0441"
            },
            deposit_opex_comission: {
                id: "deposit.opex.comission",
                defaultMessage: "\u041a\u043e\u043c\u0438\u0441\u0441\u0438\u044f \u2014 0"
            },
            deposit_opex_question: {
                id: "deposit.opex.question",
                defaultMessage: "\u0413\u0434\u0435 \u043a\u0443\u043f\u0438\u0442\u044c \u0447\u0435\u043a \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex?"
            },
            deposit_opex_success: {
                id: "deposit.opex.success",
                defaultMessage: "\u0411\u0430\u043b\u0430\u043d\u0441 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d!"
            },
            deposit_opex_start: {
                id: "deposit.opex.start",
                defaultMessage: "\u041d\u0430\u0447\u0430\u0442\u044c \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u044e"
            },
            deposit_opex_check: {
                id: "deposit.opex.check",
                defaultMessage: "\u041d\u043e\u043c\u0435\u0440 \u0447\u0435\u043a\u0430"
            },
            deposit_opex_placeholder: {
                id: "deposit.opex.placeholder",
                defaultMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0447\u0435\u043a\u0430"
            },
            deposit_opex_amount: {
                id: "deposit.opex.amount",
                defaultMessage: "\u0421\u0443\u043c\u043c\u0430"
            },
            deposit_opex_continue: {
                id: "deposit.opex.continue",
                defaultMessage: "\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c"
            },
            deposit_opex_replenish: {
                id: "deposit.opex.replenish",
                defaultMessage: "\u041f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c"
            },
            deposit_opex_course: {
                id: "deposit.opex.course",
                defaultMessage: "\u041e\u0431\u043c\u0435\u043d\u043d\u044b\u0439 \u043a\u0443\u0440\u0441"
            },
            deposit_opex_pin_invalid: {
                id: "deposit.opex.pin_invalid",
                defaultMessage: "\u0427\u0435\u043a \u043d\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439"
            },
            deposit_opex_pin_error: {
                id: "deposit.opex.pin_error",
                defaultMessage: "\u0427\u0435\u043a \u043d\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439, \u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043f\u044b\u0442\u043e\u043a:"
            },
            deposit_opex_atempts_error: {
                id: "deposit.opex.atempts_error",
                defaultMessage: "\u041f\u043e\u043f\u044b\u0442\u043a\u0438 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d\u044b, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430 \u0447\u0435\u0440\u0435\u0437"
            },
            deposit_opex_desc: {
                id: "deposit.opex.desc",
                defaultMessage: "\u041f\u0440\u0438\u043e\u0431\u0440\u0435\u0441\u0442\u0438 \u0447\u0435\u043a\u0438 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex \u0431\u0435\u0437 \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u0438 \u043c\u043e\u0436\u043d\u043e \u0437\u0430 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0435 \u0434\u0432\u0443\u043c\u044f \u0441\u043f\u043e\u0441\u043e\u0431\u0430\u043c\u0438:"
            },
            deposit_opex_text_3: {
                id: "deposit.opex.text_3",
                defaultMessage: "<b>2. \u0412 \u043f\u043b\u0430\u0442\u0435\u0436\u043d\u044b\u0445 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430\u0445 \xabUnipay\xbb</b> <br/><br/><b>\u041f\u043e\u043a\u0443\u043f\u043a\u0430 Opex</b><br/><br/>\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430 "
            },
            deposit_opex_text_3_2: {
                id: "deposit.opex.text_3_2",
                defaultMessage: ", \u0437\u0430\u0442\u0435\u043c \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \xabOPX\xbb, \xab\u041f\u043e\u043a\u0443\u043f\u043a\u0430\xbb. \u0414\u0430\u043b\u0435\u0435 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0441\u043b\u0430\u043d\u043e \u0421\u041c\u0421 \u0441 \u0447\u0435\u043a\u043e\u043c \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex. \u0417\u0430\u0442\u0435\u043c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 (\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0442\u043e\u043b\u044c\u043a\u043e \u0435\u0434\u0438\u043d\u043e\u0436\u0434\u044b). \u041f\u043e\u0441\u043b\u0435 \u0432\u043d\u0435\u0441\u0438\u0442\u0435 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0435 \u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \xab\u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c\xbb.<br/><br/><br/><br/>\u041e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0432\u0430\u043d\u0438\u0435 Opex<br/><br/>\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u044f\u0432\u043a\u0443 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u043d\u0430 \u0441\u0430\u0439\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435 \xab\u0412\u044b\u0432\u0435\u0441\u0442\u0438\xbb. \u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0441\u043b\u0430\u043d\u043e \u0421\u041c\u0421 \u0441 \u0447\u0435\u043a\u043e\u043c Opex. \u0414\u0430\u043b\u0435\u0435 \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430 \xabUnipay\xbb "
            },
            after_recharge_click_button: {
                id: "after_recharge_click_button",
                defaultMessage: "\u041f\u043e\u0441\u043b\u0435 \u043e\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043b\u0435\u043d\u0438\u044f \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u0430 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443"
            },
            "-100": {
                id: "-100",
                defaultMessage: "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"
            },
            "-101": {
                id: "-101",
                defaultMessage: "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"
            },
            "-2": {
                id: "-2",
                defaultMessage: "\u0417\u0430\u043f\u0440\u043e\u0441 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d"
            },
            pending: {
                id: "deposit.ethereum.pending",
                defaultMessage: "\u0412\u0430\u0448 \u043f\u043b\u0430\u0442\u0435\u0436 \u0435\u0449\u0435 \u043d\u0435 \u043f\u043e\u0441\u0442\u0443\u043f\u0438\u043b. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435."
            },
            success: {
                id: "deposit.ethereum.success",
                defaultMessage: "\u0412\u0430\u0448 \u043f\u043b\u0430\u0442\u0435\u0436 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u043e\u0441\u0442\u0443\u043f\u0438\u043b \u043d\u0430 \u0443\u043a\u0430\u0437\u0430\u043d\u043d\u044b\u0439 \u043a\u0440\u0438\u043f\u0442\u043e-\u043a\u043e\u0448\u0435\u043b\u0435\u043a. \u0415\u0441\u043b\u0438 \u0434\u0435\u043d\u0435\u0436\u043d\u044b\u0435 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u043d\u0435 \u0431\u044b\u043b\u0438 \u043d\u0430\u0447\u0438\u0441\u043b\u0435\u043d\u044b \u043d\u0430 \u0432\u0430\u0448 \u0431\u0430\u043b\u0430\u043d\u0441 \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0432 \u0442\u0435\u0445 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0443"
            },
            expired: {
                id: "deposit.ethereum.expired",
                defaultMessage: "\u0412\u0430\u0448 \u0437\u0430\u043f\u0440\u043e\u0441 \u0431\u044b\u043b \u043f\u0440\u043e\u0441\u0440\u043e\u0447\u0435\u043d"
            },
            declined: {
                id: "deposit.ethereum.declined",
                defaultMessage: "\u0412\u0430\u0448 \u0437\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u043e\u0442\u043a\u043b\u043e\u043d\u0451\u043d, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0432 \u0442\u0435\u0445 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0443"
            }
        }),
        N = 1,
        j = 2,
        D = 3,
        R = 4,
        I = [{
            name: "TRC20",
            icon: _.a,
            value: 4
        }, {
            name: "ERC20",
            icon: x.a,
            value: 1
        }, {
            name: "BEP20",
            icon: k.a,
            value: 3
        }],
        L = function(e) {
            function t() {
                var e, n, i, s, l;
                o(this, t);
                for (var u = arguments.length, p = Array(u), h = 0; h < u; h++)
                    p[h] = arguments[h];
                return i = s = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(p))),
                    s.state = {
                        activeNetwork: "ERC20",
                        timer: "00:00"
                    },
                    s.recharge = (n = {},
                        r(n, N, s.props.intl.formatMessage(P.pending)),
                        r(n, j, s.props.intl.formatMessage(P.success)),
                        r(n, D, s.props.intl.formatMessage(P.expired)),
                        r(n, R, s.props.intl.formatMessage(P.declined)),
                        n),
                    s.interval = null,
                    s.copyToClipboard = function() {
                        var e = document.createElement("textarea");
                        e.value = s.props.networkAddress && s.props.networkAddress.address,
                            document.body.appendChild(e),
                            e.select(),
                            document.execCommand("copy"),
                            document.body.removeChild(e)
                    },
                    s.fetchNetwork = function() {
                        Boolean(s.props.user && s.props.user.accountNumber) && s.props.fetchNetworkAddress({
                            AccountNumber: s.props.user && s.props.user.accountNumber,
                            Chain: I.find(function(e) {
                                return e.name === s.state.activeNetwork
                            }).value,
                            Currency: 7
                        })
                    },
                    s.startTimer = function() {
                        var e = s.props.networkAddress && new Date(s.props.networkAddress.expirationDate).getTime() - (new Date).getTime();
                        if (e < 0)
                            return void s.setState({
                                timer: "00:00"
                            });
                        var t = Math.floor(e / 1e3 / 60 << 0),
                            n = Math.floor(e / 1e3 % 60);
                        s.setState({
                            timer: (t < 10 ? "0" + t : t) + ":" + (n < 10 ? "0" + n : n)
                        })
                    },
                    s.handleCheckRechargeStatus = function() {
                        var e = Boolean(s.props.user.accountNumber),
                            t = s.props.networkAddress && s.props.networkAddress.requestId && s.props.networkAddress.requestId;
                        e && t && s.props.checkRechargeStatus(t)
                    },
                    s.handleChangeNetwork = function(e) {
                        s.setState({
                            activeNetwork: e.name
                        })
                    },
                    s.renderCancelButton = function() {
                        return c.a.createElement(d.a, {
                            to: "/payments",
                            className: "cancel",
                            style: {
                                marginTop: 10
                            }
                        }, "\u041e\u0442\u043c\u0435\u043d\u0430")
                    },
                    s.renderCloseButton = function() {
                        return c.a.createElement(d.a, {
                            to: "/payments",
                            className: "cancel",
                            style: {
                                marginTop: 10
                            }
                        }, "\u0417\u0430\u043a\u0440\u044b\u0442\u044c")
                    },
                    s.renderPayment\ u0421ompletedButton = function() {
                        return c.a.createElement("button", {
                            className: "submit",
                            style: {
                                marginTop: 10
                            },
                            onClick: s.handleCheckRechargeStatus
                        }, "\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u0441\u043e\u0432\u0435\u0440\u0448\u0435\u043d")
                    },
                    s.renderRechargeStatus = function() {
                        switch (s.props.rechargeStatus) {
                            case N:
                            case j:
                            case D:
                            case R:
                                return c.a.createElement(f.b, P.deposit_opex_success);
                            default:
                                return null
                        }
                    },
                    l = i,
                    a(s, l)
            }
            return i(t, e),
                A(t, [{
                    key: "componentDidMount",
                    value: function() {
                        this.fetchNetwork()
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        clearInterval(this.interval)
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function(e, t) {
                        var n = this;
                        this.props.user && this.props.user.accountNumber !== e.user.accountNumber && this.fetchNetwork(),
                            this.state.activeNetwork !== t.activeNetwork && this.fetchNetwork(),
                            "00:01" === t.timer && "00:00" === this.state.timer && setTimeout(function() {
                                n.props.history.push("/payments")
                            }, 1e3),
                            e.networkFetching && !this.props.networkFetching && (this.interval = setInterval(this.startTimer, 1e3))
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.props,
                            t = e.rechargeCreated,
                            n = e.accountNumber,
                            r = e.intl,
                            o = this.props.networkAddress && this.props.networkAddress.minTopupAmount,
                            a = this.props.networkAddress && this.props.networkAddress.rate,
                            i = this.props.networkAddress && this.props.networkAddress.address,
                            s = this.props.rechargeStatus;
                        return n ? c.a.createElement("div", {
                            className: "deposit opex_deposit"
                        }, this.props.networkFetching && c.a.createElement(M.a, null), this.props.rechargeFetching && c.a.createElement(M.a, null), c.a.createElement("div", {
                            className: "payment_method"
                        }, c.a.createElement("div", {
                            className: "payment_method-header"
                        }, c.a.createElement("div", {
                            className: "payment_method-header-left"
                        }, c.a.createElement("img", {
                            style: {
                                width: 50,
                                marginRight: 20
                            },
                            src: x.a,
                            alt: ""
                        }), c.a.createElement("div", {
                            className: "payment_method-header-description"
                        }, c.a.createElement("span", {
                            className: "payment_method-header-description-name"
                        }, "\u041e\u043f\u043b\u0430\u0442\u0430 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u043e\u0439 Ethereum"), c.a.createElement("span", {
                            className: "payment_method-header-description-amount",
                            style: {
                                marginTop: 6
                            }
                        }, "\u041e\u0431\u043c\u0435\u043d\u043d\u044b\u0439 \u043a\u0443\u0440\u0441: 1 ETH = ", a || 0, " OPX"), c.a.createElement("span", {
                            className: "payment_method-header-description-amount-min"
                        }, "\u0421\u0443\u043c\u043c\u0430 \u043e\u0442 ", o || 0, " ETH")))), t ? c.a.createElement("div", null, c.a.createElement("h2", null, c.a.createElement(f.b, P.deposit_opex_success)), c.a.createElement(d.a, {
                            to: "/traderoom"
                        }, c.a.createElement("button", {
                            className: "common-form__submit"
                        }, c.a.createElement(f.b, P.deposit_opex_start)))) : c.a.createElement(c.a.Fragment, null, c.a.createElement("div", {
                            className: "payment_method-content"
                        }, c.a.createElement("div", {
                            className: "payment_method-content-text"
                        }, c.a.createElement("div", {
                            className: "payment_method-content-networks"
                        }, c.a.createElement("div", {
                            className: "payment_method-container"
                        }, this.props.networkAddress && c.a.createElement("p", {
                            className: "payment_method-text"
                        }, "\u041f\u0435\u0440\u0435\u0432\u0435\u0434\u0435\u0442\u0435 \u0436\u0435\u043b\u0430\u0435\u043c\u0443\u044e \u0441\u0443\u043c\u043c\u0443 \u043d\u0430 \u043a\u043e\u0448\u0435\u043b\u0435\u043a"), c.a.createElement("div", {
                            className: "payment_method-container-wallet"
                        }, c.a.createElement("b", {
                            className: "payment_method-text-bold"
                        }, i), this.props.networkAddress && c.a.createElement("button", {
                            className: "payment_method-container-wallet-copy",
                            onClick: this.copyToClipboard
                        }, c.a.createElement("img", {
                            src: O.a,
                            alt: ""
                        }))), this.props.networkError ? c.a.createElement("p", {
                            className: "payment_method-text box error"
                        }, r.formatMessage(P[this.props.networkError])) : null, this.props.networkAddress && c.a.createElement("div", null, c.a.createElement("div", {
                            className: "payment_method-qrcode"
                        }, this.props.networkFetching ? c.a.createElement("div", {
                            className: "payment_method-qrcode-loader"
                        }) : this.props.networkAddress && c.a.createElement(v.a, {
                            value: i
                        })), c.a.createElement("p", {
                            className: "payment_method-text-small"
                        }, "\u0421\u043a\u043e\u043f\u0438\u0440\u0443\u0439 \u0430\u0434\u0440\u0435\u0441 \u043a\u043e\u0448\u0435\u043b\u044c\u043a\u0430, \u0443\u043a\u0430\u0437\u0430\u043d\u043d\u044b\u0439 \u0432 \u043f\u043e\u043b\u0435 \u0432\u044b\u0448\u0435. \u041f\u043e \u044d\u0442\u043e\u043c\u0443 \u0430\u0434\u0440\u0435\u0441\u0443 \u043c\u044b \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u043c, \u0447\u0442\u043e \u044d\u0442\u043e \u0432\u0430\u0448 \u043f\u043b\u0430\u0442\u0451\u0436 \u0438 \u0437\u0430\u0447\u0438\u0441\u043b\u0438\u043c \u0435\u0433\u043e \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438."), c.a.createElement("br", null), s && 1 !== s ? null : this.state.timer + " - \u041c\u044b \u043e\u0436\u0438\u0434\u0430\u0435\u043c \u0432\u0430\u0448 \u043f\u043b\u0430\u0442\u0435\u0436", c.a.createElement("p", {
                            className: h()("payment_method-text", {
                                box: !!s,
                                warning: 1 === s,
                                error: s > 2
                            })
                        }, s ? this.recharge[s] : null), !s && c.a.createElement("div", {
                            className: "payment_method-actions"
                        }, this.renderPayment\ u0421ompletedButton(), this.renderCancelButton()), s === N && c.a.createElement("div", {
                            className: "payment_method-actions"
                        }, this.renderPayment\ u0421ompletedButton(), this.renderCancelButton()), s === j && c.a.createElement("div", {
                            className: "payment_method-actions"
                        }, this.renderCloseButton()), s === R && c.a.createElement("div", {
                            className: "payment_method-actions"
                        }, this.renderPayment\ u0421ompletedButton(), this.renderCloseButton()), s === D && c.a.createElement("div", {
                            className: "payment_method-actions"
                        }, this.renderCloseButton()))))))))) : c.a.createElement(T.a, null)
                    }
                }]),
                t
        }(l.Component);
    t.a = Object(u.b)(s, {
        checkRechargeStatus: C.a,
        clearRecharge: C.b,
        fetchNetworkAddress: C.c
    })(g()(f.f, d.d)(L))
}