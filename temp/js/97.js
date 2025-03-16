 function (e, t, n) {
    "use strict";
    n(218);
    var r = n(23),
        o = n(22),
        a = n(8),
        i = n(43),
        s = n(10),
        l = n(139),
        c = s("species"),
        u = !a(function () {
            var e = /./;
            return e.exec = function () {
                var e = [];
                return e.groups = {
                    a: "7"
                },
                    e
            },
                "7" !== "".replace(e, "$<a>")
        }),
        d = function () {
            var e = /(?:)/,
                t = e.exec;
            e.exec = function () {
                return t.apply(this, arguments)
            };
            var n = "ab".split(e);
            return 2 === n.length && "a" === n[0] && "b" === n[1]
        }();
    e.exports = function (e, t, n) {
        var p = s(e),
            h = !a(function () {
                var t = {};
                return t[p] = function () {
                    return 7
                },
                    7 != ""[e](t)
            }),
            f = h ? !a(function () {
                var t = !1,
                    n = /a/;
                return n.exec = function () {
                    return t = !0,
                        null
                },
                    "split" === e && (n.constructor = {},
                        n.constructor[c] = function () {
                            return n
                        }
                    ),
                    n[p](""), !t
            }) : void 0;
        if (!h || !f || "replace" === e && !u || "split" === e && !d) {
            var m = /./[p],
                g = n(i, p, ""[e], function (e, t, n, r, o) {
                    return t.exec === l ? h && !o ? {
                        done: !0,
                        value: m.call(t, n, r)
                    } : {
                        done: !0,
                        value: e.call(n, t, r)
                    } : {
                        done: !1
                    }
                }),
                y = g[0],
                v = g[1];
            r(String.prototype, e, y),
                o(RegExp.prototype, p, 2 == t ? function (e, t) {
                    return v.call(e, this, t)
                } :
                    function (e) {
                        return v.call(e, this)
                    }
                )
        }
    }
}