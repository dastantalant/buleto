 function (e, t, n) {
    var r = n(636),
        o = function (e) {
            return /[height|width]$/.test(e)
        },
        a = function (e) {
            var t = "",
                n = Object.keys(e);
            return n.forEach(function (a, i) {
                var s = e[a];
                a = r(a),
                    o(a) && "number" === typeof s && (s += "px"),
                    t += !0 === s ? a : !1 === s ? "not " + a : "(" + a + ": " + s + ")",
                    i < n.length - 1 && (t += " and ")
            }),
                t
        },
        i = function (e) {
            var t = "";
            return "string" === typeof e ? e : e instanceof Array ? (e.forEach(function (n, r) {
                t += a(n),
                    r < e.length - 1 && (t += ", ")
            }),
                t) : a(e)
        };
    e.exports = i
}