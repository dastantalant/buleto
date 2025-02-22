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
        l = n(2),
        c = n.n(l),
        u = n(7),
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
            landing_how_to_sell_title: {
                id: "landing.how_to_sell.title",
                defaultMessage: "\u041a\u0430\u043a \u0442\u043e\u0440\u0433\u043e\u0432\u0430\u0442\u044c?"
            },
            landing_how_to_sell_sub_title: {
                id: "landing.how_to_sell.sub_title",
                defaultMessage: "\u041e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u0435 \u043a\u0443\u0434\u0430 \u043f\u043e\u0439\u0434\u0435\u0442 \u0446\u0435\u043d\u0430 \u2014 \u0432\u0432\u0435\u0440\u0445 \u0438\u043b\u0438 \u0432\u043d\u0438\u0437"
            },
            landing_how_to_sell_paragraph_1: {
                id: "landing.how_to_sell.paragraph_1",
                defaultMessage: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u043a\u0442\u0438\u0432 \u0438 \u0441\u0443\u043c\u043c\u0443 \u0438\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438, \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u0435, \u043a\u0443\u0434\u0430 \u043f\u043e\u0439\u0434\u0435\u0442 \u0446\u0435\u043d\u0430 \u0430\u043a\u0442\u0438\u0432\u0430, \u0432\u0432\u0435\u0440\u0445 \u0438\u043b\u0438 \u0432\u043d\u0438\u0437, \u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \xab\u0412\u044b\u0448\u0435\xbb \u0438\u043b\u0438 \xab\u041d\u0438\u0436\u0435\xbb."
            },
            landing_how_to_sell_paragraph_2: {
                id: "landing.how_to_sell.paragraph_2",
                defaultMessage: "\u041f\u0440\u043e\u0441\u0442\u043e \u0441\u0434\u0435\u043b\u0430\u0439\u0442\u0435 \u043f\u0440\u043e\u0433\u043d\u043e\u0437 \u2014 \u0432\u044b\u0440\u0430\u0441\u0442\u0435\u0442 \u0438\u043b\u0438 \u0443\u043f\u0430\u0434\u0435\u0442 \u043a\u0443\u0440\u0441 \u0432\u0430\u043b\u044e\u0442\u043d\u043e\u0439 \u043f\u0430\u0440\u044b, \u043d\u0430\u043f\u0440\u0438\u043c\u0435\u0440, \u0435\u0432\u0440\u043e/\u0434\u043e\u043b\u043b\u0430\u0440 (EUR/USD)."
            },
            landing_how_to_sell_paragraph_3: {
                id: "landing.how_to_sell.paragraph_3",
                defaultMessage: "\u0412\u0435\u0440\u043d\u044b\u0439 \u043f\u0440\u043e\u0433\u043d\u043e\u0437 \u043f\u043e\u0437\u0432\u043e\u043b\u0438\u0442 \u0437\u0430\u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c!"
            },
            landing_how_to_sell_button: {
                id: "landing.how_to_sell.button",
                defaultMessage: "\u043e\u0442\u043a\u0440\u044b\u0442\u044c \u0441\u0447\u0451\u0442"
            }
        }),
        f = function(e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function() {
                        var e = this.props.hide;
                        return s.a.createElement("div", {
                            className: "how_to_sell"
                        }, s.a.createElement("h2", null, s.a.createElement(d.b, h.landing_how_to_sell_title)), s.a.createElement("div", {
                            className: "how_to_sell-inner"
                        }, s.a.createElement("div", {
                            className: "how_to_sell-content"
                        }, s.a.createElement("h3", null, s.a.createElement(d.b, h.landing_how_to_sell_sub_title)), s.a.createElement("p", null, s.a.createElement(d.b, h.landing_how_to_sell_paragraph_1), s.a.createElement("br", null), s.a.createElement("br", null), s.a.createElement(d.b, h.landing_how_to_sell_paragraph_2), s.a.createElement("br", null), s.a.createElement("br", null), s.a.createElement(d.b, h.landing_how_to_sell_paragraph_3)), s.a.createElement(u.a, {
                            className: "for-mobile",
                            style: e,
                            to: "/registration"
                        }, s.a.createElement(d.b, h.landing_how_to_sell_button))), s.a.createElement("div", {
                            className: "how_to_sell-image"
                        })))
                    }
                }]),
                t
        }(i.Component);
    f.propTypes = {
            hide: c.a.object.isRequired
        },
        t.a = f
}