 function (e, t, n) {
    function r(e, t, n) {
        var r = n || {};
        return !(r.strict ? !c(e, t) : e !== t) || (!e || !t || "object" !== typeof e && "object" !== typeof t ? r.strict ? c(e, t) : e == t : i(e, t, r))
    }

    function o(e) {
        return null === e || void 0 === e
    }

    function a(e) {
        return !(!e || "object" !== typeof e || "number" !== typeof e.length) && ("function" === typeof e.copy && "function" === typeof e.slice && !(e.length > 0 && "number" !== typeof e[0]))
    }

    function i(e, t, n) {
        var i, c;
        if (typeof e !== typeof t)
            return !1;
        if (o(e) || o(t))
            return !1;
        if (e.prototype !== t.prototype)
            return !1;
        if (l(e) !== l(t))
            return !1;
        var f = u(e),
            m = u(t);
        if (f !== m)
            return !1;
        if (f || m)
            return e.source === t.source && d(e) === d(t);
        if (p(e) && p(t))
            return h.call(e) === h.call(t);
        var g = a(e),
            y = a(t);
        if (g !== y)
            return !1;
        if (g || y) {
            if (e.length !== t.length)
                return !1;
            for (i = 0; i < e.length; i++)
                if (e[i] !== t[i])
                    return !1;
            return !0
        }
        if (typeof e !== typeof t)
            return !1;
        try {
            var v = s(e),
                b = s(t)
        } catch (e) {
            return !1
        }
        if (v.length !== b.length)
            return !1;
        for (v.sort(),
            b.sort(),
            i = v.length - 1; i >= 0; i--)
            if (v[i] != b[i])
                return !1;
        for (i = v.length - 1; i >= 0; i--)
            if (c = v[i], !r(e[c], t[c], n))
                return !1;
        return !0
    }
    var s = n(286),
        l = n(765),
        c = n(766),
        u = n(767),
        d = n(770),
        p = n(776),
        h = Date.prototype.getTime;
    e.exports = r
}