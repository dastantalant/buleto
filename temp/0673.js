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
        u = n(3),
        d = n(21),
        p = (n.n(d),
            n(6)),
        h = n(673),
        f = n(684),
        m = n(685),
        g = n(696),
        y = n(74),
        v = function() {
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
        b = function(e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        depositModalIsOpen: !1
                    },
                    a.openMethod = function(e) {
                        a.props.history.replace({
                            search: e
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                v(t, [{
                    key: "render",
                    value: function() {
                        var e = this.props,
                            t = e.user,
                            n = e.intl,
                            r = e.languageId,
                            o = e.location,
                            a = o.search.replace("?", ""),
                            i = {
                                openMethod: this.openMethod,
                                user: t,
                                languageId: r,
                                methodOpened: a
                            };
                        return s.a.createElement("div", {
                            className: "deposit-wrapper"
                        }, s.a.createElement(d.Helmet, null, s.a.createElement("title", null, n.formatMessage({
                            id: "deposit.title"
                        })), s.a.createElement("meta", {
                            name: "description",
                            content: n.formatMessage({
                                id: "deposit.description"
                            })
                        })), s.a.createElement(y.a, {
                            user: t
                        }), "opex" === a && s.a.createElement(f.a, Object.assign({}, i, {
                            languageId: r
                        })), "usdt" === a && s.a.createElement(m.a, Object.assign({}, i, {
                            languageId: r
                        })), "ethereum" === a && s.a.createElement(g.a, Object.assign({}, i, {
                            languageId: r
                        })), "bitcoin" === a && s.a.createElement(m.a, Object.assign({}, i, {
                            languageId: r
                        })), "" === a && s.a.createElement(h.a, i))
                    }
                }]),
                t
        }(s.a.Component);
    b.propTypes = {
        languageId: c.a.number.isRequired,
        user: c.a.object.isRequired,
        intl: c.a.object.isRequired
    };
    var _ = function(e) {
        return {
            languageId: e.application.get("languageId"),
            user: e.application.get("user")
        }
    };
    t.a = Object(p.b)(_, null)(Object(u.f)(b))
}