 function (e, t, n) {
    "use strict";

    function r(e) {
        return "function" === typeof e ? Object(s.b)(e, "mapDispatchToProps") : void 0
    }

    function o(e) {
        return e ? void 0 : Object(s.a)(function (e) {
            return {
                dispatch: e
            }
        })
    }

    function a(e) {
        return e && "object" === typeof e ? Object(s.a)(function (t) {
            return Object(i.bindActionCreators)(e, t)
        }) : void 0
    }
    var i = n(15),
        s = n(179);
    t.a = [r, o, a]
}