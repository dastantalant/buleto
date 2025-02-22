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
        p = n(660),
        h = n(661),
        f = n(254),
        m = (n.n(f),
            n(39)),
        g = function() {
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
        y = function(e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                g(t, [{
                    key: "componentWillUnmount",
                    value: function() {
                        this.props.initRecoveryAction()
                    }
                }, {
                    key: "render",
                    value: function() {
                        return s.a.createElement(m.a, {
                            pageName: "forgot-password"
                        }, s.a.createElement("div", {
                            className: "auth"
                        }, s.a.createElement(h.a, {
                            recovery: this.props.recovery,
                            recoverSubmit: this.props.recoveryByEmailAction,
                            recoverByAccountSubmit: this.props.recoveryByAccountNumberAction,
                            fetching: this.props.fetching
                        })))
                    }
                }]),
                t
        }(s.a.Component);
    y.propTypes = {
        recoveryByEmailAction: c.a.func.isRequired,
        recoveryByAccountNumberAction: c.a.func.isRequired,
        initRecoveryAction: c.a.func.isRequired,
        recovery: c.a.object.isRequired,
        status: c.a.number.isRequired,
        fetching: c.a.bool.isRequired
    };
    var v = function(e) {
            return {
                status: e.application.get("user").status,
                fetching: e.application.get("user").fetching,
                recovery: e.application.get("recovery")
            }
        },
        b = function(e) {
            return Object(d.bindActionCreators)({
                recoveryByEmailAction: p.c,
                recoveryByAccountNumberAction: p.b,
                initRecoveryAction: p.a
            }, e)
        };
    t.a = Object(u.b)(v, b)(y)
}