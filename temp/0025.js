function(e, t, n) {
    var r = n(1),
        o = n(8),
        a = n(43),
        i = /"/g,
        s = function(e, t, n, r) {
            var o = String(a(e)),
                s = "<" + t;
            return "" !== n && (s += " " + n + '="' + String(r).replace(i, "&quot;") + '"'),
                s + ">" + o + "</" + t + ">"
        };
    e.exports = function(e, t) {
        var n = {};
        n[e] = t(s),
            r(r.P + r.F * o(function() {
                var t = "" [e]('"');
                return t !== t.toLowerCase() || t.split('"').length > 3
            }), "String", n)
    }
}