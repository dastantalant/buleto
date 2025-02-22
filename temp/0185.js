function(e, t, n) {
    "use strict";

    function r(e, t) {
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
            r[i - 2] = arguments[i];
        var l = void 0;
        o.n.iterator(e) ? (l = e,
            e = t) : (Object(o.g)(t, o.n.func, s),
            l = t.apply(void 0, r),
            Object(o.g)(l, o.n.iterator, s));
        var c = e,
            u = c.subscribe,
            d = c.dispatch,
            p = c.getState,
            h = c.context,
            f = c.sagaMonitor,
            m = c.logger,
            g = c.onError,
            y = Object(o.v)();
        f && (f.effectTriggered = f.effectTriggered || o.r,
            f.effectResolved = f.effectResolved || o.r,
            f.effectRejected = f.effectRejected || o.r,
            f.effectCancelled = f.effectCancelled || o.r,
            f.actionDispatched = f.actionDispatched || o.r,
            f.effectTriggered({
                effectId: y,
                root: !0,
                parentEffectId: 0,
                effect: {
                    root: !0,
                    saga: t,
                    args: r
                }
            }));
        var v = Object(a.a)(l, u, Object(o.x)(d), p, h, {
            sagaMonitor: f,
            logger: m,
            onError: g
        }, y, t.name);
        return f && f.effectResolved(y, v),
            v
    }
    t.a = r;
    var o = n(26),
        a = n(185),
        i = "runSaga(storeInterface, saga, ...args)",
        s = i + ": saga argument must be a Generator function!"
}