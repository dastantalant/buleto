 function (e, t, n) {
    "use strict";

    function r(e, t, n) {
        if ("string" !== typeof t) {
            if (d) {
                var p = u(t);
                p && p !== d && r(e, p, n)
            }
            var h = s(t);
            l && (h = h.concat(l(t)));
            for (var f = 0; f < h.length; ++f) {
                var m = h[f];
                if (!o[m] && !a[m] && (!n || !n[m])) {
                    var g = c(t, m);
                    try {
                        i(e, m, g)
                    } catch (e) { }
                }
            }
            return e
        }
        return e
    }
    var o = {
        childContextTypes: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0
    },
        a = {
            name: !0,
            length: !0,
            prototype: !0,
            caller: !0,
            callee: !0,
            arguments: !0,
            arity: !0
        },
        i = Object.defineProperty,
        s = Object.getOwnPropertyNames,
        l = Object.getOwnPropertySymbols,
        c = Object.getOwnPropertyDescriptor,
        u = Object.getPrototypeOf,
        d = u && u(Object);
    e.exports = r
}