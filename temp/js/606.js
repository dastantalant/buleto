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
        u = n(607),
        d = n(618),
        p = n(619),
        h = n(644),
        f = n(645),
        m = n(646),
        g = n(647),
        y = n(650),
        v = function () {
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
        b = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                v(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props.user,
                            t = void 0 !== e.name ? {
                                visibility: "hidden"
                            } : {};
                        return s.a.createElement("div", null, s.a.createElement(u.a, {
                            hide: t
                        }), s.a.createElement(d.a, null), s.a.createElement(p.a, null), s.a.createElement(h.a, {
                            hide: t
                        }), s.a.createElement(f.a, {
                            hide: t
                        }), s.a.createElement(m.a, {
                            hide: t
                        }), s.a.createElement(g.a, null), s.a.createElement(y.a, null))
                    }
                }]),
                t
        }(i.Component);
    b.propTypes = {
        user: c.a.object.isRequired
    },
        t.a = b
}