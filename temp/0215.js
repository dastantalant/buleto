function(e, t, n) {
    var r = n(4);
    e.exports = function(e, t, n, o) {
        try {
            return o ? t(r(n)[0], n[1]) : t(n)
        } catch (t) {
            var a = e.return;
            throw void 0 !== a && r(a.call(e)),
                t
        }
    }
}