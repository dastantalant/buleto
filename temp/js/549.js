 function (e, t, n) {
    "use strict";

    function r(e) {
        switch (e) {
            case "mail.ru":
                return "e.mail.ru";
            case "gmail.com":
                return "mail.google.com";
            case "yandex.com":
                return "mail.yandex.com";
            case "outlook.com":
                return "outlook.live.com";
            case "aol":
                return "mail.aol.com";
            default:
                return e
        }
    }
    var o = n(239),
        a = {
            status: void 0,
            fetching: !1,
            emailDomain: ""
        };
    t.a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
            t = arguments[1];
        switch (t.type) {
            case o.b:
                return Object.assign({}, e, {
                    fetching: !0,
                    status: void 0,
                    emailDomain: r(t.data.replace(/.*@/, ""))
                });
            case o.d:
                return t.data.error ? Object.assign({}, e, {
                    fetching: !1,
                    status: t.data.error
                }) : Object.assign({}, e, {
                    fetching: !1,
                    status: 0
                });
            case o.a:
                return Object.assign({}, e, {
                    fetching: !1,
                    status: -100
                });
            case o.c:
                return a;
            default:
                return e
        }
    }
}