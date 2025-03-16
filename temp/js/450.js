 function (e, t, n) {
    "use strict";
    var r = n(94),
        o = n(4),
        a = n(80),
        i = n(140),
        s = n(11),
        l = n(96),
        c = n(139),
        u = n(8),
        d = Math.min,
        p = [].push,
        h = "length",
        f = !u(function () {
            RegExp(4294967295, "y")
        });
    n(97)("split", 2, function (e, t, n, u) {
        var m;
        return m = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1)[h] || 2 != "ab".split(/(?:ab)*/)[h] || 4 != ".".split(/(.?)(.?)/)[h] || ".".split(/()()/)[h] > 1 || "".split(/.?/)[h] ? function (e, t) {
            var o = String(this);
            if (void 0 === e && 0 === t)
                return [];
            if (!r(e))
                return n.call(o, e, t);
            for (var a, i, s, l = [], u = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), d = 0, f = void 0 === t ? 4294967295 : t >>> 0, m = new RegExp(e.source, u + "g");
                (a = c.call(m, o)) && !((i = m.lastIndex) > d && (l.push(o.slice(d, a.index)),
                    a[h] > 1 && a.index < o[h] && p.apply(l, a.slice(1)),
                    s = a[0][h],
                    d = i,
                    l[h] >= f));)
                m.lastIndex === a.index && m.lastIndex++;
            return d === o[h] ? !s && m.test("") || l.push("") : l.push(o.slice(d)),
                l[h] > f ? l.slice(0, f) : l
        } :
            "0".split(void 0, 0)[h] ? function (e, t) {
                return void 0 === e && 0 === t ? [] : n.call(this, e, t)
            } :
                n, [function (n, r) {
                    var o = e(this),
                        a = void 0 == n ? void 0 : n[t];
                    return void 0 !== a ? a.call(n, o, r) : m.call(String(o), n, r)
                }, function (e, t) {
                    var r = u(m, e, this, t, m !== n);
                    if (r.done)
                        return r.value;
                    var c = o(e),
                        p = String(this),
                        h = a(c, RegExp),
                        g = c.unicode,
                        y = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (f ? "y" : "g"),
                        v = new h(f ? c : "^(?:" + c.source + ")", y),
                        b = void 0 === t ? 4294967295 : t >>> 0;
                    if (0 === b)
                        return [];
                    if (0 === p.length)
                        return null === l(v, p) ? [p] : [];
                    for (var _ = 0, w = 0, x = []; w < p.length;) {
                        v.lastIndex = f ? w : 0;
                        var E, k = l(v, f ? p : p.slice(w));
                        if (null === k || (E = d(s(v.lastIndex + (f ? 0 : w)), p.length)) === _)
                            w = i(p, w, g);
                        else {
                            if (x.push(p.slice(_, w)),
                                x.length === b)
                                return x;
                            for (var S = 1; S <= k.length - 1; S++)
                                if (x.push(k[S]),
                                    x.length === b)
                                    return x;
                            w = _ = E
                        }
                    }
                    return x.push(p.slice(_)),
                        x
                }]
    })
}