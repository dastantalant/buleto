 function (e, t, n) {
    "use strict";

    function r(e, t) {
        var n = {};
        for (var r in e)
            t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
        return n
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
        d = n(108),
        p = n.n(d),
        h = n(7),
        f = n(6),
        m = n(15),
        g = n(744),
        y = n(749),
        v = n(754),
        b = n(75),
        _ = n(117),
        w = n(161),
        x = n(21),
        E = (n.n(x),
            n(274)),
        k = n(755),
        S = n(3),
        O = n(38),
        C = n(756),
        T = n(283),
        M = n(279),
        A = function () {
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
        P = function (e) {
            function t() {
                var e, n, r, i;
                o(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = r = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    r.state = {
                        screenOrientation: null,
                        start: !1,
                        isOpenDetailAlert: !1
                    },
                    r.closeStart = function () {
                        r.setState({
                            start: !1
                        })
                    },
                    r.readDeviceOrientation = function () {
                        return window.innerWidth > window.innerHeight ? "landscape" : "portrait"
                    },
                    r.changeDeviceOrientation = function () {
                        return "portrait" === r.state.screenOrientation ? "landscape" : "portrait"
                    },
                    r.setScreenOrientation = function () {
                        var e = r.readDeviceOrientation();
                        r.setState({
                            screenOrientation: e
                        }),
                            window.addEventListener("orientationchange", function () {
                                var e = r.changeDeviceOrientation();
                                r.setState(function (t) {
                                    return Object.assign({}, t, {
                                        screenOrientation: e
                                    })
                                })
                            }, !1)
                    },
                    r.switchDetailAlert = function () {
                        r.setState(function (e) {
                            return Object.assign({}, e, {
                                isOpenDetailAlert: !e.isOpenDetailAlert
                            })
                        })
                    },
                    i = n,
                    a(r, i)
            }
            return i(t, e),
                A(t, [{
                    key: "componentDidMount",
                    value: function () {
                        this.setScreenOrientation(),
                            this.props.getUserCountryAction(),
                            sessionStorage.getItem("man-token") && this.props.getUserProfile()
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function (e) {
                        var t = e.profile.get("info").get("email");
                        if (void 0 !== e.user.accountNumber && "/login" === window.location.pathname && this.props.getTradingBalanceAction(),
                            void 0 === e.user.accountNumber || "/login" !== window.location.pathname && "/registration" !== window.location.pathname || (this.props.history.push("/"),
                                this.setState({
                                    start: !0
                                })),
                            this.props.user.accountNumber !== e.user.accountNumber && void 0 === e.user.accountNumber && null === sessionStorage.getItem("man-token") && (this.props.history.push("/"),
                                this.closeStart()),
                            e.tradologic.get("url") && e.tradologic.get("url") !== this.props.tradologic.get("url")) {
                            var n = this.props.languageId;
                            if (n === O.c)
                                window.location.href = e.tradologic.get("url");
                            else {
                                var r = n === O.a ? "en" : "zh-hans";
                                window.location.href = e.tradologic.get("url").replace("traderoom", r + "/traderoom")
                            }
                        }
                        if (e.user.accountNumber && t && e.pairs) {
                            var o = e.user,
                                a = e.pairs.map(function (e) {
                                    return e.Name
                                }).join(", ");
                            try {
                                window.jivo_api && (window.jivo_api.setContactInfo({
                                    name: o.name + " " + (o.lastName ? "" : o.lastName),
                                    phone: o.phone
                                }),
                                    window.jivo_api.setCustomData([{
                                        content: "\u041b\u0438\u0446\u0435\u0432\u043e\u0439 \u0441\u0447\u0435\u0442: " + o.accountNumber + ", \u041b\u043e\u0433\u0438\u043d: " + t + ", \u0412\u0430\u043b\u044e\u0442\u044b: " + a + ","
                                    }]))
                            } catch (e) {
                                console.error(e)
                            }
                        }
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function (e) {
                        "/" !== this.props.routing.location.pathname && this.props.routing.location.pathname !== e.routing.location.pathname && (window.setTimeout(function () {
                            window.scrollTo(0, 0)
                        }, 1),
                            this.closeStart())
                    }
                }, {
                    key: "componentWillMount",
                    value: function () {
                        sessionStorage.getItem("man-token") && void 0 === this.props.user.accountNumber && this.props.reAuthAction()
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this,
                            t = this.props,
                            n = t.user,
                            o = t.intl,
                            a = t.getTradologicAction,
                            i = t.loseAuthAction,
                            s = t.balance,
                            c = t.trainingBalance,
                            u = t.tradingBalance,
                            d = t.changeLocaleAction,
                            p = t.languageId,
                            f = t.component,
                            m = r(t, ["user", "intl", "getTradologicAction", "loseAuthAction", "balance", "trainingBalance", "tradingBalance", "changeLocaleAction", "languageId", "component"]),
                            b = {
                                user: n,
                                balance: s,
                                trainingBalance: c,
                                tradingBalance: u,
                                loseAuthAction: i,
                                getTradologicAction: a,
                                changeLocaleAction: d,
                                languageId: p,
                                closeStart: this.closeStart
                            },
                            _ = {
                                changeLocaleAction: d,
                                languageId: p,
                                closeStart: this.closeStart
                            },
                            w = null;
                        "/traderoom" === window.location.pathname ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (w = l.a.createElement(y.a, b)) : w = void 0 !== n.accountNumber ? l.a.createElement(y.a, b) : l.a.createElement(g.a, _);
                        var E = this.state.start || "/login" === this.props.location.pathname || "/registration" === this.props.location.pathname || "/forgot-password" === this.props.location.pathname,
                            k = E ? "auth-back" : "",
                            S = !this.state.start && "/login" !== window.location.pathname && "/registration" !== window.location.pathname && "/traderoom" !== window.location.pathname,
                            O = {
                                closeStart: this.closeStart,
                                getTradologicAction: this.props.getTradologicAction,
                                languageId: this.props.languageId,
                                routing: this.props.routing,
                                tradologic: this.props.tradologic
                            };
                        return l.a.createElement(h.c, Object.assign({}, m, {
                            render: function (t) {
                                return l.a.createElement("div", {
                                    className: k
                                }, l.a.createElement(x.Helmet, null, l.a.createElement("title", null, o.formatMessage({
                                    id: "main.title"
                                })), l.a.createElement("meta", {
                                    name: "description",
                                    content: o.formatMessage({
                                        id: "main.description"
                                    })
                                })), w, l.a.createElement("div", null, e.state.start ? l.a.createElement(C.a, O) : l.a.createElement(f, t)), S && l.a.createElement(v.a, null))
                            }
                        }))
                    }
                }]),
                t
        }(l.a.Component);
    P.propTypes = {
        routing: u.a.object.isRequired,
        intl: u.a.object.isRequired,
        getTradologicAction: u.a.func.isRequired,
        getTradingBalanceAction: u.a.func.isRequired,
        reAuthAction: u.a.func.isRequired,
        loseAuthAction: u.a.func.isRequired,
        changeLocaleAction: u.a.func.isRequired,
        getUserCountryAction: u.a.func.isRequired,
        balance: u.a.number.isRequired,
        trainingBalance: u.a.number.isRequired,
        tradingBalance: u.a.number.isRequired,
        languageId: u.a.number.isRequired,
        tradologic: u.a.object.isRequired
    };
    var N = function (e) {
        return {
            user: e.application.get("user"),
            profile: e.application.get("profile"),
            pairs: e.traderoom.get("pairs"),
            balance: e.application.get("balance").balance,
            trainingBalance: e.application.get("balance").trainingBalance,
            tradingBalance: e.application.get("balance").tradingBalance,
            routing: e.routing,
            tradologic: e.application.get("tradologic"),
            languageId: e.application.get("languageId")
        }
    },
        j = function (e) {
            return Object(m.bindActionCreators)({
                reAuthAction: b.c,
                loseAuthAction: b.b,
                getTradologicAction: E.a,
                changeLocaleAction: w.a,
                getTradingBalanceAction: _.b,
                getUserCountryAction: k.a,
                getUserProfile: T.a
            }, e)
        };
    t.a = p()(S.f, M.a, h.d, Object(f.b)(N, j))(P)
}