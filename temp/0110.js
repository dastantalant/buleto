function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            type: s.b,
            data: e
        }
    }

    function o() {
        return function(e) {
            return e({
                type: s.f
            })
        }
    }

    function a(e) {
        return {
            type: s.g,
            data: e
        }
    }

    function i(e) {
        return function(t, n) {
            var r = n().traderoom.getIn(["coupon", "repeatArray"]),
                o = n().traderoom.getIn(["coupon", "repeatIndex"]),
                a = r[o - 1],
                i = a.reduce(function(e, t) {
                    return e + t.amount
                }, 0) / 36;
            return t({
                type: s.h,
                data: e,
                amount: i
            })
        }
    }
    t.a = r,
        t.b = o,
        t.c = a,
        t.d = i;
    var s = n(148)
}