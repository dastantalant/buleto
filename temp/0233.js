function(e, t, n) {
    var r = n(69),
        o = n(233);
    e.exports = function(e) {
        return function() {
            if (r(this) != e)
                throw TypeError(e + "#toJSON isn't generic");
            return o(this)
        }
    }
}