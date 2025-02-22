function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(5),
        a = n(33),
        i = n(142)(),
        s = n(10)("observable"),
        l = n(17),
        c = n(4),
        u = n(62),
        d = n(64),
        p = n(22),
        h = n(63),
        f = h.RETURN,
        m = function(e) {
            return null == e ? void 0 : l(e)
        },
        g = function(e) {
            var t = e._c;
            t && (e._c = void 0,
                t())
        },
        y = function(e) {
            return void 0 === e._o
        },
        v = function(e) {
            y(e) || (e._o = void 0,
                g(e))
        },
        b = function(e, t) {
            c(e),
                this._c = void 0,
                this._o = e,
                e = new _(this);
            try {
                var n = t(e),
                    r = n;
                null != n && ("function" === typeof n.unsubscribe ? n = function() {
                        r.unsubscribe()
                    } :
                    l(n),
                    this._c = n)
            } catch (t) {
                return void e.error(t)
            }
            y(this) && g(this)
        };
    b.prototype = d({}, {
        unsubscribe: function() {
            v(this)
        }
    });
    var _ = function(e) {
        this._s = e
    };
    _.prototype = d({}, {
        next: function(e) {
            var t = this._s;
            if (!y(t)) {
                var n = t._o;
                try {
                    var r = m(n.next);
                    if (r)
                        return r.call(n, e)
                } catch (e) {
                    try {
                        v(t)
                    } finally {
                        throw e
                    }
                }
            }
        },
        error: function(e) {
            var t = this._s;
            if (y(t))
                throw e;
            var n = t._o;
            t._o = void 0;
            try {
                var r = m(n.error);
                if (!r)
                    throw e;
                e = r.call(n, e)
            } catch (e) {
                try {
                    g(t)
                } finally {
                    throw e
                }
            }
            return g(t),
                e
        },
        complete: function(e) {
            var t = this._s;
            if (!y(t)) {
                var n = t._o;
                t._o = void 0;
                try {
                    var r = m(n.complete);
                    e = r ? r.call(n, e) : void 0
                } catch (e) {
                    try {
                        g(t)
                    } finally {
                        throw e
                    }
                }
                return g(t),
                    e
            }
        }
    });
    var w = function(e) {
        u(this, w, "Observable", "_f")._f = l(e)
    };
    d(w.prototype, {
            subscribe: function(e) {
                return new b(e, this._f)
            },
            forEach: function(e) {
                var t = this;
                return new(a.Promise || o.Promise)(function(n, r) {
                    l(e);
                    var o = t.subscribe({
                        next: function(t) {
                            try {
                                return e(t)
                            } catch (e) {
                                r(e),
                                    o.unsubscribe()
                            }
                        },
                        error: r,
                        complete: n
                    })
                })
            }
        }),
        d(w, {
            from: function(e) {
                var t = "function" === typeof this ? this : w,
                    n = m(c(e)[s]);
                if (n) {
                    var r = c(n.call(e));
                    return r.constructor === t ? r : new t(function(e) {
                        return r.subscribe(e)
                    })
                }
                return new t(function(t) {
                    var n = !1;
                    return i(function() {
                            if (!n) {
                                try {
                                    if (h(e, !1, function(e) {
                                            if (t.next(e),
                                                n)
                                                return f
                                        }) === f)
                                        return
                                } catch (e) {
                                    if (n)
                                        throw e;
                                    return void t.error(e)
                                }
                                t.complete()
                            }
                        }),
                        function() {
                            n = !0
                        }
                })
            },
            of: function() {
                for (var e = 0, t = arguments.length, n = new Array(t); e < t;)
                    n[e] = arguments[e++];
                return new("function" === typeof this ? this : w)(function(e) {
                    var t = !1;
                    return i(function() {
                            if (!t) {
                                for (var r = 0; r < n.length; ++r)
                                    if (e.next(n[r]),
                                        t)
                                        return;
                                e.complete()
                            }
                        }),
                        function() {
                            t = !0
                        }
                })
            }
        }),
        p(w.prototype, s, function() {
            return this
        }),
        r(r.G, {
            Observable: w
        }),
        n(61)("Observable")
}