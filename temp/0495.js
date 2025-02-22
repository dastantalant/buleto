function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(14),
        a = n(42),
        i = n(30),
        s = n(29).f;
    n(12) && r(r.P + n(101), "Object", {
        __lookupGetter__: function(e) {
            var t, n = o(this),
                r = a(e, !0);
            do {
                if (t = s(n, r))
                    return t.get
            } while (n = i(n))
        }
    })
}