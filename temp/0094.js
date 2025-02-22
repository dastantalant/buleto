function(e, t, n) {
    var r = n(36),
        o = n(43);
    e.exports = function(e) {
        return function(t, n) {
            var a, i, s = String(o(t)),
                l = r(n),
                c = s.length;
            return l < 0 || l >= c ? e ? "" : void 0 : (a = s.charCodeAt(l),
                a < 55296 || a > 56319 || l + 1 === c || (i = s.charCodeAt(l + 1)) < 56320 || i > 57343 ? e ? s.charAt(l) : a : e ? s.slice(l, l + 2) : i - 56320 + (a - 55296 << 10) + 65536)
        }
    }
}