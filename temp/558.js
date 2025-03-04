 function (e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(82)),
        a = n(559),
        i = n(31),
        s = Object(r.Map)({
            startDate: void 0,
            endDate: void 0,
            bettingCloseDate: void 0,
            topValue: void 0,
            bottomValue: void 0,
            result: void 0,
            factors: [],
            status: 1,
            id: null,
            prevRoundId: void 0,
            makeBet: !0,
            contractReceived: !1
        });
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
            t = arguments[1];
        switch (t.type) {
            case "WS_ROUND":
                return e = e.update("startDate", function () {
                    return new Date(t.data.sd)
                }),
                    e = e.update("endDate", function () {
                        return new Date(t.data.ed)
                    }),
                    e = e.update("bettingCloseDate", function () {
                        return new Date(t.data.bcd)
                    }),
                    e = e.update("startValue", function () {
                        return t.data.sv
                    }),
                    e = e.update("status", function () {
                        return t.data.s
                    }),
                    e = e.update("id", function () {
                        return t.data.id
                    }),
                    t.data.s > i.d && (e = e.update("factors", function () {
                        return t.data.cls
                    })),
                    t.data.rr && (e = e.update("result", function () {
                        return t.data.rr
                    })),
                    t.data.s === i.a && (e = e.update("result", function () { })),
                    (void 0 === e.get("bottomValue") || t.data.s > i.d) && (e = e.update("bottomValue", function () {
                        return t.data.bv
                    })),
                    (void 0 === e.get("topValue") || t.data.s > i.d) && (e = e.update("topValue", function () {
                        return t.data.tv
                    })),
                    t.data.s !== i.e || e.get("makeBet") || (e = e.update("makeBet", function () {
                        return !0
                    }),
                        e = e.update("contractReceived", function () {
                            return !1
                        })),
                    e;
            case o.c.REQUEST:
                return e.update("makeBet", function () {
                    return !1
                });
            case o.c.SUCCESS:
                var n = t.data;
                return 0 === Object.keys(n).length && n.constructor === Object ? (e = e.update("prevRoundId", function () {
                    return e.get("id")
                }),
                    e = e.update("contractReceived", function () {
                        return !0
                    })) : e = e.update("prevRoundId", function () { }),
                    e;
            case o.c.FAILURE:
                return e.update("prevRoundId", function () { });
            case a.a:
                return s;
            default:
                return e
        }
    }
}