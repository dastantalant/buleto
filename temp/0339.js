function(e, t, n) {
    "use strict";
    var r = n(15).compose;
    t.__esModule = !0,
        t.composeWithDevTools = "undefined" !== typeof window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
            if (0 !== arguments.length)
                return "object" === typeof arguments[0] ? r : r.apply(null, arguments)
        },
        t.devToolsEnhancer = "undefined" !== typeof window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
            return function(e) {
                return e
            }
        }
}