 function (e, t, n) {
    var r = n(5).parseInt,
        o = n(70).trim,
        a = n(124),
        i = /^[-+]?0[xX]/;
    e.exports = 8 !== r(a + "08") || 22 !== r(a + "0x16") ? function (e, t) {
        var n = o(String(e), 3);
        return r(n, t >>> 0 || (i.test(n) ? 16 : 10))
    } :
        r
}