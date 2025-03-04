 function (e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function a(e, t) {
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
    var i = n(0),
        s = n.n(i),
        l = n(15),
        c = n(2),
        u = n.n(c),
        d = n(6),
        p = n(291),
        h = n(74),
        f = n(799),
        m = n(19),
        g = n(39),
        y = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
            }
            return function (t, n, r) {
                return n && e(t.prototype, n),
                    r && e(t, r),
                    t
            }
        }(),
        v = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        activePage: 1
                    },
                    a.handlePageChange = function (e) {
                        a.setState({
                            activePage: e
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                y(t, [{
                    key: "componentWillUnmount",
                    value: function () {
                        this.props.initContractsAction()
                    }
                }, {
                    key: "render",
                    value: function () {
                        for (var e = this.props, t = e.user, n = e.getContractsAction, r = e.contracts, o = e.languageId, a = this.state.activePage, i = r.get("fetching"), l = r.get("data"), c = [], u = 0; u < l.length; u += 25)
                            c.push(l.slice(u, u + 25));
                        var d = {
                            getContractsAction: n,
                            data: c[a - 1] || [],
                            activePage: a,
                            totalItems: l.length,
                            fail: r.get("fail"),
                            handlePageChange: this.handlePageChange,
                            accountNumber: t.accountNumber,
                            chunk: 25,
                            languageId: o
                        };
                        return s.a.createElement(g.a, {
                            pageName: "deals",
                            emptyDescr: !0
                        }, s.a.createElement("div", {
                            className: "deals-wrapper"
                        }, i && s.a.createElement(m.a, null), s.a.createElement(h.a, {
                            user: t
                        }), s.a.createElement(f.a, d)))
                    }
                }]),
                t
        }(i.Component);
    v.propTypes = {
        initContractsAction: u.a.func.isRequired,
        getContractsAction: u.a.func.isRequired,
        contracts: u.a.object.isRequired,
        user: u.a.object.isRequired,
        languageId: u.a.number.isRequired
    };
    var b = function (e) {
        return {
            user: e.application.get("user"),
            contracts: e.reporting.get("contracts"),
            languageId: e.application.get("languageId")
        }
    },
        _ = function (e) {
            return Object(l.bindActionCreators)({
                getContractsAction: p.a,
                initContractsAction: p.b
            }, e)
        };
    t.a = Object(d.b)(b, _)(v)
}