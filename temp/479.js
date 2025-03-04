 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(229),
        a = n(14),
        i = n(11),
        s = n(17),
        l = n(136);
    r(r.P, "Array", {
        flatMap: function (e) {
            var t, n, r = a(this);
            return s(e),
                t = i(r.length),
                n = l(r, 0),
                o(n, r, r, t, 0, 1, e, arguments[1]),
                n
        }
    }),
        n(52)("flatMap")
}