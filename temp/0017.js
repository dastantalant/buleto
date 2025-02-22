function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        function i(e) {
            if (e.status >= 200 && e.status < 300)
                return e;
            if (401 !== e.status) {
                var t = new Error(e.statusText);
                throw t.response = e,
                    t
            }
            o.a.dispatch(Object(a.b)("/login"))
        }
        var s = new Date,
            l = e.split("?").length > 1 ? e + "&t=" + s.getTime() : e + "?t=" + s.getTime(),
            c = sessionStorage.getItem("man-token"),
            u = {
                Accept: "application/json",
                "Content-Type": "application/json"
            };
        return c && (u.authorization = "Bearer " + c),
            fetch(l, {
                method: t,
                headers: u,
                credentials: r ? "same-origin" : void 0,
                body: "get" === t ? void 0 : JSON.stringify(n)
            }).then(i).then(function(e) {
                if (!e.ok)
                    return Promise.reject(e);
                var t = e.headers.get("xsrf-token");
                return t && sessionStorage.setItem("rtoken", t),
                    e.json().then(function(t) {
                        return {
                            json: t,
                            response: e
                        }
                    })
            }).then(function(e) {
                var t = e.json;
                return e.response.ok ? t : Promise.reject(t)
            }).catch(function(e) {
                return e
            })
    }
    n.d(t, "a", function() {
            return l
        }),
        t.b = r;
    var o = n(181),
        a = n(86),
        i = n(75),
        s = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    o = !1,
                    a = void 0;
                try {
                    for (var i, s = e[Symbol.iterator](); !(r = (i = s.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0)
                    ;
                } catch (e) {
                    o = !0,
                        a = e
                } finally {
                    try {
                        !r && s.return && s.return()
                    } finally {
                        if (o)
                            throw a
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    n(339),
        n(198);
    var l = Symbol("Call API");
    t.c = function(e) {
        return function(e) {
            return function(t) {
                function n(e) {
                    var n = Object.assign({}, t, e);
                    return delete n[l],
                        n
                }
                var o = t[l];
                if ("undefined" === typeof o)
                    return e(t);
                var c = t.type,
                    u = o.endpoint,
                    d = o.method,
                    p = s(o.types, 2),
                    h = p[0],
                    f = p[1],
                    m = o.credentials,
                    g = o.data;
                return e(n({
                        type: c,
                        data: g
                    })),
                    r(u, d, g, m).then(function(t) {
                        var r = Array.isArray(h) ? h : [h];
                        if (t && t.refresh) {
                            var o = sessionStorage.getItem("rtoken");
                            e(o ? Object(i.d)(o) : Object(a.b)("/login"))
                        }
                        if (t.response && !t.response.ok)
                            e(n({
                                type: f,
                                data: Object.assign({}, g, {
                                    error: t.message
                                })
                            }));
                        else
                            for (var s = 0; s < r.length; s++) {
                                var l = r[s];
                                "function" === typeof l ? t = l(t) : e(n({
                                    data: t,
                                    type: l
                                }))
                            }
                    }, function(t) {
                        return e(n({
                            type: f,
                            data: Object.assign({}, g, {
                                error: t.message
                            })
                        }))
                    })
            }
        }
    }
}