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
        d = n(7),
        p = n(6),
        h = n(163),
        f = n.n(h),
        m = n(164),
        g = n.n(m),
        y = n(165),
        v = n.n(y),
        b = n(166),
        _ = n.n(b),
        w = n(737),
        x = n(3),
        E = n(38),
        k = function () {
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
        S = Object(x.e)({
            header_side_menu_home: {
                id: "header.side_menu.home",
                defaultMessage: "\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"
            },
            header_side_menu_trade: {
                id: "header.side_menu.trade",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u043b\u044f"
            },
            header_side_menu_corridors: {
                id: "header.side_menu.corridors",
                defaultMessage: "\u041a\u043e\u043c\u0431\u043e"
            },
            header_side_menu_binary: {
                id: "header.side_menu.binary",
                defaultMessage: "\u0412\u0438\u0434\u044b \u043e\u043f\u0446\u0438\u043e\u043d\u043e\u0432"
            },
            header_side_menu_about_company: {
                id: "header.side_menu.about_company",
                defaultMessage: "\u041e \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438"
            },
            header_side_menu_about_us: {
                id: "header.side_menu.about_us",
                defaultMessage: "\u041e \u043d\u0430\u0441"
            },
            header_side_menu_news: {
                id: "header.side_menu.news",
                defaultMessage: "\u041d\u043e\u0432\u043e\u0441\u0442\u0438"
            },
            header_side_menu_clubs: {
                id: "header.side_menu.clubs",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0435 \u0437\u0430\u043b\u044b"
            },
            header_side_menu_partners_program: {
                id: "header.side_menu.partners_program",
                defaultMessage: "\u041f\u0430\u0440\u0442\u043d\u0435\u0440\u0441\u043a\u0430\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430"
            },
            header_side_menu_contacts: {
                id: "header.side_menu.contacts",
                defaultMessage: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b"
            },
            header_side_menu_for_traders: {
                id: "header.side_menu.for_traders",
                defaultMessage: "\u0422\u0440\u0435\u0439\u0434\u0435\u0440\u0430\u043c"
            },
            header_side_menu_learning: {
                id: "header.side_menu.learning",
                defaultMessage: "\u041e\u0431\u0443\u0447\u0435\u043d\u0438\u0435"
            },
            header_side_menu_assets: {
                id: "header.side_menu.assets",
                defaultMessage: "\u0410\u043a\u0442\u0438\u0432\u044b"
            },
            header_side_menu_historical_quotes: {
                id: "header.side_menu.historical_quotes",
                defaultMessage: "\u0418\u0441\u0442\u043e\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043a\u043e\u0442\u0438\u0440\u043e\u0432\u043a\u0438"
            },
            header_side_menu_economic_calendar: {
                id: "header.side_menu.economic_calendar",
                defaultMessage: "\u042d\u043a\u043e\u043d\u043e\u043c\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u043a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u044c"
            },
            header_side_menu_payment_methods: {
                id: "header.side_menu.payment_methods",
                defaultMessage: "\u0421\u043f\u043e\u0441\u043e\u0431\u044b \u043e\u043f\u043b\u0430\u0442\u044b"
            },
            header_side_menu_help: {
                id: "header.side_menu.help",
                defaultMessage: "\u041f\u043e\u043c\u043e\u0449\u044c"
            },
            header_side_menu_agreement: {
                id: "header.side_menu.agreement",
                defaultMessage: "\u041a\u043b\u0438\u0435\u043d\u0442\u0441\u043a\u043e\u0435 \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435"
            },
            header_side_menu_refund_policy: {
                id: "header.side_menu.refund_policy",
                defaultMessage: "\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u0432\u043e\u0437\u0432\u0440\u0430\u0442\u0430 \u043f\u043b\u0430\u0442\u0435\u0436\u0435\u0439"
            },
            header_side_menu_confidentiality: {
                id: "header.side_menu.confidentiality",
                defaultMessage: "\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438"
            },
            dropdown_trade_simplex: {
                id: "dropdown.trade.simplex",
                defaultMessage: "\u0421\u0438\u043c\u043f\u043b\u0435\u043a\u0441"
            },
            dropdown_trade_forex: {
                id: "dropdown.trade.forex",
                defaultMessage: "\u0424\u043e\u0440\u0435\u043a\u0441"
            }
        }),
        O = function (e) {
            function t() {
                var e, n, i, s;
                o(this, t);
                for (var l = arguments.length, c = Array(l), u = 0; u < l; u++)
                    c[u] = arguments[u];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                    i.state = {
                        salesOpen: !1,
                        companyOpen: !1,
                        traderOpen: !1
                    },
                    i.changeLocale = function (e, t) {
                        t.preventDefault(),
                            i.props.changeLocaleAction(e)
                    },
                    i.toggleSubMenu = function (e) {
                        e.preventDefault(),
                            i.setState(r({}, e.target.id + "Open", !i.state[e.target.id + "Open"]))
                    },
                    i.toggleMenu = function () {
                        i.props.toggleMenu()
                    },
                    i.onClick = function (e) {
                        var t = e.target.name;
                        i.props.getTradologicAction({
                            config: t
                        })
                    },
                    s = n,
                    a(i, s)
            }
            return i(t, e),
                k(t, [{
                    key: "renderButton",
                    value: function (e, t) {
                        return l.a.createElement("li", null, l.a.createElement("button", {
                            onClick: this.onClick,
                            name: e,
                            className: "btn--strip"
                        }, t))
                    }
                }, {
                    key: "renderLink",
                    value: function (e, t) {
                        return l.a.createElement("li", {
                            onClick: this.toggleMenu
                        }, l.a.createElement(d.b, {
                            to: e
                        }, t))
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this,
                            t = this.props,
                            n = t.user,
                            r = t.loseAuthAction,
                            o = this.state,
                            a = o.companyOpen,
                            i = o.traderOpen,
                            c = this.changeLocale.bind(this, E.c),
                            u = this.changeLocale.bind(this, E.a),
                            p = this.changeLocale.bind(this, E.d),
                            h = this.changeLocale.bind(this, E.b);
                        return l.a.createElement(s.Fragment, null, l.a.createElement("div", {
                            className: "side-menu-overlay",
                            key: "side-menu-overlay",
                            onClick: this.props.toggleMenu
                        }), l.a.createElement("div", {
                            className: "side-menu",
                            key: "side-menu"
                        }, l.a.createElement("div", {
                            className: "side-menu-head"
                        }), l.a.createElement("div", {
                            className: "side-menu-body"
                        }, l.a.createElement("div", {
                            className: "side-menu-body-main"
                        }, "/traderoom" === window.location.pathname && l.a.createElement(w.a, {
                            user: n,
                            loseAuthAction: r
                        }), l.a.createElement("div", {
                            className: "side-menu-body-main-top"
                        }, l.a.createElement("ul", {
                            className: "side-menu-nav side-menu-nav-first"
                        }, sessionStorage.getItem("man-token") && l.a.createElement("li", {
                            onClick: this.props.toggleMenu,
                            className: "side-menu-nav-item side-menu-nav-item--logo"
                        }, l.a.createElement(d.b, {
                            to: "/",
                            onClick: this.props.closeStart
                        }, l.a.createElement(x.b, S.header_side_menu_home))), l.a.createElement("li", {
                            onClick: this.props.toggleMenu,
                            className: "side-menu-nav-item"
                        }, l.a.createElement(d.b, {
                            to: "/traderoom"
                        }, l.a.createElement(x.b, S.header_side_menu_trade))), l.a.createElement("li", {
                            className: a ? "side-menu-nav-item sub-menu-toggler active" : "side-menu-nav-item sub-menu-toggler "
                        }, l.a.createElement(x.b, S.header_side_menu_about_company, function (t) {
                            return l.a.createElement(d.b, {
                                to: "/about",
                                id: "company",
                                onClick: e.toggleSubMenu
                            }, t)
                        }), l.a.createElement("ul", {
                            className: "side-menu-nav-item-subnav",
                            id: "company-sub"
                        }, l.a.createElement("li", {
                            onClick: this.props.toggleMenu
                        }, l.a.createElement(d.b, {
                            to: "/about"
                        }, l.a.createElement(x.b, S.header_side_menu_about_us))), l.a.createElement("li", {
                            onClick: this.props.toggleMenu
                        }, l.a.createElement(d.b, {
                            to: "/contact-us"
                        }, l.a.createElement(x.b, S.header_side_menu_contacts))))), l.a.createElement("li", {
                            className: i ? "side-menu-nav-item sub-menu-toggler active" : "side-menu-nav-item sub-menu-toggler "
                        }, l.a.createElement(x.b, S.header_side_menu_for_traders, function (t) {
                            return l.a.createElement(d.b, {
                                to: "#",
                                id: "trader",
                                onClick: e.toggleSubMenu
                            }, t)
                        }), l.a.createElement("ul", {
                            className: "side-menu-nav-item-subnav",
                            id: "trader-sub"
                        }, l.a.createElement("li", {
                            onClick: this.props.toggleMenu
                        }, l.a.createElement(d.b, {
                            to: "/payments"
                        }, l.a.createElement(x.b, S.header_side_menu_payment_methods))), l.a.createElement("li", {
                            onClick: this.props.toggleMenu
                        }, l.a.createElement(d.b, {
                            to: "/faq"
                        }, l.a.createElement(x.b, S.header_side_menu_help)))))), l.a.createElement("hr", null), l.a.createElement("ul", {
                            className: "side-menu-nav"
                        }, l.a.createElement("li", {
                            onClick: this.props.toggleMenu,
                            className: "side-menu-nav-item"
                        }, l.a.createElement(d.b, {
                            to: "/contact-us"
                        }, l.a.createElement(x.b, S.header_side_menu_contacts))), l.a.createElement("li", {
                            onClick: this.props.toggleMenu,
                            className: "side-menu-nav-item"
                        }, l.a.createElement(d.b, {
                            to: "/client-agreement"
                        }, l.a.createElement(x.b, S.header_side_menu_agreement))), l.a.createElement("li", {
                            onClick: this.props.toggleMenu,
                            className: "side-menu-nav-item"
                        }, l.a.createElement(d.b, {
                            to: "/privacy-policy"
                        }, l.a.createElement(x.b, S.header_side_menu_confidentiality))), l.a.createElement("li", {
                            onClick: this.props.toggleMenu,
                            className: "side-menu-nav-item"
                        }, l.a.createElement(d.b, {
                            to: "/faq"
                        }, l.a.createElement(x.b, S.header_side_menu_help))))), l.a.createElement("div", {
                            className: "side-menu-foot"
                        }, l.a.createElement("div", {
                            className: "language-switcher"
                        }, this.props.languageId !== E.a && l.a.createElement("div", {
                            className: "language-switcher-item",
                            onClick: u
                        }, l.a.createElement("img", {
                            src: f.a,
                            alt: ""
                        }), l.a.createElement("span", null, "English")), this.props.languageId !== E.c && l.a.createElement("div", {
                            className: "language-switcher-item",
                            onClick: c
                        }, l.a.createElement("img", {
                            src: g.a,
                            alt: ""
                        }), l.a.createElement("span", null, "\u0420\u0443\u0441\u0441\u043a\u0438\u0439")), this.props.languageId !== E.d && l.a.createElement("div", {
                            className: "language-switcher-item",
                            onClick: p
                        }, l.a.createElement("img", {
                            src: v.a,
                            alt: ""
                        }), l.a.createElement("span", null, "\u4e2d\u6587")), this.props.languageId !== E.b && l.a.createElement("div", {
                            className: "language-switcher-item",
                            onClick: h
                        }, l.a.createElement("img", {
                            src: _.a,
                            alt: ""
                        }), l.a.createElement("span", null, "\u041a\u044b\u0440\u0433\u044b\u0437\u0447\u0430"))))), "/traderoom" === window.location.pathname && l.a.createElement("div", {
                            className: "side-menu-body-secondary"
                        }, l.a.createElement(w.a, {
                            user: n,
                            loseAuthAction: r
                        })))))
                    }
                }]),
                t
        }(s.Component);
    O.propTypes = {
        toggleMenu: u.a.func.isRequired,
        closeStart: u.a.func.isRequired,
        loseAuthAction: u.a.func,
        getTradologicAction: u.a.func,
        user: u.a.object,
        intl: u.a.object.isRequired,
        changeLocaleAction: u.a.func.isRequired,
        country: u.a.any,
        languageId: u.a.number.isRequired
    };
    var C = function (e) {
        return {
            country: e.application.get("country")
        }
    };
    t.a = Object(p.b)(C, null)(Object(x.f)(O))
}