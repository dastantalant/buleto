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
        l = n(110),
        c = n(40),
        u = n.n(c),
        d = n(272),
        p = n.n(d),
        h = n(273),
        f = n.n(h),
        m = function () {
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
        g = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                m(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props.results,
                            t = e.map(function (e) {
                                return s.a.createElement("div", {
                                    key: e.v,
                                    className: "round"
                                }, 0 === e.c || 37 === e.c ? s.a.createElement("p", null, s.a.createElement("img", {
                                    src: p.a,
                                    alt: ""
                                }), s.a.createElement("img", {
                                    src: f.a,
                                    alt: ""
                                })) : s.a.createElement("p", null, e.c), s.a.createElement("div", null, u()(e.dt).format("HH:mm:ss")), s.a.createElement("span", null, Object(l.b)(e.v, 4)))
                            });
                        return s.a.createElement("div", {
                            className: "rounds__wrapper"
                        }, s.a.createElement("div", {
                            className: "rounds__container"
                        }, t))
                    }
                }]),
                t
        }(i.Component);
    t.a = g
}