 function (e, t, n) {
    var r = n(9);
    n(44)("isExtensible", function (e) {
        return function (t) {
            return !!r(t) && (!e || e(t))
        }
    })
}