function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o() {
        if ("function" !== typeof WeakMap)
            return null;
        var e = new WeakMap;
        return o = function() {
                return e
            },
            e
    }

    function a(e) {
        "@babel/helpers - typeof";
        return (a = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(e) {
                return typeof e
            } :
            function(e) {
                return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        )(e)
    }

    function i(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function s(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
        }
    }

    function l(e, t, n) {
        return t && s(e.prototype, t),
            n && s(e, n),
            e
    }

    function c(e, t) {
        return !t || "object" !== a(t) && "function" !== typeof t ? u(e) : t
    }

    function u(e) {
        if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function d(e) {
        return (d = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function p(e, t) {
        if ("function" !== typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && h(e, t)
    }

    function h(e, t) {
        return (h = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t,
                e
        })(e, t)
    }

    function f(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
    }
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = void 0;
    var m = function(e) {
            if (e && e.__esModule)
                return e;
            if (null === e || "object" !== a(e) && "function" !== typeof e)
                return {
                    default: e
                };
            var t = o();
            if (t && t.has(e))
                return t.get(e);
            var n = {},
                r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in e)
                if (Object.prototype.hasOwnProperty.call(e, i)) {
                    var s = r ? Object.getOwnPropertyDescriptor(e, i) : null;
                    s && (s.get || s.set) ? Object.defineProperty(n, i, s) : n[i] = e[i]
                }
            return n.default = e,
                t && t.set(e, n),
                n
        }(n(0)),
        g = r(n(2)),
        y = r(n(796)),
        v = r(n(797)),
        b = r(n(20)),
        _ = function(e) {
            function t() {
                return i(this, t),
                    c(this, d(t).apply(this, arguments))
            }
            return p(t, e),
                l(t, [{
                    key: "isFirstPageVisible",
                    value: function(e) {
                        var t = this.props,
                            n = t.hideDisabled;
                        t.hideNavigation;
                        return !(t.hideFirstLastPages || n && !e)
                    }
                }, {
                    key: "isPrevPageVisible",
                    value: function(e) {
                        var t = this.props,
                            n = t.hideDisabled;
                        return !(t.hideNavigation || n && !e)
                    }
                }, {
                    key: "isNextPageVisible",
                    value: function(e) {
                        var t = this.props,
                            n = t.hideDisabled;
                        return !(t.hideNavigation || n && !e)
                    }
                }, {
                    key: "isLastPageVisible",
                    value: function(e) {
                        var t = this.props,
                            n = t.hideDisabled;
                        t.hideNavigation;
                        return !(t.hideFirstLastPages || n && !e)
                    }
                }, {
                    key: "buildPages",
                    value: function() {
                        for (var e = [], t = this.props, n = t.itemsCountPerPage, r = t.pageRangeDisplayed, o = t.activePage, a = t.prevPageText, i = t.nextPageText, s = t.firstPageText, l = t.lastPageText, c = t.totalItemsCount, u = t.onChange, d = t.activeClass, p = t.itemClass, h = t.itemClassFirst, f = t.itemClassPrev, g = t.itemClassNext, _ = t.itemClassLast, w = t.activeLinkClass, x = t.disabledClass, E = (t.hideDisabled,
                                t.hideNavigation,
                                t.linkClass), k = t.linkClassFirst, S = t.linkClassPrev, O = t.linkClassNext, C = t.linkClassLast, T = (t.hideFirstLastPages,
                                t.getPageUrl), M = new y.default(n, r).build(c, o), A = M.first_page; A <= M.last_page; A++)
                            e.push(m.default.createElement(v.default, {
                                isActive: A === o,
                                key: A,
                                href: T(A),
                                pageNumber: A,
                                pageText: A + "",
                                onClick: u,
                                itemClass: p,
                                linkClass: E,
                                activeClass: d,
                                activeLinkClass: w,
                                ariaLabel: "Go to page number ".concat(A)
                            }));
                        return this.isPrevPageVisible(M.has_previous_page) && e.unshift(m.default.createElement(v.default, {
                                key: "prev" + M.previous_page,
                                href: T(M.previous_page),
                                pageNumber: M.previous_page,
                                onClick: u,
                                pageText: a,
                                isDisabled: !M.has_previous_page,
                                itemClass: (0,
                                    b.default)(p, f),
                                linkClass: (0,
                                    b.default)(E, S),
                                disabledClass: x,
                                ariaLabel: "Go to previous page"
                            })),
                            this.isFirstPageVisible(M.has_previous_page) && e.unshift(m.default.createElement(v.default, {
                                key: "first",
                                href: T(1),
                                pageNumber: 1,
                                onClick: u,
                                pageText: s,
                                isDisabled: !M.has_previous_page,
                                itemClass: (0,
                                    b.default)(p, h),
                                linkClass: (0,
                                    b.default)(E, k),
                                disabledClass: x,
                                ariaLabel: "Go to first page"
                            })),
                            this.isNextPageVisible(M.has_next_page) && e.push(m.default.createElement(v.default, {
                                key: "next" + M.next_page,
                                href: T(M.next_page),
                                pageNumber: M.next_page,
                                onClick: u,
                                pageText: i,
                                isDisabled: !M.has_next_page,
                                itemClass: (0,
                                    b.default)(p, g),
                                linkClass: (0,
                                    b.default)(E, O),
                                disabledClass: x,
                                ariaLabel: "Go to next page"
                            })),
                            this.isLastPageVisible(M.has_next_page) && e.push(m.default.createElement(v.default, {
                                key: "last",
                                href: T(M.total_pages),
                                pageNumber: M.total_pages,
                                onClick: u,
                                pageText: l,
                                isDisabled: M.current_page === M.total_pages,
                                itemClass: (0,
                                    b.default)(p, _),
                                linkClass: (0,
                                    b.default)(E, C),
                                disabledClass: x,
                                ariaLabel: "Go to last page"
                            })),
                            e
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.buildPages();
                        return m.default.createElement("ul", {
                            className: this.props.innerClass
                        }, e)
                    }
                }]),
                t
        }(m.default.Component);
    t.default = _,
        f(_, "propTypes", {
            totalItemsCount: g.default.number.isRequired,
            onChange: g.default.func.isRequired,
            activePage: g.default.number,
            itemsCountPerPage: g.default.number,
            pageRangeDisplayed: g.default.number,
            prevPageText: g.default.oneOfType([g.default.string, g.default.element]),
            nextPageText: g.default.oneOfType([g.default.string, g.default.element]),
            lastPageText: g.default.oneOfType([g.default.string, g.default.element]),
            firstPageText: g.default.oneOfType([g.default.string, g.default.element]),
            disabledClass: g.default.string,
            hideDisabled: g.default.bool,
            hideNavigation: g.default.bool,
            innerClass: g.default.string,
            itemClass: g.default.string,
            itemClassFirst: g.default.string,
            itemClassPrev: g.default.string,
            itemClassNext: g.default.string,
            itemClassLast: g.default.string,
            linkClass: g.default.string,
            activeClass: g.default.string,
            activeLinkClass: g.default.string,
            linkClassFirst: g.default.string,
            linkClassPrev: g.default.string,
            linkClassNext: g.default.string,
            linkClassLast: g.default.string,
            hideFirstLastPages: g.default.bool,
            getPageUrl: g.default.func
        }),
        f(_, "defaultProps", {
            itemsCountPerPage: 10,
            pageRangeDisplayed: 5,
            activePage: 1,
            prevPageText: "\u27e8",
            firstPageText: "\xab",
            nextPageText: "\u27e9",
            lastPageText: "\xbb",
            innerClass: "pagination",
            itemClass: void 0,
            linkClass: void 0,
            activeLinkClass: void 0,
            hideFirstLastPages: !1,
            getPageUrl: function(e) {
                return "#"
            }
        })
}