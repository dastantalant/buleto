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
        u = n(108),
        d = n.n(u),
        p = n(7),
        h = n(6),
        f = n(15),
        m = n(161),
        g = n(3),
        y = n(163),
        v = n.n(y),
        b = n(164),
        _ = n.n(b),
        w = n(165),
        x = n.n(w),
        E = n(166),
        k = n.n(E),
        S = n(38),
        O = function () {
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
        C = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.changeLocale = function (e, t) {
                        t.preventDefault(),
                            a.props.changeLocaleAction(e)
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                O(t, [{
                    key: "render",
                    value: function () {
                        var e = this.changeLocale.bind(this, S.c),
                            t = this.changeLocale.bind(this, S.a),
                            n = this.changeLocale.bind(this, S.d),
                            r = this.changeLocale.bind(this, S.b);
                        return s.a.createElement("footer", null, s.a.createElement("div", {
                            className: "footer-content"
                        }, s.a.createElement("div", {
                            className: "footer-left"
                        }, s.a.createElement("div", {
                            className: "risks"
                        }, s.a.createElement("h2", null, s.a.createElement(g.b, {
                            id: "footer.menu.info"
                        })), s.a.createElement("hr", null), s.a.createElement("ul", {
                            className: "footer-nav"
                        }, s.a.createElement("li", null, s.a.createElement(p.a, {
                            to: "/about"
                        }, s.a.createElement(g.b, {
                            id: "footer.menu.about"
                        }))), s.a.createElement("li", null, s.a.createElement(p.a, {
                            to: "/contact-us"
                        }, s.a.createElement(g.b, {
                            id: "footer.menu.contacts"
                        }))), s.a.createElement("li", null, s.a.createElement(p.a, {
                            to: "/client-agreement"
                        }, s.a.createElement(g.b, {
                            id: "footer.menu.agreement"
                        }))), s.a.createElement("li", null, s.a.createElement(p.a, {
                            to: "/privacy-policy"
                        }, s.a.createElement(g.b, {
                            id: "footer.menu.confidentiality"
                        }))), s.a.createElement("li", null, s.a.createElement(p.a, {
                            to: "/faq"
                        }, s.a.createElement(g.b, {
                            id: "footer.menu.help"
                        })))))), s.a.createElement("div", {
                            className: "footer-right"
                        }, s.a.createElement("div", {
                            className: "risks"
                        }, s.a.createElement("h2", null, s.a.createElement(g.a, {
                            id: "footer.text_title"
                        })), s.a.createElement("hr", null), s.a.createElement("p", null, s.a.createElement(g.a, {
                            id: "footer.text"
                        })), s.a.createElement("div", {
                            className: "language-switcher"
                        }, this.props.languageId !== S.a && s.a.createElement("div", {
                            className: "language-switcher-item",
                            onClick: t
                        }, s.a.createElement("img", {
                            src: v.a,
                            alt: ""
                        }), s.a.createElement("span", null, "English")), this.props.languageId !== S.d && s.a.createElement("div", {
                            className: "language-switcher-item",
                            onClick: n
                        }, s.a.createElement("img", {
                            src: x.a,
                            alt: ""
                        }), s.a.createElement("span", null, "\u4e2d\u6587")), this.props.languageId !== S.c && s.a.createElement("div", {
                            className: "language-switcher-item",
                            onClick: e
                        }, s.a.createElement("img", {
                            src: _.a,
                            alt: ""
                        }), s.a.createElement("span", null, "\u0420\u0443\u0441\u0441\u043a\u0438\u0439")), this.props.languageId !== S.b && s.a.createElement("div", {
                            className: "language-switcher-item",
                            onClick: r
                        }, s.a.createElement("img", {
                            src: k.a,
                            alt: ""
                        }), s.a.createElement("span", null, "\u041a\u044b\u0440\u0433\u044b\u0437\u0447\u0430")))))), s.a.createElement("div", {
                            className: "footer-content-2"
                        }, s.a.createElement("p", {
                            className: "copyright"
                        }, s.a.createElement(g.b, Object.assign({
                            id: "footer.copyright"
                        }, {
                            values: {
                                year: (new Date).getFullYear()
                            }
                        })))))
                    }
                }]),
                t
        }(i.Component);
    C.propTypes = {
        changeLocaleAction: c.a.func.isRequired,
        country: c.a.any
    };
    var T = function (e) {
        return {
            languageId: e.application.get("languageId"),
            country: e.application.get("country")
        }
    },
        M = function (e) {
            return Object(f.bindActionCreators)({
                changeLocaleAction: m.a
            }, e)
        };
    t.a = d()(p.d, Object(h.b)(T, M))(C)
}