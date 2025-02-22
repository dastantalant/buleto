function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        var r, o, a, i = new Array(n),
            s = 8 * n - t - 1,
            l = (1 << s) - 1,
            c = l >> 1,
            u = 23 === t ? B(2, -24) - B(2, -77) : 0,
            d = 0,
            p = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = L(e),
            e != e || e === R ? (o = e != e ? 1 : 0,
                r = l) : (r = F(q(e) / z),
                e * (a = B(2, -r)) < 1 && (r--,
                    a *= 2),
                e += r + c >= 1 ? u / a : u * B(2, 1 - c),
                e * a >= 2 && (r++,
                    a /= 2),
                r + c >= l ? (o = 0,
                    r = l) : r + c >= 1 ? (o = (e * a - 1) * B(2, t),
                    r += c) : (o = e * B(2, c - 1) * B(2, t),
                    r = 0)); t >= 8; i[d++] = 255 & o,
            o /= 256,
            t -= 8)
        ;
        for (r = r << t | o,
            s += t; s > 0; i[d++] = 255 & r,
            r /= 256,
            s -= 8)
        ;
        return i[--d] |= 128 * p,
            i
    }

    function o(e, t, n) {
        var r, o = 8 * n - t - 1,
            a = (1 << o) - 1,
            i = a >> 1,
            s = o - 7,
            l = n - 1,
            c = e[l--],
            u = 127 & c;
        for (c >>= 7; s > 0; u = 256 * u + e[l],
            l--,
            s -= 8)
        ;
        for (r = u & (1 << -s) - 1,
            u >>= -s,
            s += t; s > 0; r = 256 * r + e[l],
            l--,
            s -= 8)
        ;
        if (0 === u)
            u = 1 - i;
        else {
            if (u === a)
                return r ? NaN : c ? -R : R;
            r += B(2, t),
                u -= i
        }
        return (c ? -1 : 1) * r * B(2, u - t)
    }

    function a(e) {
        return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
    }

    function i(e) {
        return [255 & e]
    }

    function s(e) {
        return [255 & e, e >> 8 & 255]
    }

    function l(e) {
        return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
    }

    function c(e) {
        return r(e, 52, 8)
    }

    function u(e) {
        return r(e, 23, 4)
    }

    function d(e, t, n) {
        O(e[M], t, {
            get: function() {
                return this[n]
            }
        })
    }

    function p(e, t, n, r) {
        var o = +n,
            a = k(o);
        if (a + t > e[U])
            throw D(A);
        var i = e[W]._b,
            s = a + e[H],
            l = i.slice(s, s + t);
        return r ? l : l.reverse()
    }

    function h(e, t, n, r, o, a) {
        var i = +n,
            s = k(i);
        if (s + t > e[U])
            throw D(A);
        for (var l = e[W]._b, c = s + e[H], u = r(+o), d = 0; d < t; d++)
            l[c + d] = u[a ? d : t - d - 1]
    }
    var f = n(5),
        m = n(12),
        g = n(50),
        y = n(100),
        v = n(22),
        b = n(64),
        _ = n(8),
        w = n(62),
        x = n(36),
        E = n(11),
        k = n(227),
        S = n(60).f,
        O = n(13).f,
        C = n(137),
        T = n(68),
        M = "prototype",
        A = "Wrong index!",
        P = f.ArrayBuffer,
        N = f.DataView,
        j = f.Math,
        D = f.RangeError,
        R = f.Infinity,
        I = P,
        L = j.abs,
        B = j.pow,
        F = j.floor,
        q = j.log,
        z = j.LN2,
        W = m ? "_b" : "buffer",
        U = m ? "_l" : "byteLength",
        H = m ? "_o" : "byteOffset";
    if (y.ABV) {
        if (!_(function() {
                P(1)
            }) || !_(function() {
                new P(-1)
            }) || _(function() {
                return new P,
                    new P(1.5),
                    new P(NaN),
                    "ArrayBuffer" != P.name
            })) {
            P = function(e) {
                return w(this, P),
                    new I(k(e))
            };
            for (var Y, G = P[M] = I[M], K = S(I), V = 0; K.length > V;)
                (Y = K[V++]) in P || v(P, Y, I[Y]);
            g || (G.constructor = P)
        }
        var X = new N(new P(2)),
            J = N[M].setInt8;
        X.setInt8(0, 2147483648),
            X.setInt8(1, 2147483649), !X.getInt8(0) && X.getInt8(1) || b(N[M], {
                setInt8: function(e, t) {
                    J.call(this, e, t << 24 >> 24)
                },
                setUint8: function(e, t) {
                    J.call(this, e, t << 24 >> 24)
                }
            }, !0)
    } else
        P = function(e) {
            w(this, P, "ArrayBuffer");
            var t = k(e);
            this._b = C.call(new Array(t), 0),
                this[U] = t
        },
        N = function(e, t, n) {
            w(this, N, "DataView"),
                w(e, P, "DataView");
            var r = e[U],
                o = x(t);
            if (o < 0 || o > r)
                throw D("Wrong offset!");
            if (n = void 0 === n ? r - o : E(n),
                o + n > r)
                throw D("Wrong length!");
            this[W] = e,
                this[H] = o,
                this[U] = n
        },
        m && (d(P, "byteLength", "_l"),
            d(N, "buffer", "_b"),
            d(N, "byteLength", "_l"),
            d(N, "byteOffset", "_o")),
        b(N[M], {
            getInt8: function(e) {
                return p(this, 1, e)[0] << 24 >> 24
            },
            getUint8: function(e) {
                return p(this, 1, e)[0]
            },
            getInt16: function(e) {
                var t = p(this, 2, e, arguments[1]);
                return (t[1] << 8 | t[0]) << 16 >> 16
            },
            getUint16: function(e) {
                var t = p(this, 2, e, arguments[1]);
                return t[1] << 8 | t[0]
            },
            getInt32: function(e) {
                return a(p(this, 4, e, arguments[1]))
            },
            getUint32: function(e) {
                return a(p(this, 4, e, arguments[1])) >>> 0
            },
            getFloat32: function(e) {
                return o(p(this, 4, e, arguments[1]), 23, 4)
            },
            getFloat64: function(e) {
                return o(p(this, 8, e, arguments[1]), 52, 8)
            },
            setInt8: function(e, t) {
                h(this, 1, e, i, t)
            },
            setUint8: function(e, t) {
                h(this, 1, e, i, t)
            },
            setInt16: function(e, t) {
                h(this, 2, e, s, t, arguments[2])
            },
            setUint16: function(e, t) {
                h(this, 2, e, s, t, arguments[2])
            },
            setInt32: function(e, t) {
                h(this, 4, e, l, t, arguments[2])
            },
            setUint32: function(e, t) {
                h(this, 4, e, l, t, arguments[2])
            },
            setFloat32: function(e, t) {
                h(this, 4, e, u, t, arguments[2])
            },
            setFloat64: function(e, t) {
                h(this, 8, e, c, t, arguments[2])
            }
        });
    T(P, "ArrayBuffer"),
        T(N, "DataView"),
        v(N[M], y.VIEW, !0),
        t.ArrayBuffer = P,
        t.DataView = N
}