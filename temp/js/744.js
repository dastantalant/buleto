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
        u = n(7),
        d = n(281),
        p = n.n(d),
        h = n(245),
        f = n.n(h),
        m = n(745),
        g = n.n(m),
        y = n(162),
        v = n(746),
        b = n(282),
        _ = n(747),
        w = n(748),
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
            header_sign_in: {
                id: "header.sign_in",
                defineMessage: "\u0432\u0445\u043e\u0434"
            },
            header_registration: {
                id: "header.registration",
                defineMessage: "\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"
            },
            header_Sign_in: {
                id: "header.Sign_in",
                defineMessage: "\u0412\u0445\u043e\u0434"
            },
            header_Registration: {
                id: "header.Registration",
                defineMessage: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"
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
                        activeBg: !1,
                        sideMenuActive: !1,
                        profileDropDownActive: !1
                    },
                    a.handleScroll = function () {
                        var e = document.getElementsByClassName("header")[0].offsetHeight;
                        (document.documentElement.scrollTop || document.body.scrollTop) + e > e ? a.setState({
                            activeBg: !0
                        }) : a.setState({
                            activeBg: !1
                        })
                    },
                    a.toggleMenu = function () {
                        a.setState({
                            sideMenuActive: !a.state.sideMenuActive
                        }),
                            a.state.profileDropDownActive && a.setState({
                                profileDropDownActive: !a.state.profileDropDownActive
                            })
                    },
                    a.toInitialState = function () {
                        "/" !== a.props.location.pathname && a.setState({
                            activeBg: !1,
                            sideMenuActive: !1,
                            profileDropDownActive: !1
                        }),
                            a.props.closeStart()
                    },
                    a.componentWillUnmount = function () {
                        window.removeEventListener("scroll", a.handleScroll)
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                E(t, [{
                    key: "render",
                    value: function () {
                        var e = this.state,
                            t = e.activeBg,
                            n = e.sideMenuActive,
                            r = e.profileDropDownActive;
                        if ("/traderoom" === window.location.pathname)
                            return !1;
                        var o = t ? "header active-bg" : "header",
                            a = n ? "menu active" : "menu",
                            l = r ? "profile-icon active" : "profile-icon";
                        "/" === this.props.location.pathname ? window.addEventListener("scroll", this.handleScroll) : (o = "header active-bg",
                            window.removeEventListener("scroll", this.handleScroll));
                        var c = s.a.createElement("header", {
                            className: o,
                            id: "visitorsHeader"
                        }, s.a.createElement("div", {
                            className: "header-container"
                        }, s.a.createElement("div", {
                            className: a,
                            onClick: this.toggleMenu
                        }, s.a.createElement("div", {
                            className: "hamburger"
                        }, s.a.createElement("img", {
                            src: n ? f.a : p.a,
                            alt: ""
                        }))), s.a.createElement(u.b, {
                            to: "/",
                            className: "header-logo",
                            onClick: this.toInitialState
                        }, s.a.createElement("img", {
                            src: "/img/buleto-logo.svg",
                            alt: ""
                        })), s.a.createElement("nav", {
                            className: "unauthorized-header-menu"
                        }, s.a.createElement("ul", {
                            className: "unauthorized-header-menu__list"
                        }, s.a.createElement("li", {
                            className: "unauthorized-header-menu__item"
                        }, s.a.createElement(w.a, null)), s.a.createElement("li", {
                            className: "unauthorized-header-menu__item"
                        }, s.a.createElement(b.a, null)), s.a.createElement("li", {
                            className: "unauthorized-header-menu__item"
                        }, s.a.createElement(_.a, null)))), s.a.createElement("div", {
                            className: "profile"
                        }, s.a.createElement("div", {
                            className: "profile-links"
                        }, s.a.createElement(u.b, {
                            to: "/login"
                        }, s.a.createElement(x.a, k.header_sign_in)), s.a.createElement(u.b, {
                            to: "/registration"
                        }, s.a.createElement(x.a, k.header_registration)), s.a.createElement(v.a, {
                            changeLocaleAction: this.props.changeLocaleAction,
                            languageId: this.props.languageId
                        })), s.a.createElement("div", {
                            className: l
                        }, s.a.createElement(u.b, {
                            to: "/login"
                        }, s.a.createElement("img", {
                            src: g.a,
                            alt: ""
                        })))))),
                            d = s.a.createElement("header", {
                                className: o + " login-mobile",
                                key: "head"
                            }, s.a.createElement("div", {
                                className: "header-container"
                            }, s.a.createElement("div", {
                                className: "authMenu"
                            }, s.a.createElement(u.b, {
                                className: "/login" === this.props.location.pathname ? "active" : "",
                                to: "/login"
                            }, s.a.createElement(x.a, k.header_Sign_in)), s.a.createElement(u.b, {
                                className: "/registration" === this.props.location.pathname ? "active" : "",
                                to: "/registration"
                            }, s.a.createElement(x.a, k.header_Registration))), s.a.createElement(u.b, {
                                to: "/",
                                className: "authClose"
                            }, s.a.createElement("img", {
                                src: f.a,
                                alt: ""
                            })))),
                            h = "/login" === this.props.location.pathname || "/registration" === this.props.location.pathname || "/forgot-password" === this.props.location.pathname;
                        return s.a.createElement(i.Fragment, null, c, n && s.a.createElement(y.a, {
                            toggleMenu: this.toggleMenu,
                            changeLocaleAction: this.props.changeLocaleAction,
                            languageId: this.props.languageId
                        }), n && s.a.createElement("div", {
                            className: "headerBg"
                        }), r && s.a.createElement("div", {
                            className: "headerBg"
                        }), h && d)
                    }
                }]),
                t
        }(i.Component);
    S.propTypes = {
        changeLocaleAction: c.a.func.isRequired,
        closeStart: c.a.func.isRequired,
        languageId: c.a.number.isRequired
    },
        t.a = Object(u.d)(S)
}