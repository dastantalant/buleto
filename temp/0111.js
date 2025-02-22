function(e, t, n) {
    "use strict";

    function r(e, t, n, r, o, s, l, c) {
        var u = c.betLimit,
            d = c.contractLimit;
        if (0 === o || r > o || s !== i.e || d < l + r)
            return !1;
        for (var p = 0; p < t; p++) {
            var h = e.get(n[p]);
            if (h) {
                if (h.amount / a.a + r / t > u)
                    return !1
            }
        }
        return !0
    }

    function o(e, t) {
        var n = new RegExp("^-?\\d+(?:.\\d{0," + (t || -1) + "})?");
        return e.toString().match(n)[0]
    }
    t.a = r,
        t.b = o;
    var a = n(149),
        i = n(31)
}