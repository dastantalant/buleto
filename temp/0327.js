function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        for (var r = arguments.length, c = Array(r > 3 ? r - 3 : 0), u = 3; u < r; u++)
            c[u - 3] = arguments[u];
        var d = void 0,
            p = void 0,
            h = {
                done: !1,
                value: Object(a.a)(t, s.a.sliding(1))
            },
            f = function() {
                return {
                    done: !1,
                    value: Object(a.i)(p)
                }
            },
            m = function(e) {
                return {
                    done: !1,
                    value: a.f.apply(void 0, [n].concat(c, [e]))
                }
            },
            g = {
                done: !1,
                value: Object(a.d)(l.j, e)
            },
            y = function(e) {
                return d = e
            },
            v = function(e) {
                return p = e
            };
        return Object(o.a)({
            q1: function() {
                return ["q2", h, v]
            },
            q2: function() {
                return ["q3", f(), y]
            },
            q3: function() {
                return d === i.a ? [o.b] : ["q4", m(d)]
            },
            q4: function() {
                return ["q2", g]
            }
        }, "q1", "throttle(" + Object(o.c)(t) + ", " + n.name + ")")
    }
    t.a = r;
    var o = n(113),
        a = n(49),
        i = n(66),
        s = n(85),
        l = n(26)
}