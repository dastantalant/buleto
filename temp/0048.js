function(e, t, n) {
    "use strict";
    if (n(12)) {
        var r = n(50),
            o = n(5),
            a = n(8),
            i = n(1),
            s = n(100),
            l = n(144),
            c = n(34),
            u = n(62),
            d = n(55),
            p = n(22),
            h = n(64),
            f = n(36),
            m = n(11),
            g = n(227),
            y = n(58),
            v = n(42),
            b = n(27),
            _ = n(69),
            w = n(9),
            x = n(14),
            E = n(133),
            k = n(59),
            S = n(30),
            O = n(60).f,
            C = n(135),
            T = n(56),
            M = n(10),
            A = n(45),
            P = n(90),
            N = n(80),
            j = n(138),
            D = n(71),
            R = n(95),
            I = n(61),
            L = n(137),
            B = n(216),
            F = n(13),
            q = n(29),
            z = F.f,
            W = q.f,
            U = o.RangeError,
            H = o.TypeError,
            Y = o.Uint8Array,
            G = Array.prototype,
            K = l.ArrayBuffer,
            V = l.DataView,
            X = A(0),
            J = A(2),
            Z = A(3),
            Q = A(4),
            $ = A(5),
            ee = A(6),
            te = P(!0),
            ne = P(!1),
            re = j.values,
            oe = j.keys,
            ae = j.entries,
            ie = G.lastIndexOf,
            se = G.reduce,
            le = G.reduceRight,
            ce = G.join,
            ue = G.sort,
            de = G.slice,
            pe = G.toString,
            he = G.toLocaleString,
            fe = M("iterator"),
            me = M("toStringTag"),
            ge = T("typed_constructor"),
            ye = T("def_constructor"),
            ve = s.CONSTR,
            be = s.TYPED,
            _e = s.VIEW,
            we = A(1, function(e, t) {
                return Oe(N(e, e[ye]), t)
            }),
            xe = a(function() {
                return 1 === new Y(new Uint16Array([1]).buffer)[0]
            }),
            Ee = !!Y && !!Y.prototype.set && a(function() {
                new Y(1).set({})
            }),
            ke = function(e, t) {
                var n = f(e);
                if (n < 0 || n % t)
                    throw U("Wrong offset!");
                return n
            },
            Se = function(e) {
                if (w(e) && be in e)
                    return e;
                throw H(e + " is not a typed array!")
            },
            Oe = function(e, t) {
                if (!(w(e) && ge in e))
                    throw H("It is not a typed array constructor!");
                return new e(t)
            },
            Ce = function(e, t) {
                return Te(N(e, e[ye]), t)
            },
            Te = function(e, t) {
                for (var n = 0, r = t.length, o = Oe(e, r); r > n;)
                    o[n] = t[n++];
                return o
            },
            Me = function(e, t, n) {
                z(e, t, {
                    get: function() {
                        return this._d[n]
                    }
                })
            },
            Ae = function(e) {
                var t, n, r, o, a, i, s = x(e),
                    l = arguments.length,
                    u = l > 1 ? arguments[1] : void 0,
                    d = void 0 !== u,
                    p = C(s);
                if (void 0 != p && !E(p)) {
                    for (i = p.call(s),
                        r = [],
                        t = 0; !(a = i.next()).done; t++)
                        r.push(a.value);
                    s = r
                }
                for (d && l > 2 && (u = c(u, arguments[2], 2)),
                    t = 0,
                    n = m(s.length),
                    o = Oe(this, n); n > t; t++)
                    o[t] = d ? u(s[t], t) : s[t];
                return o
            },
            Pe = function() {
                for (var e = 0, t = arguments.length, n = Oe(this, t); t > e;)
                    n[e] = arguments[e++];
                return n
            },
            Ne = !!Y && a(function() {
                he.call(new Y(1))
            }),
            je = function() {
                return he.apply(Ne ? de.call(Se(this)) : Se(this), arguments)
            },
            De = {
                copyWithin: function(e, t) {
                    return B.call(Se(this), e, t, arguments.length > 2 ? arguments[2] : void 0)
                },
                every: function(e) {
                    return Q(Se(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                fill: function(e) {
                    return L.apply(Se(this), arguments)
                },
                filter: function(e) {
                    return Ce(this, J(Se(this), e, arguments.length > 1 ? arguments[1] : void 0))
                },
                find: function(e) {
                    return $(Se(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                findIndex: function(e) {
                    return ee(Se(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                forEach: function(e) {
                    X(Se(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                indexOf: function(e) {
                    return ne(Se(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                includes: function(e) {
                    return te(Se(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                join: function(e) {
                    return ce.apply(Se(this), arguments)
                },
                lastIndexOf: function(e) {
                    return ie.apply(Se(this), arguments)
                },
                map: function(e) {
                    return we(Se(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                reduce: function(e) {
                    return se.apply(Se(this), arguments)
                },
                reduceRight: function(e) {
                    return le.apply(Se(this), arguments)
                },
                reverse: function() {
                    for (var e, t = this, n = Se(t).length, r = Math.floor(n / 2), o = 0; o < r;)
                        e = t[o],
                        t[o++] = t[--n],
                        t[n] = e;
                    return t
                },
                some: function(e) {
                    return Z(Se(this), e, arguments.length > 1 ? arguments[1] : void 0)
                },
                sort: function(e) {
                    return ue.call(Se(this), e)
                },
                subarray: function(e, t) {
                    var n = Se(this),
                        r = n.length,
                        o = y(e, r);
                    return new(N(n, n[ye]))(n.buffer, n.byteOffset + o * n.BYTES_PER_ELEMENT, m((void 0 === t ? r : y(t, r)) - o))
                }
            },
            Re = function(e, t) {
                return Ce(this, de.call(Se(this), e, t))
            },
            Ie = function(e) {
                Se(this);
                var t = ke(arguments[1], 1),
                    n = this.length,
                    r = x(e),
                    o = m(r.length),
                    a = 0;
                if (o + t > n)
                    throw U("Wrong length!");
                for (; a < o;)
                    this[t + a] = r[a++]
            },
            Le = {
                entries: function() {
                    return ae.call(Se(this))
                },
                keys: function() {
                    return oe.call(Se(this))
                },
                values: function() {
                    return re.call(Se(this))
                }
            },
            Be = function(e, t) {
                return w(e) && e[be] && "symbol" != typeof t && t in e && String(+t) == String(t)
            },
            Fe = function(e, t) {
                return Be(e, t = v(t, !0)) ? d(2, e[t]) : W(e, t)
            },
            qe = function(e, t, n) {
                return !(Be(e, t = v(t, !0)) && w(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? z(e, t, n) : (e[t] = n.value,
                    e)
            };
        ve || (q.f = Fe,
                F.f = qe),
            i(i.S + i.F * !ve, "Object", {
                getOwnPropertyDescriptor: Fe,
                defineProperty: qe
            }),
            a(function() {
                pe.call({})
            }) && (pe = he = function() {
                return ce.call(this)
            });
        var ze = h({}, De);
        h(ze, Le),
            p(ze, fe, Le.values),
            h(ze, {
                slice: Re,
                set: Ie,
                constructor: function() {},
                toString: pe,
                toLocaleString: je
            }),
            Me(ze, "buffer", "b"),
            Me(ze, "byteOffset", "o"),
            Me(ze, "byteLength", "l"),
            Me(ze, "length", "e"),
            z(ze, me, {
                get: function() {
                    return this[be]
                }
            }),
            e.exports = function(e, t, n, l) {
                l = !!l;
                var c = e + (l ? "Clamped" : "") + "Array",
                    d = "get" + e,
                    h = "set" + e,
                    f = o[c],
                    y = f || {},
                    v = f && S(f),
                    b = !f || !s.ABV,
                    x = {},
                    E = f && f.prototype,
                    C = function(e, n) {
                        var r = e._d;
                        return r.v[d](n * t + r.o, xe)
                    },
                    T = function(e, n, r) {
                        var o = e._d;
                        l && (r = (r = Math.round(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r),
                            o.v[h](n * t + o.o, r, xe)
                    },
                    M = function(e, t) {
                        z(e, t, {
                            get: function() {
                                return C(this, t)
                            },
                            set: function(e) {
                                return T(this, t, e)
                            },
                            enumerable: !0
                        })
                    };
                b ? (f = n(function(e, n, r, o) {
                        u(e, f, c, "_d");
                        var a, i, s, l, d = 0,
                            h = 0;
                        if (w(n)) {
                            if (!(n instanceof K || "ArrayBuffer" == (l = _(n)) || "SharedArrayBuffer" == l))
                                return be in n ? Te(f, n) : Ae.call(f, n);
                            a = n,
                                h = ke(r, t);
                            var y = n.byteLength;
                            if (void 0 === o) {
                                if (y % t)
                                    throw U("Wrong length!");
                                if ((i = y - h) < 0)
                                    throw U("Wrong length!")
                            } else if ((i = m(o) * t) + h > y)
                                throw U("Wrong length!");
                            s = i / t
                        } else
                            s = g(n),
                            i = s * t,
                            a = new K(i);
                        for (p(e, "_d", {
                                b: a,
                                o: h,
                                l: i,
                                e: s,
                                v: new V(a)
                            }); d < s;)
                            M(e, d++)
                    }),
                    E = f.prototype = k(ze),
                    p(E, "constructor", f)) : a(function() {
                    f(1)
                }) && a(function() {
                    new f(-1)
                }) && R(function(e) {
                    new f,
                    new f(null),
                        new f(1.5),
                        new f(e)
                }, !0) || (f = n(function(e, n, r, o) {
                        u(e, f, c);
                        var a;
                        return w(n) ? n instanceof K || "ArrayBuffer" == (a = _(n)) || "SharedArrayBuffer" == a ? void 0 !== o ? new y(n, ke(r, t), o) : void 0 !== r ? new y(n, ke(r, t)) : new y(n) : be in n ? Te(f, n) : Ae.call(f, n) : new y(g(n))
                    }),
                    X(v !== Function.prototype ? O(y).concat(O(v)) : O(y), function(e) {
                        e in f || p(f, e, y[e])
                    }),
                    f.prototype = E,
                    r || (E.constructor = f));
                var A = E[fe],
                    P = !!A && ("values" == A.name || void 0 == A.name),
                    N = Le.values;
                p(f, ge, !0),
                    p(E, be, c),
                    p(E, _e, !0),
                    p(E, ye, f),
                    (l ? new f(1)[me] == c : me in E) || z(E, me, {
                        get: function() {
                            return c
                        }
                    }),
                    x[c] = f,
                    i(i.G + i.W + i.F * (f != y), x),
                    i(i.S, c, {
                        BYTES_PER_ELEMENT: t
                    }),
                    i(i.S + i.F * a(function() {
                        y.of.call(f, 1)
                    }), c, {
                        from: Ae,
                        of: Pe
                    }),
                    "BYTES_PER_ELEMENT" in E || p(E, "BYTES_PER_ELEMENT", t),
                    i(i.P, c, De),
                    I(c),
                    i(i.P + i.F * Ee, c, {
                        set: Ie
                    }),
                    i(i.P + i.F * !P, c, Le),
                    r || E.toString == pe || (E.toString = pe),
                    i(i.P + i.F * a(function() {
                        new f(1).slice()
                    }), c, {
                        slice: Re
                    }),
                    i(i.P + i.F * (a(function() {
                        return [1, 2].toLocaleString() != new f([1, 2]).toLocaleString()
                    }) || !a(function() {
                        E.toLocaleString.call([1, 2])
                    })), c, {
                        toLocaleString: je
                    }),
                    D[c] = P ? A : N,
                    r || P || p(E, fe, N)
            }
    } else
        e.exports = function() {}
}