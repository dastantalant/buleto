 function (e, t, n) {
    "use strict";
    var r = n(226),
        o = n(65);
    n(99)("WeakSet", function (e) {
        return function () {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        add: function (e) {
            return r.def(o(this, "WeakSet"), e, !0)
        }
    }, r, !1, !0)
}