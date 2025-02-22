function(e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(e, t) {
        var n = {};
        for (var r in e)
            t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
        return n
    }

    function a(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function s(e, t) {
        if ("function" !== typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    t.__esModule = !0,
        t.Helmet = void 0;
    var l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        c = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                    r && e(t, r),
                    t
            }
        }(),
        u = n(0),
        d = r(u),
        p = n(2),
        h = r(p),
        f = n(655),
        m = r(f),
        g = n(657),
        y = r(g),
        v = n(658),
        b = n(255),
        _ = function() {
            return null
        },
        w = (0,
            m.default)(v.reducePropsToState, v.handleClientStateChange, v.mapStateOnServer)(_),
        x = function(e) {
            var t, n;
            return n = t = function(t) {
                    function n() {
                        return a(this, n),
                            i(this, t.apply(this, arguments))
                    }
                    return s(n, t),
                        n.prototype.shouldComponentUpdate = function(e) {
                            return !(0,
                                y.default)(this.props, e)
                        },
                        n.prototype.mapNestedChildrenToProps = function(e, t) {
                            if (!t)
                                return null;
                            switch (e.type) {
                                case b.TAG_NAMES.SCRIPT:
                                case b.TAG_NAMES.NOSCRIPT:
                                    return {
                                        innerHTML: t
                                    };
                                case b.TAG_NAMES.STYLE:
                                    return {
                                        cssText: t
                                    }
                            }
                            throw new Error("<" + e.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.")
                        },
                        n.prototype.flattenArrayTypeChildren = function(e) {
                            var t, n = e.child,
                                r = e.arrayTypeChildren,
                                o = e.newChildProps,
                                a = e.nestedChildren;
                            return l({}, r, (t = {},
                                t[n.type] = [].concat(r[n.type] || [], [l({}, o, this.mapNestedChildrenToProps(n, a))]),
                                t))
                        },
                        n.prototype.mapObjectTypeChildren = function(e) {
                            var t, n, r = e.child,
                                o = e.newProps,
                                a = e.newChildProps,
                                i = e.nestedChildren;
                            switch (r.type) {
                                case b.TAG_NAMES.TITLE:
                                    return l({}, o, (t = {},
                                        t[r.type] = i,
                                        t.titleAttributes = l({}, a),
                                        t));
                                case b.TAG_NAMES.BODY:
                                    return l({}, o, {
                                        bodyAttributes: l({}, a)
                                    });
                                case b.TAG_NAMES.HTML:
                                    return l({}, o, {
                                        htmlAttributes: l({}, a)
                                    })
                            }
                            return l({}, o, (n = {},
                                n[r.type] = l({}, a),
                                n))
                        },
                        n.prototype.mapArrayTypeChildrenToProps = function(e, t) {
                            var n = l({}, t);
                            return Object.keys(e).forEach(function(t) {
                                    var r;
                                    n = l({}, n, (r = {},
                                        r[t] = e[t],
                                        r))
                                }),
                                n
                        },
                        n.prototype.warnOnInvalidChildren = function(e, t) {
                            return !0
                        },
                        n.prototype.mapChildrenToProps = function(e, t) {
                            var n = this,
                                r = {};
                            return d.default.Children.forEach(e, function(e) {
                                    if (e && e.props) {
                                        var a = e.props,
                                            i = a.children,
                                            s = o(a, ["children"]),
                                            l = (0,
                                                v.convertReactPropstoHtmlAttributes)(s);
                                        switch (n.warnOnInvalidChildren(e, i),
                                            e.type) {
                                            case b.TAG_NAMES.LINK:
                                            case b.TAG_NAMES.META:
                                            case b.TAG_NAMES.NOSCRIPT:
                                            case b.TAG_NAMES.SCRIPT:
                                            case b.TAG_NAMES.STYLE:
                                                r = n.flattenArrayTypeChildren({
                                                    child: e,
                                                    arrayTypeChildren: r,
                                                    newChildProps: l,
                                                    nestedChildren: i
                                                });
                                                break;
                                            default:
                                                t = n.mapObjectTypeChildren({
                                                    child: e,
                                                    newProps: t,
                                                    newChildProps: l,
                                                    nestedChildren: i
                                                })
                                        }
                                    }
                                }),
                                t = this.mapArrayTypeChildrenToProps(r, t)
                        },
                        n.prototype.render = function() {
                            var t = this.props,
                                n = t.children,
                                r = o(t, ["children"]),
                                a = l({}, r);
                            return n && (a = this.mapChildrenToProps(n, a)),
                                d.default.createElement(e, a)
                        },
                        c(n, null, [{
                            key: "canUseDOM",
                            set: function(t) {
                                e.canUseDOM = t
                            }
                        }]),
                        n
                }(d.default.Component),
                t.propTypes = {
                    base: h.default.object,
                    bodyAttributes: h.default.object,
                    children: h.default.oneOfType([h.default.arrayOf(h.default.node), h.default.node]),
                    defaultTitle: h.default.string,
                    defer: h.default.bool,
                    encodeSpecialCharacters: h.default.bool,
                    htmlAttributes: h.default.object,
                    link: h.default.arrayOf(h.default.object),
                    meta: h.default.arrayOf(h.default.object),
                    noscript: h.default.arrayOf(h.default.object),
                    onChangeClientState: h.default.func,
                    script: h.default.arrayOf(h.default.object),
                    style: h.default.arrayOf(h.default.object),
                    title: h.default.string,
                    titleAttributes: h.default.object,
                    titleTemplate: h.default.string
                },
                t.defaultProps = {
                    defer: !0,
                    encodeSpecialCharacters: !0
                },
                t.peek = e.peek,
                t.rewind = function() {
                    var t = e.rewind();
                    return t || (t = (0,
                            v.mapStateOnServer)({
                            baseTag: [],
                            bodyAttributes: {},
                            encodeSpecialCharacters: !0,
                            htmlAttributes: {},
                            linkTags: [],
                            metaTags: [],
                            noscriptTags: [],
                            scriptTags: [],
                            styleTags: [],
                            title: "",
                            titleAttributes: {}
                        })),
                        t
                },
                n
        }(w);
    x.renderStatic = x.rewind,
        t.Helmet = x,
        t.default = x
}