 function (e, t, n) {
    "use strict";
    var r = n(1),
        o = n(131);
    r(r.P + r.F * n(132)("includes"), "String", {
        includes: function (e) {
            return !!~o(this, e, "includes").indexOf(e, arguments.length > 1 ? arguments[1] : void 0)
        }
    })
}