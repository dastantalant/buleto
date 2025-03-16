 function (e, t, n) {
    var r = n(1),
        o = Math.imul;
    r(r.S + r.F * n(8)(function () {
        return -5 != o(4294967295, 5) || 2 != o.length
    }), "Math", {
        imul: function (e, t) {
            var n = +e,
                r = +t,
                o = 65535 & n,
                a = 65535 & r;
            return 0 | o * a + ((65535 & n >>> 16) * a + o * (65535 & r >>> 16) << 16 >>> 0)
        }
    })
}