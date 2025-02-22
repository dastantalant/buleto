function(e, t, n) {
    var r = n(4),
        o = n(202),
        a = n(121),
        i = n(120)("IE_PROTO"),
        s = function() {},
        l = function() {
            var e, t = n(118)("iframe"),
                r = a.length;
            for (t.style.display = "none",
                n(122).appendChild(t),
                t.src = "javascript:",
                e = t.contentWindow.document,
                e.open(),
                e.write("<script>document.F=Object<\/script>"),
                e.close(),
                l = e.F; r--;)
                delete l.prototype[a[r]];
            return l()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s.prototype = r(e),
                n = new s,
                s.prototype = null,
                n[i] = e) : n = l(),
            void 0 === t ? n : o(n, t)
    }
}