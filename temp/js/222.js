 function (e, t, n) {
    "use strict";
    var r = n(223),
        o = n(65);
    e.exports = n(99)("Map", function (e) {
        return function () {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function (e) {
            var t = r.getEntry(o(this, "Map"), e);
            return t && t.v
        },
        set: function (e, t) {
            return r.def(o(this, "Map"), 0 === e ? 0 : e, t)
        }
    }, r, !0)
}