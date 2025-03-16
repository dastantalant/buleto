 function (e, t, n) {
    var r = n(5),
        o = n(141).set,
        a = r.MutationObserver || r.WebKitMutationObserver,
        i = r.process,
        s = r.Promise,
        l = "process" == n(35)(i);
    e.exports = function () {
        var e, t, n, c = function () {
            var r, o;
            for (l && (r = i.domain) && r.exit(); e;) {
                o = e.fn,
                    e = e.next;
                try {
                    o()
                } catch (r) {
                    throw e ? n() : t = void 0,
                    r
                }
            }
            t = void 0,
                r && r.enter()
        };
        if (l)
            n = function () {
                i.nextTick(c)
            };
        else if (!a || r.navigator && r.navigator.standalone)
            if (s && s.resolve) {
                var u = s.resolve(void 0);
                n = function () {
                    u.then(c)
                }
            } else
                n = function () {
                    o.call(r, c)
                };
        else {
            var d = !0,
                p = document.createTextNode("");
            new a(c).observe(p, {
                characterData: !0
            }),
                n = function () {
                    p.data = d = !d
                }
        }
        return function (r) {
            var o = {
                fn: r,
                next: void 0
            };
            t && (t.next = o),
                e || (e = o,
                    n()),
                t = o
        }
    }
}