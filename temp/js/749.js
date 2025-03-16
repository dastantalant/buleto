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
        u = n(750),
        d = n.n(u),
        p = n(281),
        h = n.n(p),
        f = n(245),
        m = n.n(f),
        g = n(7),
        y = n(162),
        v = n(751),
        b = n(752),
        _ = n(753),
        w = n(282),
        x = n(3),
        E = function () {
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
        k = Object(x.e)({
            header_menu_trading: {
                id: "header.menu.trading",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u043b\u044f"
            },
            header_menu_for_traders: {
                id: "header.menu.for_traders",
                defaultMessage: "\u0422\u0440\u0435\u0439\u0434\u0435\u0440\u0430\u043c"
            }
        }),
        S = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        sideMenuActive: !1
                    },
                    a.toggleMenu = function () {
                        a.setState({
                            sideMenuActive: !a.state.sideMenuActive
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                E(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.user,
                            n = e.loseAuthAction,
                            r = e.getTradologicAction,
                            o = e.changeLocaleAction,
                            a = e.languageId,
                            l = this.state.sideMenuActive,
                            c = void 0;
                        return l && (c = {
                            backgroundColor: "#192531"
                        }),
                            s.a.createElement(i.Fragment, null, s.a.createElement("div", null, l && s.a.createElement(y.a, {
                                toggleMenu: this.toggleMenu,
                                closeStart: this.props.closeStart,
                                user: t,
                                loseAuthAction: n,
                                getTradologicAction: this.props.getTradologicAction,
                                changeLocaleAction: o,
                                languageId: a
                            })), s.a.createElement("header", {
                                className: "header-authorized clearfix",
                                style: {
                                    zIndex: "100"
                                }
                            }, s.a.createElement("div", {
                                className: "header-authorized__block header-authorized__block--menu clearfix",
                                style: c
                            }, s.a.createElement("div", {
                                className: "menu",
                                onClick: this.toggleMenu
                            }, s.a.createElement("div", {
                                className: "hamburger"
                            }, s.a.createElement("img", {
                                src: l ? m.a : h.a,
                                alt: ""
                            })))), s.a.createElement("div", {
                                className: "header-authorized__block"
                            }, s.a.createElement("div", {
                                className: "header-content clearfix"
                            }, s.a.createElement("div", {
                                className: "header-content__box header-content__box--logo"
                            }, s.a.createElement(g.a, {
                                to: "/",
                                className: "app-logo",
                                onClick: this.props.closeStart
                            }, s.a.createElement("img", {
                                src: "/img/buleto-logo.svg",
                                className: "app-logo__img",
                                alt: "logo"
                            })), s.a.createElement(g.a, {
                                to: "/",
                                className: "app-logo app-logo--short",
                                onClick: this.props.closeStart
                            }, s.a.createElement("img", {
                                src: d.a,
                                className: "app-logo__img",
                                alt: "logo"
                            }))), s.a.createElement("div", {
                                className: "header-content__box header-content__box--menu"
                            }, s.a.createElement("nav", {
                                className: "header-menu"
                            }, s.a.createElement("ul", {
                                className: "header-menu__list"
                            }, s.a.createElement("li", {
                                className: "header-menu__item"
                            }, s.a.createElement(g.a, {
                                to: "/",
                                className: "header-menu__link"
                            }, s.a.createElement(x.b, k.header_menu_trading))), s.a.createElement("li", {
                                className: "header-menu__item"
                            }, s.a.createElement(w.a, null)), s.a.createElement("li", {
                                className: "header-menu__item"
                            }, s.a.createElement(g.a, {
                                to: "/",
                                className: "header-menu__link"
                            }, s.a.createElement(x.b, k.header_menu_for_traders)))))), s.a.createElement("div", {
                                className: "header-content__box header-content__box--dropdowns clearfix"
                            }, s.a.createElement(v.a, {
                                getTradologicAction: r
                            }), "/traderoom" !== window.location.pathname && s.a.createElement(b.a, {
                                balance: this.props.balance,
                                trainingBalance: this.props.trainingBalance,
                                tradingBalance: this.props.tradingBalance
                            })))), s.a.createElement("div", {
                                className: "header-authorized__block clearfix"
                            }, s.a.createElement(_.a, {
                                loseAuthAction: this.props.loseAuthAction,
                                user: this.props.user
                            }))))
                    }
                }]),
                t
        }(i.Component);
    S.propTypes = {
        user: c.a.object.isRequired,
        balance: c.a.number.isRequired,
        trainingBalance: c.a.number.isRequired,
        tradingBalance: c.a.number.isRequired,
        loseAuthAction: c.a.func.isRequired,
        getTradologicAction: c.a.func.isRequired,
        changeLocaleAction: c.a.func.isRequired,
        closeStart: c.a.func.isRequired,
        languageId: c.a.number.isRequired
    },
        t.a = S
}