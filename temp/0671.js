function(e, t, n) {
    "use strict";

    function r(e, t) {
        return -1 !== e.permanents.indexOf(t)
    }

    function o(e, t, n) {
        var o = e.mask,
            a = e.charsRules;
        if (!n)
            return !1;
        if (r(e, t))
            return o[t] === n;
        var i = o[t],
            s = a[i];
        return new RegExp(s).test(n)
    }

    function a(e, t) {
        return t.split("").every(function(t, n) {
            return r(e, n) || !o(e, n, t)
        })
    }

    function i(e, t) {
        var n = e.maskChar,
            a = e.prefix;
        if (!n) {
            for (; t.length > a.length && r(e, t.length - 1);)
                t = t.slice(0, t.length - 1);
            return t.length
        }
        for (var i = a.length, s = t.length; s >= a.length; s--) {
            var l = t[s];
            if (!r(e, s) && o(e, s, l)) {
                i = s + 1;
                break
            }
        }
        return i
    }

    function s(e, t) {
        return i(e, t) === e.mask.length
    }

    function l(e, t) {
        var n = e.maskChar,
            o = e.mask,
            a = e.prefix;
        if (!n) {
            for (t = u(e, "", t, 0),
                t.length < a.length && (t = a); t.length < o.length && r(e, t.length);)
                t += o[t.length];
            return t
        }
        if (t) {
            return u(e, l(e, ""), t, 0)
        }
        for (var i = 0; i < o.length; i++)
            r(e, i) ? t += o[i] : t += n;
        return t
    }

    function c(e, t, n, o) {
        var a = n + o,
            i = e.maskChar,
            s = e.mask,
            c = e.prefix,
            u = t.split("");
        if (!i) {
            for (var d = a; d < u.length; d++)
                r(e, d) && (u[d] = "");
            return n = Math.max(c.length, n),
                u.splice(n, a - n),
                t = u.join(""),
                l(e, t)
        }
        return u.map(function(t, o) {
            return o < n || o >= a ? t : r(e, o) ? s[o] : i
        }).join("")
    }

    function u(e, t, n, a) {
        var i = e.mask,
            c = e.maskChar,
            u = e.prefix,
            d = n.split(""),
            p = s(e, t),
            h = function(t, n) {
                return !r(e, t) || n === i[t]
            },
            f = function(t, n) {
                return !c || !r(e, n) || t !== c
            };
        return !c && a > t.length && (t += i.slice(t.length, a)),
            d.every(function(n) {
                for (; !h(a, n);) {
                    if (a >= t.length && (t += i[a]), !f(n, a))
                        return !0;
                    if (++a >= i.length)
                        return !1
                }
                return !o(e, a, n) && n !== c || (a < t.length ? c || p || a < u.length ? t = t.slice(0, a) + n + t.slice(a + 1) : (t = t.slice(0, a) + n + t.slice(a),
                        t = l(e, t)) : c || (t += n),
                    ++a < i.length)
            }),
            t
    }

    function d(e, t, n, a) {
        var i = e.mask,
            s = e.maskChar,
            l = n.split(""),
            c = a,
            u = function(t, n) {
                return !r(e, t) || n === i[t]
            };
        return l.every(function(t) {
                for (; !u(a, t);)
                    if (++a >= i.length)
                        return !1;
                return (o(e, a, t) || t === s) && a++,
                    a < i.length
            }),
            a - c
    }
    t.h = r,
        t.f = a,
        t.c = i,
        t.g = s,
        t.b = l,
        t.a = c,
        t.e = u,
        t.d = d
}