function(e, t, n) {
    (function(e) {
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.__esModule = !0,
            t.warn = t.requestAnimationFrame = t.reducePropsToState = t.mapStateOnServer = t.handleClientStateChange = t.convertReactPropstoHtmlAttributes = void 0;
        var o = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                return typeof e
            } :
            function(e) {
                return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            i = n(0),
            s = r(i),
            l = n(32),
            c = r(l),
            u = n(255),
            d = function(e) {
                return !1 === (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) ? String(e) : String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
            },
            p = function(e) {
                var t = y(e, u.TAG_NAMES.TITLE),
                    n = y(e, u.HELMET_PROPS.TITLE_TEMPLATE);
                if (n && t)
                    return n.replace(/%s/g, function() {
                        return t
                    });
                var r = y(e, u.HELMET_PROPS.DEFAULT_TITLE);
                return t || r || void 0
            },
            h = function(e) {
                return y(e, u.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function() {}
            },
            f = function(e, t) {
                return t.filter(function(t) {
                    return "undefined" !== typeof t[e]
                }).map(function(t) {
                    return t[e]
                }).reduce(function(e, t) {
                    return a({}, e, t)
                }, {})
            },
            m = function(e, t) {
                return t.filter(function(e) {
                    return "undefined" !== typeof e[u.TAG_NAMES.BASE]
                }).map(function(e) {
                    return e[u.TAG_NAMES.BASE]
                }).reverse().reduce(function(t, n) {
                    if (!t.length)
                        for (var r = Object.keys(n), o = 0; o < r.length; o++) {
                            var a = r[o],
                                i = a.toLowerCase();
                            if (-1 !== e.indexOf(i) && n[i])
                                return t.concat(n)
                        }
                    return t
                }, [])
            },
            g = function(e, t, n) {
                var r = {};
                return n.filter(function(t) {
                    return !!Array.isArray(t[e]) || ("undefined" !== typeof t[e] && E("Helmet: " + e + ' should be of type "Array". Instead found type "' + o(t[e]) + '"'), !1)
                }).map(function(t) {
                    return t[e]
                }).reverse().reduce(function(e, n) {
                    var o = {};
                    n.filter(function(e) {
                        for (var n = void 0, a = Object.keys(e), i = 0; i < a.length; i++) {
                            var s = a[i],
                                l = s.toLowerCase(); -
                            1 === t.indexOf(l) || n === u.TAG_PROPERTIES.REL && "canonical" === e[n].toLowerCase() || l === u.TAG_PROPERTIES.REL && "stylesheet" === e[l].toLowerCase() || (n = l), -1 === t.indexOf(s) || s !== u.TAG_PROPERTIES.INNER_HTML && s !== u.TAG_PROPERTIES.CSS_TEXT && s !== u.TAG_PROPERTIES.ITEM_PROP || (n = s)
                        }
                        if (!n || !e[n])
                            return !1;
                        var c = e[n].toLowerCase();
                        return r[n] || (r[n] = {}),
                            o[n] || (o[n] = {}), !r[n][c] && (o[n][c] = !0, !0)
                    }).reverse().forEach(function(t) {
                        return e.push(t)
                    });
                    for (var a = Object.keys(o), i = 0; i < a.length; i++) {
                        var s = a[i],
                            l = (0,
                                c.default)({}, r[s], o[s]);
                        r[s] = l
                    }
                    return e
                }, []).reverse()
            },
            y = function(e, t) {
                for (var n = e.length - 1; n >= 0; n--) {
                    var r = e[n];
                    if (r.hasOwnProperty(t))
                        return r[t]
                }
                return null
            },
            v = function(e) {
                return {
                    baseTag: m([u.TAG_PROPERTIES.HREF], e),
                    bodyAttributes: f(u.ATTRIBUTE_NAMES.BODY, e),
                    defer: y(e, u.HELMET_PROPS.DEFER),
                    encode: y(e, u.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
                    htmlAttributes: f(u.ATTRIBUTE_NAMES.HTML, e),
                    linkTags: g(u.TAG_NAMES.LINK, [u.TAG_PROPERTIES.REL, u.TAG_PROPERTIES.HREF], e),
                    metaTags: g(u.TAG_NAMES.META, [u.TAG_PROPERTIES.NAME, u.TAG_PROPERTIES.CHARSET, u.TAG_PROPERTIES.HTTPEQUIV, u.TAG_PROPERTIES.PROPERTY, u.TAG_PROPERTIES.ITEM_PROP], e),
                    noscriptTags: g(u.TAG_NAMES.NOSCRIPT, [u.TAG_PROPERTIES.INNER_HTML], e),
                    onChangeClientState: h(e),
                    scriptTags: g(u.TAG_NAMES.SCRIPT, [u.TAG_PROPERTIES.SRC, u.TAG_PROPERTIES.INNER_HTML], e),
                    styleTags: g(u.TAG_NAMES.STYLE, [u.TAG_PROPERTIES.CSS_TEXT], e),
                    title: p(e),
                    titleAttributes: f(u.ATTRIBUTE_NAMES.TITLE, e)
                }
            },
            b = function() {
                var e = Date.now();
                return function(t) {
                    var n = Date.now();
                    n - e > 16 ? (e = n,
                        t(n)) : setTimeout(function() {
                        b(t)
                    }, 0)
                }
            }(),
            _ = function(e) {
                return clearTimeout(e)
            },
            w = "undefined" !== typeof window ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || b : e.requestAnimationFrame || b,
            x = "undefined" !== typeof window ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || _ : e.cancelAnimationFrame || _,
            E = function(e) {
                return console && "function" === typeof console.warn && console.warn(e)
            },
            k = null,
            S = function(e) {
                k && x(k),
                    e.defer ? k = w(function() {
                        O(e, function() {
                            k = null
                        })
                    }) : (O(e),
                        k = null)
            },
            O = function(e, t) {
                var n = e.baseTag,
                    r = e.bodyAttributes,
                    o = e.htmlAttributes,
                    a = e.linkTags,
                    i = e.metaTags,
                    s = e.noscriptTags,
                    l = e.onChangeClientState,
                    c = e.scriptTags,
                    d = e.styleTags,
                    p = e.title,
                    h = e.titleAttributes;
                M(u.TAG_NAMES.BODY, r),
                    M(u.TAG_NAMES.HTML, o),
                    T(p, h);
                var f = {
                        baseTag: A(u.TAG_NAMES.BASE, n),
                        linkTags: A(u.TAG_NAMES.LINK, a),
                        metaTags: A(u.TAG_NAMES.META, i),
                        noscriptTags: A(u.TAG_NAMES.NOSCRIPT, s),
                        scriptTags: A(u.TAG_NAMES.SCRIPT, c),
                        styleTags: A(u.TAG_NAMES.STYLE, d)
                    },
                    m = {},
                    g = {};
                Object.keys(f).forEach(function(e) {
                        var t = f[e],
                            n = t.newTags,
                            r = t.oldTags;
                        n.length && (m[e] = n),
                            r.length && (g[e] = f[e].oldTags)
                    }),
                    t && t(),
                    l(e, m, g)
            },
            C = function(e) {
                return Array.isArray(e) ? e.join("") : e
            },
            T = function(e, t) {
                "undefined" !== typeof e && document.title !== e && (document.title = C(e)),
                    M(u.TAG_NAMES.TITLE, t)
            },
            M = function(e, t) {
                var n = document.getElementsByTagName(e)[0];
                if (n) {
                    for (var r = n.getAttribute(u.HELMET_ATTRIBUTE), o = r ? r.split(",") : [], a = [].concat(o), i = Object.keys(t), s = 0; s < i.length; s++) {
                        var l = i[s],
                            c = t[l] || "";
                        n.getAttribute(l) !== c && n.setAttribute(l, c), -1 === o.indexOf(l) && o.push(l);
                        var d = a.indexOf(l); -
                        1 !== d && a.splice(d, 1)
                    }
                    for (var p = a.length - 1; p >= 0; p--)
                        n.removeAttribute(a[p]);
                    o.length === a.length ? n.removeAttribute(u.HELMET_ATTRIBUTE) : n.getAttribute(u.HELMET_ATTRIBUTE) !== i.join(",") && n.setAttribute(u.HELMET_ATTRIBUTE, i.join(","))
                }
            },
            A = function(e, t) {
                var n = document.head || document.querySelector(u.TAG_NAMES.HEAD),
                    r = n.querySelectorAll(e + "[" + u.HELMET_ATTRIBUTE + "]"),
                    o = Array.prototype.slice.call(r),
                    a = [],
                    i = void 0;
                return t && t.length && t.forEach(function(t) {
                        var n = document.createElement(e);
                        for (var r in t)
                            if (t.hasOwnProperty(r))
                                if (r === u.TAG_PROPERTIES.INNER_HTML)
                                    n.innerHTML = t.innerHTML;
                                else if (r === u.TAG_PROPERTIES.CSS_TEXT)
                            n.styleSheet ? n.styleSheet.cssText = t.cssText : n.appendChild(document.createTextNode(t.cssText));
                        else {
                            var s = "undefined" === typeof t[r] ? "" : t[r];
                            n.setAttribute(r, s)
                        }
                        n.setAttribute(u.HELMET_ATTRIBUTE, "true"),
                            o.some(function(e, t) {
                                return i = t,
                                    n.isEqualNode(e)
                            }) ? o.splice(i, 1) : a.push(n)
                    }),
                    o.forEach(function(e) {
                        return e.parentNode.removeChild(e)
                    }),
                    a.forEach(function(e) {
                        return n.appendChild(e)
                    }), {
                        oldTags: o,
                        newTags: a
                    }
            },
            P = function(e) {
                return Object.keys(e).reduce(function(t, n) {
                    var r = "undefined" !== typeof e[n] ? n + '="' + e[n] + '"' : "" + n;
                    return t ? t + " " + r : r
                }, "")
            },
            N = function(e, t, n, r) {
                var o = P(n),
                    a = C(t);
                return o ? "<" + e + " " + u.HELMET_ATTRIBUTE + '="true" ' + o + ">" + d(a, r) + "</" + e + ">" : "<" + e + " " + u.HELMET_ATTRIBUTE + '="true">' + d(a, r) + "</" + e + ">"
            },
            j = function(e, t, n) {
                return t.reduce(function(t, r) {
                    var o = Object.keys(r).filter(function(e) {
                            return !(e === u.TAG_PROPERTIES.INNER_HTML || e === u.TAG_PROPERTIES.CSS_TEXT)
                        }).reduce(function(e, t) {
                            var o = "undefined" === typeof r[t] ? t : t + '="' + d(r[t], n) + '"';
                            return e ? e + " " + o : o
                        }, ""),
                        a = r.innerHTML || r.cssText || "",
                        i = -1 === u.SELF_CLOSING_TAGS.indexOf(e);
                    return t + "<" + e + " " + u.HELMET_ATTRIBUTE + '="true" ' + o + (i ? "/>" : ">" + a + "</" + e + ">")
                }, "")
            },
            D = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return Object.keys(e).reduce(function(t, n) {
                    return t[u.REACT_TAG_MAP[n] || n] = e[n],
                        t
                }, t)
            },
            R = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return Object.keys(e).reduce(function(t, n) {
                    return t[u.HTML_TAG_MAP[n] || n] = e[n],
                        t
                }, t)
            },
            I = function(e, t, n) {
                var r, o = (r = {
                            key: t
                        },
                        r[u.HELMET_ATTRIBUTE] = !0,
                        r),
                    a = D(n, o);
                return [s.default.createElement(u.TAG_NAMES.TITLE, a, t)]
            },
            L = function(e, t) {
                return t.map(function(t, n) {
                    var r, o = (r = {
                            key: n
                        },
                        r[u.HELMET_ATTRIBUTE] = !0,
                        r);
                    return Object.keys(t).forEach(function(e) {
                            var n = u.REACT_TAG_MAP[e] || e;
                            if (n === u.TAG_PROPERTIES.INNER_HTML || n === u.TAG_PROPERTIES.CSS_TEXT) {
                                var r = t.innerHTML || t.cssText;
                                o.dangerouslySetInnerHTML = {
                                    __html: r
                                }
                            } else
                                o[n] = t[e]
                        }),
                        s.default.createElement(e, o)
                })
            },
            B = function(e, t, n) {
                switch (e) {
                    case u.TAG_NAMES.TITLE:
                        return {
                            toComponent: function() {
                                return I(0, t.title, t.titleAttributes)
                            },
                            toString: function() {
                                return N(e, t.title, t.titleAttributes, n)
                            }
                        };
                    case u.ATTRIBUTE_NAMES.BODY:
                    case u.ATTRIBUTE_NAMES.HTML:
                        return {
                            toComponent: function() {
                                return D(t)
                            },
                            toString: function() {
                                return P(t)
                            }
                        };
                    default:
                        return {
                            toComponent: function() {
                                return L(e, t)
                            },
                            toString: function() {
                                return j(e, t, n)
                            }
                        }
                }
            },
            F = function(e) {
                var t = e.baseTag,
                    n = e.bodyAttributes,
                    r = e.encode,
                    o = e.htmlAttributes,
                    a = e.linkTags,
                    i = e.metaTags,
                    s = e.noscriptTags,
                    l = e.scriptTags,
                    c = e.styleTags,
                    d = e.title,
                    p = void 0 === d ? "" : d,
                    h = e.titleAttributes;
                return {
                    base: B(u.TAG_NAMES.BASE, t, r),
                    bodyAttributes: B(u.ATTRIBUTE_NAMES.BODY, n, r),
                    htmlAttributes: B(u.ATTRIBUTE_NAMES.HTML, o, r),
                    link: B(u.TAG_NAMES.LINK, a, r),
                    meta: B(u.TAG_NAMES.META, i, r),
                    noscript: B(u.TAG_NAMES.NOSCRIPT, s, r),
                    script: B(u.TAG_NAMES.SCRIPT, l, r),
                    style: B(u.TAG_NAMES.STYLE, c, r),
                    title: B(u.TAG_NAMES.TITLE, {
                        title: p,
                        titleAttributes: h
                    }, r)
                }
            };
        t.convertReactPropstoHtmlAttributes = R,
            t.handleClientStateChange = S,
            t.mapStateOnServer = F,
            t.reducePropsToState = v,
            t.requestAnimationFrame = w,
            t.warn = E
    }).call(t, n(25))
}