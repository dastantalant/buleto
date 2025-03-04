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
        l = n(7),
        c = n(3),
        u = function () {
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
        d = Object(c.e)({
            error404_title: {
                id: "error404.title",
                defaultMessage: "\u041e\u0428\u0418\u0411\u041a\u0410 404"
            },
            error404_subtitle: {
                id: "error404.subtitle",
                defaultMessage: "\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430"
            },
            error404_text: {
                id: "error404.text",
                defaultMessage: "\u041a \u0441\u043e\u0436\u0430\u043b\u0435\u043d\u0438\u044e, \u0437\u0430\u043f\u0440\u043e\u0448\u0435\u043d\u043d\u0430\u044f \u0412\u0430\u043c\u0438 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430. \u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e, \u043e\u043d\u0430 \u0431\u044b\u043b\u0430 \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0430 \u0438\u043b\u0438 \u0443\u0434\u0430\u043b\u0435\u043d\u0430."
            },
            error404_button: {
                id: "error404.button",
                defaultMessage: "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"
            }
        }),
        p = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                u(t, [{
                    key: "componentDidMount",
                    value: function () {
                        document.getElementById("visitorsHeader") && (document.getElementById("visitorsHeader").className = "header active-bg")
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function () {
                        document.getElementById("visitorsHeader") && (document.getElementById("visitorsHeader").className = "header")
                    }
                }, {
                    key: "render",
                    value: function () {
                        return s.a.createElement("div", {
                            className: "layout-error layout-error--not-found"
                        }, s.a.createElement("div", {
                            className: "layout-error__img"
                        }), s.a.createElement("div", {
                            className: "layout-error__body"
                        }, s.a.createElement("h2", {
                            className: "layout-error__heading"
                        }, s.a.createElement(c.b, d.error404_title)), s.a.createElement("p", {
                            className: "layout-error__heading-description"
                        }, s.a.createElement(c.b, d.error404_subtitle)), s.a.createElement("p", {
                            className: "layout-error__text"
                        }, s.a.createElement(c.b, d.error404_text))), s.a.createElement("div", {
                            className: "layout-error__footer"
                        }, s.a.createElement(l.b, {
                            to: "/",
                            className: "layout-error__btn"
                        }, s.a.createElement(c.b, d.error404_button))))
                    }
                }]),
                t
        }(s.a.Component);
    t.a = p
}