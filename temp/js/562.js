 function (e, t, n) {
    "use strict";

    function r(e, t) {
        var n = e.get("repeatArray");
        return 0 === n.length ? n.push(new i.Map, t) : n.length < u ? n.push(t) : (n.shift(),
            n.push(t)),
            e = e.update("repeatIndex", function () {
                return n.length - 1
            }),
            e.update("repeatArray", function () {
                return n
            })
    }

    function o(e, t) {
        for (var n = t.factors, r = t.amount, o = n.length, i = p / o, s = 0; s < o; s++) {
            e = a(e, {
                cell: n[s].cell,
                amount: r * i
            })
        }
        return e
    }

    function a(e, t) {
        var n = t.cell;
        return e.get("actual").has(n) && (t.amount += e.getIn(["actual", n]).amount),
            e.updateIn(["actual", n], function () {
                return t
            })
    }
    var i = n(18),
        s = (n.n(i),
            n(82)),
        l = n(148),
        c = n(31),
        u = 3,
        d = new i.Map({
            actual: new i.Map,
            prev: new i.Map,
            repeat: new i.Map,
            repeatArray: [],
            repeatIndex: void 0
        }),
        p = 36;
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : d,
            t = arguments[1];
        switch (t.type) {
            case l.a:
                return e = a(e, t.data),
                    r(e, e.get("actual"));
            case l.b:
                return e = o(e, t.data),
                    r(e, e.get("actual"));
            case l.e:
            case l.f:
                return e = e.update("actual", function () {
                    return new i.Map
                }),
                    e = e.update("repeatArray", function () {
                        return []
                    }),
                    e.update("repeatIndex", function () { });
            case s.c.SUCCESS:
                return e = e.update("repeat", function () {
                    return e.get("actual")
                }),
                    e.update("prev", function () {
                        return e.get("actual")
                    });
            case "WS_ROUND":
                return t.data.s === c.d ? e.update("actual", function () {
                    return new i.Map
                }) : t.data.s === c.c ? e.update("prev", function () {
                    return e.get("actual")
                }) : e;
            case l.g:
                return e = e.update("actual", function () {
                    return e.get("repeat")
                }),
                    e = e.update("prev", function () {
                        return e.get("actual")
                    }),
                    r(e, e.get("actual"));
            case l.d:
                return d;
            case l.h:
                var n = e.get("repeatArray");
                n.splice(e.get("repeatIndex"), n.length - e.get("repeatIndex"));
                var u = "prev" === t.data.direction ? e.get("repeatIndex") - 1 : e.get("repeatIndex") + 1;
                return e = e.update("repeatIndex", function () {
                    return u
                }),
                    e.update("actual", function () {
                        return n[u] ? n[u] : new i.Map
                    });
            default:
                return e
        }
    }
}