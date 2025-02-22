function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return Object(s.a)({}, n, e, t)
    }

    function o(e) {
        return function(t, n) {
            var r, o = (n.displayName,
                    n.pure),
                a = n.areMergedPropsEqual,
                i = !1;
            return function(t, n, s) {
                var l = e(t, n, s);
                return i ? o && a(l, r) || (r = l) : (i = !0,
                        r = l),
                    r
            }
        }
    }

    function a(e) {
        return "function" === typeof e ? o(e) : void 0
    }

    function i(e) {
        return e ? void 0 : function() {
            return r
        }
    }
    var s = n(84);
    n(180);
    t.a = [a, i]
}