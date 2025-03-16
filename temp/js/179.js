 function (e, t, n) {
    "use strict";

    function r(e) {
        return function (t, n) {
            function r() {
                return o
            }
            var o = e(t, n);
            return r.dependsOnOwnProps = !1,
                r
        }
    }

    function o(e) {
        return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps ? Boolean(e.dependsOnOwnProps) : 1 !== e.length
    }

    function a(e, t) {
        return function (t, n) {
            var r = (n.displayName,
                function (e, t) {
                    return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e)
                }
            );
            return r.dependsOnOwnProps = !0,
                r.mapToProps = function (t, n) {
                    r.mapToProps = e,
                        r.dependsOnOwnProps = o(e);
                    var a = r(t, n);
                    return "function" === typeof a && (r.mapToProps = a,
                        r.dependsOnOwnProps = o(a),
                        a = r(t, n)),
                        a
                },
                r
        }
    }
    t.a = r,
        t.b = a;
    n(180)
}