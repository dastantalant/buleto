function(e, t, n) {
    "use strict";
    t.default = function() {
        function e(t, n, r, o) {
            this.message = t,
                this.expected = n,
                this.found = r,
                this.location = o,
                this.name = "SyntaxError",
                "function" === typeof Error.captureStackTrace && Error.captureStackTrace(this, e)
        }

        function t(t) {
            function n() {
                return o(Ve, Ke)
            }

            function r(e) {
                var n, r, o = Xe[e];
                if (o)
                    return o;
                for (n = e - 1; !Xe[n];)
                    n--;
                for (o = Xe[n],
                    o = {
                        line: o.line,
                        column: o.column,
                        seenCR: o.seenCR
                    }; n < e;)
                    r = t.charAt(n),
                    "\n" === r ? (o.seenCR || o.line++,
                        o.column = 1,
                        o.seenCR = !1) : "\r" === r || "\u2028" === r || "\u2029" === r ? (o.line++,
                        o.column = 1,
                        o.seenCR = !0) : (o.column++,
                        o.seenCR = !1),
                    n++;
                return Xe[e] = o,
                    o
            }

            function o(e, t) {
                var n = r(e),
                    o = r(t);
                return {
                    start: {
                        offset: e,
                        line: n.line,
                        column: n.column
                    },
                    end: {
                        offset: t,
                        line: o.line,
                        column: o.column
                    }
                }
            }

            function a(e) {
                Ke < Je || (Ke > Je && (Je = Ke,
                        Ze = []),
                    Ze.push(e))
            }

            function i(t, n, r, o) {
                return null !== n && function(e) {
                        var t = 1;
                        for (e.sort(function(e, t) {
                                return e.description < t.description ? -1 : e.description > t.description ? 1 : 0
                            }); t < e.length;)
                            e[t - 1] === e[t] ? e.splice(t, 1) : t++
                    }(n),
                    new e(null !== t ? t : function(e, t) {
                        var n, r, o, a = new Array(e.length);
                        for (o = 0; o < e.length; o++)
                            a[o] = e[o].description;
                        return n = e.length > 1 ? a.slice(0, -1).join(", ") + " or " + a[e.length - 1] : a[0],
                            r = t ? '"' + function(e) {
                                function t(e) {
                                    return e.charCodeAt(0).toString(16).toUpperCase()
                                }
                                return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(e) {
                                    return "\\x0" + t(e)
                                }).replace(/[\x10-\x1F\x80-\xFF]/g, function(e) {
                                    return "\\x" + t(e)
                                }).replace(/[\u0100-\u0FFF]/g, function(e) {
                                    return "\\u0" + t(e)
                                }).replace(/[\u1000-\uFFFF]/g, function(e) {
                                    return "\\u" + t(e)
                                })
                            }(t) + '"' : "end of input",
                            "Expected " + n + " but " + r + " found."
                    }(n, r), n, r, o)
            }

            function s() {
                return l()
            }

            function l() {
                var e, t, n;
                for (e = Ke,
                    t = [],
                    n = c(); n !== N;)
                    t.push(n),
                    n = c();
                return t !== N && (Ve = e,
                        t = R(t)),
                    e = t
            }

            function c() {
                var e;
                return e = d(),
                    e === N && (e = h()),
                    e
            }

            function u() {
                var e, n, r, o, a, i;
                if (e = Ke,
                    n = [],
                    r = Ke,
                    o = k(),
                    o !== N ? (a = M(),
                        a !== N ? (i = k(),
                            i !== N ? (o = [o, a, i],
                                r = o) : (Ke = r,
                                r = N)) : (Ke = r,
                            r = N)) : (Ke = r,
                        r = N),
                    r !== N)
                    for (; r !== N;)
                        n.push(r),
                        r = Ke,
                        o = k(),
                        o !== N ? (a = M(),
                            a !== N ? (i = k(),
                                i !== N ? (o = [o, a, i],
                                    r = o) : (Ke = r,
                                    r = N)) : (Ke = r,
                                r = N)) : (Ke = r,
                            r = N);
                else
                    n = N;
                return n !== N && (Ve = e,
                        n = I(n)),
                    e = n,
                    e === N && (e = Ke,
                        n = E(),
                        e = n !== N ? t.substring(e, Ke) : n),
                    e
            }

            function d() {
                var e, t;
                return e = Ke,
                    t = u(),
                    t !== N && (Ve = e,
                        t = L(t)),
                    e = t
            }

            function p() {
                var e, n, r;
                if ((e = C()) === N) {
                    if (e = Ke,
                        n = [],
                        B.test(t.charAt(Ke)) ? (r = t.charAt(Ke),
                            Ke++) : (r = N,
                            0 === Qe && a(F)),
                        r !== N)
                        for (; r !== N;)
                            n.push(r),
                            B.test(t.charAt(Ke)) ? (r = t.charAt(Ke),
                                Ke++) : (r = N,
                                0 === Qe && a(F));
                    else
                        n = N;
                    e = n !== N ? t.substring(e, Ke) : n
                }
                return e
            }

            function h() {
                var e, n, r, o, i, s, l, c, u;
                return e = Ke,
                    123 === t.charCodeAt(Ke) ? (n = q,
                        Ke++) : (n = N,
                        0 === Qe && a(z)),
                    n !== N ? (r = k(),
                        r !== N ? (o = p(),
                            o !== N ? (i = k(),
                                i !== N ? (s = Ke,
                                    44 === t.charCodeAt(Ke) ? (l = W,
                                        Ke++) : (l = N,
                                        0 === Qe && a(U)),
                                    l !== N ? (c = k(),
                                        c !== N ? (u = f(),
                                            u !== N ? (l = [l, c, u],
                                                s = l) : (Ke = s,
                                                s = N)) : (Ke = s,
                                            s = N)) : (Ke = s,
                                        s = N),
                                    s === N && (s = null),
                                    s !== N ? (l = k(),
                                        l !== N ? (125 === t.charCodeAt(Ke) ? (c = H,
                                                Ke++) : (c = N,
                                                0 === Qe && a(Y)),
                                            c !== N ? (Ve = e,
                                                n = G(o, s),
                                                e = n) : (Ke = e,
                                                e = N)) : (Ke = e,
                                            e = N)) : (Ke = e,
                                        e = N)) : (Ke = e,
                                    e = N)) : (Ke = e,
                                e = N)) : (Ke = e,
                            e = N)) : (Ke = e,
                        e = N),
                    e
            }

            function f() {
                var e;
                return e = m(),
                    e === N && (e = g()) === N && (e = y()) === N && (e = v()),
                    e
            }

            function m() {
                var e, n, r, o, i, s, l;
                return e = Ke,
                    t.substr(Ke, 6) === K ? (n = K,
                        Ke += 6) : (n = N,
                        0 === Qe && a(V)),
                    n === N && (t.substr(Ke, 4) === X ? (n = X,
                            Ke += 4) : (n = N,
                            0 === Qe && a(J)),
                        n === N && (t.substr(Ke, 4) === Z ? (n = Z,
                            Ke += 4) : (n = N,
                            0 === Qe && a(Q)))),
                    n !== N ? (r = k(),
                        r !== N ? (o = Ke,
                            44 === t.charCodeAt(Ke) ? (i = W,
                                Ke++) : (i = N,
                                0 === Qe && a(U)),
                            i !== N ? (s = k(),
                                s !== N ? (l = M(),
                                    l !== N ? (i = [i, s, l],
                                        o = i) : (Ke = o,
                                        o = N)) : (Ke = o,
                                    o = N)) : (Ke = o,
                                o = N),
                            o === N && (o = null),
                            o !== N ? (Ve = e,
                                n = $(n, o),
                                e = n) : (Ke = e,
                                e = N)) : (Ke = e,
                            e = N)) : (Ke = e,
                        e = N),
                    e
            }

            function g() {
                var e, n, r, o, i, s;
                return e = Ke,
                    t.substr(Ke, 6) === ee ? (n = ee,
                        Ke += 6) : (n = N,
                        0 === Qe && a(te)),
                    n !== N ? (r = k(),
                        r !== N ? (44 === t.charCodeAt(Ke) ? (o = W,
                                Ke++) : (o = N,
                                0 === Qe && a(U)),
                            o !== N ? (i = k(),
                                i !== N ? (s = x(),
                                    s !== N ? (Ve = e,
                                        n = ne(s),
                                        e = n) : (Ke = e,
                                        e = N)) : (Ke = e,
                                    e = N)) : (Ke = e,
                                e = N)) : (Ke = e,
                            e = N)) : (Ke = e,
                        e = N),
                    e
            }

            function y() {
                var e, n, r, o, i, s;
                return e = Ke,
                    t.substr(Ke, 13) === re ? (n = re,
                        Ke += 13) : (n = N,
                        0 === Qe && a(oe)),
                    n !== N ? (r = k(),
                        r !== N ? (44 === t.charCodeAt(Ke) ? (o = W,
                                Ke++) : (o = N,
                                0 === Qe && a(U)),
                            o !== N ? (i = k(),
                                i !== N ? (s = x(),
                                    s !== N ? (Ve = e,
                                        n = ae(s),
                                        e = n) : (Ke = e,
                                        e = N)) : (Ke = e,
                                    e = N)) : (Ke = e,
                                e = N)) : (Ke = e,
                            e = N)) : (Ke = e,
                        e = N),
                    e
            }

            function v() {
                var e, n, r, o, i;
                if (e = Ke,
                    t.substr(Ke, 6) === ie ? (n = ie,
                        Ke += 6) : (n = N,
                        0 === Qe && a(se)),
                    n !== N)
                    if (k() !== N)
                        if (44 === t.charCodeAt(Ke) ? (r = W,
                                Ke++) : (r = N,
                                0 === Qe && a(U)),
                            r !== N)
                            if (k() !== N) {
                                if (o = [],
                                    (i = _()) !== N)
                                    for (; i !== N;)
                                        o.push(i),
                                        i = _();
                                else
                                    o = N;
                                o !== N ? (Ve = e,
                                    n = le(o),
                                    e = n) : (Ke = e,
                                    e = N)
                            } else
                                Ke = e,
                                e = N;
                else
                    Ke = e,
                    e = N;
                else
                    Ke = e,
                    e = N;
                else
                    Ke = e,
                    e = N;
                return e
            }

            function b() {
                var e, n, r, o;
                return e = Ke,
                    n = Ke,
                    61 === t.charCodeAt(Ke) ? (r = ce,
                        Ke++) : (r = N,
                        0 === Qe && a(ue)),
                    r !== N ? (o = C(),
                        o !== N ? (r = [r, o],
                            n = r) : (Ke = n,
                            n = N)) : (Ke = n,
                        n = N),
                    e = n !== N ? t.substring(e, Ke) : n,
                    e === N && (e = M()),
                    e
            }

            function _() {
                var e, n, r, o, i, s, c, u, d;
                return e = Ke,
                    n = k(),
                    n !== N ? (r = b(),
                        r !== N ? (o = k(),
                            o !== N ? (123 === t.charCodeAt(Ke) ? (i = q,
                                    Ke++) : (i = N,
                                    0 === Qe && a(z)),
                                i !== N ? (s = k(),
                                    s !== N ? (c = l(),
                                        c !== N ? (u = k(),
                                            u !== N ? (125 === t.charCodeAt(Ke) ? (d = H,
                                                    Ke++) : (d = N,
                                                    0 === Qe && a(Y)),
                                                d !== N ? (Ve = e,
                                                    n = de(r, c),
                                                    e = n) : (Ke = e,
                                                    e = N)) : (Ke = e,
                                                e = N)) : (Ke = e,
                                            e = N)) : (Ke = e,
                                        e = N)) : (Ke = e,
                                    e = N)) : (Ke = e,
                                e = N)) : (Ke = e,
                            e = N)) : (Ke = e,
                        e = N),
                    e
            }

            function w() {
                var e, n, r, o;
                return e = Ke,
                    t.substr(Ke, 7) === pe ? (n = pe,
                        Ke += 7) : (n = N,
                        0 === Qe && a(he)),
                    n !== N ? (r = k(),
                        r !== N ? (o = C(),
                            o !== N ? (Ve = e,
                                n = fe(o),
                                e = n) : (Ke = e,
                                e = N)) : (Ke = e,
                            e = N)) : (Ke = e,
                        e = N),
                    e
            }

            function x() {
                var e, t, n, r;
                if (e = Ke,
                    t = w(),
                    t === N && (t = null),
                    t !== N)
                    if (k() !== N) {
                        if (n = [],
                            (r = _()) !== N)
                            for (; r !== N;)
                                n.push(r),
                                r = _();
                        else
                            n = N;
                        n !== N ? (Ve = e,
                            t = me(t, n),
                            e = t) : (Ke = e,
                            e = N)
                    } else
                        Ke = e,
                        e = N;
                else
                    Ke = e,
                    e = N;
                return e
            }

            function E() {
                var e, n;
                if (Qe++,
                    e = [],
                    ye.test(t.charAt(Ke)) ? (n = t.charAt(Ke),
                        Ke++) : (n = N,
                        0 === Qe && a(ve)),
                    n !== N)
                    for (; n !== N;)
                        e.push(n),
                        ye.test(t.charAt(Ke)) ? (n = t.charAt(Ke),
                            Ke++) : (n = N,
                            0 === Qe && a(ve));
                else
                    e = N;
                return Qe--,
                    e === N && (n = N,
                        0 === Qe && a(ge)),
                    e
            }

            function k() {
                var e, n, r;
                for (Qe++,
                    e = Ke,
                    n = [],
                    r = E(); r !== N;)
                    n.push(r),
                    r = E();
                return e = n !== N ? t.substring(e, Ke) : n,
                    Qe--,
                    e === N && (n = N,
                        0 === Qe && a(be)),
                    e
            }

            function S() {
                var e;
                return _e.test(t.charAt(Ke)) ? (e = t.charAt(Ke),
                        Ke++) : (e = N,
                        0 === Qe && a(we)),
                    e
            }

            function O() {
                var e;
                return xe.test(t.charAt(Ke)) ? (e = t.charAt(Ke),
                        Ke++) : (e = N,
                        0 === Qe && a(Ee)),
                    e
            }

            function C() {
                var e, n, r, o, i, s;
                if (e = Ke,
                    48 === t.charCodeAt(Ke) ? (n = ke,
                        Ke++) : (n = N,
                        0 === Qe && a(Se)),
                    n === N) {
                    if (n = Ke,
                        r = Ke,
                        Oe.test(t.charAt(Ke)) ? (o = t.charAt(Ke),
                            Ke++) : (o = N,
                            0 === Qe && a(Ce)),
                        o !== N) {
                        for (i = [],
                            s = S(); s !== N;)
                            i.push(s),
                            s = S();
                        i !== N ? (o = [o, i],
                            r = o) : (Ke = r,
                            r = N)
                    } else
                        Ke = r,
                        r = N;
                    n = r !== N ? t.substring(n, Ke) : r
                }
                return n !== N && (Ve = e,
                        n = Te(n)),
                    e = n
            }

            function T() {
                var e, n, r, o, i, s, l, c;
                return Me.test(t.charAt(Ke)) ? (e = t.charAt(Ke),
                        Ke++) : (e = N,
                        0 === Qe && a(Ae)),
                    e === N && (e = Ke,
                        t.substr(Ke, 2) === Pe ? (n = Pe,
                            Ke += 2) : (n = N,
                            0 === Qe && a(Ne)),
                        n !== N && (Ve = e,
                            n = je()),
                        (e = n) === N && (e = Ke,
                            t.substr(Ke, 2) === De ? (n = De,
                                Ke += 2) : (n = N,
                                0 === Qe && a(Re)),
                            n !== N && (Ve = e,
                                n = Ie()),
                            (e = n) === N && (e = Ke,
                                t.substr(Ke, 2) === Le ? (n = Le,
                                    Ke += 2) : (n = N,
                                    0 === Qe && a(Be)),
                                n !== N && (Ve = e,
                                    n = Fe()),
                                (e = n) === N && (e = Ke,
                                    t.substr(Ke, 2) === qe ? (n = qe,
                                        Ke += 2) : (n = N,
                                        0 === Qe && a(ze)),
                                    n !== N && (Ve = e,
                                        n = We()),
                                    (e = n) === N && (e = Ke,
                                        t.substr(Ke, 2) === Ue ? (n = Ue,
                                            Ke += 2) : (n = N,
                                            0 === Qe && a(He)),
                                        n !== N ? (r = Ke,
                                            o = Ke,
                                            i = O(),
                                            i !== N ? (s = O(),
                                                s !== N ? (l = O(),
                                                    l !== N ? (c = O(),
                                                        c !== N ? (i = [i, s, l, c],
                                                            o = i) : (Ke = o,
                                                            o = N)) : (Ke = o,
                                                        o = N)) : (Ke = o,
                                                    o = N)) : (Ke = o,
                                                o = N),
                                            r = o !== N ? t.substring(r, Ke) : o,
                                            r !== N ? (Ve = e,
                                                n = Ye(r),
                                                e = n) : (Ke = e,
                                                e = N)) : (Ke = e,
                                            e = N)))))),
                    e
            }

            function M() {
                var e, t, n;
                if (e = Ke,
                    t = [],
                    (n = T()) !== N)
                    for (; n !== N;)
                        t.push(n),
                        n = T();
                else
                    t = N;
                return t !== N && (Ve = e,
                        t = Ge(t)),
                    e = t
            }
            var A, P = arguments.length > 1 ? arguments[1] : {},
                N = {},
                j = {
                    start: s
                },
                D = s,
                R = function(e) {
                    return {
                        type: "messageFormatPattern",
                        elements: e,
                        location: n()
                    }
                },
                I = function(e) {
                    var t, n, r, o, a, i = "";
                    for (t = 0,
                        r = e.length; t < r; t += 1)
                        for (o = e[t],
                            n = 0,
                            a = o.length; n < a; n += 1)
                            i += o[n];
                    return i
                },
                L = function(e) {
                    return {
                        type: "messageTextElement",
                        value: e,
                        location: n()
                    }
                },
                B = /^[^ \t\n\r,.+={}#]/,
                F = {
                    type: "class",
                    value: "[^ \\t\\n\\r,.+={}#]",
                    description: "[^ \\t\\n\\r,.+={}#]"
                },
                q = "{",
                z = {
                    type: "literal",
                    value: "{",
                    description: '"{"'
                },
                W = ",",
                U = {
                    type: "literal",
                    value: ",",
                    description: '","'
                },
                H = "}",
                Y = {
                    type: "literal",
                    value: "}",
                    description: '"}"'
                },
                G = function(e, t) {
                    return {
                        type: "argumentElement",
                        id: e,
                        format: t && t[2],
                        location: n()
                    }
                },
                K = "number",
                V = {
                    type: "literal",
                    value: "number",
                    description: '"number"'
                },
                X = "date",
                J = {
                    type: "literal",
                    value: "date",
                    description: '"date"'
                },
                Z = "time",
                Q = {
                    type: "literal",
                    value: "time",
                    description: '"time"'
                },
                $ = function(e, t) {
                    return {
                        type: e + "Format",
                        style: t && t[2],
                        location: n()
                    }
                },
                ee = "plural",
                te = {
                    type: "literal",
                    value: "plural",
                    description: '"plural"'
                },
                ne = function(e) {
                    return {
                        type: e.type,
                        ordinal: !1,
                        offset: e.offset || 0,
                        options: e.options,
                        location: n()
                    }
                },
                re = "selectordinal",
                oe = {
                    type: "literal",
                    value: "selectordinal",
                    description: '"selectordinal"'
                },
                ae = function(e) {
                    return {
                        type: e.type,
                        ordinal: !0,
                        offset: e.offset || 0,
                        options: e.options,
                        location: n()
                    }
                },
                ie = "select",
                se = {
                    type: "literal",
                    value: "select",
                    description: '"select"'
                },
                le = function(e) {
                    return {
                        type: "selectFormat",
                        options: e,
                        location: n()
                    }
                },
                ce = "=",
                ue = {
                    type: "literal",
                    value: "=",
                    description: '"="'
                },
                de = function(e, t) {
                    return {
                        type: "optionalFormatPattern",
                        selector: e,
                        value: t,
                        location: n()
                    }
                },
                pe = "offset:",
                he = {
                    type: "literal",
                    value: "offset:",
                    description: '"offset:"'
                },
                fe = function(e) {
                    return e
                },
                me = function(e, t) {
                    return {
                        type: "pluralFormat",
                        offset: e,
                        options: t,
                        location: n()
                    }
                },
                ge = {
                    type: "other",
                    description: "whitespace"
                },
                ye = /^[ \t\n\r]/,
                ve = {
                    type: "class",
                    value: "[ \\t\\n\\r]",
                    description: "[ \\t\\n\\r]"
                },
                be = {
                    type: "other",
                    description: "optionalWhitespace"
                },
                _e = /^[0-9]/,
                we = {
                    type: "class",
                    value: "[0-9]",
                    description: "[0-9]"
                },
                xe = /^[0-9a-f]/i,
                Ee = {
                    type: "class",
                    value: "[0-9a-f]i",
                    description: "[0-9a-f]i"
                },
                ke = "0",
                Se = {
                    type: "literal",
                    value: "0",
                    description: '"0"'
                },
                Oe = /^[1-9]/,
                Ce = {
                    type: "class",
                    value: "[1-9]",
                    description: "[1-9]"
                },
                Te = function(e) {
                    return parseInt(e, 10)
                },
                Me = /^[^{}\\\0-\x1F\x7f \t\n\r]/,
                Ae = {
                    type: "class",
                    value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
                    description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
                },
                Pe = "\\\\",
                Ne = {
                    type: "literal",
                    value: "\\\\",
                    description: '"\\\\\\\\"'
                },
                je = function() {
                    return "\\"
                },
                De = "\\#",
                Re = {
                    type: "literal",
                    value: "\\#",
                    description: '"\\\\#"'
                },
                Ie = function() {
                    return "\\#"
                },
                Le = "\\{",
                Be = {
                    type: "literal",
                    value: "\\{",
                    description: '"\\\\{"'
                },
                Fe = function() {
                    return "{"
                },
                qe = "\\}",
                ze = {
                    type: "literal",
                    value: "\\}",
                    description: '"\\\\}"'
                },
                We = function() {
                    return "}"
                },
                Ue = "\\u",
                He = {
                    type: "literal",
                    value: "\\u",
                    description: '"\\\\u"'
                },
                Ye = function(e) {
                    return String.fromCharCode(parseInt(e, 16))
                },
                Ge = function(e) {
                    return e.join("")
                },
                Ke = 0,
                Ve = 0,
                Xe = [{
                    line: 1,
                    column: 1,
                    seenCR: !1
                }],
                Je = 0,
                Ze = [],
                Qe = 0;
            if ("startRule" in P) {
                if (!(P.startRule in j))
                    throw new Error("Can't start parsing from rule \"" + P.startRule + '".');
                D = j[P.startRule]
            }
            if ((A = D()) !== N && Ke === t.length)
                return A;
            throw A !== N && Ke < t.length && a({
                    type: "end",
                    description: "end of input"
                }),
                i(null, Ze, Je < t.length ? t.charAt(Je) : null, Je < t.length ? o(Je, Je + 1) : o(Je, Je))
        }
        return function(e, t) {
            function n() {
                this.constructor = e
            }
            n.prototype = t.prototype,
                e.prototype = new n
        }(e, Error), {
            SyntaxError: e,
            parse: t
        }
    }()
}