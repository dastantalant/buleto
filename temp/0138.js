function(e, t, n) {
    "use strict";
    var r = n(14),
        o = n(58),
        a = n(11);
    e.exports = function(e) {
        for (var t = r(this), n = a(t.length), i = arguments.length, s = o(i > 1 ? arguments[1] : void 0, n), l = i > 2 ? arguments[2] : void 0, c = void 0 === l ? n : o(l, n); c > s;)
            t[s++] = e;
        return t
    }
}