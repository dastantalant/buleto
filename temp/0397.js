function(e, t, n) {
    var r = n(1),
        o = n(28),
        a = n(11);
    r(r.S, "String", {
        raw: function(e) {
            for (var t = o(e.raw), n = a(t.length), r = arguments.length, i = [], s = 0; n > s;)
                i.push(String(t[s++])),
                s < r && i.push(String(arguments[s]));
            return i.join("")
        }
    })
}