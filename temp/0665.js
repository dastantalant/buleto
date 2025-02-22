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
        u = n(6),
        d = n(15),
        p = n(665),
        h = n(75),
        f = n(81),
        m = n(666),
        g = n(39),
        y = function() {
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
        v = function(e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                y(t, [{
                    key: "componentWillUnmount",
                    value: function() {
                        this.props.initRegistrationAction()
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function(e) {
                        e.registration.status !== this.props.registration.status && e.registration.status === f.d && sessionStorage.getItem("man-token") && this.props.reAuthAction()
                    }
                }, {
                    key: "render",
                    value: function() {
                        return s.a.createElement(g.a, {
                            pageName: "registration"
                        }, s.a.createElement("div", {
                            className: "registration"
                        }, s.a.createElement(m.a, {
                            registrationAction: this.props.registrationAction,
                            registration: this.props.registration,
                            close: this.props.close
                        })))
                    }
                }]),
                t
        }(s.a.Component);
    v.propTypes = {
        registrationAction: c.a.func.isRequired,
        initRegistrationAction: c.a.func.isRequired,
        reAuthAction: c.a.func.isRequired,
        registration: c.a.object.isRequired,
        close: c.a.func
    };
    var b = function(e) {
            return {
                registration: e.application.get("registration")
            }
        },
        _ = function(e) {
            return Object(d.bindActionCreators)({
                registrationAction: p.b,
                reAuthAction: h.c,
                initRegistrationAction: p.a
            }, e)
        };
    t.a = Object(u.b)(b, _)(v)
}