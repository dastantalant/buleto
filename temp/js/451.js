 function (e, t, n) {
    "use strict";
    var r, o, a, i, s = n(50),
        l = n(5),
        c = n(34),
        u = n(69),
        d = n(1),
        p = n(9),
        h = n(17),
        f = n(62),
        m = n(63),
        g = n(80),
        y = n(141).set,
        v = n(142)(),
        b = n(143),
        _ = n(220),
        w = n(98),
        x = n(221),
        E = l.TypeError,
        k = l.process,
        S = k && k.versions,
        O = S && S.v8 || "",
        C = l.Promise,
        T = "process" == u(k),
        M = function () { },
        A = o = b.f,
        P = !! function () {
            try {
                var e = C.resolve(1),
                    t = (e.constructor = {})[n(10)("species")] = function (e) {
                        e(M, M)
                    };
                return (T || "function" == typeof PromiseRejectionEvent) && e.then(M) instanceof t && 0 !== O.indexOf("6.6") && -1 === w.indexOf("Chrome/66")
            } catch (e) { }
        }(),
        N = function (e) {
            var t;
            return !(!p(e) || "function" != typeof (t = e.then)) && t
        },
        j = function (e, t) {
            if (!e._n) {
                e._n = !0;
                var n = e._c;
                v(function () {
                    for (var r = e._v, o = 1 == e._s, a = 0; n.length > a;)
                        ! function (t) {
                            var n, a, i, s = o ? t.ok : t.fail,
                                l = t.resolve,
                                c = t.reject,
                                u = t.domain;
                            try {
                                s ? (o || (2 == e._h && I(e),
                                    e._h = 1), !0 === s ? n = r : (u && u.enter(),
                                        n = s(r),
                                        u && (u.exit(),
                                            i = !0)),
                                    n === t.promise ? c(E("Promise-chain cycle")) : (a = N(n)) ? a.call(n, l, c) : l(n)) : c(r)
                            } catch (e) {
                                u && !i && u.exit(),
                                    c(e)
                            }
                        }(n[a++]);
                    e._c = [],
                        e._n = !1,
                        t && !e._h && D(e)
                })
            }
        },
        D = function (e) {
            y.call(l, function () {
                var t, n, r, o = e._v,
                    a = R(e);
                if (a && (t = _(function () {
                    T ? k.emit("unhandledRejection", o, e) : (n = l.onunhandledrejection) ? n({
                        promise: e,
                        reason: o
                    }) : (r = l.console) && r.error && r.error("Unhandled promise rejection", o)
                }),
                    e._h = T || R(e) ? 2 : 1),
                    e._a = void 0,
                    a && t.e)
                    throw t.v
            })
        },
        R = function (e) {
            return 1 !== e._h && 0 === (e._a || e._c).length
        },
        I = function (e) {
            y.call(l, function () {
                var t;
                T ? k.emit("rejectionHandled", e) : (t = l.onrejectionhandled) && t({
                    promise: e,
                    reason: e._v
                })
            })
        },
        L = function (e) {
            var t = this;
            t._d || (t._d = !0,
                t = t._w || t,
                t._v = e,
                t._s = 2,
                t._a || (t._a = t._c.slice()),
                j(t, !0))
        },
        B = function (e) {
            var t, n = this;
            if (!n._d) {
                n._d = !0,
                    n = n._w || n;
                try {
                    if (n === e)
                        throw E("Promise can't be resolved itself");
                    (t = N(e)) ? v(function () {
                        var r = {
                            _w: n,
                            _d: !1
                        };
                        try {
                            t.call(e, c(B, r, 1), c(L, r, 1))
                        } catch (e) {
                            L.call(r, e)
                        }
                    }) : (n._v = e,
                        n._s = 1,
                        j(n, !1))
                } catch (e) {
                    L.call({
                        _w: n,
                        _d: !1
                    }, e)
                }
            }
        };
    P || (C = function (e) {
        f(this, C, "Promise", "_h"),
            h(e),
            r.call(this);
        try {
            e(c(B, this, 1), c(L, this, 1))
        } catch (e) {
            L.call(this, e)
        }
    },
        r = function (e) {
            this._c = [],
                this._a = void 0,
                this._s = 0,
                this._d = !1,
                this._v = void 0,
                this._h = 0,
                this._n = !1
        },
        r.prototype = n(64)(C.prototype, {
            then: function (e, t) {
                var n = A(g(this, C));
                return n.ok = "function" != typeof e || e,
                    n.fail = "function" == typeof t && t,
                    n.domain = T ? k.domain : void 0,
                    this._c.push(n),
                    this._a && this._a.push(n),
                    this._s && j(this, !1),
                    n.promise
            },
            catch: function (e) {
                return this.then(void 0, e)
            }
        }),
        a = function () {
            var e = new r;
            this.promise = e,
                this.resolve = c(B, e, 1),
                this.reject = c(L, e, 1)
        },
        b.f = A = function (e) {
            return e === C || e === i ? new a(e) : o(e)
        }
    ),
        d(d.G + d.W + d.F * !P, {
            Promise: C
        }),
        n(68)(C, "Promise"),
        n(61)("Promise"),
        i = n(33).Promise,
        d(d.S + d.F * !P, "Promise", {
            reject: function (e) {
                var t = A(this);
                return (0,
                    t.reject)(e),
                    t.promise
            }
        }),
        d(d.S + d.F * (s || !P), "Promise", {
            resolve: function (e) {
                return x(s && this === i ? C : this, e)
            }
        }),
        d(d.S + d.F * !(P && n(95)(function (e) {
            C.all(e).catch(M)
        })), "Promise", {
            all: function (e) {
                var t = this,
                    n = A(t),
                    r = n.resolve,
                    o = n.reject,
                    a = _(function () {
                        var n = [],
                            a = 0,
                            i = 1;
                        m(e, !1, function (e) {
                            var s = a++,
                                l = !1;
                            n.push(void 0),
                                i++,
                                t.resolve(e).then(function (e) {
                                    l || (l = !0,
                                        n[s] = e,
                                        --i || r(n))
                                }, o)
                        }),
                            --i || r(n)
                    });
                return a.e && o(a.v),
                    n.promise
            },
            race: function (e) {
                var t = this,
                    n = A(t),
                    r = n.reject,
                    o = _(function () {
                        m(e, !1, function (e) {
                            t.resolve(e).then(n.resolve, r)
                        })
                    });
                return o.e && r(o.v),
                    n.promise
            }
        })
}