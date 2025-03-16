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
        d = n(3),
        p = function () {
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
        h = Object(d.e)({
            landing_cryptocurrency_title: {
                id: "landing.cryptocurrency.title",
                defaultMessage: "\u041a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u0430"
            },
            landing_cryptocurrency_sub_title: {
                id: "landing.cryptocurrency.sub_title",
                defaultMessage: "\u0417\u0430\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0442\u044c \u043d\u0430 \u043a\u0443\u0440\u0441\u0430\u0445 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442 \u2014 \u043b\u0435\u0433\u043a\u043e!"
            },
            landing_cryptocurrency_paragraph_1: {
                id: "landing.cryptocurrency.paragraph_1",
                defaultMessage: "\u041d\u0430 \u043d\u0430\u0448\u0435\u0439 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0435 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u043e 8 \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0445 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u043d\u044b\u0445 \u043f\u0430\u0440."
            },
            landing_cryptocurrency_paragraph_2: {
                id: "landing.cryptocurrency.paragraph_2",
                defaultMessage: "\u041b\u043e\u0432\u0438\u0442\u0435 \u0445\u0430\u0439\u043f\u043e\u0432\u044b\u0435 \u0442\u0440\u0435\u043d\u0434\u044b \u0432\u043c\u0435\u0441\u0442\u0435 \u0441 Buleto."
            },
            landing_cryptocurrency_button: {
                id: "landing.cryptocurrency.button",
                defaultMessage: "\u043d\u0430\u0447\u0430\u0442\u044c \u0442\u043e\u0440\u0433\u043e\u0432\u0430\u0442\u044c"
            }
        }),
        f = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props.hide;
                        return s.a.createElement("div", {
                            className: "cryptocurrency"
                        }, s.a.createElement("div", {
                            className: "overlay"
                        }), s.a.createElement("div", {
                            className: "cryptocurrency-image"
                        }), s.a.createElement("div", {
                            className: "cryptocurrency-content"
                        }, s.a.createElement("h2", null, s.a.createElement(d.b, h.landing_cryptocurrency_title)), s.a.createElement("hr", null), s.a.createElement("p", null, s.a.createElement(d.b, h.landing_cryptocurrency_sub_title), s.a.createElement("br", null), s.a.createElement("br", null), s.a.createElement(d.b, h.landing_cryptocurrency_paragraph_1), s.a.createElement("br", null), s.a.createElement("br", null), s.a.createElement(d.b, h.landing_cryptocurrency_paragraph_2)), s.a.createElement(u.a, {
                            className: "for-mobile",
                            style: e,
                            to: "/login"
                        }, s.a.createElement(d.b, h.landing_cryptocurrency_button))))
                    }
                }]),
                t
        }(i.Component);
    f.propTypes = {
        hide: c.a.object.isRequired
    },
        t.a = f
}