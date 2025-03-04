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
        u = n(6),
        d = n(15),
        p = n(75),
        h = n(652),
        f = n(254),
        m = (n.n(f),
            n(39)),
        g = function () {
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
        y = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                g(t, [{
                    key: "render",
                    value: function () {
                        return s.a.createElement(m.a, {
                            pageName: "auth"
                        }, s.a.createElement("div", {
                            className: "auth"
                        }, s.a.createElement(h.a, {
                            authAction: this.props.authAction,
                            status: this.props.status,
                            fetching: this.props.fetching
                        })))
                    }
                }]),
                t
        }(s.a.Component);
    y.propTypes = {
        authAction: c.a.func.isRequired,
        status: c.a.number.isRequired,
        fetching: c.a.bool.isRequired
    };
    var v = function (e) {
        return {
            status: e.application.get("user").status,
            fetching: e.application.get("user").fetching
        }
    },
        b = function (e) {
            return Object(d.bindActionCreators)({
                authAction: p.a
            }, e)
        };
    t.a = Object(u.b)(v, b)(y)
}