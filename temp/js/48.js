 function (e, t, n) {
    var r = n(222),
        o = n(1),
        a = n(76)("metadata"),
        i = a.store || (a.store = new (n(225))),
        s = function (e, t, n) {
            var o = i.get(e);
            if (!o) {
                if (!n)
                    return;
                i.set(e, o = new r)
            }
            var a = o.get(t);
            if (!a) {
                if (!n)
                    return;
                o.set(t, a = new r)
            }
            return a
        },
        l = function (e, t, n) {
            var r = s(t, n, !1);
            return void 0 !== r && r.has(e)
        },
        c = function (e, t, n) {
            var r = s(t, n, !1);
            return void 0 === r ? void 0 : r.get(e)
        },
        u = function (e, t, n, r) {
            s(n, r, !0).set(e, t)
        },
        d = function (e, t) {
            var n = s(e, t, !1),
                r = [];
            return n && n.forEach(function (e, t) {
                r.push(t)
            }),
                r
        },
        p = function (e) {
            return void 0 === e || "symbol" == typeof e ? e : String(e)
        },
        h = function (e) {
            o(o.S, "Reflect", e)
        };
    e.exports = {
        store: i,
        map: s,
        has: l,
        get: c,
        set: u,
        keys: d,
        key: p,
        exp: h
    }
}