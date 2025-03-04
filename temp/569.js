 function (e, t, n) {
    "use strict";
    var r = n(18),
        o = (n.n(r),
            n(81)),
        a = n(104),
        i = n(38);
    t.a = function () {
        return {
            routing: void 0,
            application: new r.Map({
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
                    usdtRechargeError: null,
                    usdtRechargeFetching: !1,
                    usdtRechargeStatus: null,
                    usdtNetworkAddress: null,
                    usdtNetworkAddressError: null,
                    usdtNetworkAddressFetching: !1
                }),
                withdraw: new r.Map({
                    fetching: !1,
                    salepoints: [],
                    withdrawal: void 0,
                    withdrawStatus: void 0,
                    withdrawalCreated: !1,
                    cancelStatus: void 0,
                    rate: 0,
                    minAmount: 0,
                    rateError: null,
                    rateFetching: !1
                }),
                tradologic: new r.Map({
                    url: void 0,
                    config: void 0,
                    fetching: !1
                }),
                recovery: {
                    status: void 0,
                    emailDomain: "",
                    fetching: !1
                },
                profile: new r.Map({
                    fetching: !1,
                    error: void 0,
                    updateState: void 0,
                    passwordState: void 0,
                    info: new r.Map
                }),
                deposit: new r.Map({
                    status: void 0,
                    fetching: !1
                }),
                time: void 0,
                country: void 0
            }),
            reporting: new r.Map({
                operations: new r.Map({
                    fetching: !1,
                    data: [],
                    fail: !1
                }),
                contracts: new r.Map({
                    fetching: !1,
                    data: [],
                    fail: !1
                })
            }),
            mailer: new r.Map({
                fetching: !1,
                status: void 0
            })
        }
    }
}