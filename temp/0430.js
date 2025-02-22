function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(17),
        a = n(14),
        i = n(8),
        s = [].sort,
        l = [1, 2, 3];
    r(r.P + r.F * (i(function() {
        l.sort(void 0)
    }) || !i(function() {
        l.sort(null)
    }) || !n(37)(s)), "Array", {
        sort: function(e) {
            return void 0 === e ? s.call(a(this)) : s.call(a(this), o(e))
        }
    })
}