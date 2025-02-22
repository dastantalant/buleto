function(e, t, n) {
    "use strict";
    var r = n(93)(!0);
    n(129)(String, "String", function(e) {
        this._t = String(e),
            this._i = 0
    }, function() {
        var e, t = this._t,
            n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = r(t, n),
            this._i += e.length, {
                value: e,
                done: !1
            })
    })
}