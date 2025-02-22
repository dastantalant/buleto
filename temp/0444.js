function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(45)(6),
        a = "findIndex",
        i = !0;
    a in [] && Array(1)[a](function() {
            i = !1
        }),
        r(r.P + r.F * i, "Array", {
            findIndex: function(e) {
                return o(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }),
        n(52)(a)
}