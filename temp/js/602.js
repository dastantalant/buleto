 function (e, t, n) {
    "use strict";
    n.d(t, "a", function () {
        return o
    }),
        n.d(t, "c", function () {
            return a
        }),
        n.d(t, "b", function () {
            return i
        });
    var r = n(16),
        o = function () {
            return Object(r.b)("/api/spinbin/params", "get")
        },
        a = function (e) {
            return Object(r.b)("/api/spinbin/contract?source=" + e.source, "post", e.data)
        },
        i = function () {
            return Object(r.b)("/api/balance/", "get")
        }
}