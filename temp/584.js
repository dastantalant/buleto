 function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = Object.prototype.hasOwnProperty,
        o = Object.prototype.toString,
        a = function () {
            try {
                return !!Object.defineProperty({}, "a", {})
            } catch (e) {
                return !1
            }
        }(),
        i = (!a && Object.prototype.__defineGetter__,
            a ? Object.defineProperty : function (e, t, n) {
                "get" in n && e.__defineGetter__ ? e.__defineGetter__(t, n.get) : (!r.call(e, t) || "value" in n) && (e[t] = n.value)
            }
        );
    t.defineProperty = i;
    var s = Object.create || function (e, t) {
        function n() { }
        var o, a;
        n.prototype = e,
            o = new n;
        for (a in t)
            r.call(t, a) && i(o, a, t[a]);
        return o
    };
    t.objCreate = s;
    var l = Array.prototype.indexOf || function (e, t) {
        var n = this;
        if (!n.length)
            return -1;
        for (var r = t || 0, o = n.length; r < o; r++)
            if (n[r] === e)
                return r;
        return -1
    };
    t.arrIndexOf = l;
    var c = Array.isArray || function (e) {
        return "[object Array]" === o.call(e)
    };
    t.isArray = c;
    var u = Date.now || function () {
        return (new Date).getTime()
    };
    t.dateNow = u
}