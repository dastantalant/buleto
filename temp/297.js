 function (e, t, n) {
    "use strict";
    (function (t) {
        function n(e) {
            i.length || (a(),
                s = !0),
                i[i.length] = e
        }

        function r() {
            for (; l < i.length;) {
                var e = l;
                if (l += 1,
                    i[e].call(),
                    l > c) {
                    for (var t = 0, n = i.length - l; t < n; t++)
                        i[t] = i[t + l];
                    i.length -= l,
                        l = 0
                }
            }
            i.length = 0,
                l = 0,
                s = !1
        }

        function o(e) {
            return function () {
                function t() {
                    clearTimeout(n),
                        clearInterval(r),
                        e()
                }
                var n = setTimeout(t, 0),
                    r = setInterval(t, 50)
            }
        }
        e.exports = n;
        var a, i = [],
            s = !1,
            l = 0,
            c = 1024,
            u = "undefined" !== typeof t ? t : self,
            d = u.MutationObserver || u.WebKitMutationObserver;
        a = "function" === typeof d ? function (e) {
            var t = 1,
                n = new d(e),
                r = document.createTextNode("");
            return n.observe(r, {
                characterData: !0
            }),
                function () {
                    t = -t,
                        r.data = t
                }
        }(r) : o(r),
            n.requestFlush = a,
            n.makeRequestCallFromTimer = o
    }).call(t, n(25))
}