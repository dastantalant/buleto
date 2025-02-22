function(e, t, n) {
    "use strict";
    var r = n(1),
        o = n(8),
        a = n(210),
        i = 1..toPrecision;
    r(r.P + r.F * (o(function() {
        return "1" !== i.call(1, void 0)
    }) || !o(function() {
        i.call({})
    })), "Number", {
        toPrecision: function(e) {
            var t = a(this, "Number#toPrecision: incorrect invocation!");
            return void 0 === e ? i.call(t) : i.call(t, e)
        }
    })
}