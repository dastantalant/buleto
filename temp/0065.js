function(e, t, n) {
    var r = n(23);
    e.exports = function(e, t, n) {
        for (var o in t)
            r(e, o, t[o], n);
        return e
    }
}