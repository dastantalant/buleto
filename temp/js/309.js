 function (e, t, n) {
    "use strict";

    function r(e) {
        if ("object" === typeof e && null !== e) {
            var t = e.$$typeof;
            switch (t) {
                case i:
                    switch (e = e.type) {
                        case h:
                        case f:
                        case l:
                        case u:
                        case c:
                        case g:
                            return e;
                        default:
                            switch (e = e && e.$$typeof) {
                                case p:
                                case m:
                                case b:
                                case v:
                                case d:
                                    return e;
                                default:
                                    return t
                            }
                    }
                case s:
                    return t
            }
        }
    }

    function o(e) {
        return r(e) === f
    }
    var a = "function" === typeof Symbol && Symbol.for,
        i = a ? Symbol.for("react.element") : 60103,
        s = a ? Symbol.for("react.portal") : 60106,
        l = a ? Symbol.for("react.fragment") : 60107,
        c = a ? Symbol.for("react.strict_mode") : 60108,
        u = a ? Symbol.for("react.profiler") : 60114,
        d = a ? Symbol.for("react.provider") : 60109,
        p = a ? Symbol.for("react.context") : 60110,
        h = a ? Symbol.for("react.async_mode") : 60111,
        f = a ? Symbol.for("react.concurrent_mode") : 60111,
        m = a ? Symbol.for("react.forward_ref") : 60112,
        g = a ? Symbol.for("react.suspense") : 60113,
        y = a ? Symbol.for("react.suspense_list") : 60120,
        v = a ? Symbol.for("react.memo") : 60115,
        b = a ? Symbol.for("react.lazy") : 60116,
        _ = a ? Symbol.for("react.block") : 60121,
        w = a ? Symbol.for("react.fundamental") : 60117,
        x = a ? Symbol.for("react.responder") : 60118,
        E = a ? Symbol.for("react.scope") : 60119;
    t.AsyncMode = h,
        t.ConcurrentMode = f,
        t.ContextConsumer = p,
        t.ContextProvider = d,
        t.Element = i,
        t.ForwardRef = m,
        t.Fragment = l,
        t.Lazy = b,
        t.Memo = v,
        t.Portal = s,
        t.Profiler = u,
        t.StrictMode = c,
        t.Suspense = g,
        t.isAsyncMode = function (e) {
            return o(e) || r(e) === h
        },
        t.isConcurrentMode = o,
        t.isContextConsumer = function (e) {
            return r(e) === p
        },
        t.isContextProvider = function (e) {
            return r(e) === d
        },
        t.isElement = function (e) {
            return "object" === typeof e && null !== e && e.$$typeof === i
        },
        t.isForwardRef = function (e) {
            return r(e) === m
        },
        t.isFragment = function (e) {
            return r(e) === l
        },
        t.isLazy = function (e) {
            return r(e) === b
        },
        t.isMemo = function (e) {
            return r(e) === v
        },
        t.isPortal = function (e) {
            return r(e) === s
        },
        t.isProfiler = function (e) {
            return r(e) === u
        },
        t.isStrictMode = function (e) {
            return r(e) === c
        },
        t.isSuspense = function (e) {
            return r(e) === g
        },
        t.isValidElementType = function (e) {
            return "string" === typeof e || "function" === typeof e || e === l || e === f || e === u || e === c || e === g || e === y || "object" === typeof e && null !== e && (e.$$typeof === b || e.$$typeof === v || e.$$typeof === d || e.$$typeof === p || e.$$typeof === m || e.$$typeof === w || e.$$typeof === x || e.$$typeof === E || e.$$typeof === _)
        },
        t.typeOf = r
}