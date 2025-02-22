function(e, t, n) {
    "use strict";

    function r() {
        var e = new RegExp("windows", "i"),
            t = new RegExp("firefox", "i"),
            n = new RegExp("android", "i"),
            r = navigator.userAgent;
        return !e.test(r) && !t.test(r) && n.test(r)
    }

    function o() {
        var e = new RegExp("windows", "i"),
            t = new RegExp("phone", "i"),
            n = navigator.userAgent;
        return e.test(n) && t.test(n)
    }

    function a() {
        var e = new RegExp("windows", "i"),
            t = new RegExp("firefox", "i"),
            n = new RegExp("android", "i"),
            r = navigator.userAgent;
        return !e.test(r) && t.test(r) && n.test(r)
    }
    t.a = r,
        t.c = o,
        t.b = a
}