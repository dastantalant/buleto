 function (e, t, n) {
    var r = n(13).f,
        o = n(27),
        a = n(10)("toStringTag");
    e.exports = function (e, t, n) {
        e && !o(e = n ? e : e.prototype, a) && r(e, a, {
            configurable: !0,
            value: t
        })
    }
}