function(e, t, n) {
    for (var r = n(138), o = n(57), a = n(23), i = n(5), s = n(22), l = n(71), c = n(10), u = c("iterator"), d = c("toStringTag"), p = l.Array, h = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1
        }, f = o(h), m = 0; m < f.length; m++) {
        var g, y = f[m],
            v = h[y],
            b = i[y],
            _ = b && b.prototype;
        if (_ && (_[u] || s(_, u, p),
                _[d] || s(_, d, y),
                l[y] = p,
                v))
            for (g in r)
                _[g] || a(_, g, r[g], !0)
    }
}