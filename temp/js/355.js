 function (e, t, n) {
    var r = n(9);
    n(44)("isSealed", function (e) {
        return function (t) {
            return !r(t) || !!e && e(t)
        }
    })
}