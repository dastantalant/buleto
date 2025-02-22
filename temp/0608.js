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
            landing_cover_title: {
                id: "landing.cover.title",
                defaultMessage: "\u0418\u043d\u0432\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043d\u0430 \u043c\u0438\u0440\u043e\u0432\u044b\u0445 \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0445 \u0440\u044b\u043d\u043a\u0430\u0445 \u0441\u0442\u0430\u043b\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u043a\u0430\u043a \u043d\u0438\u043a\u043e\u0433\u0434\u0430"
            },
            landing_cover_text: {
                id: "landing.cover.text",
                defaultMessage: "\u0421\u043e\u0432\u0435\u0440\u0448\u0435\u043d\u0441\u0442\u0432\u0443\u0439\u0442\u0435 \u043d\u0430\u0432\u044b\u043a\u0438 \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u0438 \u0441 Buleto \u2014 \u0432\u0435\u0434\u0443\u0449\u0438\u043c \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u043c \u0431\u0440\u043e\u043a\u0435\u0440\u043e\u043c"
            },
            landing_cover_button: {
                id: "landing.cover.button",
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
                            className: "cover"
                        }, s.a.createElement("h1", null, s.a.createElement(d.b, h.landing_cover_title)), s.a.createElement("hr", null), s.a.createElement("p", null, s.a.createElement(d.b, h.landing_cover_text)), s.a.createElement(d.b, h.landing_cover_button, function(t) {
                            return s.a.createElement(u.a, {
                                className: "for-mobile",
                                style: e,
                                to: "/registration"
                            }, t)
                        }))
                    }
                }]),
                t
        }(i.Component);
    f.propTypes = {
            hide: c.a.object.isRequired
        },
        t.a = f
}