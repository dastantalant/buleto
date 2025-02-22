function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(e, t) {
        var n = {};
        for (var r in e)
            t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
        return n
    }
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.QRCode = void 0;
    var a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        i = n(260),
        s = r(i),
        l = n(261),
        c = r(l),
        u = n(688),
        d = r(u),
        p = n(0),
        h = r(p),
        f = n(693),
        m = r(f),
        g = {
            bgColor: s.default.oneOfType([s.default.object, s.default.string]),
            fgColor: s.default.oneOfType([s.default.object, s.default.string]),
            level: s.default.string,
            size: s.default.number,
            value: s.default.string.isRequired
        },
        y = (0,
            p.forwardRef)(function(e, t) {
            var n = e.bgColor,
                r = void 0 === n ? "#FFFFFF" : n,
                i = e.fgColor,
                s = void 0 === i ? "#000000" : i,
                l = e.level,
                u = void 0 === l ? "L" : l,
                p = e.size,
                f = void 0 === p ? 256 : p,
                g = e.value,
                y = o(e, ["bgColor", "fgColor", "level", "size", "value"]),
                v = new d.default(-1, c.default[u]);
            v.addData(g),
                v.make();
            var b = v.modules;
            return h.default.createElement(m.default, a({}, y, {
                bgColor: r,
                bgD: b.map(function(e, t) {
                    return e.map(function(e, n) {
                        return e ? "" : "M " + n + " " + t + " l 1 0 0 1 -1 0 Z"
                    }).join(" ")
                }).join(" "),
                fgColor: s,
                fgD: b.map(function(e, t) {
                    return e.map(function(e, n) {
                        return e ? "M " + n + " " + t + " l 1 0 0 1 -1 0 Z" : ""
                    }).join(" ")
                }).join(" "),
                ref: t,
                size: f,
                viewBoxSize: b.length
            }))
        });
    t.QRCode = y,
        y.displayName = "QRCode",
        y.propTypes = g,
        t.default = y
}