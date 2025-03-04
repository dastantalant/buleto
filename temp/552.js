 function (e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(147)),
        a = n(553),
        i = new r.Map({
            status: void 0,
            fetching: !1,
            amount: void 0,
            rechargeCreated: !1,
            opexChanging: !1,
            opexChangingError: null
        });
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i,
            t = arguments[1];
        switch (t.type) {
            case o.c:
                return i;
            case o.b:
            case o.i:
                return e.update("fetching", function () {
                    return !0
                });
            case o.m:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    t.data.error ? e = e.update("status", function () {
                        return t.data.error
                    }) : (e = e.update("status", function () {
                        return 0
                    }),
                        e = e.update("amount", function () {
                            return t.data.amount
                        }),
                        e = e.update("attempts", function () {
                            return t.data.attempts
                        }),
                        e = e.update("max", function () {
                            return t.data.max
                        }),
                        e = e.update("timeout", function () {
                            return t.data.timeout
                        })),
                    e;
            case o.n:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = e.update("pins", function () {
                        return t.data
                    });
            case o.k:
                return e = e.update("pins", function (e) {
                    return e.map(function (e) {
                        return t.extra.TransactionId === e.Id ? Object.assign({}, e, {
                            fetching: !0
                        }) : e
                    })
                });
            case o.p:
                var n = t.data.state;
                return e = e.update("pins", function (e) {
                    return e.map(function (e) {
                        return t.extra.TransactionId === e.Id ? Object.assign({}, e, {
                            resultState: n,
                            fetching: !1,
                            Resent: 0 === n ? a.a.RESENDED : a.a.INITIAL
                        }) : e
                    })
                });
            case o.h:
                return e = e.update("pins", function (e) {
                    return e.map(function (e) {
                        return t.extra.TransactionId === e.Id ? Object.assign({}, e, {
                            fetching: !0
                        }) : e
                    })
                });
            case o.f:
            case o.e:
                return e = e.update("status", function () {
                    return -100
                }),
                    e.update("fetching", function () {
                        return !1
                    });
            case o.j:
                return e.update("fetching", function () {
                    return !0
                });
            case o.o:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = t.data.error ? e.update("status", function () {
                        return t.data.error
                    }) : e.update("rechargeCreated", function () {
                        return !0
                    });
            case o.g:
                return e.update("fetching", function () {
                    return !1
                });
            case o.a:
                return e.update("opexChanging", function () {
                    return !0
                });
            case o.l:
                return e = e.update("opexChanging", function () {
                    return !1
                }),
                    e = 0 !== t.data.Result ? e.update("opexChangingError", function () {
                        return t.data.error
                    }) : e.update("opexChangingError", function () {
                        return null
                    });
            case o.d:
                return e.update("opexChanging", function () {
                    return !1
                }).update("opexChangingError", function () {
                    return t.error
                });
            default:
                return e
        }
    }
}