function(e, t, n) {
    "use strict";
    n.d(t, "b", function() {
            return a
        }),
        n.d(t, "a", function() {
            return i
        });
    var r = n(2),
        o = n.n(r),
        a = o.a.shape({
            trySubscribe: o.a.func.isRequired,
            tryUnsubscribe: o.a.func.isRequired,
            notifyNestedSubs: o.a.func.isRequired,
            isSubscribed: o.a.func.isRequired
        }),
        i = o.a.shape({
            subscribe: o.a.func.isRequired,
            dispatch: o.a.func.isRequired,
            getState: o.a.func.isRequired
        })
}