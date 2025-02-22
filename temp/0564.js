function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = e.split(","), n = [], r = 0; r < t.length; r++)
            n.push(parseInt(t[r], 10));
        return n
    }
    var o = n(82),
        a = n(67),
        i = n(31),
        s = {
            betLimit: 0,
            contractLimit: 0,
            amountLimit: [],
            isRequested: !1
        };
    t.a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
            t = arguments[1];
        switch (t.type) {
            case a.i:
            case a.h:
            case o.b.SUCCESS:
                if (t.data.amounts) {
                    var n = "string" === typeof t.data.amounts ? r(t.data.amounts) : t.data.amounts;
                    return Object.assign({}, e, {
                        betLimit: t.data.betLimit,
                        contractLimit: t.data.contractLimit,
                        amountLimit: n,
                        isRequested: !0
                    })
                }
                return e;
            case "WS_ROUND":
                return t.data.s > i.d ? Object.assign({}, e, {
                    isRequested: !1
                }) : e;
            case a.g:
                return s;
            default:
                return e
        }
    }
}