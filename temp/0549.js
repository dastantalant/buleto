function(e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(238)),
        a = new r.Map({
            url: void 0,
            config: void 0,
            fetching: !1
        });
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
            t = arguments[1];
        switch (t.type) {
            case o.b:
                return e = e.update("config", function() {
                        return t.data.config
                    }),
                    e.update("fetching", function() {
                        return !0
                    });
            case o.c:
                return e = e.update("fetching", function() {
                        return !1
                    }),
                    t.data.url && (e = e.update("url", function() {
                        return t.data.url + "&config=" + e.get("config")
                    })),
                    e;
            case o.a:
                return a;
            default:
                return e
        }
    }
}