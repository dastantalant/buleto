 function (e, t, n) {
    "use strict";

    function r(e) {
        var t = e.split(",");
        return parseInt(t[0], 10)
    }
    var o = n(241),
        a = n(67);
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            t = arguments[1];
        switch (t.type) {
            case o.a:
                return t.data;
            case a.h:
            case a.i:
                return t.data.amounts ? r(t.data.amounts) : e;
            case a.g:
                return 0;
            default:
                return e
        }
    }
}