 function (e, t) {
    e.exports = function (e) {
        if ("function" != typeof e)
            throw TypeError(e + " is not a function!");
        return e
    }
}