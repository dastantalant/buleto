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
        l = n(3),
        c = n(152),
        u = n.n(c),
        d = n(709),
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
        h = Object(l.e)({
            restriction_agreement: {
                id: "opex.restriction.long_text",
                defaultMessage: "\u0414\u0430\u043d\u043d\u0430\u044f \u043c\u0435\u0440\u0430 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438 \u043f\u0440\u0438\u0437\u0432\u0430\u043d\u0430 \u043c\u0438\u043d\u0438\u043c\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043c\u043e\u0448\u0435\u043d\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0441\u043e \u0441\u0442\u043e\u0440\u043e\u043d\u044b \u0442\u0440\u0435\u0442\u044c\u0438\u0445 \u043b\u0438\u0446. \n \u041a\u043e\u0433\u0434\u0430 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u0435 \u0447\u0435\u043a\u0430 Opex \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u2014 \u0432\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u043e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0442\u044c \u0447\u0435\u043a Opex, \u043b\u0438\u0431\u043e \u043f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u0438\u043c \u0442\u043e\u043b\u044c\u043a\u043e \u0441\u0432\u043e\u0439 \u0442\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u0441\u0447\u0451\u0442 (\u0434\u0440\u0443\u0433\u043e\u0439 \u043d\u043e\u043c\u0435\u0440 \u0441\u0447\u0451\u0442\u0430 \u043f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043d\u0435 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0441\u044f). \n  \u042d\u0442\u0438\u043c \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u0435\u043c \u0442\u0430\u043a\u0436\u0435 \u043c\u043e\u0436\u043d\u043e \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c (\u0432\u043a\u043b\u044e\u0447\u0430\u0442\u044c/\u0432\u044b\u043a\u043b\u044e\u0447\u0430\u0442\u044c) \u0432 \u043b\u044e\u0431\u043e\u0435 \u0432\u0440\u0435\u043c\u044f, \u043f\u043e\u043a\u0430 \u0447\u0435\u043a \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0439 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \xab\u0427\u0435\u043a\u0438 Opex\xbb."
            },
            restriction_agreement_link: {
                id: "opex.restriction.modal_link",
                defaultMessage: "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435"
            },
            restriction_title: {
                id: "opex.restriction.title",
                defaultMessage: "\u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u0435 \u0447\u0435\u043a\u0430 Opex"
            },
            restriction_ok: {
                id: "opex.restriction.ok",
                defaultMessage: "\u041f\u043e\u043d\u044f\u0442\u043d\u043e"
            }
        }),
        f = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        isOpen: !1
                    },
                    a.closeModal = function (e) {
                        e.stopPropagation(),
                            a.setState({
                                isOpen: !1
                            })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                p(t, [{
                    key: "render",
                    value: function () {
                        var e = this;
                        return s.a.createElement("div", null, s.a.createElement("span", {
                            onClick: function () {
                                return e.setState({
                                    isOpen: !0
                                })
                            }
                        }, s.a.createElement(l.a, h.restriction_agreement_link)), this.state.isOpen && s.a.createElement(d.a, null, s.a.createElement("div", {
                            className: "modal-overlay",
                            style: {
                                zIndex: 998
                            }
                        }, s.a.createElement("div", {
                            className: "modal-info"
                        }, s.a.createElement("div", {
                            className: "modal-info-head"
                        }, s.a.createElement("h4", null, s.a.createElement(l.b, h.restriction_title)), s.a.createElement("div", {
                            className: "modal-info-head-close",
                            onClick: this.closeModal
                        }, s.a.createElement("img", {
                            src: u.a,
                            alt: ""
                        }))), s.a.createElement("div", {
                            className: "modal-info-body"
                        }, s.a.createElement("p", null, s.a.createElement(l.a, h.restriction_agreement)), s.a.createElement("button", {
                            onClick: this.closeModal
                        }, s.a.createElement(l.b, h.restriction_ok)))))))
                    }
                }]),
                t
        }(i.Component);
    t.a = f
}