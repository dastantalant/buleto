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
        l = n(7),
        c = n(2),
        u = n.n(c),
        d = n(3),
        p = n(674),
        h = n.n(p),
        f = n(257),
        m = n.n(f),
        g = n(258),
        y = n.n(g),
        v = n(675),
        b = n.n(v),
        _ = n(158),
        w = n.n(_),
        x = n(676),
        E = n.n(x),
        k = n(677),
        S = n.n(k),
        O = n(678),
        C = n.n(O),
        T = n(679),
        M = n.n(T),
        A = n(680),
        P = n.n(A),
        N = n(681),
        j = n.n(N),
        D = n(682),
        R = n.n(D),
        I = n(683),
        L = n.n(I),
        B = function () {
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
        F = function (e) {
            function t() {
                return r(this, t),
                    o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, e),
                B(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.openMethod,
                            n = e.intl,
                            r = e.user,
                            o = Boolean(r.accountNumber),
                            a = ["7221517", "9144465"].includes(r.accountNumber),
                            i = s.a.createElement("div", {
                                className: "deposit-services wallets"
                            }, s.a.createElement("h3", null, n.formatMessage({
                                id: "deposit.crypto"
                            })), s.a.createElement("ul", null, o && s.a.createElement("li", {
                                onClick: t.bind(this, "opex")
                            }, s.a.createElement(l.a, {
                                to: "/payments?opex"
                            }, s.a.createElement("img", {
                                src: h.a,
                                alt: ""
                            }))), o && a && s.a.createElement("li", {
                                onClick: t.bind(this, "usdt")
                            }, s.a.createElement(l.a, {
                                to: "/payments?usdt"
                            }, s.a.createElement("img", {
                                src: m.a,
                                alt: ""
                            }), s.a.createElement("p", null, "USDT"))), o && a && s.a.createElement("li", {
                                onClick: t.bind(this, "bitcoin")
                            }, s.a.createElement(l.a, {
                                to: "/payments?bitcoin"
                            }, s.a.createElement("img", {
                                src: y.a,
                                alt: "bitcoin"
                            }), s.a.createElement("p", null, "Bitcoin"))), o && a && s.a.createElement("li", {
                                onClick: t.bind(this, "ethereum")
                            }, s.a.createElement(l.a, {
                                to: "/payments?ethereum"
                            }, s.a.createElement("img", {
                                src: b.a,
                                alt: ""
                            }), s.a.createElement("p", null, "Ethereum"))), !o && s.a.createElement("li", null, s.a.createElement("a", {
                                href: "#"
                            }, s.a.createElement("img", {
                                src: w.a,
                                alt: ""
                            }), s.a.createElement("p", null, "Tron")))));
                        return s.a.createElement("div", {
                            className: "deposit"
                        }, s.a.createElement("h2", null, n.formatMessage({
                            id: "deposit.choose"
                        })), o ? i : null, s.a.createElement("div", {
                            className: "deposit-services wallets"
                        }, s.a.createElement("h3", null, n.formatMessage({
                            id: "deposit.bank_card"
                        })), s.a.createElement("ul", null, s.a.createElement("li", null, s.a.createElement("a", {
                            href: "#"
                        }, s.a.createElement("img", {
                            src: E.a,
                            alt: ""
                        }))), s.a.createElement("li", null, s.a.createElement("a", {
                            href: "#"
                        }, s.a.createElement("img", {
                            src: S.a,
                            alt: ""
                        }))), s.a.createElement("li", null, s.a.createElement("a", {
                            href: "#"
                        }, s.a.createElement("img", {
                            src: C.a,
                            alt: ""
                        }))), s.a.createElement("li", null, s.a.createElement("a", {
                            href: "#"
                        }, s.a.createElement("img", {
                            src: M.a,
                            alt: ""
                        }))))), s.a.createElement("div", {
                            className: "deposit-services terminals"
                        }, s.a.createElement("h3", null, n.formatMessage({
                            id: "deposit.ewallet"
                        })), s.a.createElement("ul", null, s.a.createElement("li", null, s.a.createElement("a", {
                            href: "#"
                        }, s.a.createElement("img", {
                            src: P.a,
                            alt: ""
                        }))), s.a.createElement("li", null, s.a.createElement("a", {
                            href: "#"
                        }, s.a.createElement("img", {
                            src: j.a,
                            alt: ""
                        }))), s.a.createElement("li", null, s.a.createElement("a", {
                            href: "#"
                        }, s.a.createElement("img", {
                            src: R.a,
                            alt: ""
                        }))), s.a.createElement("li", null, s.a.createElement("a", {
                            href: "#"
                        }, s.a.createElement("img", {
                            src: L.a,
                            alt: ""
                        }))))), !o && i, s.a.createElement("p", null, n.formatMessage({
                            id: "deposit.payments_commision_warning"
                        })))
                    }
                }]),
                t
        }(i.Component);
    F.propTypes = {
        openMethod: u.a.func.isRequired,
        intl: u.a.object.isRequired
    },
        t.a = Object(d.f)(F)
}