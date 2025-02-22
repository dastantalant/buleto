function(e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(567)),
        a = n(568),
        i = new r.Map;
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i,
            t = arguments[1];
        return e = e.update("operations", function(e) {
                return Object(o.a)(e, t)
            }),
            e = e.update("contracts", function(e) {
                return Object(a.a)(e, t)
            })
    }
}