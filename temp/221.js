 function (e, t, n) {
    var r = n(4),
        o = n(9),
        a = n(143);
    e.exports = function (e, t) {
        if (r(e),
            o(t) && t.constructor === e)
            return t;
        var n = a.f(e);
        return (0,
            n.resolve)(t),
            n.promise
    }
}