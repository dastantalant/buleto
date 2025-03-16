 function (e, t) {
    function n(e, t) {
        e.prototype = Object.create(t.prototype),
            e.prototype.constructor = e,
            e.__proto__ = t
    }
    e.exports = n
}