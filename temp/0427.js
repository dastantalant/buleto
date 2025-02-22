function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(134);
    r(r.S + r.F * n(8)(function() {
        function e() {}
        return !(Array.of.call(e) instanceof e)
    }), "Array", {
        of: function() {
            for (var e = 0, t = arguments.length, n = new("function" == typeof this ? this : Array)(t); t > e;)
                o(n, e, arguments[e++]);
            return n.length = t,
                n
        }
    })
}