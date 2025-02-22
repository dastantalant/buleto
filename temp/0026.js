function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0,
            eval)("this")
    } catch (e) {
        "object" === typeof window && (n = window)
    }
    e.exports = n
}