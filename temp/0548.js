function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i,
            t = arguments[1];
        switch (t.type) {
            case a.b:
                return e.set("usdtRechargeError", null).set("usdtRechargeStatus", null).set("usdtNetworkAddressError", null);
            case a.e:
                return e.set("usdtNetworkAddressFetching", !0).set("usdtNetworkAddress", null).set("usdtRechargeStatus", null).set("usdtNetworkAddressError", null);
            case a.g:
                return t.data && t.data.error ? e.set("usdtNetworkAddressFetching", !1).set("usdtNetworkAddressError", t.data.error).set("usdtNetworkAddress", null) : e.set("usdtNetworkAddressFetching", !1).set("usdtNetworkAddress", t.data).set("usdtNetworkAddressError", null);
            case a.d:
                return e.set("usdtNetworkAddressFetching", !1).set("usdtNetworkAddressError", t.data.error);
            case a.a:
                return e.set("usdtRechargeFetching", !0);
            case a.f:
                return t.data && t.data.error ? e.set("usdtRechargeFetching", !1).set("usdtRechargeError", t.data.error) : e.set("usdtRechargeFetching", !1).set("usdtRechargeStatus", t.data.status);
            case a.c:
                return e.set("usdtRechargeFetching", !1).set("usdtRechargeError", t.error);
            default:
                return e
        }
    }
    t.a = r;
    var o = n(18),
        a = (n.n(o),
            n(237)),
        i = new o.Map({
            usdtRechargeError: null,
            usdtRechargeFetching: !1,
            usdtRechargeStatus: null,
            usdtNetworkAddress: null,
            usdtNetworkAddressError: null,
            usdtNetworkAddressFetching: !1
        })
}