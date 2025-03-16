 function (e, t, n) {
    "use strict";

    function r(e) {
        var t, n;
        this.promise = new e(function (e, r) {
            if (void 0 !== t || void 0 !== n)
                throw TypeError("Bad Promise constructor");
            t = e,
                n = r
        }),
            this.resolve = o(t),
            this.reject = o(n)
    }
    var o = n(17);
    e.exports.f = function (e) {
        return new r(e)
    }
}