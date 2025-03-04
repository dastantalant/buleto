 function (e, t, n) {
    "use strict";
    var r = function (e) {
        return e !== e
    };
    e.exports = function (e, t) {
        return 0 === e && 0 === t ? 1 / e === 1 / t : e === t || !(!r(e) || !r(t))
    }
}