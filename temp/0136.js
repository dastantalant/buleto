function(e, t, n) {
    var r = n(69),
        o = n(10)("iterator"),
        a = n(71);
    e.exports = n(33).getIteratorMethod = function(e) {
        if (void 0 != e)
            return e[o] || e["@@iterator"] || a[r(e)]
    }
}