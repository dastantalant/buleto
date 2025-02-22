function(e, t, n) {
    "use strict";

    function r(e) {
        if ("object" !== typeof e || null === e)
            return !1;
        var t = Object.getPrototypeOf(e);
        if (null === t)
            return !0;
        for (var n = t; null !== Object.getPrototypeOf(n);)
            n = Object.getPrototypeOf(n);
        return t === n
    }
    t.a = r
}