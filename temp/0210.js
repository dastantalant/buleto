function(e, t, n) {
    var r = n(5).parseFloat,
        o = n(70).trim;
    e.exports = 1 / r(n(124) + "-0") !== -1 / 0 ? function(e) {
            var t = o(String(e), 3),
                n = r(t);
            return 0 === n && "-" == t.charAt(0) ? -0 : n
        } :
        r
}