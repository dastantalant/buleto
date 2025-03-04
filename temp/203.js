 function (e, t, n) {
    var r = n(28),
        o = n(60).f,
        a = {}.toString,
        i = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        s = function (e) {
            try {
                return o(e)
            } catch (e) {
                return i.slice()
            }
        };
    e.exports.f = function (e) {
        return i && "[object Window]" == a.call(e) ? s(e) : o(r(e))
    }
}