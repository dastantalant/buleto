 function (e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(145)),
        a = new r.Map({
            status: void 0,
            fetching: !1
        });
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
            t = arguments[1];
        switch (t.type) {
            case o.e:
            case o.d:
                return e.update("fetching", function () {
                    return !0
                });
            case o.g:
            case o.f:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = t.data.error ? -3 === t.data.error ? e.update("status", function () {
                        return t.data.error
                    }) : e.update("status", function () {
                        return -100
                    }) : e.update("status", function () {
                        return 0
                    });
            case o.b:
            case o.a:
                return e = e.update("status", function () {
                    return -100
                }),
                    e.update("fetching", function () {
                        return !1
                    });
            case o.c:
                return a;
            default:
                return e
        }
    }
}