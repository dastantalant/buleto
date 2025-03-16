 function (e, t, n) {
    var r = n(1);
    r(r.S, "Math", {
        signbit: function (e) {
            return (e = +e) != e ? e : 0 == e ? 1 / e == 1 / 0 : e > 0
        }
    })
}