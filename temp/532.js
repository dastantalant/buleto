 function (e, t, n) {
    var r = n(1),
        o = n(142)(),
        a = n(5).process,
        i = "process" == n(35)(a);
    r(r.G, {
        asap: function (e) {
            var t = i && a.domain;
            o(t ? t.bind(e) : e)
        }
    })
}