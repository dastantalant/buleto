function(e, t, n) {
    "use strict";
    var r = n(244),
        o = function() {
            try {
                return !!Object.defineProperty({}, "a", {})
            } catch (e) {
                return !1
            }
        }(),
        a = (!o && Object.prototype.__defineGetter__,
            o ? Object.defineProperty : function(e, t, n) {
                "get" in n && e.__defineGetter__ ? e.__defineGetter__(t, n.get) : (!r.hop.call(e, t) || "value" in n) && (e[t] = n.value)
            }
        ),
        i = Object.create || function(e, t) {
            function n() {}
            var o, i;
            n.prototype = e,
                o = new n;
            for (i in t)
                r.hop.call(t, i) && a(o, i, t[i]);
            return o
        };
    t.defineProperty = a,
        t.objCreate = i
}