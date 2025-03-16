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
        l = n(648),
        c = n.n(l),
        u = n(649),
        d = n.n(u),
        p = n(3),
        h = function () {
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
        f = Object(p.e)({
            landing_app_title: {
                id: "landing.app.title",
                defaultMessage: "Buleto \u0432\u0441\u0435\u0433\u0434\u0430 \u043f\u043e\u0434 \u0440\u0443\u043a\u043e\u0439!"
            },
            landing_app_paragraph: {
                id: "landing.app.paragraph",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u0430\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430 \u0411\u0443\u043b\u0435\u0442\u043e (Buleto) \u0432\u0441\u0435\u0433\u0434\u0430 \u043f\u043e\u0434 \u0440\u0443\u043a\u043e\u0439 \u043d\u0430 \u0432\u0430\u0448\u0435\u043c \u043b\u044e\u0431\u0438\u043c\u043e\u043c \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u043c \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0435. \u041f\u0440\u043e\u0441\u0442\u043e \u043e\u0442\u043a\u0440\u043e\u0439\u0442\u0435 \u0441\u0430\u0439\u0442 buleto.com \u0438 \u0437\u0430\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0439\u0442\u0435 \u0432 \u043b\u044e\u0431\u043e\u0435 \u0432\u0440\u0435\u043c\u044f \u0438 \u0432 \u043b\u044e\u0431\u043e\u043c \u043c\u0435\u0441\u0442\u0435."
            }
        }),
        m = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                h(t, [{
                    key: "render",
                    value: function () {
                        return s.a.createElement("div", {
                            className: "app"
                        }, s.a.createElement("div", {
                            className: "app-display"
                        }, s.a.createElement("div", {
                            className: "sm"
                        }, s.a.createElement("img", {
                            src: c.a,
                            alt: "",
                            width: 144
                        })), s.a.createElement("div", {
                            className: "md"
                        }, s.a.createElement("img", {
                            src: d.a,
                            alt: "",
                            width: 500
                        }))), s.a.createElement("div", {
                            className: "app-content"
                        }, s.a.createElement("h2", null, s.a.createElement(p.b, f.landing_app_title)), s.a.createElement("p", null, s.a.createElement(p.b, f.landing_app_paragraph))))
                    }
                }]),
                t
        }(i.Component);
    t.a = m
}