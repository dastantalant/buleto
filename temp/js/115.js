 function (e, t, n) {
    "use strict";
    var r = n(190),
        o = n.n(r),
        a = {},
        i = 0,
        s = function (e) {
            var t = e,
                n = a[t] || (a[t] = {});
            if (n[e])
                return n[e];
            var r = o.a.compile(e);
            return i < 1e4 && (n[e] = r,
                i++),
                r
        },
        l = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return "/" === e ? e : s(e)(t, {
                pretty: !0
            })
        };
    t.a = l
}