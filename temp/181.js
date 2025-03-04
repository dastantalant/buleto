 function (e, t, n) {
    "use strict";
    n.d(t, "b", function () {
        return p
    });
    var r = n(322),
        o = n(182),
        a = n(15),
        i = n(86),
        s = n(54),
        l = n(338),
        c = (n.n(l),
            n(16)),
        u = n(541),
        d = n(569),
        p = Object(s.a)(),
        h = Object(o.b)(),
        f = Object(d.a)(),
        m = [],
        g = [r.a, Object(i.c)(p), h, c.c],
        y = a.compose.apply(void 0, [a.applyMiddleware.apply(void 0, g)].concat(m)),
        v = Object(a.createStore)(u.a, f, y);
    v.runSaga = h.run,
        v.close = function () {
            return v.dispatch(o.a)
        },
        t.a = v
}