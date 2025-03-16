 function (e, t, n) {
    "use strict";

    function r(e, t) {
        return e = e.updateIn(["info", "accountNumber"], function () {
            return t.accountNumber
        }),
            e = e.updateIn(["info", "birthdate"], function () {
                return t.birthdate
            }),
            e = e.updateIn(["info", "email"], function () {
                return t.email
            }),
            e = e.updateIn(["info", "lastName"], function () {
                return t.lastName
            }),
            e = e.updateIn(["info", "name"], function () {
                return t.name
            }),
            e = e.updateIn(["info", "phone"], function () {
                return t.phone
            })
    }
    var o = n(18),
        a = (n.n(o),
            n(240)),
        i = new o.Map({
            fetching: !1,
            error: void 0,
            updateState: void 0,
            passwordState: void 0,
            info: new o.Map
        });
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i,
            t = arguments[1];
        switch (t.type) {
            case a.i:
            case a.j:
            case a.d:
                return e.update("fetching", function () {
                    return !0
                });
            case a.f:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = e.update("error", function () { }),
                    r(e, t.data);
            case a.a:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e.update("error", function () {
                        return -100
                    });
            case a.h:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = t.data.error ? -2 === t.data.error ? e.update("updateState", function () {
                        return t.data.error
                    }) : e.update("updateState", function () {
                        return -100
                    }) : e.update("updateState", function () {
                        return 0
                    });
            case a.c:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e.update("updateState", function () {
                        return -100
                    });
            case a.g:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = t.data.error ? -2 === t.data.error ? e.update("passwordState", function () {
                        return t.data.error
                    }) : e.update("passwordState", function () {
                        return -100
                    }) : e.update("passwordState", function () {
                        return 0
                    });
            case a.b:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e.update("passwordState", function () {
                        return -100
                    });
            case a.e:
                return e.update("passwordState", function () { });
            default:
                return e
        }
    }
}