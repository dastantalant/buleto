 function (e, t, n) {
    var r = n(36),
        o = Math.max,
        a = Math.min;
    e.exports = function (e, t) {
        return e = r(e),
            e < 0 ? o(e + t, 0) : a(e, t)
    }
}