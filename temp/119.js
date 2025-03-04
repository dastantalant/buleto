 function (e, t, n) {
    var r = n(5),
        o = n(33),
        a = n(50),
        i = n(200),
        s = n(13).f;
    e.exports = function (e) {
        var t = o.Symbol || (o.Symbol = a ? {} : r.Symbol || {});
        "_" == e.charAt(0) || e in t || s(t, e, {
            value: i.f(e)
        })
    }
}