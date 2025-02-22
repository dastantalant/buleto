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
            u = void 0,
            d = function(e) {
                return u = e
            };
        return Object(o.a)({
            q1: function() {
                return ["q2", l, d]
            },
            q2: function() {
                return u === i.a ? [o.b] : ["q1", c(u)]
            }
        }, "q1", "takeEvery(" + Object(o.c)(e) + ", " + t.name + ")")
    }
    t.a = r;
    var o = n(113),
        a = n(49),
        i = n(66)
}