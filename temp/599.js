 function (e, t, n) {
    var r = function () {
        return this
    }() || Function("return this")(),
        o = r.regeneratorRuntime && Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime") >= 0,
        a = o && r.regeneratorRuntime;
    if (r.regeneratorRuntime = void 0,
        e.exports = n(600),
        o)
        r.regeneratorRuntime = a;
    else
        try {
            delete r.regeneratorRuntime
        } catch (e) {
            r.regeneratorRuntime = void 0
        }
}