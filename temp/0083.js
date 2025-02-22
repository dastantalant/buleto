function(e, t, n) {
    "use strict";
    n.d(t, "b", function() {
            return a
        }),
        n.d(t, "c", function() {
            return i
        }),
        n.d(t, "a", function() {
            return s
        }),
        n.d(t, "d", function() {
            return l
        });
    var r = function(e) {
            var t = {};
            return ["REQUEST", "SUCCESS", "FAILURE"].forEach(function(n) {
                    return t[n] = e + "_" + n
                }),
                t
        },
        o = function(e) {
            return {
                type: e,
                data: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
            }
        },
        a = r("GET_CONFIGS"),
        i = r("MAKE_BET"),
        s = r("GET_BALANCE"),
        l = {
            get_configs: {
                request: function(e) {
                    return o(a.REQUEST, e)
                },
                success: function(e) {
                    return o(a.SUCCESS, e)
                },
                failure: function(e, t) {
                    return o(a.FAILURE)
                }
            },
            make_bet: {
                request: function(e) {
                    return o(i.REQUEST, e)
                },
                success: function(e) {
                    return o(i.SUCCESS, e)
                },
                failure: function(e, t) {
                    return o(i.FAILURE)
                }
            },
            get_balance: {
                request: function(e) {
                    return o(s.REQUEST, e)
                },
                success: function(e) {
                    return o(s.SUCCESS, e)
                },
                failure: function(e, t) {
                    return o(s.FAILURE)
                }
            }
        }
}