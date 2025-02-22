function(e, t, n) {
    function r(e) {
        this.mode = o.MODE_8BIT_BYTE,
            this.data = e
    }
    var o = n(262);
    r.prototype = {
            getLength: function(e) {
                return this.data.length
            },
            write: function(e) {
                for (var t = 0; t < this.data.length; t++)
                    e.put(this.data.charCodeAt(t), 8)
            }
        },
        e.exports = r
}