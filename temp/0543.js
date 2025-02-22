function(e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(81)),
        a = n(104),
        i = n(38),
        s = n(235),
        l = n(543),
        c = n(544),
        u = n(545),
        d = n(546),
        p = n(547),
        h = n(548),
        f = n(549),
        m = n(550),
        g = n(551),
        y = n(552),
        v = n(150),
        b = n(554),
        _ = new r.Map({
            languageId: null !== localStorage.getItem("languageId") ? parseInt(localStorage.getItem("languageId"), 10) : i.c,
            registration: {
                status: o.b,
                fetching: !1
            },
            user: {
                accountNumber: void 0,
                name: void 0,
                status: a.b,
                fetching: !1
            },
            balance: {
                balance: 0,
                couponAmount: 0,
                trainingBalance: 0,
                tradingBalance: 0,
                clearFactors: !1,
                depositAmount: void 0
            },
            recharge: new r.Map({
                usdtInvoice: null,
                usdtInvoiceError: null,
                usdtInvoiceFetching: !1,
                usdtNetworkAddress: null,
                usdtNetworkAddressError: null,
                usdtNetworkAddressFetching: !1
            }),
            withdraw: new r.Map({
                fetching: !1,
                salepoints: [],
                withdrawal: void 0,
                withdrawalCreated: !1,
                rate: 0,
                rateError: void 0,
                rateFetching: !1
            }),
            tradologic: new r.Map({
                url: void 0,
                fetching: !1
            }),
            recovery: {
                status: void 0,
                emailDomain: "",
                fetching: !1
            },
            time: void 0,
            country: void 0
        });
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
            t = arguments[1];
        switch (t.type) {
            case v.a:
                e = e.update("languageId", function() {
                        return t.data
                    }),
                    localStorage.setItem("languageId", t.data);
                break;
            case s.c:
                e = e.update("country", function() {
                    return t.data.country
                })
        }
        return e = e.update("registration", function(e) {
                return Object(l.a)(e, t)
            }),
            e = e.update("user", function(e) {
                return Object(c.a)(e, t)
            }),
            e = e.update("balance", function(e) {
                return Object(u.a)(e, t)
            }),
            e = e.update("recharge", function(e) {
                return Object(p.a)(e, t)
            }),
            e = e.update("withdraw", function(n) {
                return Object(d.a)(n, e.get("languageId"), t)
            }),
            e = e.update("tradologic", function(e) {
                return Object(h.a)(e, t)
            }),
            e = e.update("recovery", function(e) {
                return Object(f.a)(e, t)
            }),
            e = e.update("profile", function(e) {
                return Object(m.a)(e, t)
            }),
            e = e.update("deposit", function(e) {
                return Object(g.a)(e, t)
            }),
            e = e.update("opex", function(e) {
                return Object(y.a)(e, t)
            }),
            e = e.update("time", function(e) {
                return Object(b.a)(e, t)
            })
    }
}