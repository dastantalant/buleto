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
    });
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
        l = n(0),
        c = r(l),
        u = {
            bgColor: s.default.oneOfType([s.default.object, s.default.string]).isRequired,
            bgD: s.default.string.isRequired,
            fgColor: s.default.oneOfType([s.default.object, s.default.string]).isRequired,
            fgD: s.default.string.isRequired,
            size: s.default.number.isRequired,
            title: s.default.string,
            viewBoxSize: s.default.number.isRequired,
            xmlns: s.default.string
        },
        d = (0,
            l.forwardRef)(function(e, t) {
            var n = e.bgColor,
                r = e.bgD,
                i = e.fgD,
                s = e.fgColor,
                l = e.size,
                u = e.title,
                d = e.viewBoxSize,
                p = e.xmlns,
                h = void 0 === p ? "http://www.w3.org/2000/svg" : p,
                f = o(e, ["bgColor", "bgD", "fgD", "fgColor", "size", "title", "viewBoxSize", "xmlns"]);
            return c.default.createElement("svg", a({}, f, {
                height: l,
                ref: t,
                viewBox: "0 0 " + d + " " + d,
                width: l,
                xmlns: h
            }), u ? c.default.createElement("title", null, u) : null, c.default.createElement("path", {
                d: r,
                fill: n
            }), c.default.createElement("path", {
                d: i,
                fill: s
            }))
        });
    d.displayName = "QRCodeSvg",
        d.propTypes = u,
        t.default = d
}