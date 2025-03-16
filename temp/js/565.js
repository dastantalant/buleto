 function (e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(242)),
        a = Object(r.Map)({
            fetching: !1,
            status: void 0
        });
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
            t = arguments[1];
        switch (t.type) {
            case o.e:
            case o.d:
                return e = e.update("fetching", function () {
                    return !0
                });
            case o.g:
            case o.f:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = 0 === t.data.result ? e.update("status", function () {
                        return t.data.result
                    }) : e.update("status", function () {
                        return -100
                    });
            case o.b:
            case o.a:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e.update("status", function () {
                        return -100
                    });
            case o.c:
                return a;
            default:
                return e
        }
    }
}