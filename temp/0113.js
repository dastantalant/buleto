function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (null == e)
            return {};
        var n, r, o = {},
            a = Object.keys(e);
        for (r = 0; r < a.length; r++)
            n = a[r],
            t.indexOf(n) >= 0 || (o[n] = e[n]);
        return o
    }
    t.a = r
}