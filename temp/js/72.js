 function (e, t, n) {
    "use strict";

    function r(e) {
        var t = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !/[\u0400-\u04FF]+/.test(String(e)) && t.test(String(e).toLowerCase())
    }

    function o(e) {
        var t = e.toFixed(2).toString(),
            n = t.split("");
        return e > 1e9 && n.splice(n.length - 12, 0, ""),
            e > 1e6 && n.splice(n.length - 9, 0, ""),
            e > 1e3 && n.splice(n.length - 6, 0, ""),
            n.join("")
    }
    t.b = r,
        t.a = o
}