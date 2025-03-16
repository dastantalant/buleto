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
        l = n(3),
        c = function () {
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
        u = Object(l.e)({
            landing_title: {
                id: "landing.title",
                defaultMessage: "\u041d\u0430\u0448\u0438 \u043f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u0430"
            },
            landing_paragraph_1: {
                id: "landing.paragraph_1",
                defaultMessage: "\u041c\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u043f\u0435\u0440\u0435\u0434\u043e\u0432\u044b\u0435 \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438 \u0434\u043b\u044f \u0431\u044b\u0441\u0442\u0440\u043e\u0439 \u0438 \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b. \u041d\u0438\u043a\u0430\u043a\u0438\u0445 \u0437\u0430\u0434\u0435\u0440\u0436\u0435\u043a \u0438 \u0441\u0430\u043c\u044b\u0435 \u0442\u043e\u0447\u043d\u044b\u0435 \u043a\u043e\u0442\u0438\u0440\u043e\u0432\u043a\u0438. \u041d\u0430\u0448\u0430 \u0442\u043e\u0440\u0433\u043e\u0432\u0430\u044f \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430 \u043a\u0440\u0443\u0433\u043b\u043e\u0441\u0443\u0442\u043e\u0447\u043d\u043e. \u0421\u043b\u0443\u0436\u0431\u0430 \u043f\u043e \u0440\u0430\u0431\u043e\u0442\u0435 \u0441 \u043a\u043b\u0438\u0435\u043d\u0442\u0430\u043c\u0438 \u0411\u0443\u043b\u0435\u0442\u043e (Buleto) \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 24x7. \u041c\u044b \u043d\u0435\u043f\u0440\u0435\u0440\u044b\u0432\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0435\u043c \u043d\u043e\u0432\u044b\u0435 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b."
            },
            landing_paragraph_2: {
                id: "landing.paragraph_2",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u0430\u0442\u044c \u043d\u0430 \u043d\u0430\u0448\u0435\u0439 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0435 \u043c\u043e\u0433\u0443\u0442 \u043d\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044b \u0441 \u043f\u0440\u0435\u0432\u043e\u0441\u0445\u043e\u0434\u043d\u043e\u0439 \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u043e\u0439, \u043d\u043e \u0438 \u043d\u043e\u0432\u0438\u0447\u043a\u0438. \u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f Buleto \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u043e\u0435 \u0438 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u043a\u0430\u043a \u0434\u043b\u044f \u043d\u043e\u0432\u0438\u0447\u043a\u043e\u0432, \u0442\u0430\u043a \u0438 \u0434\u043b\u044f \u043f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0445 \u0442\u0440\u0435\u0439\u0434\u0435\u0440\u043e\u0432, \u0432 \u0441\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0445 \u0438 \u043a\u043e\u043c\u0444\u043e\u0440\u0442\u0430\u0431\u0435\u043b\u044c\u043d\u044b\u0445 \u0442\u043e\u0440\u0433\u043e\u0432\u044b\u0445 \u0437\u0430\u043b\u0430\u0445 \u0432 \u0433\u043e\u0440\u043e\u0434\u0435 \u0411\u0438\u0448\u043a\u0435\u043a."
            },
            landing_button: {
                id: "landing.button",
                defaultMessage: "\u0437\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f \u043d\u0430 \u043a\u0443\u0440\u0441\u044b"
            }
        }),
        d = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                c(t, [{
                    key: "render",
                    value: function () {
                        return s.a.createElement("div", {
                            className: "courses"
                        }, s.a.createElement("h2", null, s.a.createElement(l.b, u.landing_title)), s.a.createElement("p", null, s.a.createElement(l.b, u.landing_paragraph_1)))
                    }
                }]),
                t
        }(i.Component);
    t.a = d
}