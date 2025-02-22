function(e, t, n) {
    "use strict";
    n(219);
    var r = n(4),
        o = n(79),
        a = n(12),
        i = /./.toString,
        s = function(e) {
            n(23)(RegExp.prototype, "toString", e, !0)
        };
    n(8)(function() {
        return "/a/b" != i.call({
            source: "a",
            flags: "b"
        })
    }) ? s(function() {
        var e = r(this);
        return "/".concat(e.source, "/", "flags" in e ? e.flags : !a && e instanceof RegExp ? o.call(e) : void 0)
    }) : "toString" != i.name && s(function() {
        return i.call(this)
    })
}