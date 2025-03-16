 function (e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(557)),
        a = n(558),
        i = n(560),
        s = n(561),
        l = n(562),
        c = n(563),
        u = n(564),
        d = new r.Map({
            pairs: [],
            lastRounds: [],
            coupon: new r.Map({
                actual: new r.Map,
                prev: new r.Map,
                repeat: new r.Map,
                repeatArray: [],
                repeatIndex: void 0
            }),
            round: new r.Map({
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
            }),
            config: {
                betLimit: 0,
                contractLimit: 0,
                amountLimit: [],
                isRequested: !1
            },
            amount: 0
        });
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
            t = arguments[1];
        return e = e.update("pairs", function (e) {
            return Object(o.a)(e, t)
        }),
            e = e.update("coupon", function (e) {
                return Object(l.a)(e, t)
            }),
            e = e.update("round", function (e) {
                return Object(a.a)(e, t)
            }),
            e = e.update("factors", function (e) {
                return Object(i.a)(e, t)
            }),
            e = e.update("lastRounds", function (e) {
                return Object(s.a)(e, t)
            }),
            e = e.update("config", function (e) {
                return Object(c.a)(e, t)
            }),
            e = e.update("amount", function (e) {
                return Object(u.a)(e, t)
            })
    }
}