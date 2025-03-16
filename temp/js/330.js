 function (e, t, n) {
    "use strict";

    function r(e) {
        return "/" === e.charAt(0)
    }

    function o(e, t) {
        for (var n = t, r = n + 1, o = e.length; r < o; n += 1,
            r += 1)
            e[n] = e[r];
        e.pop()
    }

    function a(e, t) {
        void 0 === t && (t = "");
        var n = e && e.split("/") || [],
            a = t && t.split("/") || [],
            i = e && r(e),
            s = t && r(t),
            l = i || s;
        if (e && r(e) ? a = n : n.length && (a.pop(),
            a = a.concat(n)), !a.length)
            return "/";
        var c;
        if (a.length) {
            var u = a[a.length - 1];
            c = "." === u || ".." === u || "" === u
        } else
            c = !1;
        for (var d = 0, p = a.length; p >= 0; p--) {
            var h = a[p];
            "." === h ? o(a, p) : ".." === h ? (o(a, p),
                d++) : d && (o(a, p),
                    d--)
        }
        if (!l)
            for (; d--; d)
                a.unshift("..");
        !l || "" === a[0] || a[0] && r(a[0]) || a.unshift("");
        var f = a.join("/");
        return c && "/" !== f.substr(-1) && (f += "/"),
            f
    }
    t.a = a
}