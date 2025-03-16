 function (e, t, n) {
    var r = n(1),
        o = Math.abs;
    r(r.S, "Math", {
        hypot: function (e, t) {
            for (var n, r, a = 0, i = 0, s = arguments.length, l = 0; i < s;)
                n = o(arguments[i++]),
                    l < n ? (r = l / n,
                        a = a * r * r + 1,
                        l = n) : n > 0 ? (r = n / l,
                            a += r * r) : a += n;
            return l === 1 / 0 ? 1 / 0 : l * Math.sqrt(a)
        }
    })
}