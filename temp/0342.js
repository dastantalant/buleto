function(e, t, n) {
    "use strict";
    var r = n(5),
        o = n(27),
        a = n(12),
        i = n(1),
        s = n(23),
        l = n(51).KEY,
        c = n(8),
        u = n(76),
        d = n(68),
        p = n(56),
        h = n(10),
        f = n(200),
        m = n(119),
        g = n(343),
        y = n(92),
        v = n(4),
        b = n(9),
        _ = n(14),
        w = n(28),
        x = n(42),
        E = n(55),
        k = n(59),
        S = n(203),
        O = n(29),
        C = n(91),
        T = n(13),
        M = n(57),
        A = O.f,
        P = T.f,
        N = S.f,
        j = r.Symbol,
        D = r.JSON,
        R = D && D.stringify,
        I = h("_hidden"),
        L = h("toPrimitive"),
        B = {}.propertyIsEnumerable,
        F = u("symbol-registry"),
        q = u("symbols"),
        z = u("op-symbols"),
        W = Object.prototype,
        U = "function" == typeof j && !!C.f,
        H = r.QObject,
        Y = !H || !H.prototype || !H.prototype.findChild,
        G = a && c(function() {
            return 7 != k(P({}, "a", {
                get: function() {
                    return P(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        }) ? function(e, t, n) {
            var r = A(W, t);
            r && delete W[t],
                P(e, t, n),
                r && e !== W && P(W, t, r)
        } :
        P,
        K = function(e) {
            var t = q[e] = k(j.prototype);
            return t._k = e,
                t
        },
        V = U && "symbol" == typeof j.iterator ? function(e) {
            return "symbol" == typeof e
        } :
        function(e) {
            return e instanceof j
        },
        X = function(e, t, n) {
            return e === W && X(z, t, n),
                v(e),
                t = x(t, !0),
                v(n),
                o(q, t) ? (n.enumerable ? (o(e, I) && e[I][t] && (e[I][t] = !1),
                        n = k(n, {
                            enumerable: E(0, !1)
                        })) : (o(e, I) || P(e, I, E(1, {})),
                        e[I][t] = !0),
                    G(e, t, n)) : P(e, t, n)
        },
        J = function(e, t) {
            v(e);
            for (var n, r = g(t = w(t)), o = 0, a = r.length; a > o;)
                X(e, n = r[o++], t[n]);
            return e
        },
        Z = function(e, t) {
            return void 0 === t ? k(e) : J(k(e), t)
        },
        Q = function(e) {
            var t = B.call(this, e = x(e, !0));
            return !(this === W && o(q, e) && !o(z, e)) && (!(t || !o(this, e) || !o(q, e) || o(this, I) && this[I][e]) || t)
        },
        $ = function(e, t) {
            if (e = w(e),
                t = x(t, !0),
                e !== W || !o(q, t) || o(z, t)) {
                var n = A(e, t);
                return !n || !o(q, t) || o(e, I) && e[I][t] || (n.enumerable = !0),
                    n
            }
        },
        ee = function(e) {
            for (var t, n = N(w(e)), r = [], a = 0; n.length > a;)
                o(q, t = n[a++]) || t == I || t == l || r.push(t);
            return r
        },
        te = function(e) {
            for (var t, n = e === W, r = N(n ? z : w(e)), a = [], i = 0; r.length > i;)
                !o(q, t = r[i++]) || n && !o(W, t) || a.push(q[t]);
            return a
        };
    U || (j = function() {
                if (this instanceof j)
                    throw TypeError("Symbol is not a constructor!");
                var e = p(arguments.length > 0 ? arguments[0] : void 0),
                    t = function(n) {
                        this === W && t.call(z, n),
                            o(this, I) && o(this[I], e) && (this[I][e] = !1),
                            G(this, e, E(1, n))
                    };
                return a && Y && G(W, e, {
                        configurable: !0,
                        set: t
                    }),
                    K(e)
            },
            s(j.prototype, "toString", function() {
                return this._k
            }),
            O.f = $,
            T.f = X,
            n(60).f = S.f = ee,
            n(78).f = Q,
            C.f = te,
            a && !n(50) && s(W, "propertyIsEnumerable", Q, !0),
            f.f = function(e) {
                return K(h(e))
            }
        ),
        i(i.G + i.W + i.F * !U, {
            Symbol: j
        });
    for (var ne = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), re = 0; ne.length > re;)
        h(ne[re++]);
    for (var oe = M(h.store), ae = 0; oe.length > ae;)
        m(oe[ae++]);
    i(i.S + i.F * !U, "Symbol", {
            for: function(e) {
                return o(F, e += "") ? F[e] : F[e] = j(e)
            },
            keyFor: function(e) {
                if (!V(e))
                    throw TypeError(e + " is not a symbol!");
                for (var t in F)
                    if (F[t] === e)
                        return t
            },
            useSetter: function() {
                Y = !0
            },
            useSimple: function() {
                Y = !1
            }
        }),
        i(i.S + i.F * !U, "Object", {
            create: Z,
            defineProperty: X,
            defineProperties: J,
            getOwnPropertyDescriptor: $,
            getOwnPropertyNames: ee,
            getOwnPropertySymbols: te
        });
    var ie = c(function() {
        C.f(1)
    });
    i(i.S + i.F * ie, "Object", {
            getOwnPropertySymbols: function(e) {
                return C.f(_(e))
            }
        }),
        D && i(i.S + i.F * (!U || c(function() {
            var e = j();
            return "[null]" != R([e]) || "{}" != R({
                a: e
            }) || "{}" != R(Object(e))
        })), "JSON", {
            stringify: function(e) {
                for (var t, n, r = [e], o = 1; arguments.length > o;)
                    r.push(arguments[o++]);
                if (n = t = r[1],
                    (b(t) || void 0 !== e) && !V(e))
                    return y(t) || (t = function(e, t) {
                            if ("function" == typeof n && (t = n.call(this, e, t)), !V(t))
                                return t
                        }),
                        r[1] = t,
                        R.apply(D, r)
            }
        }),
        j.prototype[L] || n(22)(j.prototype, L, j.prototype.valueOf),
        d(j, "Symbol"),
        d(Math, "Math", !0),
        d(r.JSON, "JSON", !0)
}