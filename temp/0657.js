function(e, t) {
    e.exports = function(e, t, n, r) {
        var o = n ? n.call(r, e, t) : void 0;
        if (void 0 !== o)
            return !!o;
        if (e === t)
            return !0;
        if ("object" !== typeof e || !e || "object" !== typeof t || !t)
            return !1;
        var a = Object.keys(e),
            i = Object.keys(t);
        if (a.length !== i.length)
            return !1;
        for (var s = Object.prototype.hasOwnProperty.bind(t), l = 0; l < a.length; l++) {
            var c = a[l];
            if (!s(c))
                return !1;
            var u = e[c],
                d = t[c];
            if (!1 === (o = n ? n.call(r, u, d, c) : void 0) || void 0 === o && u !== d)
                return !1
        }
        return !0
    }
}