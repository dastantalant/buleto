 function (e, t, n) {
    "use strict";

    function r(e, t) {
        return e === t ? 0 !== e || 0 !== t || 1 / e === 1 / t : e !== e && t !== t
    }

    function o(e, t) {
        if (r(e, t))
            return !0;
        if ("object" !== typeof e || null === e || "object" !== typeof t || null === t)
            return !1;
        var n = Object.keys(e),
            o = Object.keys(t);
        if (n.length !== o.length)
            return !1;
        for (var i = 0; i < n.length; i++)
            if (!a.call(t, n[i]) || !r(e[n[i]], t[n[i]]))
                return !1;
        return !0
    }
    t.a = o;
    var a = Object.prototype.hasOwnProperty
}