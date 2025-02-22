function(e, t, n) {
    var r = n(1),
        o = n(58),
        a = String.fromCharCode,
        i = String.fromCodePoint;
    r(r.S + r.F * (!!i && 1 != i.length), "String", {
        fromCodePoint: function(e) {
            for (var t, n = [], r = arguments.length, i = 0; r > i;) {
                if (t = +arguments[i++],
                    o(t, 1114111) !== t)
                    throw RangeError(t + " is not a valid code point");
                n.push(t < 65536 ? a(t) : a(55296 + ((t -= 65536) >> 10), t % 1024 + 56320))
            }
            return n.join("")
        }
    })
}