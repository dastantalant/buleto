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
        l = n(7),
        c = n(83),
        u = n.n(c),
        d = n(3),
        p = function() {
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
        h = Object(d.e)({
            header_menu_about_company: {
                id: "header.menu.about.company",
                defaultMessage: "\u041e \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438"
            },
            header_menu_about_us: {
                id: "header.menu.about.us",
                defaultMessage: "\u041e \u043d\u0430\u0441"
            },
            header_menu_about_clubs: {
                id: "header.menu.about.clubs",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0435 \u0437\u0430\u043b\u044b"
            },
            header_menu_about_contacts: {
                id: "header.menu.about.contacts",
                defaultMessage: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b"
            }
        }),
        f = function(e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        selectTradeOpened: !1
                    },
                    a.toggleSelect = function() {
                        a.setState(function(e) {
                            return {
                                selectTradeOpened: !e.selectTradeOpened
                            }
                        })
                    },
                    a.onClickOut = function() {
                        a.setState({
                            selectTradeOpened: !1
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function() {
                        var e = this.state.selectTradeOpened,
                            t = e ? "header-dropdown header-dropdown--about opened" : "header-dropdown header-dropdown--about";
                        return s.a.createElement(u.a, {
                            onClickOut: this.onClickOut
                        }, s.a.createElement("div", {
                            className: t,
                            onClick: this.toggleSelect
                        }, s.a.createElement("div", {
                            className: "header-dropdown__btn header-dropdown__btn--about unauthorized-header-menu__link"
                        }, s.a.createElement(d.b, h.header_menu_about_company)), s.a.createElement("div", {
                            className: "header-dropdown__menu header-dropdown__menu--about"
                        }, s.a.createElement("ul", {
                            className: "dropdown__menu dropdown__menu--about"
                        }, s.a.createElement("li", {
                            className: "dropdown__menu__item"
                        }, s.a.createElement(l.b, {
                            to: "/about",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_menu_about_us))), s.a.createElement("li", {
                            className: "dropdown__menu__item"
                        }, s.a.createElement(l.b, {
                            to: "/contact-us",
                            className: "dropdown__menu__link"
                        }, s.a.createElement(d.b, h.header_menu_about_contacts)))))))
                    }
                }]),
                t
        }(i.Component);
    t.a = f
}