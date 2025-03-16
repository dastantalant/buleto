 function (e, t, n) {
    "use strict";

    function r(e, t) {
        if (e === t)
            return !0;
        if (e && t && "object" == typeof e && "object" == typeof t) {
            var n, l, c, u = o(e),
                d = o(t);
            if (u && d) {
                if ((l = e.length) != t.length)
                    return !1;
                for (n = l; 0 !== n--;)
                    if (!r(e[n], t[n]))
                        return !1;
                return !0
            }
            if (u != d)
                return !1;
            var p = e instanceof Date,
                h = t instanceof Date;
            if (p != h)
                return !1;
            if (p && h)
                return e.getTime() == t.getTime();
            var f = e instanceof RegExp,
                m = t instanceof RegExp;
            if (f != m)
                return !1;
            if (f && m)
                return e.toString() == t.toString();
            var g = a(e);
            if ((l = g.length) !== a(t).length)
                return !1;
            for (n = l; 0 !== n--;)
                if (!i.call(t, g[n]))
                    return !1;
            if (s && e instanceof Element && t instanceof Element)
                return e === t;
            for (n = l; 0 !== n--;)
                if (("_owner" !== (c = g[n]) || !e.$$typeof) && !r(e[c], t[c]))
                    return !1;
            return !0
        }
        return e !== e && t !== t
    }
    var o = Array.isArray,
        a = Object.keys,
        i = Object.prototype.hasOwnProperty,
        s = "undefined" !== typeof Element;
    e.exports = function (e, t) {
        try {
            return r(e, t)
        } catch (e) {
            if (e.message && e.message.match(/stack|recursion/i) || -2146828260 === e.number)
                return console.warn("Warning: react-fast-compare does not handle circular references.", e.name, e.message), !1;
            throw e
        }
    }
}