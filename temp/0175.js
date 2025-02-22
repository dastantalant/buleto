function(e, t, n) {
    "use strict";

    function r(e, t) {
        e.prototype = Object.create(t.prototype),
            e.prototype.constructor = e,
            e.__proto__ = t
    }
    t.a = r
}