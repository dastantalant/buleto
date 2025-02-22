function(e, t, n) {
    "use strict";
    var r = n(64),
        o = n(51).getWeak,
        a = n(4),
        i = n(9),
        s = n(62),
        l = n(63),
        c = n(45),
        u = n(27),
        d = n(65),
        p = c(5),
        h = c(6),
        f = 0,
        m = function(e) {
            return e._l || (e._l = new g)
        },
        g = function() {
            this.a = []
        },
        y = function(e, t) {
            return p(e.a, function(e) {
                return e[0] === t
            })
        };
    g.prototype = {
            get: function(e) {
                var t = y(this, e);
                if (t)
                    return t[1]
            },
            has: function(e) {
                return !!y(this, e)
            },
            set: function(e, t) {
                var n = y(this, e);
                n ? n[1] = t : this.a.push([e, t])
            },
            delete: function(e) {
                var t = h(this.a, function(t) {
                    return t[0] === e
                });
                return ~t && this.a.splice(t, 1), !!~t
            }
        },
        e.exports = {
            getConstructor: function(e, t, n, a) {
                var c = e(function(e, r) {
                    s(e, c, t, "_i"),
                        e._t = t,
                        e._i = f++,
                        e._l = void 0,
                        void 0 != r && l(r, n, e[a], e)
                });
                return r(c.prototype, {
                        delete: function(e) {
                            if (!i(e))
                                return !1;
                            var n = o(e);
                            return !0 === n ? m(d(this, t)).delete(e) : n && u(n, this._i) && delete n[this._i]
                        },
                        has: function(e) {
                            if (!i(e))
                                return !1;
                            var n = o(e);
                            return !0 === n ? m(d(this, t)).has(e) : n && u(n, this._i)
                        }
                    }),
                    c
            },
            def: function(e, t, n) {
                var r = o(a(t), !0);
                return !0 === r ? m(e).set(t, n) : r[e._i] = n,
                    e
            },
            ufstore: m
        }
}