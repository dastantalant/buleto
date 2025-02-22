function(e, t, n) {
    "use strict";

    function r(e) {
        return function() {
            return function(t) {
                return function(n) {
                    if (n.type !== o.a)
                        return t(n);
                    var r = n.payload,
                        a = r.method,
                        i = r.args;
                    e[a].apply(e, i)
                }
            }
        }
    }
    t.a = r;
    var o = n(195)
}