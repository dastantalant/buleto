 function (e, t) {
    var n = function (e) {
        return e.replace(/[A-Z]/g, function (e) {
            return "-" + e.toLowerCase()
        }).toLowerCase()
    };
    e.exports = n
}