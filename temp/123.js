 function (e, t, n) {
    var r = n(9),
        o = n(4),
        a = function (e, t) {
            if (o(e), !r(t) && null !== t)
                throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
            try {
                r = n(34)(Function.call, n(29).f(Object.prototype, "__proto__").set, 2),
                    r(e, []),
                    t = !(e instanceof Array)
            } catch (e) {
                t = !0
            }
            return function (e, n) {
                return a(e, n),
                    t ? e.__proto__ = n : r(e, n),
                    e
            }
        }({}, !1) : void 0),
        check: a
    }
}