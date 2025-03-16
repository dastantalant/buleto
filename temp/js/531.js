 function (e, t, n) {
    var r = n(48),
        o = n(4),
        a = n(17),
        i = r.key,
        s = r.set;
    r.exp({
        metadata: function (e, t) {
            return function (n, r) {
                s(e, t, (void 0 !== r ? o : a)(n), i(r))
            }
        }
    })
}