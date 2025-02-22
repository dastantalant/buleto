function(e, t, n) {
    var r = n(1);
    r(r.S, "Math", {
        imulh: function(e, t) {
            var n = +e,
                r = +t,
                o = 65535 & n,
                a = 65535 & r,
                i = n >> 16,
                s = r >> 16,
                l = (i * a >>> 0) + (o * a >>> 16);
            return i * s + (l >> 16) + ((o * s >>> 0) + (65535 & l) >> 16)
        }
    })
}