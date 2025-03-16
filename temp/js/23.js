 function (e, t, n) {
    var r = n(5),
        o = n(22),
        a = n(27),
        i = n(56)("src"),
        s = n(342),
        l = ("" + s).split("toString");
    n(33).inspectSource = function (e) {
        return s.call(e)
    },
        (e.exports = function (e, t, n, s) {
            var c = "function" == typeof n;
            c && (a(n, "name") || o(n, "name", t)),
                e[t] !== n && (c && (a(n, i) || o(n, i, e[t] ? "" + e[t] : l.join(String(t)))),
                    e === r ? e[t] = n : s ? e[t] ? e[t] = n : o(e, t, n) : (delete e[t],
                        o(e, t, n)))
        })(Function.prototype, "toString", function () {
            return "function" == typeof this && this[i] || s.call(this)
        })
}