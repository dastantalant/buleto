 function (e, t, n) {
    var r = n(9),
        o = n(51).onFreeze;
    n(44)("freeze", function (e) {
        return function (t) {
            return e && r(t) ? e(o(t)) : t
        }
    })
}