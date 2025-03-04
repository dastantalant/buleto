 function (e, t, n) {
    var r = n(1),
        o = n(17),
        a = n(4),
        i = (n(5).Reflect || {}).apply,
        s = Function.apply;
    r(r.S + r.F * !n(8)(function () {
        i(function () { })
    }), "Reflect", {
        apply: function (e, t, n) {
            var r = o(e),
                l = a(n);
            return i ? i(r, t, l) : s.call(r, t, l)
        }
    })
}