 function (e, t, n) {
    var r = n(10)("iterator"),
        o = !1;
    try {
        var a = [7][r]();
        a.return = function () {
            o = !0
        },
            Array.from(a, function () {
                throw 2
            })
    } catch (e) { }
    e.exports = function (e, t) {
        if (!t && !o)
            return !1;
        var n = !1;
        try {
            var a = [7],
                i = a[r]();
            i.next = function () {
                return {
                    done: n = !0
                }
            },
                a[r] = function () {
                    return i
                },
                e(a)
        } catch (e) { }
        return n
    }
}