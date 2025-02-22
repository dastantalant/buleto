function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(28),
        a = n(36),
        i = n(11),
        s = [].lastIndexOf,
        l = !!s && 1 / [1].lastIndexOf(1, -0) < 0;
    r(r.P + r.F * (l || !n(37)(s)), "Array", {
        lastIndexOf: function(e) {
            if (l)
                return s.apply(this, arguments) || 0;
            var t = o(this),
                n = i(t.length),
                r = n - 1;
            for (arguments.length > 1 && (r = Math.min(r, a(arguments[1]))),
                r < 0 && (r = n + r); r >= 0; r--)
                if (r in t && t[r] === e)
                    return r || 0;
            return -1
        }
    })
}