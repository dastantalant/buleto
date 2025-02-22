function(e, t, n) {
    "use strict";

    function r(e, t) {
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), s = 2; s < n; s++)
            r[s - 2] = arguments[s];
        var l = {
                done: !1,
                value: Object(a.i)(e)
            },
            c = function(e) {
                return {
                    done: !1,
                    value: a.f.apply(void 0, [t].concat(r, [e]))
                }
            },
            u = function(e) {
                return {
                    done: !1,
                    value: Object(a.e)(e)
                }
            },
            d = void 0,
            p = void 0,
            h = function(e) {
                return d = e
            },
            f = function(e) {
                return p = e
            };
        return Object(o.a)({
            q1: function() {
                return ["q2", l, f]
            },
            q2: function() {
                return p === i.a ? [o.b] : d ? ["q3", u(d)] : ["q1", c(p), h]
            },
            q3: function() {
                return ["q1", c(p), h]
            }
        }, "q1", "takeLatest(" + Object(o.c)(e) + ", " + t.name + ")")
    }
    t.a = r;
    var o = n(113),
        a = n(49),
        i = n(66)
}