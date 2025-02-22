function(e, t) {
    function n(e, t) {
        var n = 0,
            r = e.length;
        for (n; n < r && !1 !== t(e[n], n); n++)
        ;
    }

    function r(e) {
        return "[object Array]" === Object.prototype.toString.apply(e)
    }

    function o(e) {
        return "function" === typeof e
    }
    e.exports = {
        isFunction: o,
        isArray: r,
        each: n
    }
}