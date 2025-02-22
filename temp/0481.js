function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(229),
        a = n(14),
        i = n(11),
        s = n(36),
        l = n(136);
    r(r.P, "Array", {
            flatten: function() {
                var e = arguments[0],
                    t = a(this),
                    n = i(t.length),
                    r = l(t, 0);
                return o(r, t, t, n, 0, void 0 === e ? 1 : s(e)),
                    r
            }
        }),
        n(52)("flatten")
}