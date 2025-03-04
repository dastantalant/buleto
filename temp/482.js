 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(230),
        a = n(98),
        i = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(a);
    r(r.P + r.F * i, "String", {
        padStart: function (e) {
            return o(this, e, arguments.length > 1 ? arguments[1] : void 0, !0)
        }
    })
}