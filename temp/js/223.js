 function (e, t, n) {
    "use strict";
    var r = n(13).f,
        o = n(59),
        a = n(64),
        i = n(34),
        s = n(62),
        l = n(63),
        c = n(129),
        u = n(217),
        d = n(61),
        p = n(12),
        h = n(51).fastKey,
        f = n(65),
        m = p ? "_s" : "size",
        g = function (e, t) {
            var n, r = h(t);
            if ("F" !== r)
                return e._i[r];
            for (n = e._f; n; n = n.n)
                if (n.k == t)
                    return n
        };
    e.exports = {
        getConstructor: function (e, t, n, c) {
            var u = e(function (e, r) {
                s(e, u, t, "_i"),
                    e._t = t,
                    e._i = o(null),
                    e._f = void 0,
                    e._l = void 0,
                    e[m] = 0,
                    void 0 != r && l(r, n, e[c], e)
            });
            return a(u.prototype, {
                clear: function () {
                    for (var e = f(this, t), n = e._i, r = e._f; r; r = r.n)
                        r.r = !0,
                            r.p && (r.p = r.p.n = void 0),
                            delete n[r.i];
                    e._f = e._l = void 0,
                        e[m] = 0
                },
                delete: function (e) {
                    var n = f(this, t),
                        r = g(n, e);
                    if (r) {
                        var o = r.n,
                            a = r.p;
                        delete n._i[r.i],
                            r.r = !0,
                            a && (a.n = o),
                            o && (o.p = a),
                            n._f == r && (n._f = o),
                            n._l == r && (n._l = a),
                            n[m]--
                    }
                    return !!r
                },
                forEach: function (e) {
                    f(this, t);
                    for (var n, r = i(e, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;)
                        for (r(n.v, n.k, this); n && n.r;)
                            n = n.p
                },
                has: function (e) {
                    return !!g(f(this, t), e)
                }
            }),
                p && r(u.prototype, "size", {
                    get: function () {
                        return f(this, t)[m]
                    }
                }),
                u
        },
        def: function (e, t, n) {
            var r, o, a = g(e, t);
            return a ? a.v = n : (e._l = a = {
                i: o = h(t, !0),
                k: t,
                v: n,
                p: r = e._l,
                n: void 0,
                r: !1
            },
                e._f || (e._f = a),
                r && (r.n = a),
                e[m]++,
                "F" !== o && (e._i[o] = a)),
                e
        },
        getEntry: g,
        setStrong: function (e, t, n) {
            c(e, t, function (e, n) {
                this._t = f(e, t),
                    this._k = n,
                    this._l = void 0
            }, function () {
                for (var e = this, t = e._k, n = e._l; n && n.r;)
                    n = n.p;
                return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? u(0, n.k) : "values" == t ? u(0, n.v) : u(0, [n.k, n.v]) : (e._t = void 0,
                    u(1))
            }, n ? "entries" : "values", !n, !0),
                d(t)
        }
    }
}