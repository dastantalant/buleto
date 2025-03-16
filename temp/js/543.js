 function (e, t, n) {
    "use strict";
    var r = n(236),
        o = n(81),
        a = {
            status: o.b,
            fetching: !1
        };
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
            t = arguments[1];
        switch (t.type) {
            case r.b:
                return Object.assign({}, e, {
                    fetching: !0
                });
            case r.d:
                if (t.data.error) {
                    var n = t.data.error === o.a ? o.a : o.c;
                    return Object.assign({}, e, {
                        status: n,
                        fetching: !1
                    })
                }
                return t.data.token ? (sessionStorage.setItem("man-token", t.data.token),
                    Object.assign({}, e, {
                        status: o.d,
                        fetching: !1
                    })) : Object.assign({}, e, {
                        status: o.c,
                        fetching: !1
                    });
            case r.a:
                return Object.assign({}, e, {
                    status: o.d,
                    fetching: !1
                });
            case r.c:
                return a;
            default:
                return e
        }
    }
}