function(e, t, n) {
    "use strict";
    var r = n(324),
        o = n(325),
        a = n(326),
        i = n(26);
    n.d(t, "a", function() {
            return r.a
        }),
        n.d(t, "b", function() {
            return o.a
        }),
        n.d(t, "c", function() {
            return a.a
        });
    var s = function(e) {
        return "import { " + e + " } from 'redux-saga' has been deprecated in favor of import { " + e + " } from 'redux-saga/effects'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield " + e + " will return task descriptor to your saga and execute next lines of code."
    };
    r.a,
        o.a,
        a.a
}