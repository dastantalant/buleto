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
            start_title: {
                id: "start_title",
                defaultMessage: "\u041d\u0430\u0447\u0430\u0442\u044c \u0442\u043e\u0440\u0433\u043e\u0432\u0430\u0442\u044c"
            },
            dropdown_trade_corridors: {
                id: "dropdown.trade.corridors",
                defaultMessage: "\u041a\u043e\u043c\u0431\u043e"
            },
            dropdown_trade_simplex: {
                id: "dropdown.trade.simplex",
                defaultMessage: "\u0421\u0438\u043c\u043f\u043b\u0435\u043a\u0441"
            },
            dropdown_trade_forex: {
                id: "dropdown.trade.forex",
                defaultMessage: "\u0424\u043e\u0440\u0435\u043a\u0441"
            },
            hit: {
                id: "hit",
                defaultMessage: "\u0445\u0438\u0442"
            }
        }),
        f = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.onClick = function (e) {
                        a.props.getTradologicAction({
                            config: e
                        })
                    },
                    a.componentDidMount = function () {
                        a.props.history.push("/traderoom")
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        return s.a.createElement("div", {
                            className: "auth"
                        }, s.a.createElement("div", {
                            className: "common-form drop-shadow"
                        }, s.a.createElement("div", {
                            className: "common-form-head"
                        }, s.a.createElement("div", null, s.a.createElement(d.b, h.start_title), s.a.createElement("button", {
                            className: "common-form-head-close",
                            onClick: this.props.closeStart
                        }))), s.a.createElement("div", {
                            className: "common-form-body for-start"
                        }, s.a.createElement("div", {
                            className: "trade-menu"
                        }, s.a.createElement("div", {
                            className: "trade-menu__title"
                        }, s.a.createElement(d.b, h.start_title)), s.a.createElement("div", {
                            className: "trade-menu__item trade-menu__item--corridors"
                        }, s.a.createElement("div", null, s.a.createElement("i", {
                            className: "trade-menu__item_icon"
                        }), s.a.createElement(u.b, {
                            to: "/traderoom"
                        }, s.a.createElement(d.b, h.dropdown_trade_corridors), s.a.createElement(d.b, h.hit, function (e) {
                            return s.a.createElement("span", {
                                className: "custom-label",
                                style: {
                                    whiteSpace: "nowrap"
                                }
                            }, e)
                        })))), s.a.createElement("div", {
                            className: "trade-menu__item trade-menu__item--forex"
                        }, s.a.createElement("div", null, s.a.createElement("i", {
                            className: "trade-menu__item_icon"
                        }), s.a.createElement("span", {
                            onClick: this.onClick.bind(this, "forex")
                        }, s.a.createElement(d.b, h.dropdown_trade_forex)))), s.a.createElement("div", {
                            className: "trade-menu__item trade-menu__item--simplex"
                        }, s.a.createElement("div", null, s.a.createElement("i", {
                            className: "trade-menu__item_icon"
                        }), s.a.createElement("span", {
                            onClick: this.onClick.bind(this, "simplex")
                        }, s.a.createElement(d.b, h.dropdown_trade_simplex))))))))
                    }
                }]),
                t
        }(s.a.Component);
    f.propTypes = {
        getTradologicAction: c.a.func.isRequired,
        languageId: c.a.number.isRequired,
        tradologic: c.a.object.isRequired,
        routing: c.a.object.isRequired,
        closeStart: c.a.func.isRequired
    },
        t.a = Object(u.d)(f)
}