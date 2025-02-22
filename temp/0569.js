function(e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(151)),
        a = new r.Map({
            fetching: !1,
            data: [],
            fail: !1
        });
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
            t = arguments[1];
        switch (t.type) {
            case o.c:
                return e.update("fetching", function() {
                    return !0
                });
            case o.f:
                return e = e.update("fail", function() {
                        return !1
                    }),
                    e = e.update("fetching", function() {
                        return !1
                    }),
                    e.update("data", function() {
                        return t.data
                    });
            case o.a:
                return e = e.update("fail", function() {
                        return !0
                    }),
                    e.update("fetching", function() {
                        return !1
                    });
            case o.e:
                return a;
            default:
                return e
        }
    }
}