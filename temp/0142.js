function(e, t, n) {
    var r, o, a, i = n(34),
        s = n(207),
        l = n(122),
        c = n(118),
        u = n(5),
        d = u.process,
        p = u.setImmediate,
        h = u.clearImmediate,
        f = u.MessageChannel,
        m = u.Dispatch,
        g = 0,
        y = {},
        v = function() {
            var e = +this;
            if (y.hasOwnProperty(e)) {
                var t = y[e];
                delete y[e],
                    t()
            }
        },
        b = function(e) {
            v.call(e.data)
        };
    p && h || (p = function(e) {
                for (var t = [], n = 1; arguments.length > n;)
                    t.push(arguments[n++]);
                return y[++g] = function() {
                        s("function" == typeof e ? e : Function(e), t)
                    },
                    r(g),
                    g
            },
            h = function(e) {
                delete y[e]
            },
            "process" == n(35)(d) ? r = function(e) {
                d.nextTick(i(v, e, 1))
            } :
            m && m.now ? r = function(e) {
                m.now(i(v, e, 1))
            } :
            f ? (o = new f,
                a = o.port2,
                o.port1.onmessage = b,
                r = i(a.postMessage, a, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (r = function(e) {
                    u.postMessage(e + "", "*")
                },
                u.addEventListener("message", b, !1)) : r = "onreadystatechange" in c("script") ? function(e) {
                l.appendChild(c("script")).onreadystatechange = function() {
                    l.removeChild(this),
                        v.call(e)
                }
            } :
            function(e) {
                setTimeout(i(v, e, 1), 0)
            }
        ),
        e.exports = {
            set: p,
            clear: h
        }
}