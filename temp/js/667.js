 function (e, t, n) {
    "use strict";
    var r = n(668);
    t.a = function (e, t, n) {
        if (void 0 === t && (t = r.b),
            null == n && (n = r.a), !e || "string" !== typeof e)
            return {
                maskChar: t,
                charsRules: n,
                mask: null,
                prefix: null,
                lastEditablePos: null,
                permanents: []
            };
        var o = "",
            a = "",
            i = [],
            s = !1,
            l = null;
        return e.split("").forEach(function (e) {
            s || "\\" !== e ? (s || !n[e] ? (i.push(o.length),
                o.length === i.length - 1 && (a += e)) : l = o.length + 1,
                o += e,
                s = !1) : s = !0
        }), {
            maskChar: t,
            charsRules: n,
            prefix: a,
            mask: o,
            lastEditablePos: l,
            permanents: i
        }
    }
}