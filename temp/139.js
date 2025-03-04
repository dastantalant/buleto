 function (e, t, n) {
    "use strict";
    var r = n(79),
        o = RegExp.prototype.exec,
        a = String.prototype.replace,
        i = o,
        s = function () {
            var e = /a/,
                t = /b*/g;
            return o.call(e, "a"),
                o.call(t, "a"),
                0 !== e.lastIndex || 0 !== t.lastIndex
        }(),
        l = void 0 !== /()??/.exec("")[1];
    (s || l) && (i = function (e) {
        var t, n, i, c, u = this;
        return l && (n = new RegExp("^" + u.source + "$(?!\\s)", r.call(u))),
            s && (t = u.lastIndex),
            i = o.call(u, e),
            s && i && (u.lastIndex = u.global ? i.index + i[0].length : t),
            l && i && i.length > 1 && a.call(i[0], n, function () {
                for (c = 1; c < arguments.length - 2; c++)
                    void 0 === arguments[c] && (i[c] = void 0)
            }),
            i
    }),
        e.exports = i
}