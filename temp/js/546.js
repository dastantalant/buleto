 function (e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(146)),
        a = n(150),
        i = n(38),
        s = new r.Map({
            fetching: !1,
            salepoints: [],
            selectedSalepoint: {},
            withdrawal: void 0,
            withdrawStatus: void 0,
            withdrawalCreated: !1,
            cancelStatus: void 0,
            rate: 0,
            minAmount: 0,
            rateError: void 0,
            rateFetching: !1
        }),
        l = {
            61: "116a Akhunbayev St",
            101: "183 Jibek Jolu Ave",
            181: "183 Jibek Jolu Ave",
            486: "Frunze 429",
            121: "55 Baitik Baatyr St",
            401: "20/20 Suerkulov St",
            21: "52/3 Chui Ave",
            321: "100 Akhunbayev St",
            2: "35 Mir Ave",
            41: "182 Abdrahmanov St",
            281: "70 Ibraimova",
            461: "33 Beyshenalieva",
            562: "Lenina St 357",
            161: "\u0433. \u041e\u0428 \u041c\u0430\u0441\u0430\u043b\u0438\u0435\u0432\u0430 2"
        },
        c = {
            61: "\u0410\u0445\u0443\u043d\u0431\u0430\u0435\u0432\u0430 116\u0430",
            101: "\u0416\u0438\u0431\u0435\u043a-\u0416\u043e\u043b\u0443 183",
            181: "\u0416\u0438\u0431\u0435\u043a-\u0416\u043e\u043b\u0443 183",
            486: "\u0424\u0440\u0443\u043d\u0437\u0435 429",
            121: "\u0411\u0430\u0439\u0442\u0438\u043a \u0411\u0430\u0430\u0442\u044b\u0440\u0430 55",
            401: "\u0421\u0443\u0435\u0440\u043a\u0443\u043b\u043e\u0432\u0430 20/20",
            21: "\u0427\u0443\u0439 52/3",
            321: "\u0410\u0445\u0443\u043d\u0431\u0430\u0435\u0432\u0430 100",
            2: "\u041c\u0438\u0440\u0430 35",
            41: "\u0410\u0431\u0434\u0440\u0430\u0445\u043c\u0430\u043d\u043e\u0432\u0430 182",
            281: "\u0418\u0431\u0440\u0430\u0438\u043c\u043e\u0432\u0430 70",
            461: "\u0411\u0435\u0439\u0448\u0435\u043d\u0430\u043b\u0438\u0435\u0432\u043e\u0439 33",
            562: "\u0413.\u041e\u0428 \u0443\u043b \u041b\u0435\u043d\u0438\u043d\u0430 357",
            161: "\u0433. \u041e\u0428 \u041c\u0430\u0441\u0430\u043b\u0438\u0435\u0432\u0430 2"
        };
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
            t = arguments[1],
            n = arguments[2];
        switch (t = 8 === t ? 1 : t,
        n.type) {
            case o.b:
                return e = e.update("withdrawStatus", function () { }),
                    e = e.update("withdrawalCreated", function () {
                        return !1
                    }),
                    e.update("cancelStatus", function () { });
            case o.a:
            case o.i:
                return e.update("fetching", function () {
                    return !0
                });
            case o.k:
                return e.update("selectedSalepoint", function () {
                    return n.data
                });
            case o.d:
                return e.update("isDetailsOpen", function () {
                    return n.data
                });
            case o.c:
                return e = e.update("fetching", function () {
                    return !0
                }),
                    e = e.update("withdrawStatus", function () { }),
                    e = e.update("withdrawalCreated", function () {
                        return !1
                    });
            case o.n:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    n.data.cashdesks && (t !== i.c ? n.data.cashdesks.forEach(function (e, t) {
                        n.data.cashdesks[t].Address = l[e.Id]
                    }) : n.data.cashdesks.forEach(function (e, t) {
                        n.data.cashdesks[t].Address = c[e.Id]
                    }),
                        n.data.cashdesks.forEach(function (e, r) {
                            !n.data.cashdesks[r].Address && e.Names && (n.data.cashdesks[r].Address = e.Names.find(function (e) {
                                return e.LanguageId === t
                            }).Name)
                        }),
                        e = e.update("salepoints", function () {
                            return n.data.cashdesks
                        })),
                    n.data.withdrawal ? (e = e.update("withdrawal", function () {
                        return n.data.withdrawal
                    }),
                        e = e.update("withdrawalCreated", function () {
                            return !0
                        })) : e = e.update("withdrawal", function () { }),
                    e;
            case a.a:
                var r = e.get("salepoints"),
                    u = t === i.c ? c : l;
                return r.forEach(function (e, t) {
                    r[t].Address = u[e.Id]
                }),
                    r.forEach(function (e, n) {
                        !r[n].Address && e.Names && (r[n].Address = e.Names.find(function (e) {
                            return e.LanguageId === t
                        }).Name)
                    }),
                    e.update("salepoints", function () {
                        return r
                    });
            case o.m:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = n.data.error ? e.update("withdrawStatus", function () {
                        return n.data.error
                    }) : e.update("withdrawalCreated", function () {
                        return !0
                    });
            case o.f:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = e.update("withdrawStatus", function () {
                        return -1e4
                    });
            case o.l:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e = -3 === n.data.error ? e.update("cancelStatus", function () {
                        return n.data.error
                    }) : n.data.error ? n.data.error ? e.update("cancelStatus", function () {
                        return n.data.error
                    }) : e.update("cancelStatus", function () {
                        return -100
                    }) : e.update("withdrawal", function () { });
            case o.e:
                return e = e.update("fetching", function () {
                    return !1
                }),
                    e.update("cancelStatus", function () {
                        return -100
                    });
            case o.j:
                return e.update("rateFetching", function () {
                    return !0
                });
            case o.o:
                return e = e.update("rateFetching", function () {
                    return !1
                }),
                    e = e.update("rate", function () {
                        return n.data.rate
                    }),
                    e = e.update("minAmount", function () {
                        return n.data.minAmount
                    }),
                    e.update("rateError", function () { });
            case o.h:
                return e = e.update("rateFetching", function () {
                    return !1
                }),
                    e.update("rateError", function () {
                        return n.data.error
                    });
            default:
                return e
        }
    }
}