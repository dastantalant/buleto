function(e, t, n) {
    var r = n(1),
        o = n(128),
        a = Math.exp;
    r(r.S + r.F * n(8)(function() {
        return -2e-17 != !Math.sinh(-2e-17)
    }), "Math", {
        sinh: function(e) {
            return Math.abs(e = +e) < 1 ? (o(e) - o(-e)) / 2 : (a(e - 1) - a(-e - 1)) * (Math.E / 2)
        }
    })
}