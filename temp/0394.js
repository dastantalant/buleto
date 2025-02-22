function(e, t, n) {
    var r = n(1),
        o = n(128),
        a = Math.exp;
    r(r.S, "Math", {
        tanh: function(e) {
            var t = o(e = +e),
                n = o(-e);
            return t == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (t - n) / (a(e) + a(-e))
        }
    })
}