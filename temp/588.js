 function (e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
            e
    }
    var o, a = n(38),
        i = (o = {},
            r(o, a.c, "ru"),
            r(o, a.a, "en"),
            r(o, a.d, "zh"),
            r(o, a.b, "uz"),
            o);
    t.a = i
}