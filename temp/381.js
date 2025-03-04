 function (e, t, n) {
    var r = n(1),
        o = n(127);
    r(r.S, "Math", {
        cbrt: function (e) {
            return o(e = +e) * Math.pow(Math.abs(e), 1 / 3)
        }
    })
}