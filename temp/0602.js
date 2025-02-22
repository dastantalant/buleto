function(e, t, n) {
    "use strict";

    function r() {
        return Object(p.d)(function(e) {
            return T = new WebSocket("wss://buleto.com/ws"),
                T.addEventListener("open", function() {
                    console.log("ws connected")
                }),
                T.addEventListener("error", function(e) {
                    console.log("ws error: ", e)
                }),
                T.onmessage = function(t) {
                    try {
                        T && "/traderoom" !== window.location.pathname && T.close()
                    } catch (e) {
                        console.error(e)
                    }
                    var n = JSON.parse(t.data);
                    if (n) {
                        var r = n.data;
                        switch (n.type) {
                            case "round":
                                return e({
                                    type: "WS_ROUND",
                                    data: r
                                });
                            case "factors":
                                return e({
                                    type: "WS_FACTORS",
                                    data: r
                                });
                            case "last-results":
                                return e({
                                    type: "WS_LAST_RESULTS",
                                    data: r
                                })
                        }
                        n.type || console.log("message", n)
                    }
                },
                T.onclose = function() {
                    return console.log("ws closing"),
                        e(p.a)
                },
                function() {
                    T = void 0,
                        console.log("ws off")
                }
        })
    }

    function o() {
        var e, t, n;
        return u.a.wrap(function(a) {
            for (;;)
                switch (a.prev = a.next) {
                    case 0:
                        return a.next = 3,
                            Object(d.d)(g.c);
                    case 3:
                        if (e = a.sent, !e.user.accountNumber || T || "/traderoom" !== window.location.pathname) {
                            a.next = 23;
                            break
                        }
                        return a.next = 7,
                            Object(d.b)(r);
                    case 7:
                        t = a.sent,
                            a.prev = 8;
                    case 9:
                        return a.next = 12,
                            Object(d.e)(t);
                    case 12:
                        return n = a.sent,
                            a.next = 15,
                            Object(d.c)(n);
                    case 15:
                        a.next = 9;
                        break;
                    case 17:
                        return a.prev = 17,
                            a.next = 20,
                            Object(d.b)(p.c, 500);
                    case 20:
                        return a.next = 22,
                            Object(d.b)(o);
                    case 22:
                        return a.finish(17);
                    case 23:
                        return a.next = 25,
                            Object(d.b)(p.c, 500);
                    case 25:
                        a.next = 0;
                        break;
                    case 27:
                    case "end":
                        return a.stop()
                }
        }, y, this, [
            [8, , 17, 23]
        ])
    }

    function a(e, t, n) {
        var r;
        return u.a.wrap(function(o) {
            for (;;)
                switch (o.prev = o.next) {
                    case 0:
                        return o.next = 2,
                            Object(d.c)(e.request(n));
                    case 2:
                        return o.next = 4,
                            Object(d.b)(t, n);
                    case 4:
                        if (void 0 === (r = o.sent)) {
                            o.next = 10;
                            break
                        }
                        return o.next = 8,
                            Object(d.c)(e.success(r));
                    case 8:
                        o.next = 18;
                        break;
                    case 10:
                        return o.t0 = d.c,
                            o.t1 = e,
                            o.next = 14,
                            Object(d.b)(t, n);
                    case 14:
                        return o.t2 = o.sent,
                            o.t3 = o.t1.failure.call(o.t1, o.t2),
                            o.next = 18,
                            (0,
                                o.t0)(o.t3);
                    case 18:
                    case "end":
                        return o.stop()
                }
        }, v, this)
    }

    function i() {
        var e, t, n, r;
        return u.a.wrap(function(o) {
            for (;;)
                switch (o.prev = o.next) {
                    case 0:
                        return o.next = 3,
                            Object(d.d)(g.b);
                    case 3:
                        if (e = o.sent,
                            t = e.status,
                            n = e.isRequested, !(r = t === h.d && !n && "/traderoom" === window.location.pathname && null !== sessionStorage.getItem("man-token"))) {
                            o.next = 12;
                            break
                        }
                        return o.next = 10,
                            Object(d.b)(S);
                    case 10:
                        return o.next = 12,
                            Object(d.b)(p.c, 1e4);
                    case 12:
                        return o.next = 14,
                            Object(d.b)(p.c, 1e3);
                    case 14:
                        o.next = 0;
                        break;
                    case 16:
                    case "end":
                        return o.stop()
                }
        }, b, this)
    }

    function s() {
        var e, t = this;
        return u.a.wrap(function(n) {
            for (;;)
                switch (n.prev = n.next) {
                    case 0:
                        e = u.a.mark(function e() {
                            var n, r, o, a, i, s, l, c, f, m, y, v, b, _;
                            return u.a.wrap(function(e) {
                                for (;;)
                                    switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2,
                                                Object(d.d)(g.a);
                                        case 2:
                                            if (n = e.sent,
                                                r = n.coupon,
                                                o = n.round.get("status"),
                                                a = n.round.get("id"),
                                                i = n.round.get("makeBet"),
                                                s = n.balanceData.balance,
                                                l = [],
                                                r.map(function(e) {
                                                    l.push({
                                                        cell: e.cell,
                                                        Amount: e.amount
                                                    })
                                                }),
                                                c = {},
                                                c[a] = l,
                                                f = {
                                                    RoundOptions: c
                                                }, !(m = o === h.a && l.length > 0 && i && "/traderoom" === window.location.pathname && null !== sessionStorage.getItem("man-token"))) {
                                                e.next = 28;
                                                break
                                            }
                                            if (!(s >= 0 && a)) {
                                                e.next = 26;
                                                break
                                            }
                                            return y = {
                                                    data: f,
                                                    source: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 3 : 2
                                                },
                                                v = 300,
                                                b = 2e3,
                                                _ = v + Math.random() * (b + 1 - v),
                                                e.next = 22,
                                                Object(d.b)(p.c, _);
                                        case 22:
                                            return e.next = 24,
                                                Object(d.b)(O, y);
                                        case 24:
                                            e.next = 28;
                                            break;
                                        case 26:
                                            return e.next = 28,
                                                Object(d.c)({
                                                    type: "CLEAR_ALL"
                                                });
                                        case 28:
                                            return e.next = 30,
                                                Object(d.b)(p.c, 2e3);
                                        case 30:
                                        case "end":
                                            return e.stop()
                                    }
                            }, e, t)
                        });
                    case 1:
                        return n.delegateYield(e(), "t0", 3);
                    case 3:
                        n.next = 1;
                        break;
                    case 5:
                    case "end":
                        return n.stop()
                }
        }, _, this)
    }

    function l() {
        var e, t;
        return u.a.wrap(function(n) {
            for (;;)
                switch (n.prev = n.next) {
                    case 0:
                        return n.next = 3,
                            Object(d.d)(g.b);
                    case 3:
                        if (e = n.sent,
                            (t = e.status) !== h.d && t !== h.e || null === sessionStorage.getItem("man-token")) {
                            n.next = 10;
                            break
                        }
                        return n.next = 8,
                            Object(d.b)(C);
                    case 8:
                        return n.next = 10,
                            Object(d.b)(p.c, 7e3);
                    case 10:
                        return n.next = 12,
                            Object(d.b)(p.c, 2e3);
                    case 12:
                        n.next = 0;
                        break;
                    case 14:
                    case "end":
                        return n.stop()
                }
        }, w, this)
    }
    t.b = o,
        t.c = i,
        t.d = s,
        t.a = l;
    var c = n(247),
        u = n.n(c),
        d = n(114),
        p = n(182),
        h = n(31),
        f = n(602),
        m = n(82),
        g = n(603),
        y = u.a.mark(o),
        v = u.a.mark(a),
        b = u.a.mark(i),
        _ = u.a.mark(s),
        w = u.a.mark(l),
        x = m.d.get_configs,
        E = m.d.make_bet,
        k = m.d.get_balance,
        S = a.bind(null, x, f.a),
        O = a.bind(null, E, f.c),
        C = a.bind(null, k, f.b),
        T = void 0
}