 function (e, t, n) {
    "use strict";
    (function (e) {
        function t(e, t, n) {
            e[t] || Object[r](e, t, {
                writable: !0,
                configurable: !0,
                value: n
            })
        }
        if (n(340),
            n(537),
            n(538),
            e._babelPolyfill)
            throw new Error("only one instance of babel-polyfill is allowed");
        e._babelPolyfill = !0;
        var r = "defineProperty";
        t(String.prototype, "padLeft", "".padStart),
            t(String.prototype, "padRight", "".padEnd),
            "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (e) {
                [][e] && t(Array, e, Function.call.bind([][e]))
            })
    }).call(t, n(25))
}