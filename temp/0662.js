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
        u = n(662),
        d = n(663),
        p = n(3),
        h = function() {
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
        f = 1,
        m = function(e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        currentState: f
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                h(t, [{
                    key: "renderComponent",
                    value: function(e, t) {
                        switch (e) {
                            case 2:
                                return s.a.createElement(d.a, {
                                    description: t.intl.formatMessage({
                                        id: "auth.info_sent",
                                        defaultMessage: "\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430 \u043d\u0430 \u0432\u0430\u0448\u0443 \u043f\u043e\u0447\u0442\u0443"
                                    }),
                                    emailDomain: t.recovery.emailDomain
                                });
                            default:
                                return s.a.createElement(u.a, {
                                    recoverSubmit: t.recoverSubmit,
                                    recoverByAccountSubmit: t.recoverByAccountSubmit,
                                    recovery: t.recovery
                                })
                        }
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.props.recovery,
                            t = this.state.currentState;
                        return 0 === e.status && (t = 2),
                            this.renderComponent(t, this.props)
                    }
                }]),
                t
        }(s.a.Component);
    m.propTypes = {
            recoverSubmit: c.a.func.isRequired,
            recoverByAccountSubmit: c.a.func.isRequired,
            recovery: c.a.object.isRequired,
            fetching: c.a.bool.isRequired
        },
        t.a = Object(p.f)(m)
}