 function (e, t, n) {
    "use strict";
    t.default = {
        locale: "en",
        pluralRuleFunction: function (e, t) {
            var n = String(e).split("."),
                r = !n[1],
                o = Number(n[0]) == e,
                a = o && n[0].slice(-1),
                i = o && n[0].slice(-2);
            return t ? 1 == a && 11 != i ? "one" : 2 == a && 12 != i ? "two" : 3 == a && 13 != i ? "few" : "other" : 1 == e && r ? "one" : "other"
        }
    }
}