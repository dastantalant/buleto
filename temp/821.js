 function (e, t, n) {
    "use strict";

    function r(e, t) {
        var n = {};
        for (var r in e)
            t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
        return n
    }
    var o = n(0),
        a = n.n(o),
        i = n(87),
        s = n(280),
        l = function (e) {
            var t = e.component,
                n = r(e, ["component"]);
            return a.a.createElement(i.b, Object.assign({}, n, {
                render: function (e) {
                    return sessionStorage.getItem("man-token") ? a.a.createElement(s.a, Object.assign({
                        component: t
                    }, e)) : a.a.createElement(i.a, {
                        to: {
                            pathname: "/login",
                            state: {
                                from: e.location
                            }
                        }
                    })
                }
            }))
        };
    t.a = l
}