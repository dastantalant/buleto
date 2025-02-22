function(e, t, n) {
    function r(e, t) {
        for (var n, r = [], o = 0, a = 0, i = "", s = t && t.delimiter || "/"; null != (n = v.exec(e));) {
            var u = n[0],
                d = n[1],
                p = n.index;
            if (i += e.slice(a, p),
                a = p + u.length,
                d)
                i += d[1];
            else {
                var h = e[a],
                    f = n[2],
                    m = n[3],
                    g = n[4],
                    y = n[5],
                    b = n[6],
                    _ = n[7];
                i && (r.push(i),
                    i = "");
                var w = null != f && null != h && h !== f,
                    x = "+" === b || "*" === b,
                    E = "?" === b || "*" === b,
                    k = n[2] || s,
                    S = g || y;
                r.push({
                    name: m || o++,
                    prefix: f || "",
                    delimiter: k,
                    optional: E,
                    repeat: x,
                    partial: w,
                    asterisk: !!_,
                    pattern: S ? c(S) : _ ? ".*" : "[^" + l(k) + "]+?"
                })
            }
        }
        return a < e.length && (i += e.substr(a)),
            i && r.push(i),
            r
    }

    function o(e, t) {
        return s(r(e, t), t)
    }

    function a(e) {
        return encodeURI(e).replace(/[\/?#]/g, function(e) {
            return "%" + e.charCodeAt(0).toString(16).toUpperCase()
        })
    }

    function i(e) {
        return encodeURI(e).replace(/[?#]/g, function(e) {
            return "%" + e.charCodeAt(0).toString(16).toUpperCase()
        })
    }

    function s(e, t) {
        for (var n = new Array(e.length), r = 0; r < e.length; r++)
            "object" === typeof e[r] && (n[r] = new RegExp("^(?:" + e[r].pattern + ")$", d(t)));
        return function(t, r) {
            for (var o = "", s = t || {}, l = r || {}, c = l.pretty ? a : encodeURIComponent, u = 0; u < e.length; u++) {
                var d = e[u];
                if ("string" !== typeof d) {
                    var p, h = s[d.name];
                    if (null == h) {
                        if (d.optional) {
                            d.partial && (o += d.prefix);
                            continue
                        }
                        throw new TypeError('Expected "' + d.name + '" to be defined')
                    }
                    if (y(h)) {
                        if (!d.repeat)
                            throw new TypeError('Expected "' + d.name + '" to not repeat, but received `' + JSON.stringify(h) + "`");
                        if (0 === h.length) {
                            if (d.optional)
                                continue;
                            throw new TypeError('Expected "' + d.name + '" to not be empty')
                        }
                        for (var f = 0; f < h.length; f++) {
                            if (p = c(h[f]), !n[u].test(p))
                                throw new TypeError('Expected all "' + d.name + '" to match "' + d.pattern + '", but received `' + JSON.stringify(p) + "`");
                            o += (0 === f ? d.prefix : d.delimiter) + p
                        }
                    } else {
                        if (p = d.asterisk ? i(h) : c(h), !n[u].test(p))
                            throw new TypeError('Expected "' + d.name + '" to match "' + d.pattern + '", but received "' + p + '"');
                        o += d.prefix + p
                    }
                } else
                    o += d
            }
            return o
        }
    }

    function l(e) {
        return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1")
    }

    function c(e) {
        return e.replace(/([=!:$\/()])/g, "\\$1")
    }

    function u(e, t) {
        return e.keys = t,
            e
    }

    function d(e) {
        return e && e.sensitive ? "" : "i"
    }

    function p(e, t) {
        var n = e.source.match(/\((?!\?)/g);
        if (n)
            for (var r = 0; r < n.length; r++)
                t.push({
                    name: r,
                    prefix: null,
                    delimiter: null,
                    optional: !1,
                    repeat: !1,
                    partial: !1,
                    asterisk: !1,
                    pattern: null
                });
        return u(e, t)
    }

    function h(e, t, n) {
        for (var r = [], o = 0; o < e.length; o++)
            r.push(g(e[o], t, n).source);
        return u(new RegExp("(?:" + r.join("|") + ")", d(n)), t)
    }

    function f(e, t, n) {
        return m(r(e, n), t, n)
    }

    function m(e, t, n) {
        y(t) || (n = t || n,
                t = []),
            n = n || {};
        for (var r = n.strict, o = !1 !== n.end, a = "", i = 0; i < e.length; i++) {
            var s = e[i];
            if ("string" === typeof s)
                a += l(s);
            else {
                var c = l(s.prefix),
                    p = "(?:" + s.pattern + ")";
                t.push(s),
                    s.repeat && (p += "(?:" + c + p + ")*"),
                    p = s.optional ? s.partial ? c + "(" + p + ")?" : "(?:" + c + "(" + p + "))?" : c + "(" + p + ")",
                    a += p
            }
        }
        var h = l(n.delimiter || "/"),
            f = a.slice(-h.length) === h;
        return r || (a = (f ? a.slice(0, -h.length) : a) + "(?:" + h + "(?=$))?"),
            a += o ? "$" : r && f ? "" : "(?=" + h + "|$)",
            u(new RegExp("^" + a, d(n)), t)
    }

    function g(e, t, n) {
        return y(t) || (n = t || n,
                t = []),
            n = n || {},
            e instanceof RegExp ? p(e, t) : y(e) ? h(e, t, n) : f(e, t, n)
    }
    var y = n(334);
    e.exports = g,
        e.exports.parse = r,
        e.exports.compile = o,
        e.exports.tokensToFunction = s,
        e.exports.tokensToRegExp = m;
    var v = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g")
}