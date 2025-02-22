function(e, t, n) {
    "use strict";
    var r = n(67),
        o = n(104),
        a = {
            accountNumber: void 0,
            name: void 0,
            status: o.b,
            fetching: !1
        };
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
            t = arguments[1];
        switch (t.type) {
            case r.d:
                return Object.assign({}, e, {
                    fetching: !0
                });
            case r.a:
                return Object.assign({}, e, {
                    fetching: !1
                });
            case r.h:
                if (t.data.accountNumber)
                    return sessionStorage.setItem("man-token", t.data.token),
                        Object.assign({}, e, {
                            accountNumber: t.data.accountNumber,
                            name: t.data.name,
                            lastName: t.data.lastName,
                            phone: t.data.phone,
                            status: o.d,
                            fetching: !1
                        });
                if (t.data.error) {
                    var n = void 0;
                    switch (t.data.error) {
                        case -2:
                            n = o.e;
                            break;
                        case -3:
                            n = o.a;
                            break;
                        case -100:
                        default:
                            n = o.c
                    }
                    return Object.assign({}, e, {
                        status: n,
                        fetching: !1
                    })
                }
                return e;
            case r.j:
                var i = t.data.token;
                return i && sessionStorage.setItem("man-token", i),
                    e;
            case r.e:
                return Object.assign({}, e, {
                    fetching: !0
                });
            case r.b:
                return Object.assign({}, e, {
                    fetching: !1
                });
            case r.i:
                return t.data.accountNumber ? Object.assign({}, e, {
                    accountNumber: t.data.accountNumber,
                    name: t.data.name,
                    lastName: t.data.lastName,
                    phone: t.data.phone,
                    fetching: !1
                }) : t.data.refresh ? (sessionStorage.removeItem("man-token"),
                    a) : (sessionStorage.removeItem("man-token"),
                    Object.assign({}, e, {
                        status: o.c,
                        fetching: !1
                    }));
            case r.g:
                return sessionStorage.removeItem("man-token"),
                    a;
            default:
                return e
        }
    }
}