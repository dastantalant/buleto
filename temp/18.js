 function (e, t, n) {
    ! function (t, n) {
        e.exports = n()
    }(0, function () {
        "use strict";

        function e(e, t) {
            t && (e.prototype = Object.create(t.prototype)),
                e.prototype.constructor = e
        }

        function t(e) {
            return a(e) ? e : M(e)
        }

        function n(e) {
            return i(e) ? e : A(e)
        }

        function r(e) {
            return s(e) ? e : P(e)
        }

        function o(e) {
            return a(e) && !l(e) ? e : N(e)
        }

        function a(e) {
            return !(!e || !e[cn])
        }

        function i(e) {
            return !(!e || !e[un])
        }

        function s(e) {
            return !(!e || !e[dn])
        }

        function l(e) {
            return i(e) || s(e)
        }

        function c(e) {
            return !(!e || !e[pn])
        }

        function u(e) {
            return e.value = !1,
                e
        }

        function d(e) {
            e && (e.value = !0)
        }

        function p() { }

        function h(e, t) {
            t = t || 0;
            for (var n = Math.max(0, e.length - t), r = new Array(n), o = 0; o < n; o++)
                r[o] = e[o + t];
            return r
        }

        function f(e) {
            return void 0 === e.size && (e.size = e.__iterate(g)),
                e.size
        }

        function m(e, t) {
            if ("number" !== typeof t) {
                var n = t >>> 0;
                if ("" + n !== t || 4294967295 === n)
                    return NaN;
                t = n
            }
            return t < 0 ? f(e) + t : t
        }

        function g() {
            return !0
        }

        function y(e, t, n) {
            return (0 === e || void 0 !== n && e <= -n) && (void 0 === t || void 0 !== n && t >= n)
        }

        function v(e, t) {
            return _(e, t, 0)
        }

        function b(e, t) {
            return _(e, t, t)
        }

        function _(e, t, n) {
            return void 0 === e ? n : e < 0 ? Math.max(0, t + e) : void 0 === t ? e : Math.min(t, e)
        }

        function w(e) {
            this.next = e
        }

        function x(e, t, n, r) {
            var o = 0 === e ? t : 1 === e ? n : [t, n];
            return r ? r.value = o : r = {
                value: o,
                done: !1
            },
                r
        }

        function E() {
            return {
                value: void 0,
                done: !0
            }
        }

        function k(e) {
            return !!C(e)
        }

        function S(e) {
            return e && "function" === typeof e.next
        }

        function O(e) {
            var t = C(e);
            return t && t.call(e)
        }

        function C(e) {
            var t = e && (xn && e[xn] || e[En]);
            if ("function" === typeof t)
                return t
        }

        function T(e) {
            return e && "number" === typeof e.length
        }

        function M(e) {
            return null === e || void 0 === e ? B() : a(e) ? e.toSeq() : z(e)
        }

        function A(e) {
            return null === e || void 0 === e ? B().toKeyedSeq() : a(e) ? i(e) ? e.toSeq() : e.fromEntrySeq() : F(e)
        }

        function P(e) {
            return null === e || void 0 === e ? B() : a(e) ? i(e) ? e.entrySeq() : e.toIndexedSeq() : q(e)
        }

        function N(e) {
            return (null === e || void 0 === e ? B() : a(e) ? i(e) ? e.entrySeq() : e : q(e)).toSetSeq()
        }

        function j(e) {
            this._array = e,
                this.size = e.length
        }

        function D(e) {
            var t = Object.keys(e);
            this._object = e,
                this._keys = t,
                this.size = t.length
        }

        function R(e) {
            this._iterable = e,
                this.size = e.length || e.size
        }

        function I(e) {
            this._iterator = e,
                this._iteratorCache = []
        }

        function L(e) {
            return !(!e || !e[Sn])
        }

        function B() {
            return On || (On = new j([]))
        }

        function F(e) {
            var t = Array.isArray(e) ? new j(e).fromEntrySeq() : S(e) ? new I(e).fromEntrySeq() : k(e) ? new R(e).fromEntrySeq() : "object" === typeof e ? new D(e) : void 0;
            if (!t)
                throw new TypeError("Expected Array or iterable object of [k, v] entries, or keyed object: " + e);
            return t
        }

        function q(e) {
            var t = W(e);
            if (!t)
                throw new TypeError("Expected Array or iterable object of values: " + e);
            return t
        }

        function z(e) {
            var t = W(e) || "object" === typeof e && new D(e);
            if (!t)
                throw new TypeError("Expected Array or iterable object of values, or keyed object: " + e);
            return t
        }

        function W(e) {
            return T(e) ? new j(e) : S(e) ? new I(e) : k(e) ? new R(e) : void 0
        }

        function U(e, t, n, r) {
            var o = e._cache;
            if (o) {
                for (var a = o.length - 1, i = 0; i <= a; i++) {
                    var s = o[n ? a - i : i];
                    if (!1 === t(s[1], r ? s[0] : i, e))
                        return i + 1
                }
                return i
            }
            return e.__iterateUncached(t, n)
        }

        function H(e, t, n, r) {
            var o = e._cache;
            if (o) {
                var a = o.length - 1,
                    i = 0;
                return new w(function () {
                    var e = o[n ? a - i : i];
                    return i++ > a ? E() : x(t, r ? e[0] : i - 1, e[1])
                })
            }
            return e.__iteratorUncached(t, n)
        }

        function Y(e, t) {
            return t ? G(t, e, "", {
                "": e
            }) : K(e)
        }

        function G(e, t, n, r) {
            return Array.isArray(t) ? e.call(r, n, P(t).map(function (n, r) {
                return G(e, n, r, t)
            })) : V(t) ? e.call(r, n, A(t).map(function (n, r) {
                return G(e, n, r, t)
            })) : t
        }

        function K(e) {
            return Array.isArray(e) ? P(e).map(K).toList() : V(e) ? A(e).map(K).toMap() : e
        }

        function V(e) {
            return e && (e.constructor === Object || void 0 === e.constructor)
        }

        function X(e, t) {
            if (e === t || e !== e && t !== t)
                return !0;
            if (!e || !t)
                return !1;
            if ("function" === typeof e.valueOf && "function" === typeof t.valueOf) {
                if (e = e.valueOf(),
                    t = t.valueOf(),
                    e === t || e !== e && t !== t)
                    return !0;
                if (!e || !t)
                    return !1
            }
            return !("function" !== typeof e.equals || "function" !== typeof t.equals || !e.equals(t))
        }

        function J(e, t) {
            if (e === t)
                return !0;
            if (!a(t) || void 0 !== e.size && void 0 !== t.size && e.size !== t.size || void 0 !== e.__hash && void 0 !== t.__hash && e.__hash !== t.__hash || i(e) !== i(t) || s(e) !== s(t) || c(e) !== c(t))
                return !1;
            if (0 === e.size && 0 === t.size)
                return !0;
            var n = !l(e);
            if (c(e)) {
                var r = e.entries();
                return t.every(function (e, t) {
                    var o = r.next().value;
                    return o && X(o[1], e) && (n || X(o[0], t))
                }) && r.next().done
            }
            var o = !1;
            if (void 0 === e.size)
                if (void 0 === t.size)
                    "function" === typeof e.cacheResult && e.cacheResult();
                else {
                    o = !0;
                    var u = e;
                    e = t,
                        t = u
                }
            var d = !0,
                p = t.__iterate(function (t, r) {
                    if (n ? !e.has(t) : o ? !X(t, e.get(r, gn)) : !X(e.get(r, gn), t))
                        return d = !1, !1
                });
            return d && e.size === p
        }

        function Z(e, t) {
            if (!(this instanceof Z))
                return new Z(e, t);
            if (this._value = e,
                this.size = void 0 === t ? 1 / 0 : Math.max(0, t),
                0 === this.size) {
                if (Cn)
                    return Cn;
                Cn = this
            }
        }

        function Q(e, t) {
            if (!e)
                throw new Error(t)
        }

        function $(e, t, n) {
            if (!(this instanceof $))
                return new $(e, t, n);
            if (Q(0 !== n, "Cannot step a Range by 0"),
                e = e || 0,
                void 0 === t && (t = 1 / 0),
                n = void 0 === n ? 1 : Math.abs(n),
                t < e && (n = -n),
                this._start = e,
                this._end = t,
                this._step = n,
                this.size = Math.max(0, Math.ceil((t - e) / n - 1) + 1),
                0 === this.size) {
                if (Tn)
                    return Tn;
                Tn = this
            }
        }

        function ee() {
            throw TypeError("Abstract")
        }

        function te() { }

        function ne() { }

        function re() { }

        function oe(e) {
            return e >>> 1 & 1073741824 | 3221225471 & e
        }

        function ae(e) {
            if (!1 === e || null === e || void 0 === e)
                return 0;
            if ("function" === typeof e.valueOf && (!1 === (e = e.valueOf()) || null === e || void 0 === e))
                return 0;
            if (!0 === e)
                return 1;
            var t = typeof e;
            if ("number" === t) {
                if (e !== e || e === 1 / 0)
                    return 0;
                var n = 0 | e;
                for (n !== e && (n ^= 4294967295 * e); e > 4294967295;)
                    e /= 4294967295,
                        n ^= e;
                return oe(n)
            }
            if ("string" === t)
                return e.length > In ? ie(e) : se(e);
            if ("function" === typeof e.hashCode)
                return e.hashCode();
            if ("object" === t)
                return le(e);
            if ("function" === typeof e.toString)
                return se(e.toString());
            throw new Error("Value type " + t + " cannot be hashed.")
        }

        function ie(e) {
            var t = Fn[e];
            return void 0 === t && (t = se(e),
                Bn === Ln && (Bn = 0,
                    Fn = {}),
                Bn++,
                Fn[e] = t),
                t
        }

        function se(e) {
            for (var t = 0, n = 0; n < e.length; n++)
                t = 31 * t + e.charCodeAt(n) | 0;
            return oe(t)
        }

        function le(e) {
            var t;
            if (jn && void 0 !== (t = Mn.get(e)))
                return t;
            if (void 0 !== (t = e[Rn]))
                return t;
            if (!Nn) {
                if (void 0 !== (t = e.propertyIsEnumerable && e.propertyIsEnumerable[Rn]))
                    return t;
                if (void 0 !== (t = ce(e)))
                    return t
            }
            if (t = ++Dn,
                1073741824 & Dn && (Dn = 0),
                jn)
                Mn.set(e, t);
            else {
                if (void 0 !== Pn && !1 === Pn(e))
                    throw new Error("Non-extensible objects are not allowed as keys.");
                if (Nn)
                    Object.defineProperty(e, Rn, {
                        enumerable: !1,
                        configurable: !1,
                        writable: !1,
                        value: t
                    });
                else if (void 0 !== e.propertyIsEnumerable && e.propertyIsEnumerable === e.constructor.prototype.propertyIsEnumerable)
                    e.propertyIsEnumerable = function () {
                        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments)
                    },
                        e.propertyIsEnumerable[Rn] = t;
                else {
                    if (void 0 === e.nodeType)
                        throw new Error("Unable to set a non-enumerable property on object.");
                    e[Rn] = t
                }
            }
            return t
        }

        function ce(e) {
            if (e && e.nodeType > 0)
                switch (e.nodeType) {
                    case 1:
                        return e.uniqueID;
                    case 9:
                        return e.documentElement && e.documentElement.uniqueID
                }
        }

        function ue(e) {
            Q(e !== 1 / 0, "Cannot perform this action with an infinite size.")
        }

        function de(e) {
            return null === e || void 0 === e ? xe() : pe(e) && !c(e) ? e : xe().withMutations(function (t) {
                var r = n(e);
                ue(r.size),
                    r.forEach(function (e, n) {
                        return t.set(n, e)
                    })
            })
        }

        function pe(e) {
            return !(!e || !e[qn])
        }

        function he(e, t) {
            this.ownerID = e,
                this.entries = t
        }

        function fe(e, t, n) {
            this.ownerID = e,
                this.bitmap = t,
                this.nodes = n
        }

        function me(e, t, n) {
            this.ownerID = e,
                this.count = t,
                this.nodes = n
        }

        function ge(e, t, n) {
            this.ownerID = e,
                this.keyHash = t,
                this.entries = n
        }

        function ye(e, t, n) {
            this.ownerID = e,
                this.keyHash = t,
                this.entry = n
        }

        function ve(e, t, n) {
            this._type = t,
                this._reverse = n,
                this._stack = e._root && _e(e._root)
        }

        function be(e, t) {
            return x(e, t[0], t[1])
        }

        function _e(e, t) {
            return {
                node: e,
                index: 0,
                __prev: t
            }
        }

        function we(e, t, n, r) {
            var o = Object.create(zn);
            return o.size = e,
                o._root = t,
                o.__ownerID = n,
                o.__hash = r,
                o.__altered = !1,
                o
        }

        function xe() {
            return Wn || (Wn = we(0))
        }

        function Ee(e, t, n) {
            var r, o;
            if (e._root) {
                var a = u(yn),
                    i = u(vn);
                if (r = ke(e._root, e.__ownerID, 0, void 0, t, n, a, i), !i.value)
                    return e;
                o = e.size + (a.value ? n === gn ? -1 : 1 : 0)
            } else {
                if (n === gn)
                    return e;
                o = 1,
                    r = new he(e.__ownerID, [
                        [t, n]
                    ])
            }
            return e.__ownerID ? (e.size = o,
                e._root = r,
                e.__hash = void 0,
                e.__altered = !0,
                e) : r ? we(o, r) : xe()
        }

        function ke(e, t, n, r, o, a, i, s) {
            return e ? e.update(t, n, r, o, a, i, s) : a === gn ? e : (d(s),
                d(i),
                new ye(t, r, [o, a]))
        }

        function Se(e) {
            return e.constructor === ye || e.constructor === ge
        }

        function Oe(e, t, n, r, o) {
            if (e.keyHash === r)
                return new ge(t, r, [e.entry, o]);
            var a, i = (0 === n ? e.keyHash : e.keyHash >>> n) & mn,
                s = (0 === n ? r : r >>> n) & mn;
            return new fe(t, 1 << i | 1 << s, i === s ? [Oe(e, t, n + hn, r, o)] : (a = new ye(t, r, o),
                i < s ? [e, a] : [a, e]))
        }

        function Ce(e, t, n, r) {
            e || (e = new p);
            for (var o = new ye(e, ae(n), [n, r]), a = 0; a < t.length; a++) {
                var i = t[a];
                o = o.update(e, 0, void 0, i[0], i[1])
            }
            return o
        }

        function Te(e, t, n, r) {
            for (var o = 0, a = 0, i = new Array(n), s = 0, l = 1, c = t.length; s < c; s++,
                l <<= 1) {
                var u = t[s];
                void 0 !== u && s !== r && (o |= l,
                    i[a++] = u)
            }
            return new fe(e, o, i)
        }

        function Me(e, t, n, r, o) {
            for (var a = 0, i = new Array(fn), s = 0; 0 !== n; s++,
                n >>>= 1)
                i[s] = 1 & n ? t[a++] : void 0;
            return i[r] = o,
                new me(e, a + 1, i)
        }

        function Ae(e, t, r) {
            for (var o = [], i = 0; i < r.length; i++) {
                var s = r[i],
                    l = n(s);
                a(s) || (l = l.map(function (e) {
                    return Y(e)
                })),
                    o.push(l)
            }
            return je(e, t, o)
        }

        function Pe(e, t, n) {
            return e && e.mergeDeep && a(t) ? e.mergeDeep(t) : X(e, t) ? e : t
        }

        function Ne(e) {
            return function (t, n, r) {
                if (t && t.mergeDeepWith && a(n))
                    return t.mergeDeepWith(e, n);
                var o = e(t, n, r);
                return X(t, o) ? t : o
            }
        }

        function je(e, t, n) {
            return n = n.filter(function (e) {
                return 0 !== e.size
            }),
                0 === n.length ? e : 0 !== e.size || e.__ownerID || 1 !== n.length ? e.withMutations(function (e) {
                    for (var r = t ? function (n, r) {
                        e.update(r, gn, function (e) {
                            return e === gn ? n : t(e, n, r)
                        })
                    } :
                        function (t, n) {
                            e.set(n, t)
                        }, o = 0; o < n.length; o++)
                        n[o].forEach(r)
                }) : e.constructor(n[0])
        }

        function De(e, t, n, r) {
            var o = e === gn,
                a = t.next();
            if (a.done) {
                var i = o ? n : e,
                    s = r(i);
                return s === i ? e : s
            }
            Q(o || e && e.set, "invalid keyPath");
            var l = a.value,
                c = o ? gn : e.get(l, gn),
                u = De(c, t, n, r);
            return u === c ? e : u === gn ? e.remove(l) : (o ? xe() : e).set(l, u)
        }

        function Re(e) {
            return e -= e >> 1 & 1431655765,
                e = (858993459 & e) + (e >> 2 & 858993459),
                e = e + (e >> 4) & 252645135,
                e += e >> 8,
                127 & (e += e >> 16)
        }

        function Ie(e, t, n, r) {
            var o = r ? e : h(e);
            return o[t] = n,
                o
        }

        function Le(e, t, n, r) {
            var o = e.length + 1;
            if (r && t + 1 === o)
                return e[t] = n,
                    e;
            for (var a = new Array(o), i = 0, s = 0; s < o; s++)
                s === t ? (a[s] = n,
                    i = -1) : a[s] = e[s + i];
            return a
        }

        function Be(e, t, n) {
            var r = e.length - 1;
            if (n && t === r)
                return e.pop(),
                    e;
            for (var o = new Array(r), a = 0, i = 0; i < r; i++)
                i === t && (a = 1),
                    o[i] = e[i + a];
            return o
        }

        function Fe(e) {
            var t = He();
            if (null === e || void 0 === e)
                return t;
            if (qe(e))
                return e;
            var n = r(e),
                o = n.size;
            return 0 === o ? t : (ue(o),
                o > 0 && o < fn ? Ue(0, o, hn, null, new ze(n.toArray())) : t.withMutations(function (e) {
                    e.setSize(o),
                        n.forEach(function (t, n) {
                            return e.set(n, t)
                        })
                }))
        }

        function qe(e) {
            return !(!e || !e[Gn])
        }

        function ze(e, t) {
            this.array = e,
                this.ownerID = t
        }

        function We(e, t) {
            function n(e, t, n) {
                return 0 === t ? r(e, n) : o(e, t, n)
            }

            function r(e, n) {
                var r = n === s ? l && l.array : e && e.array,
                    o = n > a ? 0 : a - n,
                    c = i - n;
                return c > fn && (c = fn),
                    function () {
                        if (o === c)
                            return Xn;
                        var e = t ? --c : o++;
                        return r && r[e]
                    }
            }

            function o(e, r, o) {
                var s, l = e && e.array,
                    c = o > a ? 0 : a - o >> r,
                    u = 1 + (i - o >> r);
                return u > fn && (u = fn),
                    function () {
                        for (; ;) {
                            if (s) {
                                var e = s();
                                if (e !== Xn)
                                    return e;
                                s = null
                            }
                            if (c === u)
                                return Xn;
                            var a = t ? --u : c++;
                            s = n(l && l[a], r - hn, o + (a << r))
                        }
                    }
            }
            var a = e._origin,
                i = e._capacity,
                s = Ze(i),
                l = e._tail;
            return n(e._root, e._level, 0)
        }

        function Ue(e, t, n, r, o, a, i) {
            var s = Object.create(Kn);
            return s.size = t - e,
                s._origin = e,
                s._capacity = t,
                s._level = n,
                s._root = r,
                s._tail = o,
                s.__ownerID = a,
                s.__hash = i,
                s.__altered = !1,
                s
        }

        function He() {
            return Vn || (Vn = Ue(0, 0, hn))
        }

        function Ye(e, t, n) {
            if ((t = m(e, t)) !== t)
                return e;
            if (t >= e.size || t < 0)
                return e.withMutations(function (e) {
                    t < 0 ? Xe(e, t).set(0, n) : Xe(e, 0, t + 1).set(t, n)
                });
            t += e._origin;
            var r = e._tail,
                o = e._root,
                a = u(vn);
            return t >= Ze(e._capacity) ? r = Ge(r, e.__ownerID, 0, t, n, a) : o = Ge(o, e.__ownerID, e._level, t, n, a),
                a.value ? e.__ownerID ? (e._root = o,
                    e._tail = r,
                    e.__hash = void 0,
                    e.__altered = !0,
                    e) : Ue(e._origin, e._capacity, e._level, o, r) : e
        }

        function Ge(e, t, n, r, o, a) {
            var i = r >>> n & mn,
                s = e && i < e.array.length;
            if (!s && void 0 === o)
                return e;
            var l;
            if (n > 0) {
                var c = e && e.array[i],
                    u = Ge(c, t, n - hn, r, o, a);
                return u === c ? e : (l = Ke(e, t),
                    l.array[i] = u,
                    l)
            }
            return s && e.array[i] === o ? e : (d(a),
                l = Ke(e, t),
                void 0 === o && i === l.array.length - 1 ? l.array.pop() : l.array[i] = o,
                l)
        }

        function Ke(e, t) {
            return t && e && t === e.ownerID ? e : new ze(e ? e.array.slice() : [], t)
        }

        function Ve(e, t) {
            if (t >= Ze(e._capacity))
                return e._tail;
            if (t < 1 << e._level + hn) {
                for (var n = e._root, r = e._level; n && r > 0;)
                    n = n.array[t >>> r & mn],
                        r -= hn;
                return n
            }
        }

        function Xe(e, t, n) {
            void 0 !== t && (t |= 0),
                void 0 !== n && (n |= 0);
            var r = e.__ownerID || new p,
                o = e._origin,
                a = e._capacity,
                i = o + t,
                s = void 0 === n ? a : n < 0 ? a + n : o + n;
            if (i === o && s === a)
                return e;
            if (i >= s)
                return e.clear();
            for (var l = e._level, c = e._root, u = 0; i + u < 0;)
                c = new ze(c && c.array.length ? [void 0, c] : [], r),
                    l += hn,
                    u += 1 << l;
            u && (i += u,
                o += u,
                s += u,
                a += u);
            for (var d = Ze(a), h = Ze(s); h >= 1 << l + hn;)
                c = new ze(c && c.array.length ? [c] : [], r),
                    l += hn;
            var f = e._tail,
                m = h < d ? Ve(e, s - 1) : h > d ? new ze([], r) : f;
            if (f && h > d && i < a && f.array.length) {
                c = Ke(c, r);
                for (var g = c, y = l; y > hn; y -= hn) {
                    var v = d >>> y & mn;
                    g = g.array[v] = Ke(g.array[v], r)
                }
                g.array[d >>> hn & mn] = f
            }
            if (s < a && (m = m && m.removeAfter(r, 0, s)),
                i >= h)
                i -= h,
                    s -= h,
                    l = hn,
                    c = null,
                    m = m && m.removeBefore(r, 0, i);
            else if (i > o || h < d) {
                for (u = 0; c;) {
                    var b = i >>> l & mn;
                    if (b !== h >>> l & mn)
                        break;
                    b && (u += (1 << l) * b),
                        l -= hn,
                        c = c.array[b]
                }
                c && i > o && (c = c.removeBefore(r, l, i - u)),
                    c && h < d && (c = c.removeAfter(r, l, h - u)),
                    u && (i -= u,
                        s -= u)
            }
            return e.__ownerID ? (e.size = s - i,
                e._origin = i,
                e._capacity = s,
                e._level = l,
                e._root = c,
                e._tail = m,
                e.__hash = void 0,
                e.__altered = !0,
                e) : Ue(i, s, l, c, m)
        }

        function Je(e, t, n) {
            for (var o = [], i = 0, s = 0; s < n.length; s++) {
                var l = n[s],
                    c = r(l);
                c.size > i && (i = c.size),
                    a(l) || (c = c.map(function (e) {
                        return Y(e)
                    })),
                    o.push(c)
            }
            return i > e.size && (e = e.setSize(i)),
                je(e, t, o)
        }

        function Ze(e) {
            return e < fn ? 0 : e - 1 >>> hn << hn
        }

        function Qe(e) {
            return null === e || void 0 === e ? tt() : $e(e) ? e : tt().withMutations(function (t) {
                var r = n(e);
                ue(r.size),
                    r.forEach(function (e, n) {
                        return t.set(n, e)
                    })
            })
        }

        function $e(e) {
            return pe(e) && c(e)
        }

        function et(e, t, n, r) {
            var o = Object.create(Qe.prototype);
            return o.size = e ? e.size : 0,
                o._map = e,
                o._list = t,
                o.__ownerID = n,
                o.__hash = r,
                o
        }

        function tt() {
            return Jn || (Jn = et(xe(), He()))
        }

        function nt(e, t, n) {
            var r, o, a = e._map,
                i = e._list,
                s = a.get(t),
                l = void 0 !== s;
            if (n === gn) {
                if (!l)
                    return e;
                i.size >= fn && i.size >= 2 * a.size ? (o = i.filter(function (e, t) {
                    return void 0 !== e && s !== t
                }),
                    r = o.toKeyedSeq().map(function (e) {
                        return e[0]
                    }).flip().toMap(),
                    e.__ownerID && (r.__ownerID = o.__ownerID = e.__ownerID)) : (r = a.remove(t),
                        o = s === i.size - 1 ? i.pop() : i.set(s, void 0))
            } else if (l) {
                if (n === i.get(s)[1])
                    return e;
                r = a,
                    o = i.set(s, [t, n])
            } else
                r = a.set(t, i.size),
                    o = i.set(i.size, [t, n]);
            return e.__ownerID ? (e.size = r.size,
                e._map = r,
                e._list = o,
                e.__hash = void 0,
                e) : et(r, o)
        }

        function rt(e, t) {
            this._iter = e,
                this._useKeys = t,
                this.size = e.size
        }

        function ot(e) {
            this._iter = e,
                this.size = e.size
        }

        function at(e) {
            this._iter = e,
                this.size = e.size
        }

        function it(e) {
            this._iter = e,
                this.size = e.size
        }

        function st(e) {
            var t = Tt(e);
            return t._iter = e,
                t.size = e.size,
                t.flip = function () {
                    return e
                },
                t.reverse = function () {
                    var t = e.reverse.apply(this);
                    return t.flip = function () {
                        return e.reverse()
                    },
                        t
                },
                t.has = function (t) {
                    return e.includes(t)
                },
                t.includes = function (t) {
                    return e.has(t)
                },
                t.cacheResult = Mt,
                t.__iterateUncached = function (t, n) {
                    var r = this;
                    return e.__iterate(function (e, n) {
                        return !1 !== t(n, e, r)
                    }, n)
                },
                t.__iteratorUncached = function (t, n) {
                    if (t === wn) {
                        var r = e.__iterator(t, n);
                        return new w(function () {
                            var e = r.next();
                            if (!e.done) {
                                var t = e.value[0];
                                e.value[0] = e.value[1],
                                    e.value[1] = t
                            }
                            return e
                        })
                    }
                    return e.__iterator(t === _n ? bn : _n, n)
                },
                t
        }

        function lt(e, t, n) {
            var r = Tt(e);
            return r.size = e.size,
                r.has = function (t) {
                    return e.has(t)
                },
                r.get = function (r, o) {
                    var a = e.get(r, gn);
                    return a === gn ? o : t.call(n, a, r, e)
                },
                r.__iterateUncached = function (r, o) {
                    var a = this;
                    return e.__iterate(function (e, o, i) {
                        return !1 !== r(t.call(n, e, o, i), o, a)
                    }, o)
                },
                r.__iteratorUncached = function (r, o) {
                    var a = e.__iterator(wn, o);
                    return new w(function () {
                        var o = a.next();
                        if (o.done)
                            return o;
                        var i = o.value,
                            s = i[0];
                        return x(r, s, t.call(n, i[1], s, e), o)
                    })
                },
                r
        }

        function ct(e, t) {
            var n = Tt(e);
            return n._iter = e,
                n.size = e.size,
                n.reverse = function () {
                    return e
                },
                e.flip && (n.flip = function () {
                    var t = st(e);
                    return t.reverse = function () {
                        return e.flip()
                    },
                        t
                }),
                n.get = function (n, r) {
                    return e.get(t ? n : -1 - n, r)
                },
                n.has = function (n) {
                    return e.has(t ? n : -1 - n)
                },
                n.includes = function (t) {
                    return e.includes(t)
                },
                n.cacheResult = Mt,
                n.__iterate = function (t, n) {
                    var r = this;
                    return e.__iterate(function (e, n) {
                        return t(e, n, r)
                    }, !n)
                },
                n.__iterator = function (t, n) {
                    return e.__iterator(t, !n)
                },
                n
        }

        function ut(e, t, n, r) {
            var o = Tt(e);
            return r && (o.has = function (r) {
                var o = e.get(r, gn);
                return o !== gn && !!t.call(n, o, r, e)
            },
                o.get = function (r, o) {
                    var a = e.get(r, gn);
                    return a !== gn && t.call(n, a, r, e) ? a : o
                }
            ),
                o.__iterateUncached = function (o, a) {
                    var i = this,
                        s = 0;
                    return e.__iterate(function (e, a, l) {
                        if (t.call(n, e, a, l))
                            return s++,
                                o(e, r ? a : s - 1, i)
                    }, a),
                        s
                },
                o.__iteratorUncached = function (o, a) {
                    var i = e.__iterator(wn, a),
                        s = 0;
                    return new w(function () {
                        for (; ;) {
                            var a = i.next();
                            if (a.done)
                                return a;
                            var l = a.value,
                                c = l[0],
                                u = l[1];
                            if (t.call(n, u, c, e))
                                return x(o, r ? c : s++, u, a)
                        }
                    })
                },
                o
        }

        function dt(e, t, n) {
            var r = de().asMutable();
            return e.__iterate(function (o, a) {
                r.update(t.call(n, o, a, e), 0, function (e) {
                    return e + 1
                })
            }),
                r.asImmutable()
        }

        function pt(e, t, n) {
            var r = i(e),
                o = (c(e) ? Qe() : de()).asMutable();
            e.__iterate(function (a, i) {
                o.update(t.call(n, a, i, e), function (e) {
                    return e = e || [],
                        e.push(r ? [i, a] : a),
                        e
                })
            });
            var a = Ct(e);
            return o.map(function (t) {
                return kt(e, a(t))
            })
        }

        function ht(e, t, n, r) {
            var o = e.size;
            if (void 0 !== t && (t |= 0),
                void 0 !== n && (n === 1 / 0 ? n = o : n |= 0),
                y(t, n, o))
                return e;
            var a = v(t, o),
                i = b(n, o);
            if (a !== a || i !== i)
                return ht(e.toSeq().cacheResult(), t, n, r);
            var s, l = i - a;
            l === l && (s = l < 0 ? 0 : l);
            var c = Tt(e);
            return c.size = 0 === s ? s : e.size && s || void 0, !r && L(e) && s >= 0 && (c.get = function (t, n) {
                return t = m(this, t),
                    t >= 0 && t < s ? e.get(t + a, n) : n
            }),
                c.__iterateUncached = function (t, n) {
                    var o = this;
                    if (0 === s)
                        return 0;
                    if (n)
                        return this.cacheResult().__iterate(t, n);
                    var i = 0,
                        l = !0,
                        c = 0;
                    return e.__iterate(function (e, n) {
                        if (!l || !(l = i++ < a))
                            return c++, !1 !== t(e, r ? n : c - 1, o) && c !== s
                    }),
                        c
                },
                c.__iteratorUncached = function (t, n) {
                    if (0 !== s && n)
                        return this.cacheResult().__iterator(t, n);
                    var o = 0 !== s && e.__iterator(t, n),
                        i = 0,
                        l = 0;
                    return new w(function () {
                        for (; i++ < a;)
                            o.next();
                        if (++l > s)
                            return E();
                        var e = o.next();
                        return r || t === _n ? e : t === bn ? x(t, l - 1, void 0, e) : x(t, l - 1, e.value[1], e)
                    })
                },
                c
        }

        function ft(e, t, n) {
            var r = Tt(e);
            return r.__iterateUncached = function (r, o) {
                var a = this;
                if (o)
                    return this.cacheResult().__iterate(r, o);
                var i = 0;
                return e.__iterate(function (e, o, s) {
                    return t.call(n, e, o, s) && ++i && r(e, o, a)
                }),
                    i
            },
                r.__iteratorUncached = function (r, o) {
                    var a = this;
                    if (o)
                        return this.cacheResult().__iterator(r, o);
                    var i = e.__iterator(wn, o),
                        s = !0;
                    return new w(function () {
                        if (!s)
                            return E();
                        var e = i.next();
                        if (e.done)
                            return e;
                        var o = e.value,
                            l = o[0],
                            c = o[1];
                        return t.call(n, c, l, a) ? r === wn ? e : x(r, l, c, e) : (s = !1,
                            E())
                    })
                },
                r
        }

        function mt(e, t, n, r) {
            var o = Tt(e);
            return o.__iterateUncached = function (o, a) {
                var i = this;
                if (a)
                    return this.cacheResult().__iterate(o, a);
                var s = !0,
                    l = 0;
                return e.__iterate(function (e, a, c) {
                    if (!s || !(s = t.call(n, e, a, c)))
                        return l++,
                            o(e, r ? a : l - 1, i)
                }),
                    l
            },
                o.__iteratorUncached = function (o, a) {
                    var i = this;
                    if (a)
                        return this.cacheResult().__iterator(o, a);
                    var s = e.__iterator(wn, a),
                        l = !0,
                        c = 0;
                    return new w(function () {
                        var e, a, u;
                        do {
                            if (e = s.next(),
                                e.done)
                                return r || o === _n ? e : o === bn ? x(o, c++, void 0, e) : x(o, c++, e.value[1], e);
                            var d = e.value;
                            a = d[0],
                                u = d[1],
                                l && (l = t.call(n, u, a, i))
                        } while (l);
                        return o === wn ? e : x(o, a, u, e)
                    })
                },
                o
        }

        function gt(e, t) {
            var r = i(e),
                o = [e].concat(t).map(function (e) {
                    return a(e) ? r && (e = n(e)) : e = r ? F(e) : q(Array.isArray(e) ? e : [e]),
                        e
                }).filter(function (e) {
                    return 0 !== e.size
                });
            if (0 === o.length)
                return e;
            if (1 === o.length) {
                var l = o[0];
                if (l === e || r && i(l) || s(e) && s(l))
                    return l
            }
            var c = new j(o);
            return r ? c = c.toKeyedSeq() : s(e) || (c = c.toSetSeq()),
                c = c.flatten(!0),
                c.size = o.reduce(function (e, t) {
                    if (void 0 !== e) {
                        var n = t.size;
                        if (void 0 !== n)
                            return e + n
                    }
                }, 0),
                c
        }

        function yt(e, t, n) {
            var r = Tt(e);
            return r.__iterateUncached = function (r, o) {
                function i(e, c) {
                    var u = this;
                    e.__iterate(function (e, o) {
                        return (!t || c < t) && a(e) ? i(e, c + 1) : !1 === r(e, n ? o : s++, u) && (l = !0), !l
                    }, o)
                }
                var s = 0,
                    l = !1;
                return i(e, 0),
                    s
            },
                r.__iteratorUncached = function (r, o) {
                    var i = e.__iterator(r, o),
                        s = [],
                        l = 0;
                    return new w(function () {
                        for (; i;) {
                            var e = i.next();
                            if (!1 === e.done) {
                                var c = e.value;
                                if (r === wn && (c = c[1]),
                                    t && !(s.length < t) || !a(c))
                                    return n ? e : x(r, l++, c, e);
                                s.push(i),
                                    i = c.__iterator(r, o)
                            } else
                                i = s.pop()
                        }
                        return E()
                    })
                },
                r
        }

        function vt(e, t, n) {
            var r = Ct(e);
            return e.toSeq().map(function (o, a) {
                return r(t.call(n, o, a, e))
            }).flatten(!0)
        }

        function bt(e, t) {
            var n = Tt(e);
            return n.size = e.size && 2 * e.size - 1,
                n.__iterateUncached = function (n, r) {
                    var o = this,
                        a = 0;
                    return e.__iterate(function (e, r) {
                        return (!a || !1 !== n(t, a++, o)) && !1 !== n(e, a++, o)
                    }, r),
                        a
                },
                n.__iteratorUncached = function (n, r) {
                    var o, a = e.__iterator(_n, r),
                        i = 0;
                    return new w(function () {
                        return (!o || i % 2) && (o = a.next(),
                            o.done) ? o : i % 2 ? x(n, i++, t) : x(n, i++, o.value, o)
                    })
                },
                n
        }

        function _t(e, t, n) {
            t || (t = At);
            var r = i(e),
                o = 0,
                a = e.toSeq().map(function (t, r) {
                    return [r, t, o++, n ? n(t, r, e) : t]
                }).toArray();
            return a.sort(function (e, n) {
                return t(e[3], n[3]) || e[2] - n[2]
            }).forEach(r ? function (e, t) {
                a[t].length = 2
            } :
                function (e, t) {
                    a[t] = e[1]
                }
            ),
                r ? A(a) : s(e) ? P(a) : N(a)
        }

        function wt(e, t, n) {
            if (t || (t = At),
                n) {
                var r = e.toSeq().map(function (t, r) {
                    return [t, n(t, r, e)]
                }).reduce(function (e, n) {
                    return xt(t, e[1], n[1]) ? n : e
                });
                return r && r[0]
            }
            return e.reduce(function (e, n) {
                return xt(t, e, n) ? n : e
            })
        }

        function xt(e, t, n) {
            var r = e(n, t);
            return 0 === r && n !== t && (void 0 === n || null === n || n !== n) || r > 0
        }

        function Et(e, n, r) {
            var o = Tt(e);
            return o.size = new j(r).map(function (e) {
                return e.size
            }).min(),
                o.__iterate = function (e, t) {
                    for (var n, r = this.__iterator(_n, t), o = 0; !(n = r.next()).done && !1 !== e(n.value, o++, this);)
                        ;
                    return o
                },
                o.__iteratorUncached = function (e, o) {
                    var a = r.map(function (e) {
                        return e = t(e),
                            O(o ? e.reverse() : e)
                    }),
                        i = 0,
                        s = !1;
                    return new w(function () {
                        var t;
                        return s || (t = a.map(function (e) {
                            return e.next()
                        }),
                            s = t.some(function (e) {
                                return e.done
                            })),
                            s ? E() : x(e, i++, n.apply(null, t.map(function (e) {
                                return e.value
                            })))
                    })
                },
                o
        }

        function kt(e, t) {
            return L(e) ? t : e.constructor(t)
        }

        function St(e) {
            if (e !== Object(e))
                throw new TypeError("Expected [K, V] tuple: " + e)
        }

        function Ot(e) {
            return ue(e.size),
                f(e)
        }

        function Ct(e) {
            return i(e) ? n : s(e) ? r : o
        }

        function Tt(e) {
            return Object.create((i(e) ? A : s(e) ? P : N).prototype)
        }

        function Mt() {
            return this._iter.cacheResult ? (this._iter.cacheResult(),
                this.size = this._iter.size,
                this) : M.prototype.cacheResult.call(this)
        }

        function At(e, t) {
            return e > t ? 1 : e < t ? -1 : 0
        }

        function Pt(e) {
            var n = O(e);
            if (!n) {
                if (!T(e))
                    throw new TypeError("Expected iterable or array-like: " + e);
                n = O(t(e))
            }
            return n
        }

        function Nt(e, t) {
            var n, r = function (a) {
                if (a instanceof r)
                    return a;
                if (!(this instanceof r))
                    return new r(a);
                if (!n) {
                    n = !0;
                    var i = Object.keys(e);
                    Rt(o, i),
                        o.size = i.length,
                        o._name = t,
                        o._keys = i,
                        o._defaultValues = e
                }
                this._map = de(a)
            },
                o = r.prototype = Object.create(Zn);
            return o.constructor = r,
                r
        }

        function jt(e, t, n) {
            var r = Object.create(Object.getPrototypeOf(e));
            return r._map = t,
                r.__ownerID = n,
                r
        }

        function Dt(e) {
            return e._name || e.constructor.name || "Record"
        }

        function Rt(e, t) {
            try {
                t.forEach(It.bind(void 0, e))
            } catch (e) { }
        }

        function It(e, t) {
            Object.defineProperty(e, t, {
                get: function () {
                    return this.get(t)
                },
                set: function (e) {
                    Q(this.__ownerID, "Cannot set on an immutable record."),
                        this.set(t, e)
                }
            })
        }

        function Lt(e) {
            return null === e || void 0 === e ? zt() : Bt(e) && !c(e) ? e : zt().withMutations(function (t) {
                var n = o(e);
                ue(n.size),
                    n.forEach(function (e) {
                        return t.add(e)
                    })
            })
        }

        function Bt(e) {
            return !(!e || !e[Qn])
        }

        function Ft(e, t) {
            return e.__ownerID ? (e.size = t.size,
                e._map = t,
                e) : t === e._map ? e : 0 === t.size ? e.__empty() : e.__make(t)
        }

        function qt(e, t) {
            var n = Object.create($n);
            return n.size = e ? e.size : 0,
                n._map = e,
                n.__ownerID = t,
                n
        }

        function zt() {
            return er || (er = qt(xe()))
        }

        function Wt(e) {
            return null === e || void 0 === e ? Yt() : Ut(e) ? e : Yt().withMutations(function (t) {
                var n = o(e);
                ue(n.size),
                    n.forEach(function (e) {
                        return t.add(e)
                    })
            })
        }

        function Ut(e) {
            return Bt(e) && c(e)
        }

        function Ht(e, t) {
            var n = Object.create(tr);
            return n.size = e ? e.size : 0,
                n._map = e,
                n.__ownerID = t,
                n
        }

        function Yt() {
            return nr || (nr = Ht(tt()))
        }

        function Gt(e) {
            return null === e || void 0 === e ? Xt() : Kt(e) ? e : Xt().unshiftAll(e)
        }

        function Kt(e) {
            return !(!e || !e[rr])
        }

        function Vt(e, t, n, r) {
            var o = Object.create(or);
            return o.size = e,
                o._head = t,
                o.__ownerID = n,
                o.__hash = r,
                o.__altered = !1,
                o
        }

        function Xt() {
            return ar || (ar = Vt(0))
        }

        function Jt(e, t) {
            var n = function (n) {
                e.prototype[n] = t[n]
            };
            return Object.keys(t).forEach(n),
                Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(t).forEach(n),
                e
        }

        function Zt(e, t) {
            return t
        }

        function Qt(e, t) {
            return [t, e]
        }

        function $t(e) {
            return function () {
                return !e.apply(this, arguments)
            }
        }

        function en(e) {
            return function () {
                return -e.apply(this, arguments)
            }
        }

        function tn(e) {
            return "string" === typeof e ? JSON.stringify(e) : String(e)
        }

        function nn() {
            return h(arguments)
        }

        function rn(e, t) {
            return e < t ? 1 : e > t ? -1 : 0
        }

        function on(e) {
            if (e.size === 1 / 0)
                return 0;
            var t = c(e),
                n = i(e),
                r = t ? 1 : 0;
            return an(e.__iterate(n ? t ? function (e, t) {
                r = 31 * r + sn(ae(e), ae(t)) | 0
            } :
                function (e, t) {
                    r = r + sn(ae(e), ae(t)) | 0
                } :
                t ? function (e) {
                    r = 31 * r + ae(e) | 0
                } :
                    function (e) {
                        r = r + ae(e) | 0
                    }
            ), r)
        }

        function an(e, t) {
            return t = An(t, 3432918353),
                t = An(t << 15 | t >>> -15, 461845907),
                t = An(t << 13 | t >>> -13, 5),
                t = (t + 3864292196 | 0) ^ e,
                t = An(t ^ t >>> 16, 2246822507),
                t = An(t ^ t >>> 13, 3266489909),
                t = oe(t ^ t >>> 16)
        }

        function sn(e, t) {
            return e ^ t + 2654435769 + (e << 6) + (e >> 2) | 0
        }
        var ln = Array.prototype.slice;
        e(n, t),
            e(r, t),
            e(o, t),
            t.isIterable = a,
            t.isKeyed = i,
            t.isIndexed = s,
            t.isAssociative = l,
            t.isOrdered = c,
            t.Keyed = n,
            t.Indexed = r,
            t.Set = o;
        var cn = "@@__IMMUTABLE_ITERABLE__@@",
            un = "@@__IMMUTABLE_KEYED__@@",
            dn = "@@__IMMUTABLE_INDEXED__@@",
            pn = "@@__IMMUTABLE_ORDERED__@@",
            hn = 5,
            fn = 1 << hn,
            mn = fn - 1,
            gn = {},
            yn = {
                value: !1
            },
            vn = {
                value: !1
            },
            bn = 0,
            _n = 1,
            wn = 2,
            xn = "function" === typeof Symbol && Symbol.iterator,
            En = "@@iterator",
            kn = xn || En;
        w.prototype.toString = function () {
            return "[Iterator]"
        },
            w.KEYS = bn,
            w.VALUES = _n,
            w.ENTRIES = wn,
            w.prototype.inspect = w.prototype.toSource = function () {
                return this.toString()
            },
            w.prototype[kn] = function () {
                return this
            },
            e(M, t),
            M.of = function () {
                return M(arguments)
            },
            M.prototype.toSeq = function () {
                return this
            },
            M.prototype.toString = function () {
                return this.__toString("Seq {", "}")
            },
            M.prototype.cacheResult = function () {
                return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(),
                    this.size = this._cache.length),
                    this
            },
            M.prototype.__iterate = function (e, t) {
                return U(this, e, t, !0)
            },
            M.prototype.__iterator = function (e, t) {
                return H(this, e, t, !0)
            },
            e(A, M),
            A.prototype.toKeyedSeq = function () {
                return this
            },
            e(P, M),
            P.of = function () {
                return P(arguments)
            },
            P.prototype.toIndexedSeq = function () {
                return this
            },
            P.prototype.toString = function () {
                return this.__toString("Seq [", "]")
            },
            P.prototype.__iterate = function (e, t) {
                return U(this, e, t, !1)
            },
            P.prototype.__iterator = function (e, t) {
                return H(this, e, t, !1)
            },
            e(N, M),
            N.of = function () {
                return N(arguments)
            },
            N.prototype.toSetSeq = function () {
                return this
            },
            M.isSeq = L,
            M.Keyed = A,
            M.Set = N,
            M.Indexed = P;
        var Sn = "@@__IMMUTABLE_SEQ__@@";
        M.prototype[Sn] = !0,
            e(j, P),
            j.prototype.get = function (e, t) {
                return this.has(e) ? this._array[m(this, e)] : t
            },
            j.prototype.__iterate = function (e, t) {
                for (var n = this._array, r = n.length - 1, o = 0; o <= r; o++)
                    if (!1 === e(n[t ? r - o : o], o, this))
                        return o + 1;
                return o
            },
            j.prototype.__iterator = function (e, t) {
                var n = this._array,
                    r = n.length - 1,
                    o = 0;
                return new w(function () {
                    return o > r ? E() : x(e, o, n[t ? r - o++ : o++])
                })
            },
            e(D, A),
            D.prototype.get = function (e, t) {
                return void 0 === t || this.has(e) ? this._object[e] : t
            },
            D.prototype.has = function (e) {
                return this._object.hasOwnProperty(e)
            },
            D.prototype.__iterate = function (e, t) {
                for (var n = this._object, r = this._keys, o = r.length - 1, a = 0; a <= o; a++) {
                    var i = r[t ? o - a : a];
                    if (!1 === e(n[i], i, this))
                        return a + 1
                }
                return a
            },
            D.prototype.__iterator = function (e, t) {
                var n = this._object,
                    r = this._keys,
                    o = r.length - 1,
                    a = 0;
                return new w(function () {
                    var i = r[t ? o - a : a];
                    return a++ > o ? E() : x(e, i, n[i])
                })
            },
            D.prototype[pn] = !0,
            e(R, P),
            R.prototype.__iterateUncached = function (e, t) {
                if (t)
                    return this.cacheResult().__iterate(e, t);
                var n = this._iterable,
                    r = O(n),
                    o = 0;
                if (S(r))
                    for (var a; !(a = r.next()).done && !1 !== e(a.value, o++, this);)
                        ;
                return o
            },
            R.prototype.__iteratorUncached = function (e, t) {
                if (t)
                    return this.cacheResult().__iterator(e, t);
                var n = this._iterable,
                    r = O(n);
                if (!S(r))
                    return new w(E);
                var o = 0;
                return new w(function () {
                    var t = r.next();
                    return t.done ? t : x(e, o++, t.value)
                })
            },
            e(I, P),
            I.prototype.__iterateUncached = function (e, t) {
                if (t)
                    return this.cacheResult().__iterate(e, t);
                for (var n = this._iterator, r = this._iteratorCache, o = 0; o < r.length;)
                    if (!1 === e(r[o], o++, this))
                        return o;
                for (var a; !(a = n.next()).done;) {
                    var i = a.value;
                    if (r[o] = i, !1 === e(i, o++, this))
                        break
                }
                return o
            },
            I.prototype.__iteratorUncached = function (e, t) {
                if (t)
                    return this.cacheResult().__iterator(e, t);
                var n = this._iterator,
                    r = this._iteratorCache,
                    o = 0;
                return new w(function () {
                    if (o >= r.length) {
                        var t = n.next();
                        if (t.done)
                            return t;
                        r[o] = t.value
                    }
                    return x(e, o, r[o++])
                })
            };
        var On;
        e(Z, P),
            Z.prototype.toString = function () {
                return 0 === this.size ? "Repeat []" : "Repeat [ " + this._value + " " + this.size + " times ]"
            },
            Z.prototype.get = function (e, t) {
                return this.has(e) ? this._value : t
            },
            Z.prototype.includes = function (e) {
                return X(this._value, e)
            },
            Z.prototype.slice = function (e, t) {
                var n = this.size;
                return y(e, t, n) ? this : new Z(this._value, b(t, n) - v(e, n))
            },
            Z.prototype.reverse = function () {
                return this
            },
            Z.prototype.indexOf = function (e) {
                return X(this._value, e) ? 0 : -1
            },
            Z.prototype.lastIndexOf = function (e) {
                return X(this._value, e) ? this.size : -1
            },
            Z.prototype.__iterate = function (e, t) {
                for (var n = 0; n < this.size; n++)
                    if (!1 === e(this._value, n, this))
                        return n + 1;
                return n
            },
            Z.prototype.__iterator = function (e, t) {
                var n = this,
                    r = 0;
                return new w(function () {
                    return r < n.size ? x(e, r++, n._value) : E()
                })
            },
            Z.prototype.equals = function (e) {
                return e instanceof Z ? X(this._value, e._value) : J(e)
            };
        var Cn;
        e($, P),
            $.prototype.toString = function () {
                return 0 === this.size ? "Range []" : "Range [ " + this._start + "..." + this._end + (1 !== this._step ? " by " + this._step : "") + " ]"
            },
            $.prototype.get = function (e, t) {
                return this.has(e) ? this._start + m(this, e) * this._step : t
            },
            $.prototype.includes = function (e) {
                var t = (e - this._start) / this._step;
                return t >= 0 && t < this.size && t === Math.floor(t)
            },
            $.prototype.slice = function (e, t) {
                return y(e, t, this.size) ? this : (e = v(e, this.size),
                    t = b(t, this.size),
                    t <= e ? new $(0, 0) : new $(this.get(e, this._end), this.get(t, this._end), this._step))
            },
            $.prototype.indexOf = function (e) {
                var t = e - this._start;
                if (t % this._step === 0) {
                    var n = t / this._step;
                    if (n >= 0 && n < this.size)
                        return n
                }
                return -1
            },
            $.prototype.lastIndexOf = function (e) {
                return this.indexOf(e)
            },
            $.prototype.__iterate = function (e, t) {
                for (var n = this.size - 1, r = this._step, o = t ? this._start + n * r : this._start, a = 0; a <= n; a++) {
                    if (!1 === e(o, a, this))
                        return a + 1;
                    o += t ? -r : r
                }
                return a
            },
            $.prototype.__iterator = function (e, t) {
                var n = this.size - 1,
                    r = this._step,
                    o = t ? this._start + n * r : this._start,
                    a = 0;
                return new w(function () {
                    var i = o;
                    return o += t ? -r : r,
                        a > n ? E() : x(e, a++, i)
                })
            },
            $.prototype.equals = function (e) {
                return e instanceof $ ? this._start === e._start && this._end === e._end && this._step === e._step : J(this, e)
            };
        var Tn;
        e(ee, t),
            e(te, ee),
            e(ne, ee),
            e(re, ee),
            ee.Keyed = te,
            ee.Indexed = ne,
            ee.Set = re;
        var Mn, An = "function" === typeof Math.imul && -2 === Math.imul(4294967295, 2) ? Math.imul : function (e, t) {
            e |= 0,
                t |= 0;
            var n = 65535 & e,
                r = 65535 & t;
            return n * r + ((e >>> 16) * r + n * (t >>> 16) << 16 >>> 0) | 0
        },
            Pn = Object.isExtensible,
            Nn = function () {
                try {
                    return Object.defineProperty({}, "@", {}), !0
                } catch (e) {
                    return !1
                }
            }(),
            jn = "function" === typeof WeakMap;
        jn && (Mn = new WeakMap);
        var Dn = 0,
            Rn = "__immutablehash__";
        "function" === typeof Symbol && (Rn = Symbol(Rn));
        var In = 16,
            Ln = 255,
            Bn = 0,
            Fn = {};
        e(de, te),
            de.of = function () {
                var e = ln.call(arguments, 0);
                return xe().withMutations(function (t) {
                    for (var n = 0; n < e.length; n += 2) {
                        if (n + 1 >= e.length)
                            throw new Error("Missing value for key: " + e[n]);
                        t.set(e[n], e[n + 1])
                    }
                })
            },
            de.prototype.toString = function () {
                return this.__toString("Map {", "}")
            },
            de.prototype.get = function (e, t) {
                return this._root ? this._root.get(0, void 0, e, t) : t
            },
            de.prototype.set = function (e, t) {
                return Ee(this, e, t)
            },
            de.prototype.setIn = function (e, t) {
                return this.updateIn(e, gn, function () {
                    return t
                })
            },
            de.prototype.remove = function (e) {
                return Ee(this, e, gn)
            },
            de.prototype.deleteIn = function (e) {
                return this.updateIn(e, function () {
                    return gn
                })
            },
            de.prototype.update = function (e, t, n) {
                return 1 === arguments.length ? e(this) : this.updateIn([e], t, n)
            },
            de.prototype.updateIn = function (e, t, n) {
                n || (n = t,
                    t = void 0);
                var r = De(this, Pt(e), t, n);
                return r === gn ? void 0 : r
            },
            de.prototype.clear = function () {
                return 0 === this.size ? this : this.__ownerID ? (this.size = 0,
                    this._root = null,
                    this.__hash = void 0,
                    this.__altered = !0,
                    this) : xe()
            },
            de.prototype.merge = function () {
                return Ae(this, void 0, arguments)
            },
            de.prototype.mergeWith = function (e) {
                return Ae(this, e, ln.call(arguments, 1))
            },
            de.prototype.mergeIn = function (e) {
                var t = ln.call(arguments, 1);
                return this.updateIn(e, xe(), function (e) {
                    return "function" === typeof e.merge ? e.merge.apply(e, t) : t[t.length - 1]
                })
            },
            de.prototype.mergeDeep = function () {
                return Ae(this, Pe, arguments)
            },
            de.prototype.mergeDeepWith = function (e) {
                var t = ln.call(arguments, 1);
                return Ae(this, Ne(e), t)
            },
            de.prototype.mergeDeepIn = function (e) {
                var t = ln.call(arguments, 1);
                return this.updateIn(e, xe(), function (e) {
                    return "function" === typeof e.mergeDeep ? e.mergeDeep.apply(e, t) : t[t.length - 1]
                })
            },
            de.prototype.sort = function (e) {
                return Qe(_t(this, e))
            },
            de.prototype.sortBy = function (e, t) {
                return Qe(_t(this, t, e))
            },
            de.prototype.withMutations = function (e) {
                var t = this.asMutable();
                return e(t),
                    t.wasAltered() ? t.__ensureOwner(this.__ownerID) : this
            },
            de.prototype.asMutable = function () {
                return this.__ownerID ? this : this.__ensureOwner(new p)
            },
            de.prototype.asImmutable = function () {
                return this.__ensureOwner()
            },
            de.prototype.wasAltered = function () {
                return this.__altered
            },
            de.prototype.__iterator = function (e, t) {
                return new ve(this, e, t)
            },
            de.prototype.__iterate = function (e, t) {
                var n = this,
                    r = 0;
                return this._root && this._root.iterate(function (t) {
                    return r++,
                        e(t[1], t[0], n)
                }, t),
                    r
            },
            de.prototype.__ensureOwner = function (e) {
                return e === this.__ownerID ? this : e ? we(this.size, this._root, e, this.__hash) : (this.__ownerID = e,
                    this.__altered = !1,
                    this)
            },
            de.isMap = pe;
        var qn = "@@__IMMUTABLE_MAP__@@",
            zn = de.prototype;
        zn[qn] = !0,
            zn.delete = zn.remove,
            zn.removeIn = zn.deleteIn,
            he.prototype.get = function (e, t, n, r) {
                for (var o = this.entries, a = 0, i = o.length; a < i; a++)
                    if (X(n, o[a][0]))
                        return o[a][1];
                return r
            },
            he.prototype.update = function (e, t, n, r, o, a, i) {
                for (var s = o === gn, l = this.entries, c = 0, u = l.length; c < u && !X(r, l[c][0]); c++)
                    ;
                var p = c < u;
                if (p ? l[c][1] === o : s)
                    return this;
                if (d(i),
                    (s || !p) && d(a), !s || 1 !== l.length) {
                    if (!p && !s && l.length >= Un)
                        return Ce(e, l, r, o);
                    var f = e && e === this.ownerID,
                        m = f ? l : h(l);
                    return p ? s ? c === u - 1 ? m.pop() : m[c] = m.pop() : m[c] = [r, o] : m.push([r, o]),
                        f ? (this.entries = m,
                            this) : new he(e, m)
                }
            },
            fe.prototype.get = function (e, t, n, r) {
                void 0 === t && (t = ae(n));
                var o = 1 << ((0 === e ? t : t >>> e) & mn),
                    a = this.bitmap;
                return 0 === (a & o) ? r : this.nodes[Re(a & o - 1)].get(e + hn, t, n, r)
            },
            fe.prototype.update = function (e, t, n, r, o, a, i) {
                void 0 === n && (n = ae(r));
                var s = (0 === t ? n : n >>> t) & mn,
                    l = 1 << s,
                    c = this.bitmap,
                    u = 0 !== (c & l);
                if (!u && o === gn)
                    return this;
                var d = Re(c & l - 1),
                    p = this.nodes,
                    h = u ? p[d] : void 0,
                    f = ke(h, e, t + hn, n, r, o, a, i);
                if (f === h)
                    return this;
                if (!u && f && p.length >= Hn)
                    return Me(e, p, c, s, f);
                if (u && !f && 2 === p.length && Se(p[1 ^ d]))
                    return p[1 ^ d];
                if (u && f && 1 === p.length && Se(f))
                    return f;
                var m = e && e === this.ownerID,
                    g = u ? f ? c : c ^ l : c | l,
                    y = u ? f ? Ie(p, d, f, m) : Be(p, d, m) : Le(p, d, f, m);
                return m ? (this.bitmap = g,
                    this.nodes = y,
                    this) : new fe(e, g, y)
            },
            me.prototype.get = function (e, t, n, r) {
                void 0 === t && (t = ae(n));
                var o = (0 === e ? t : t >>> e) & mn,
                    a = this.nodes[o];
                return a ? a.get(e + hn, t, n, r) : r
            },
            me.prototype.update = function (e, t, n, r, o, a, i) {
                void 0 === n && (n = ae(r));
                var s = (0 === t ? n : n >>> t) & mn,
                    l = o === gn,
                    c = this.nodes,
                    u = c[s];
                if (l && !u)
                    return this;
                var d = ke(u, e, t + hn, n, r, o, a, i);
                if (d === u)
                    return this;
                var p = this.count;
                if (u) {
                    if (!d && --p < Yn)
                        return Te(e, c, p, s)
                } else
                    p++;
                var h = e && e === this.ownerID,
                    f = Ie(c, s, d, h);
                return h ? (this.count = p,
                    this.nodes = f,
                    this) : new me(e, p, f)
            },
            ge.prototype.get = function (e, t, n, r) {
                for (var o = this.entries, a = 0, i = o.length; a < i; a++)
                    if (X(n, o[a][0]))
                        return o[a][1];
                return r
            },
            ge.prototype.update = function (e, t, n, r, o, a, i) {
                void 0 === n && (n = ae(r));
                var s = o === gn;
                if (n !== this.keyHash)
                    return s ? this : (d(i),
                        d(a),
                        Oe(this, e, t, n, [r, o]));
                for (var l = this.entries, c = 0, u = l.length; c < u && !X(r, l[c][0]); c++)
                    ;
                var p = c < u;
                if (p ? l[c][1] === o : s)
                    return this;
                if (d(i),
                    (s || !p) && d(a),
                    s && 2 === u)
                    return new ye(e, this.keyHash, l[1 ^ c]);
                var f = e && e === this.ownerID,
                    m = f ? l : h(l);
                return p ? s ? c === u - 1 ? m.pop() : m[c] = m.pop() : m[c] = [r, o] : m.push([r, o]),
                    f ? (this.entries = m,
                        this) : new ge(e, this.keyHash, m)
            },
            ye.prototype.get = function (e, t, n, r) {
                return X(n, this.entry[0]) ? this.entry[1] : r
            },
            ye.prototype.update = function (e, t, n, r, o, a, i) {
                var s = o === gn,
                    l = X(r, this.entry[0]);
                return (l ? o === this.entry[1] : s) ? this : (d(i),
                    s ? void d(a) : l ? e && e === this.ownerID ? (this.entry[1] = o,
                        this) : new ye(e, this.keyHash, [r, o]) : (d(a),
                            Oe(this, e, t, ae(r), [r, o])))
            },
            he.prototype.iterate = ge.prototype.iterate = function (e, t) {
                for (var n = this.entries, r = 0, o = n.length - 1; r <= o; r++)
                    if (!1 === e(n[t ? o - r : r]))
                        return !1
            },
            fe.prototype.iterate = me.prototype.iterate = function (e, t) {
                for (var n = this.nodes, r = 0, o = n.length - 1; r <= o; r++) {
                    var a = n[t ? o - r : r];
                    if (a && !1 === a.iterate(e, t))
                        return !1
                }
            },
            ye.prototype.iterate = function (e, t) {
                return e(this.entry)
            },
            e(ve, w),
            ve.prototype.next = function () {
                for (var e = this._type, t = this._stack; t;) {
                    var n, r = t.node,
                        o = t.index++;
                    if (r.entry) {
                        if (0 === o)
                            return be(e, r.entry)
                    } else if (r.entries) {
                        if (n = r.entries.length - 1,
                            o <= n)
                            return be(e, r.entries[this._reverse ? n - o : o])
                    } else if (n = r.nodes.length - 1,
                        o <= n) {
                        var a = r.nodes[this._reverse ? n - o : o];
                        if (a) {
                            if (a.entry)
                                return be(e, a.entry);
                            t = this._stack = _e(a, t)
                        }
                        continue
                    }
                    t = this._stack = this._stack.__prev
                }
                return E()
            };
        var Wn, Un = fn / 4,
            Hn = fn / 2,
            Yn = fn / 4;
        e(Fe, ne),
            Fe.of = function () {
                return this(arguments)
            },
            Fe.prototype.toString = function () {
                return this.__toString("List [", "]")
            },
            Fe.prototype.get = function (e, t) {
                if ((e = m(this, e)) >= 0 && e < this.size) {
                    e += this._origin;
                    var n = Ve(this, e);
                    return n && n.array[e & mn]
                }
                return t
            },
            Fe.prototype.set = function (e, t) {
                return Ye(this, e, t)
            },
            Fe.prototype.remove = function (e) {
                return this.has(e) ? 0 === e ? this.shift() : e === this.size - 1 ? this.pop() : this.splice(e, 1) : this
            },
            Fe.prototype.insert = function (e, t) {
                return this.splice(e, 0, t)
            },
            Fe.prototype.clear = function () {
                return 0 === this.size ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0,
                    this._level = hn,
                    this._root = this._tail = null,
                    this.__hash = void 0,
                    this.__altered = !0,
                    this) : He()
            },
            Fe.prototype.push = function () {
                var e = arguments,
                    t = this.size;
                return this.withMutations(function (n) {
                    Xe(n, 0, t + e.length);
                    for (var r = 0; r < e.length; r++)
                        n.set(t + r, e[r])
                })
            },
            Fe.prototype.pop = function () {
                return Xe(this, 0, -1)
            },
            Fe.prototype.unshift = function () {
                var e = arguments;
                return this.withMutations(function (t) {
                    Xe(t, -e.length);
                    for (var n = 0; n < e.length; n++)
                        t.set(n, e[n])
                })
            },
            Fe.prototype.shift = function () {
                return Xe(this, 1)
            },
            Fe.prototype.merge = function () {
                return Je(this, void 0, arguments)
            },
            Fe.prototype.mergeWith = function (e) {
                return Je(this, e, ln.call(arguments, 1))
            },
            Fe.prototype.mergeDeep = function () {
                return Je(this, Pe, arguments)
            },
            Fe.prototype.mergeDeepWith = function (e) {
                var t = ln.call(arguments, 1);
                return Je(this, Ne(e), t)
            },
            Fe.prototype.setSize = function (e) {
                return Xe(this, 0, e)
            },
            Fe.prototype.slice = function (e, t) {
                var n = this.size;
                return y(e, t, n) ? this : Xe(this, v(e, n), b(t, n))
            },
            Fe.prototype.__iterator = function (e, t) {
                var n = 0,
                    r = We(this, t);
                return new w(function () {
                    var t = r();
                    return t === Xn ? E() : x(e, n++, t)
                })
            },
            Fe.prototype.__iterate = function (e, t) {
                for (var n, r = 0, o = We(this, t);
                    (n = o()) !== Xn && !1 !== e(n, r++, this);)
                    ;
                return r
            },
            Fe.prototype.__ensureOwner = function (e) {
                return e === this.__ownerID ? this : e ? Ue(this._origin, this._capacity, this._level, this._root, this._tail, e, this.__hash) : (this.__ownerID = e,
                    this)
            },
            Fe.isList = qe;
        var Gn = "@@__IMMUTABLE_LIST__@@",
            Kn = Fe.prototype;
        Kn[Gn] = !0,
            Kn.delete = Kn.remove,
            Kn.setIn = zn.setIn,
            Kn.deleteIn = Kn.removeIn = zn.removeIn,
            Kn.update = zn.update,
            Kn.updateIn = zn.updateIn,
            Kn.mergeIn = zn.mergeIn,
            Kn.mergeDeepIn = zn.mergeDeepIn,
            Kn.withMutations = zn.withMutations,
            Kn.asMutable = zn.asMutable,
            Kn.asImmutable = zn.asImmutable,
            Kn.wasAltered = zn.wasAltered,
            ze.prototype.removeBefore = function (e, t, n) {
                if (n === t ? 1 << t : 0 === this.array.length)
                    return this;
                var r = n >>> t & mn;
                if (r >= this.array.length)
                    return new ze([], e);
                var o, a = 0 === r;
                if (t > 0) {
                    var i = this.array[r];
                    if ((o = i && i.removeBefore(e, t - hn, n)) === i && a)
                        return this
                }
                if (a && !o)
                    return this;
                var s = Ke(this, e);
                if (!a)
                    for (var l = 0; l < r; l++)
                        s.array[l] = void 0;
                return o && (s.array[r] = o),
                    s
            },
            ze.prototype.removeAfter = function (e, t, n) {
                if (n === (t ? 1 << t : 0) || 0 === this.array.length)
                    return this;
                var r = n - 1 >>> t & mn;
                if (r >= this.array.length)
                    return this;
                var o;
                if (t > 0) {
                    var a = this.array[r];
                    if ((o = a && a.removeAfter(e, t - hn, n)) === a && r === this.array.length - 1)
                        return this
                }
                var i = Ke(this, e);
                return i.array.splice(r + 1),
                    o && (i.array[r] = o),
                    i
            };
        var Vn, Xn = {};
        e(Qe, de),
            Qe.of = function () {
                return this(arguments)
            },
            Qe.prototype.toString = function () {
                return this.__toString("OrderedMap {", "}")
            },
            Qe.prototype.get = function (e, t) {
                var n = this._map.get(e);
                return void 0 !== n ? this._list.get(n)[1] : t
            },
            Qe.prototype.clear = function () {
                return 0 === this.size ? this : this.__ownerID ? (this.size = 0,
                    this._map.clear(),
                    this._list.clear(),
                    this) : tt()
            },
            Qe.prototype.set = function (e, t) {
                return nt(this, e, t)
            },
            Qe.prototype.remove = function (e) {
                return nt(this, e, gn)
            },
            Qe.prototype.wasAltered = function () {
                return this._map.wasAltered() || this._list.wasAltered()
            },
            Qe.prototype.__iterate = function (e, t) {
                var n = this;
                return this._list.__iterate(function (t) {
                    return t && e(t[1], t[0], n)
                }, t)
            },
            Qe.prototype.__iterator = function (e, t) {
                return this._list.fromEntrySeq().__iterator(e, t)
            },
            Qe.prototype.__ensureOwner = function (e) {
                if (e === this.__ownerID)
                    return this;
                var t = this._map.__ensureOwner(e),
                    n = this._list.__ensureOwner(e);
                return e ? et(t, n, e, this.__hash) : (this.__ownerID = e,
                    this._map = t,
                    this._list = n,
                    this)
            },
            Qe.isOrderedMap = $e,
            Qe.prototype[pn] = !0,
            Qe.prototype.delete = Qe.prototype.remove;
        var Jn;
        e(rt, A),
            rt.prototype.get = function (e, t) {
                return this._iter.get(e, t)
            },
            rt.prototype.has = function (e) {
                return this._iter.has(e)
            },
            rt.prototype.valueSeq = function () {
                return this._iter.valueSeq()
            },
            rt.prototype.reverse = function () {
                var e = this,
                    t = ct(this, !0);
                return this._useKeys || (t.valueSeq = function () {
                    return e._iter.toSeq().reverse()
                }),
                    t
            },
            rt.prototype.map = function (e, t) {
                var n = this,
                    r = lt(this, e, t);
                return this._useKeys || (r.valueSeq = function () {
                    return n._iter.toSeq().map(e, t)
                }),
                    r
            },
            rt.prototype.__iterate = function (e, t) {
                var n, r = this;
                return this._iter.__iterate(this._useKeys ? function (t, n) {
                    return e(t, n, r)
                } :
                    (n = t ? Ot(this) : 0,
                        function (o) {
                            return e(o, t ? --n : n++, r)
                        }
                    ), t)
            },
            rt.prototype.__iterator = function (e, t) {
                if (this._useKeys)
                    return this._iter.__iterator(e, t);
                var n = this._iter.__iterator(_n, t),
                    r = t ? Ot(this) : 0;
                return new w(function () {
                    var o = n.next();
                    return o.done ? o : x(e, t ? --r : r++, o.value, o)
                })
            },
            rt.prototype[pn] = !0,
            e(ot, P),
            ot.prototype.includes = function (e) {
                return this._iter.includes(e)
            },
            ot.prototype.__iterate = function (e, t) {
                var n = this,
                    r = 0;
                return this._iter.__iterate(function (t) {
                    return e(t, r++, n)
                }, t)
            },
            ot.prototype.__iterator = function (e, t) {
                var n = this._iter.__iterator(_n, t),
                    r = 0;
                return new w(function () {
                    var t = n.next();
                    return t.done ? t : x(e, r++, t.value, t)
                })
            },
            e(at, N),
            at.prototype.has = function (e) {
                return this._iter.includes(e)
            },
            at.prototype.__iterate = function (e, t) {
                var n = this;
                return this._iter.__iterate(function (t) {
                    return e(t, t, n)
                }, t)
            },
            at.prototype.__iterator = function (e, t) {
                var n = this._iter.__iterator(_n, t);
                return new w(function () {
                    var t = n.next();
                    return t.done ? t : x(e, t.value, t.value, t)
                })
            },
            e(it, A),
            it.prototype.entrySeq = function () {
                return this._iter.toSeq()
            },
            it.prototype.__iterate = function (e, t) {
                var n = this;
                return this._iter.__iterate(function (t) {
                    if (t) {
                        St(t);
                        var r = a(t);
                        return e(r ? t.get(1) : t[1], r ? t.get(0) : t[0], n)
                    }
                }, t)
            },
            it.prototype.__iterator = function (e, t) {
                var n = this._iter.__iterator(_n, t);
                return new w(function () {
                    for (; ;) {
                        var t = n.next();
                        if (t.done)
                            return t;
                        var r = t.value;
                        if (r) {
                            St(r);
                            var o = a(r);
                            return x(e, o ? r.get(0) : r[0], o ? r.get(1) : r[1], t)
                        }
                    }
                })
            },
            ot.prototype.cacheResult = rt.prototype.cacheResult = at.prototype.cacheResult = it.prototype.cacheResult = Mt,
            e(Nt, te),
            Nt.prototype.toString = function () {
                return this.__toString(Dt(this) + " {", "}")
            },
            Nt.prototype.has = function (e) {
                return this._defaultValues.hasOwnProperty(e)
            },
            Nt.prototype.get = function (e, t) {
                if (!this.has(e))
                    return t;
                var n = this._defaultValues[e];
                return this._map ? this._map.get(e, n) : n
            },
            Nt.prototype.clear = function () {
                if (this.__ownerID)
                    return this._map && this._map.clear(),
                        this;
                var e = this.constructor;
                return e._empty || (e._empty = jt(this, xe()))
            },
            Nt.prototype.set = function (e, t) {
                if (!this.has(e))
                    throw new Error('Cannot set unknown key "' + e + '" on ' + Dt(this));
                if (this._map && !this._map.has(e)) {
                    if (t === this._defaultValues[e])
                        return this
                }
                var n = this._map && this._map.set(e, t);
                return this.__ownerID || n === this._map ? this : jt(this, n)
            },
            Nt.prototype.remove = function (e) {
                if (!this.has(e))
                    return this;
                var t = this._map && this._map.remove(e);
                return this.__ownerID || t === this._map ? this : jt(this, t)
            },
            Nt.prototype.wasAltered = function () {
                return this._map.wasAltered()
            },
            Nt.prototype.__iterator = function (e, t) {
                var r = this;
                return n(this._defaultValues).map(function (e, t) {
                    return r.get(t)
                }).__iterator(e, t)
            },
            Nt.prototype.__iterate = function (e, t) {
                var r = this;
                return n(this._defaultValues).map(function (e, t) {
                    return r.get(t)
                }).__iterate(e, t)
            },
            Nt.prototype.__ensureOwner = function (e) {
                if (e === this.__ownerID)
                    return this;
                var t = this._map && this._map.__ensureOwner(e);
                return e ? jt(this, t, e) : (this.__ownerID = e,
                    this._map = t,
                    this)
            };
        var Zn = Nt.prototype;
        Zn.delete = Zn.remove,
            Zn.deleteIn = Zn.removeIn = zn.removeIn,
            Zn.merge = zn.merge,
            Zn.mergeWith = zn.mergeWith,
            Zn.mergeIn = zn.mergeIn,
            Zn.mergeDeep = zn.mergeDeep,
            Zn.mergeDeepWith = zn.mergeDeepWith,
            Zn.mergeDeepIn = zn.mergeDeepIn,
            Zn.setIn = zn.setIn,
            Zn.update = zn.update,
            Zn.updateIn = zn.updateIn,
            Zn.withMutations = zn.withMutations,
            Zn.asMutable = zn.asMutable,
            Zn.asImmutable = zn.asImmutable,
            e(Lt, re),
            Lt.of = function () {
                return this(arguments)
            },
            Lt.fromKeys = function (e) {
                return this(n(e).keySeq())
            },
            Lt.prototype.toString = function () {
                return this.__toString("Set {", "}")
            },
            Lt.prototype.has = function (e) {
                return this._map.has(e)
            },
            Lt.prototype.add = function (e) {
                return Ft(this, this._map.set(e, !0))
            },
            Lt.prototype.remove = function (e) {
                return Ft(this, this._map.remove(e))
            },
            Lt.prototype.clear = function () {
                return Ft(this, this._map.clear())
            },
            Lt.prototype.union = function () {
                var e = ln.call(arguments, 0);
                return e = e.filter(function (e) {
                    return 0 !== e.size
                }),
                    0 === e.length ? this : 0 !== this.size || this.__ownerID || 1 !== e.length ? this.withMutations(function (t) {
                        for (var n = 0; n < e.length; n++)
                            o(e[n]).forEach(function (e) {
                                return t.add(e)
                            })
                    }) : this.constructor(e[0])
            },
            Lt.prototype.intersect = function () {
                var e = ln.call(arguments, 0);
                if (0 === e.length)
                    return this;
                e = e.map(function (e) {
                    return o(e)
                });
                var t = this;
                return this.withMutations(function (n) {
                    t.forEach(function (t) {
                        e.every(function (e) {
                            return e.includes(t)
                        }) || n.remove(t)
                    })
                })
            },
            Lt.prototype.subtract = function () {
                var e = ln.call(arguments, 0);
                if (0 === e.length)
                    return this;
                e = e.map(function (e) {
                    return o(e)
                });
                var t = this;
                return this.withMutations(function (n) {
                    t.forEach(function (t) {
                        e.some(function (e) {
                            return e.includes(t)
                        }) && n.remove(t)
                    })
                })
            },
            Lt.prototype.merge = function () {
                return this.union.apply(this, arguments)
            },
            Lt.prototype.mergeWith = function (e) {
                var t = ln.call(arguments, 1);
                return this.union.apply(this, t)
            },
            Lt.prototype.sort = function (e) {
                return Wt(_t(this, e))
            },
            Lt.prototype.sortBy = function (e, t) {
                return Wt(_t(this, t, e))
            },
            Lt.prototype.wasAltered = function () {
                return this._map.wasAltered()
            },
            Lt.prototype.__iterate = function (e, t) {
                var n = this;
                return this._map.__iterate(function (t, r) {
                    return e(r, r, n)
                }, t)
            },
            Lt.prototype.__iterator = function (e, t) {
                return this._map.map(function (e, t) {
                    return t
                }).__iterator(e, t)
            },
            Lt.prototype.__ensureOwner = function (e) {
                if (e === this.__ownerID)
                    return this;
                var t = this._map.__ensureOwner(e);
                return e ? this.__make(t, e) : (this.__ownerID = e,
                    this._map = t,
                    this)
            },
            Lt.isSet = Bt;
        var Qn = "@@__IMMUTABLE_SET__@@",
            $n = Lt.prototype;
        $n[Qn] = !0,
            $n.delete = $n.remove,
            $n.mergeDeep = $n.merge,
            $n.mergeDeepWith = $n.mergeWith,
            $n.withMutations = zn.withMutations,
            $n.asMutable = zn.asMutable,
            $n.asImmutable = zn.asImmutable,
            $n.__empty = zt,
            $n.__make = qt;
        var er;
        e(Wt, Lt),
            Wt.of = function () {
                return this(arguments)
            },
            Wt.fromKeys = function (e) {
                return this(n(e).keySeq())
            },
            Wt.prototype.toString = function () {
                return this.__toString("OrderedSet {", "}")
            },
            Wt.isOrderedSet = Ut;
        var tr = Wt.prototype;
        tr[pn] = !0,
            tr.__empty = Yt,
            tr.__make = Ht;
        var nr;
        e(Gt, ne),
            Gt.of = function () {
                return this(arguments)
            },
            Gt.prototype.toString = function () {
                return this.__toString("Stack [", "]")
            },
            Gt.prototype.get = function (e, t) {
                var n = this._head;
                for (e = m(this, e); n && e--;)
                    n = n.next;
                return n ? n.value : t
            },
            Gt.prototype.peek = function () {
                return this._head && this._head.value
            },
            Gt.prototype.push = function () {
                if (0 === arguments.length)
                    return this;
                for (var e = this.size + arguments.length, t = this._head, n = arguments.length - 1; n >= 0; n--)
                    t = {
                        value: arguments[n],
                        next: t
                    };
                return this.__ownerID ? (this.size = e,
                    this._head = t,
                    this.__hash = void 0,
                    this.__altered = !0,
                    this) : Vt(e, t)
            },
            Gt.prototype.pushAll = function (e) {
                if (e = r(e),
                    0 === e.size)
                    return this;
                ue(e.size);
                var t = this.size,
                    n = this._head;
                return e.reverse().forEach(function (e) {
                    t++,
                        n = {
                            value: e,
                            next: n
                        }
                }),
                    this.__ownerID ? (this.size = t,
                        this._head = n,
                        this.__hash = void 0,
                        this.__altered = !0,
                        this) : Vt(t, n)
            },
            Gt.prototype.pop = function () {
                return this.slice(1)
            },
            Gt.prototype.unshift = function () {
                return this.push.apply(this, arguments)
            },
            Gt.prototype.unshiftAll = function (e) {
                return this.pushAll(e)
            },
            Gt.prototype.shift = function () {
                return this.pop.apply(this, arguments)
            },
            Gt.prototype.clear = function () {
                return 0 === this.size ? this : this.__ownerID ? (this.size = 0,
                    this._head = void 0,
                    this.__hash = void 0,
                    this.__altered = !0,
                    this) : Xt()
            },
            Gt.prototype.slice = function (e, t) {
                if (y(e, t, this.size))
                    return this;
                var n = v(e, this.size);
                if (b(t, this.size) !== this.size)
                    return ne.prototype.slice.call(this, e, t);
                for (var r = this.size - n, o = this._head; n--;)
                    o = o.next;
                return this.__ownerID ? (this.size = r,
                    this._head = o,
                    this.__hash = void 0,
                    this.__altered = !0,
                    this) : Vt(r, o)
            },
            Gt.prototype.__ensureOwner = function (e) {
                return e === this.__ownerID ? this : e ? Vt(this.size, this._head, e, this.__hash) : (this.__ownerID = e,
                    this.__altered = !1,
                    this)
            },
            Gt.prototype.__iterate = function (e, t) {
                if (t)
                    return this.reverse().__iterate(e);
                for (var n = 0, r = this._head; r && !1 !== e(r.value, n++, this);)
                    r = r.next;
                return n
            },
            Gt.prototype.__iterator = function (e, t) {
                if (t)
                    return this.reverse().__iterator(e);
                var n = 0,
                    r = this._head;
                return new w(function () {
                    if (r) {
                        var t = r.value;
                        return r = r.next,
                            x(e, n++, t)
                    }
                    return E()
                })
            },
            Gt.isStack = Kt;
        var rr = "@@__IMMUTABLE_STACK__@@",
            or = Gt.prototype;
        or[rr] = !0,
            or.withMutations = zn.withMutations,
            or.asMutable = zn.asMutable,
            or.asImmutable = zn.asImmutable,
            or.wasAltered = zn.wasAltered;
        var ar;
        t.Iterator = w,
            Jt(t, {
                toArray: function () {
                    ue(this.size);
                    var e = new Array(this.size || 0);
                    return this.valueSeq().__iterate(function (t, n) {
                        e[n] = t
                    }),
                        e
                },
                toIndexedSeq: function () {
                    return new ot(this)
                },
                toJS: function () {
                    return this.toSeq().map(function (e) {
                        return e && "function" === typeof e.toJS ? e.toJS() : e
                    }).__toJS()
                },
                toJSON: function () {
                    return this.toSeq().map(function (e) {
                        return e && "function" === typeof e.toJSON ? e.toJSON() : e
                    }).__toJS()
                },
                toKeyedSeq: function () {
                    return new rt(this, !0)
                },
                toMap: function () {
                    return de(this.toKeyedSeq())
                },
                toObject: function () {
                    ue(this.size);
                    var e = {};
                    return this.__iterate(function (t, n) {
                        e[n] = t
                    }),
                        e
                },
                toOrderedMap: function () {
                    return Qe(this.toKeyedSeq())
                },
                toOrderedSet: function () {
                    return Wt(i(this) ? this.valueSeq() : this)
                },
                toSet: function () {
                    return Lt(i(this) ? this.valueSeq() : this)
                },
                toSetSeq: function () {
                    return new at(this)
                },
                toSeq: function () {
                    return s(this) ? this.toIndexedSeq() : i(this) ? this.toKeyedSeq() : this.toSetSeq()
                },
                toStack: function () {
                    return Gt(i(this) ? this.valueSeq() : this)
                },
                toList: function () {
                    return Fe(i(this) ? this.valueSeq() : this)
                },
                toString: function () {
                    return "[Iterable]"
                },
                __toString: function (e, t) {
                    return 0 === this.size ? e + t : e + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + t
                },
                concat: function () {
                    return kt(this, gt(this, ln.call(arguments, 0)))
                },
                includes: function (e) {
                    return this.some(function (t) {
                        return X(t, e)
                    })
                },
                entries: function () {
                    return this.__iterator(wn)
                },
                every: function (e, t) {
                    ue(this.size);
                    var n = !0;
                    return this.__iterate(function (r, o, a) {
                        if (!e.call(t, r, o, a))
                            return n = !1, !1
                    }),
                        n
                },
                filter: function (e, t) {
                    return kt(this, ut(this, e, t, !0))
                },
                find: function (e, t, n) {
                    var r = this.findEntry(e, t);
                    return r ? r[1] : n
                },
                forEach: function (e, t) {
                    return ue(this.size),
                        this.__iterate(t ? e.bind(t) : e)
                },
                join: function (e) {
                    ue(this.size),
                        e = void 0 !== e ? "" + e : ",";
                    var t = "",
                        n = !0;
                    return this.__iterate(function (r) {
                        n ? n = !1 : t += e,
                            t += null !== r && void 0 !== r ? r.toString() : ""
                    }),
                        t
                },
                keys: function () {
                    return this.__iterator(bn)
                },
                map: function (e, t) {
                    return kt(this, lt(this, e, t))
                },
                reduce: function (e, t, n) {
                    ue(this.size);
                    var r, o;
                    return arguments.length < 2 ? o = !0 : r = t,
                        this.__iterate(function (t, a, i) {
                            o ? (o = !1,
                                r = t) : r = e.call(n, r, t, a, i)
                        }),
                        r
                },
                reduceRight: function (e, t, n) {
                    var r = this.toKeyedSeq().reverse();
                    return r.reduce.apply(r, arguments)
                },
                reverse: function () {
                    return kt(this, ct(this, !0))
                },
                slice: function (e, t) {
                    return kt(this, ht(this, e, t, !0))
                },
                some: function (e, t) {
                    return !this.every($t(e), t)
                },
                sort: function (e) {
                    return kt(this, _t(this, e))
                },
                values: function () {
                    return this.__iterator(_n)
                },
                butLast: function () {
                    return this.slice(0, -1)
                },
                isEmpty: function () {
                    return void 0 !== this.size ? 0 === this.size : !this.some(function () {
                        return !0
                    })
                },
                count: function (e, t) {
                    return f(e ? this.toSeq().filter(e, t) : this)
                },
                countBy: function (e, t) {
                    return dt(this, e, t)
                },
                equals: function (e) {
                    return J(this, e)
                },
                entrySeq: function () {
                    var e = this;
                    if (e._cache)
                        return new j(e._cache);
                    var t = e.toSeq().map(Qt).toIndexedSeq();
                    return t.fromEntrySeq = function () {
                        return e.toSeq()
                    },
                        t
                },
                filterNot: function (e, t) {
                    return this.filter($t(e), t)
                },
                findEntry: function (e, t, n) {
                    var r = n;
                    return this.__iterate(function (n, o, a) {
                        if (e.call(t, n, o, a))
                            return r = [o, n], !1
                    }),
                        r
                },
                findKey: function (e, t) {
                    var n = this.findEntry(e, t);
                    return n && n[0]
                },
                findLast: function (e, t, n) {
                    return this.toKeyedSeq().reverse().find(e, t, n)
                },
                findLastEntry: function (e, t, n) {
                    return this.toKeyedSeq().reverse().findEntry(e, t, n)
                },
                findLastKey: function (e, t) {
                    return this.toKeyedSeq().reverse().findKey(e, t)
                },
                first: function () {
                    return this.find(g)
                },
                flatMap: function (e, t) {
                    return kt(this, vt(this, e, t))
                },
                flatten: function (e) {
                    return kt(this, yt(this, e, !0))
                },
                fromEntrySeq: function () {
                    return new it(this)
                },
                get: function (e, t) {
                    return this.find(function (t, n) {
                        return X(n, e)
                    }, void 0, t)
                },
                getIn: function (e, t) {
                    for (var n, r = this, o = Pt(e); !(n = o.next()).done;) {
                        var a = n.value;
                        if ((r = r && r.get ? r.get(a, gn) : gn) === gn)
                            return t
                    }
                    return r
                },
                groupBy: function (e, t) {
                    return pt(this, e, t)
                },
                has: function (e) {
                    return this.get(e, gn) !== gn
                },
                hasIn: function (e) {
                    return this.getIn(e, gn) !== gn
                },
                isSubset: function (e) {
                    return e = "function" === typeof e.includes ? e : t(e),
                        this.every(function (t) {
                            return e.includes(t)
                        })
                },
                isSuperset: function (e) {
                    return e = "function" === typeof e.isSubset ? e : t(e),
                        e.isSubset(this)
                },
                keyOf: function (e) {
                    return this.findKey(function (t) {
                        return X(t, e)
                    })
                },
                keySeq: function () {
                    return this.toSeq().map(Zt).toIndexedSeq()
                },
                last: function () {
                    return this.toSeq().reverse().first()
                },
                lastKeyOf: function (e) {
                    return this.toKeyedSeq().reverse().keyOf(e)
                },
                max: function (e) {
                    return wt(this, e)
                },
                maxBy: function (e, t) {
                    return wt(this, t, e)
                },
                min: function (e) {
                    return wt(this, e ? en(e) : rn)
                },
                minBy: function (e, t) {
                    return wt(this, t ? en(t) : rn, e)
                },
                rest: function () {
                    return this.slice(1)
                },
                skip: function (e) {
                    return this.slice(Math.max(0, e))
                },
                skipLast: function (e) {
                    return kt(this, this.toSeq().reverse().skip(e).reverse())
                },
                skipWhile: function (e, t) {
                    return kt(this, mt(this, e, t, !0))
                },
                skipUntil: function (e, t) {
                    return this.skipWhile($t(e), t)
                },
                sortBy: function (e, t) {
                    return kt(this, _t(this, t, e))
                },
                take: function (e) {
                    return this.slice(0, Math.max(0, e))
                },
                takeLast: function (e) {
                    return kt(this, this.toSeq().reverse().take(e).reverse())
                },
                takeWhile: function (e, t) {
                    return kt(this, ft(this, e, t))
                },
                takeUntil: function (e, t) {
                    return this.takeWhile($t(e), t)
                },
                valueSeq: function () {
                    return this.toIndexedSeq()
                },
                hashCode: function () {
                    return this.__hash || (this.__hash = on(this))
                }
            });
        var ir = t.prototype;
        ir[cn] = !0,
            ir[kn] = ir.values,
            ir.__toJS = ir.toArray,
            ir.__toStringMapper = tn,
            ir.inspect = ir.toSource = function () {
                return this.toString()
            },
            ir.chain = ir.flatMap,
            ir.contains = ir.includes,
            Jt(n, {
                flip: function () {
                    return kt(this, st(this))
                },
                mapEntries: function (e, t) {
                    var n = this,
                        r = 0;
                    return kt(this, this.toSeq().map(function (o, a) {
                        return e.call(t, [a, o], r++, n)
                    }).fromEntrySeq())
                },
                mapKeys: function (e, t) {
                    var n = this;
                    return kt(this, this.toSeq().flip().map(function (r, o) {
                        return e.call(t, r, o, n)
                    }).flip())
                }
            });
        var sr = n.prototype;
        return sr[un] = !0,
            sr[kn] = ir.entries,
            sr.__toJS = ir.toObject,
            sr.__toStringMapper = function (e, t) {
                return JSON.stringify(t) + ": " + tn(e)
            },
            Jt(r, {
                toKeyedSeq: function () {
                    return new rt(this, !1)
                },
                filter: function (e, t) {
                    return kt(this, ut(this, e, t, !1))
                },
                findIndex: function (e, t) {
                    var n = this.findEntry(e, t);
                    return n ? n[0] : -1
                },
                indexOf: function (e) {
                    var t = this.keyOf(e);
                    return void 0 === t ? -1 : t
                },
                lastIndexOf: function (e) {
                    var t = this.lastKeyOf(e);
                    return void 0 === t ? -1 : t
                },
                reverse: function () {
                    return kt(this, ct(this, !1))
                },
                slice: function (e, t) {
                    return kt(this, ht(this, e, t, !1))
                },
                splice: function (e, t) {
                    var n = arguments.length;
                    if (t = Math.max(0 | t, 0),
                        0 === n || 2 === n && !t)
                        return this;
                    e = v(e, e < 0 ? this.count() : this.size);
                    var r = this.slice(0, e);
                    return kt(this, 1 === n ? r : r.concat(h(arguments, 2), this.slice(e + t)))
                },
                findLastIndex: function (e, t) {
                    var n = this.findLastEntry(e, t);
                    return n ? n[0] : -1
                },
                first: function () {
                    return this.get(0)
                },
                flatten: function (e) {
                    return kt(this, yt(this, e, !1))
                },
                get: function (e, t) {
                    return e = m(this, e),
                        e < 0 || this.size === 1 / 0 || void 0 !== this.size && e > this.size ? t : this.find(function (t, n) {
                            return n === e
                        }, void 0, t)
                },
                has: function (e) {
                    return (e = m(this, e)) >= 0 && (void 0 !== this.size ? this.size === 1 / 0 || e < this.size : -1 !== this.indexOf(e))
                },
                interpose: function (e) {
                    return kt(this, bt(this, e))
                },
                interleave: function () {
                    var e = [this].concat(h(arguments)),
                        t = Et(this.toSeq(), P.of, e),
                        n = t.flatten(!0);
                    return t.size && (n.size = t.size * e.length),
                        kt(this, n)
                },
                keySeq: function () {
                    return $(0, this.size)
                },
                last: function () {
                    return this.get(-1)
                },
                skipWhile: function (e, t) {
                    return kt(this, mt(this, e, t, !1))
                },
                zip: function () {
                    return kt(this, Et(this, nn, [this].concat(h(arguments))))
                },
                zipWith: function (e) {
                    var t = h(arguments);
                    return t[0] = this,
                        kt(this, Et(this, e, t))
                }
            }),
            r.prototype[dn] = !0,
            r.prototype[pn] = !0,
            Jt(o, {
                get: function (e, t) {
                    return this.has(e) ? e : t
                },
                includes: function (e) {
                    return this.has(e)
                },
                keySeq: function () {
                    return this.valueSeq()
                }
            }),
            o.prototype.has = ir.includes,
            o.prototype.contains = o.prototype.includes,
            Jt(A, n.prototype),
            Jt(P, r.prototype),
            Jt(N, o.prototype),
            Jt(te, n.prototype),
            Jt(ne, r.prototype),
            Jt(re, o.prototype), {
            Iterable: t,
            Seq: M,
            Collection: ee,
            Map: de,
            OrderedMap: Qe,
            List: Fe,
            Stack: Gt,
            Set: Lt,
            OrderedSet: Wt,
            Record: Nt,
            Range: $,
            Repeat: Z,
            is: X,
            fromJS: Y
        }
    })
}