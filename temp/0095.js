function(e, t, n) {
    var r = n(9),
        o = n(35),
        a = n(10)("match");
    e.exports = function(e) {
        var t;
        return r(e) && (void 0 !== (t = e[a]) ? !!t : "RegExp" == o(e))
    }
}