 function (e, t, n) {
    "use strict";

    function r(e, t) {
        var n = {};
        for (var r in e)
            t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
        return n
    }
    var o = n(0),
        a = n.n(o),
        i = n(2),
        s = n.n(i),
        l = n(250),
        c = n(248),
        u = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        d = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
            return typeof e
        } :
            function (e) {
                return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
        p = function (e) {
            var t = e.to,
                n = e.exact,
                o = e.strict,
                i = e.location,
                s = e.activeClassName,
                p = e.className,
                h = e.activeStyle,
                f = e.style,
                m = e.isActive,
                g = e["aria-current"],
                y = r(e, ["to", "exact", "strict", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "aria-current"]),
                v = "object" === ("undefined" === typeof t ? "undefined" : d(t)) ? t.pathname : t,
                b = v && v.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
            return a.a.createElement(l.a, {
                path: b,
                exact: n,
                strict: o,
                location: i,
                children: function (e) {
                    var n = e.location,
                        r = e.match,
                        o = !!(m ? m(r, n) : r);
                    return a.a.createElement(c.a, u({
                        to: t,
                        className: o ? [p, s].filter(function (e) {
                            return e
                        }).join(" ") : p,
                        style: o ? u({}, f, h) : f,
                        "aria-current": o && g || null
                    }, y))
                }
            })
        };
    p.propTypes = {
        to: c.a.propTypes.to,
        exact: s.a.bool,
        strict: s.a.bool,
        location: s.a.object,
        activeClassName: s.a.string,
        className: s.a.string,
        activeStyle: s.a.object,
        style: s.a.object,
        isActive: s.a.func,
        "aria-current": s.a.oneOf(["page", "step", "location", "date", "time", "true"])
    },
        p.defaultProps = {
            activeClassName: "active",
            "aria-current": "page"
        },
        t.a = p
}