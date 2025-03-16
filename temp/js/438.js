 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(90)(!1),
        a = [].indexOf,
        i = !!a && 1 / [1].indexOf(1, -0) < 0;
    r(r.P + r.F * (i || !n(37)(a)), "Array", {
        indexOf: function (e) {
            return i ? a.apply(this, arguments) || 0 : o(this, e, arguments[1])
        }
    })
}