 function (e, t, n) {
    var r = n(127),
        o = Math.pow,
        a = o(2, -52),
        i = o(2, -23),
        s = o(2, 127) * (2 - i),
        l = o(2, -126),
        c = function (e) {
            return e + 1 / a - 1 / a
        };
    e.exports = Math.fround || function (e) {
        var t, n, o = Math.abs(e),
            u = r(e);
        return o < l ? u * c(o / l / i) * l * i : (t = (1 + i / a) * o,
            n = t - (t - o),
            n > s || n != n ? u * (1 / 0) : u * n)
    }
}