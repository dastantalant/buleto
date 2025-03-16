 function (e, t, n) {
    var r = n(36),
        o = n(11);
    e.exports = function (e) {
        if (void 0 === e)
            return 0;
        var t = r(e),
            n = o(t);
        if (t !== n)
            throw RangeError("Wrong length!");
        return n
    }
}