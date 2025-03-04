 function (e, t, n) {
    "use strict";
    var r = n(69),
        o = {};
    o[n(10)("toStringTag")] = "z",
        o + "" != "[object z]" && n(23)(Object.prototype, "toString", function () {
            return "[object " + r(this) + "]"
        }, !0)
}