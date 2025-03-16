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
            landing_features_som: {
                id: "landing.features.som",
                defaultMessage: "\u0423.E."
            },
            landing_features_min_investment: {
                id: "landing.features.min_investment",
                defaultMessage: "\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u044f"
            },
            landing_features_seconds: {
                id: "landing.features.seconds",
                defaultMessage: "\u0441\u0435\u043a\u0443\u043d\u0434"
            },
            landing_features_fast_bets: {
                id: "landing.features.fast_bets",
                defaultMessage: "\u0411\u044b\u0441\u0442\u0440\u044b\u0435 \u0441\u0434\u0435\u043b\u043a\u0438"
            },
            landing_features_income: {
                id: "landing.features.income",
                defaultMessage: "\u0414\u043e\u0445\u043e\u0434"
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
                            className: "features"
                        }, s.a.createElement("div", {
                            className: "features-list"
                        }, s.a.createElement("div", {
                            className: "features-item"
                        }, s.a.createElement("div", {
                            className: "features-item-content"
                        }, s.a.createElement("div", {
                            className: "features-item-content-inner"
                        }, s.a.createElement("span", {
                            className: "features-item-number"
                        }, "10"), s.a.createElement("span", {
                            className: "features-item-unit"
                        }, s.a.createElement(l.b, u.landing_features_som)), s.a.createElement("p", {
                            className: "features-item-text"
                        }, s.a.createElement(l.b, u.landing_features_min_investment))))), s.a.createElement("div", {
                            className: "vl"
                        }), s.a.createElement("div", {
                            className: "features-item"
                        }, s.a.createElement("div", {
                            className: "features-item-content"
                        }, s.a.createElement("div", {
                            className: "features-item-content-inner"
                        }, s.a.createElement("span", {
                            className: "features-item-number"
                        }, "80"), s.a.createElement("span", {
                            className: "features-item-unit"
                        }, s.a.createElement(l.b, u.landing_features_seconds)), s.a.createElement("p", {
                            className: "features-item-text"
                        }, s.a.createElement(l.b, u.landing_features_fast_bets))))), s.a.createElement("div", {
                            className: "vl"
                        }), s.a.createElement("div", {
                            className: "features-item"
                        }, s.a.createElement("div", {
                            className: "features-item-content"
                        }, s.a.createElement("div", {
                            className: "features-item-content-inner"
                        }, s.a.createElement("span", {
                            className: "features-item-number"
                        }, "3600"), s.a.createElement("span", {
                            className: "features-item-unit"
                        }, "%"), s.a.createElement("p", {
                            className: "features-item-text"
                        }, s.a.createElement(l.b, u.landing_features_income)))))))
                    }
                }]),
                t
        }(i.Component);
    t.a = d
}