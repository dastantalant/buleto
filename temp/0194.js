function(e, t, n) {
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
        l = n(335),
        c = n.n(l),
        u = n(116),
        d = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        p = function(e) {
            var t = function(t) {
                var n = t.wrappedComponentRef,
                    o = r(t, ["wrappedComponentRef"]);
                return a.a.createElement(u.a, {
                    children: function(t) {
                        return a.a.createElement(e, d({}, o, t, {
                            ref: n
                        }))
                    }
                })
            };
            return t.displayName = "withRouter(" + (e.displayName || e.name) + ")",
                t.WrappedComponent = e,
                t.propTypes = {
                    wrappedComponentRef: s.a.func
                },
                c()(t, e)
        };
    t.a = p
}