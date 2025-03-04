 function (e, t, n) {
    "use strict";
    var r = n(67),
        o = n(196),
        a = n(145),
        i = n(146),
        s = n(147),
        l = n(148),
        c = n(31),
        u = n(149),
        d = n(82),
        p = {
            balance: 0,
            couponAmount: 0,
            trainingBalance: 0,
            tradingBalance: 0,
            clearFactors: !1,
            depositAmount: void 0,
            withdrawalAmount: 0
        };
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p,
            t = arguments[1];
        switch (t.type) {
            case r.h:
            case r.i:
                return void 0 === t.data.Error && void 0 === t.data.error ? Object.assign({}, e, {
                    balance: t.data.balance - e.couponAmount,
                    trainingBalance: t.data.trainingBalance - t.data.balance - e.couponAmount
                }) : e;
            case o.h:
            case d.a.SUCCESS:
                return void 0 === t.data.Error ? Object.assign({}, e, {
                    balance: t.data.balance - e.couponAmount
                }) : e;
            case o.g:
                return t.data.trainingBalance ? Object.assign({}, e, {
                    trainingBalance: e.trainingBalance + t.data.trainingBalance
                }) : e;
            case l.d:
            case l.e:
            case l.f:
                return Object.assign({}, e, {
                    balance: e.balance + e.couponAmount,
                    couponAmount: 0
                });
            case l.a:
                return Object.assign({}, e, {
                    balance: e.balance - t.data.amount / u.a,
                    couponAmount: e.couponAmount + t.data.amount / u.a
                });
            case l.b:
                return Object.assign({}, e, {
                    balance: e.balance - t.data.amount,
                    couponAmount: e.couponAmount + t.data.amount
                });
            case l.g:
                return Object.assign({}, e, {
                    balance: e.balance - t.data,
                    couponAmount: t.data
                });
            case "WS_ROUND":
                return t.data.s === c.d ? Object.assign({}, e, {
                    couponAmount: 0
                }) : e;
            case r.g:
                return p;
            case a.e:
            case a.d:
                return Object.assign({}, e, {
                    depositAmount: +t.data.amount
                });
            case o.i:
                var n = t.data.tradingBalance ? t.data.tradingBalance : 0;
                return Object.assign({}, e, {
                    tradingBalance: n
                });
            case o.d:
                return Object.assign({}, e, {
                    tradingBalance: 0
                });
            case a.f:
                return t.data.error ? e : Object.assign({}, e, {
                    balance: e.balance - e.depositAmount,
                    tradingBalance: e.tradingBalance + e.depositAmount
                });
            case a.g:
                return t.data.error ? e : Object.assign({}, e, {
                    balance: e.balance + e.depositAmount,
                    tradingBalance: e.tradingBalance - e.depositAmount
                });
            case i.c:
                return Object.assign({}, e, {
                    withdrawalAmount: t.data.amount
                });
            case i.m:
                return t.data.noApproval ? Object.assign({}, e, {
                    balance: e.balance - (e.withdrawalAmount || 0)
                }) : e;
            case i.l:
                return Object.assign({}, e, {
                    balance: e.balance + (e.withdrawalAmount || 0)
                });
            case s.o:
                return t.data.Amount ? Object.assign({}, e, {
                    balance: e.balance + t.data.Amount
                }) : e;
            case l.h:
                var h = e.couponAmount - t.amount;
                return Object.assign({}, e, {
                    couponAmount: e.couponAmount - h,
                    balance: e.balance + h
                });
            default:
                return e
        }
    }
}