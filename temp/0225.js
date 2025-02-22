function(e, t, n) {
    "use strict";
    var r = n(223),
        o = n(65);
    e.exports = n(99)("Set", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        add: function(e) {
            return r.def(o(this, "Set"), e = 0 === e ? 0 : e, e)
        }
    }, r)
}