 function (e, t, n) {
    var r = n(76)("wks"),
        o = n(56),
        a = n(5).Symbol,
        i = "function" == typeof a;
    (e.exports = function (e) {
        return r[e] || (r[e] = i && a[e] || (i ? a : o)("Symbol." + e))
    }).store = r
}