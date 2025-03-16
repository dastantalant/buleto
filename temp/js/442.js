 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(45)(5),
        a = !0;
    "find" in [] && Array(1).find(function () {
        a = !1
    }),
        r(r.P + r.F * a, "Array", {
            find: function (e) {
                return o(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }),
        n(52)("find")
}