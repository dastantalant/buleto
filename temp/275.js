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
        l = n(721),
        c = n.n(l),
        u = n(722),
        d = n.n(u),
        p = function () {
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
        h = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        show: !0
                    },
                    a.toggleShow = function () {
                        return a.setState({
                            show: !a.state.show
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.title,
                            n = e.value,
                            r = e.isHidable,
                            o = e.style,
                            a = void 0 === o ? {} : o,
                            i = this.state.show;
                        return s.a.createElement("div", {
                            style: a,
                            className: "info-block",
                            onClick: r ? this.toggleShow : null
                        }, s.a.createElement("div", {
                            className: "info-block__title"
                        }, t, r && s.a.createElement("img", {
                            src: i ? c.a : d.a,
                            alt: ""
                        })), s.a.createElement("div", {
                            className: "info-block__value"
                        }, i ? n : "", "\xa0"))
                    }
                }]),
                t
        }(s.a.Component);
    t.a = h
}