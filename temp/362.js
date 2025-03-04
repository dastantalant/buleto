 function (e, t, n) {
    var r = n(13).f,
        o = Function.prototype,
        a = /^\s*function ([^ (]*)/;
    "name" in o || n(12) && r(o, "name", {
        configurable: !0,
        get: function () {
            try {
                return ("" + this).match(a)[1]
            } catch (e) {
                return ""
            }
        }
    })
}