 function (e, t, n) {
    "use strict";
    var r;
    if (!Object.keys) {
        var o = Object.prototype.hasOwnProperty,
            a = Object.prototype.toString,
            i = n(287),
            s = Object.prototype.propertyIsEnumerable,
            l = !s.call({
                toString: null
            }, "toString"),
            c = s.call(function () { }, "prototype"),
            u = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            d = function (e) {
                var t = e.constructor;
                return t && t.prototype === e
            },
            p = {
                $applicationCache: !0,
                $console: !0,
                $external: !0,
                $frame: !0,
                $frameElement: !0,
                $frames: !0,
                $innerHeight: !0,
                $innerWidth: !0,
                $onmozfullscreenchange: !0,
                $onmozfullscreenerror: !0,
                $outerHeight: !0,
                $outerWidth: !0,
                $pageXOffset: !0,
                $pageYOffset: !0,
                $parent: !0,
                $scrollLeft: !0,
                $scrollTop: !0,
                $scrollX: !0,
                $scrollY: !0,
                $self: !0,
                $webkitIndexedDB: !0,
                $webkitStorageInfo: !0,
                $window: !0
            },
            h = function () {
                if ("undefined" === typeof window)
                    return !1;
                for (var e in window)
                    try {
                        if (!p["$" + e] && o.call(window, e) && null !== window[e] && "object" === typeof window[e])
                            try {
                                d(window[e])
                            } catch (e) {
                                return !0
                            }
                    } catch (e) {
                        return !0
                    }
                return !1
            }(),
            f = function (e) {
                if ("undefined" === typeof window || !h)
                    return d(e);
                try {
                    return d(e)
                } catch (e) {
                    return !1
                }
            };
        r = function (e) {
            var t = null !== e && "object" === typeof e,
                n = "[object Function]" === a.call(e),
                r = i(e),
                s = t && "[object String]" === a.call(e),
                d = [];
            if (!t && !n && !r)
                throw new TypeError("Object.keys called on a non-object");
            var p = c && n;
            if (s && e.length > 0 && !o.call(e, 0))
                for (var h = 0; h < e.length; ++h)
                    d.push(String(h));
            if (r && e.length > 0)
                for (var m = 0; m < e.length; ++m)
                    d.push(String(m));
            else
                for (var g in e)
                    p && "prototype" === g || !o.call(e, g) || d.push(String(g));
            if (l)
                for (var y = f(e), v = 0; v < u.length; ++v)
                    y && "constructor" === u[v] || !o.call(e, u[v]) || d.push(u[v]);
            return d
        }
    }
    e.exports = r
}