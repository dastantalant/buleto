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

    function i(e) {
        var t = e.className,
            n = e.onClick;
        return l.a.createElement("div", {
            className: t,
            onClick: n
        })
    }
    var s = n(0),
        l = n.n(s),
        c = n(620),
        u = n.n(c),
        d = n(621),
        p = n.n(d),
        h = n(622),
        f = n.n(h),
        m = n(3),
        g = n(623),
        y = n.n(g),
        v = n(642),
        b = (n.n(v),
            n(643)),
        _ = (n.n(b),
            function () {
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
            }()),
        w = Object(m.e)({
            landing_how_it_works_title: {
                id: "landing.how_it_works.title",
                defaultMessage: "\u041a\u0430\u043a \u044d\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442?"
            },
            landing_how_it_works_col_1_title: {
                id: "landing.how_it_works.col_1_title",
                defaultMessage: "\u041f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0431\u0430\u043b\u0430\u043d\u0441"
            },
            landing_how_it_works_col_1_text: {
                id: "landing.how_it_works.col_1_text",
                defaultMessage: "\u041f\u0440\u043e\u0439\u0434\u0438\u0442\u0435 \u0431\u044b\u0441\u0442\u0440\u0443\u044e \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044e \u0438 \u043f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0431\u0430\u043b\u0430\u043d\u0441 \u0442\u043e\u0440\u0433\u043e\u0432\u043e\u0433\u043e \u0441\u0447\u0435\u0442\u0430 \u0443\u0434\u043e\u0431\u043d\u044b\u043c \u0434\u043b\u044f \u0432\u0430\u0441 \u0441\u043f\u043e\u0441\u043e\u0431\u043e\u043c"
            },
            landing_how_it_works_col_2_title: {
                id: "landing.how_it_works.col_2_title",
                defaultMessage: "\u0421\u043e\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0441\u0434\u0435\u043b\u043a\u0443"
            },
            landing_how_it_works_col_2_text: {
                id: "landing.how_it_works.col_2_text",
                defaultMessage: "\u0422\u043e\u0440\u0433\u0443\u0439\u0442\u0435 \u043b\u044e\u0431\u0438\u043c\u044b\u043c\u0438 \u0430\u043a\u0442\u0438\u0432\u0430\u043c\u0438, \u043f\u043e\u043b\u0443\u0447\u0430\u0439\u0442\u0435 \u043f\u0440\u0438\u0431\u044b\u043b\u044c \u0434\u043e 90% \u043e\u0442 30 \u0441\u0435\u043a\u0443\u043d\u0434 \u0441 \u043c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u0432\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u043c\u0438 \u043e\u0442 50 \u0423.E."
            },
            landing_how_it_works_col_3_title: {
                id: "landing.how_it_works.col_3_title",
                defaultMessage: "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u043f\u0440\u0438\u0431\u044b\u043b\u044c"
            },
            landing_how_it_works_col_3_text: {
                id: "landing.how_it_works.col_3_text",
                defaultMessage: "\u041c\u043e\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u044b\u0439 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u0432 \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0445 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u0430\u0445"
            }
        }),
        x = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.next = function () {
                        a.slider.slickNext()
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                _(t, [{
                    key: "render",
                    value: function () {
                        var e = this,
                            t = {
                                dots: !0,
                                infinite: !0,
                                speed: 500,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                appendDots: function (e) {
                                    return l.a.createElement("div", {
                                        className: "dots"
                                    }, e)
                                },
                                customPaging: function () {
                                    return l.a.createElement("div", {
                                        className: "carousel__dot"
                                    })
                                }
                            };
                        return l.a.createElement("div", {
                            className: "how_it_works"
                        }, l.a.createElement("h2", null, l.a.createElement(m.b, w.landing_how_it_works_title)), l.a.createElement("div", {
                            className: "how_it_works-list"
                        }, l.a.createElement("div", {
                            className: "how_it_works-item"
                        }, l.a.createElement("div", {
                            className: "how_it_works-item-image"
                        }, l.a.createElement("img", {
                            className: "how_it_works-item-image-content",
                            src: u.a,
                            alt: ""
                        })), l.a.createElement("div", {
                            className: "how_it_works-item-next"
                        }), l.a.createElement("div", {
                            className: "how_it_works-item-content"
                        }, l.a.createElement("span", {
                            className: "how_it_works-item-content-title"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_1_title)), l.a.createElement("hr", {
                            className: "how_it_works-item-content-line"
                        }), l.a.createElement("p", {
                            className: "how_it_works-item-content-text"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_1_text)))), l.a.createElement("div", {
                            className: "how_it_works-item"
                        }, l.a.createElement("div", {
                            className: "how_it_works-item-image"
                        }, l.a.createElement("img", {
                            className: "how_it_works-item-image-content",
                            src: p.a,
                            alt: ""
                        })), l.a.createElement("div", {
                            className: "how_it_works-item-next"
                        }), l.a.createElement("div", {
                            className: "how_it_works-item-content"
                        }, l.a.createElement("span", {
                            className: "how_it_works-item-content-title"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_2_title)), l.a.createElement("hr", {
                            className: "how_it_works-item-content-line"
                        }), l.a.createElement("p", {
                            className: "how_it_works-item-content-text"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_2_text)))), l.a.createElement("div", {
                            className: "how_it_works-item"
                        }, l.a.createElement("div", {
                            className: "how_it_works-item-image"
                        }, l.a.createElement("img", {
                            className: "how_it_works-item-image-content",
                            src: f.a,
                            alt: ""
                        })), l.a.createElement("div", {
                            className: "how_it_works-item-content"
                        }, l.a.createElement("span", {
                            className: "how_it_works-item-content-title"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_3_title)), l.a.createElement("hr", {
                            className: "how_it_works-item-content-line"
                        }), l.a.createElement("p", {
                            className: "how_it_works-item-content-text"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_3_text))))), l.a.createElement(y.a, Object.assign({
                            className: "carousel",
                            ref: function (t) {
                                return e.slider = t
                            }
                        }, t), l.a.createElement("div", {
                            className: "slide"
                        }, l.a.createElement("div", {
                            className: "slide-image"
                        }, l.a.createElement("img", {
                            className: "slide-image-content",
                            src: u.a,
                            alt: ""
                        })), l.a.createElement("div", {
                            className: "slide-content"
                        }, l.a.createElement(i, {
                            className: "slide-content-next",
                            onClick: this.next
                        }), l.a.createElement("span", {
                            className: "slide-content-title"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_1_title)), l.a.createElement("hr", {
                            className: "slide-content-line"
                        }), l.a.createElement("p", {
                            className: "slide-content-text"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_1_text)))), l.a.createElement("div", {
                            className: "slide"
                        }, l.a.createElement("div", {
                            className: "slide-image"
                        }, l.a.createElement("img", {
                            className: "slide-image-content",
                            src: p.a,
                            alt: ""
                        })), l.a.createElement("div", {
                            className: "slide-content"
                        }, l.a.createElement(i, {
                            className: "slide-content-next",
                            onClick: this.next
                        }), l.a.createElement("span", {
                            className: "slide-content-title"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_2_title)), l.a.createElement("hr", {
                            className: "slide-content-line"
                        }), l.a.createElement("p", {
                            className: "slide-content-text"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_2_text)))), l.a.createElement("div", {
                            className: "slide"
                        }, l.a.createElement("div", {
                            className: "slide-image"
                        }, l.a.createElement("img", {
                            className: "slide-image-content",
                            src: f.a,
                            alt: ""
                        })), l.a.createElement("div", {
                            className: "slide-content"
                        }, l.a.createElement(i, {
                            className: "slide-content-next",
                            onClick: this.next
                        }), l.a.createElement("span", {
                            className: "slide-content-title"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_3_title)), l.a.createElement("hr", {
                            className: "slide-content-line"
                        }), l.a.createElement("p", {
                            className: "slide-content-text"
                        }, l.a.createElement(m.b, w.landing_how_it_works_col_3_text))))))
                    }
                }]),
                t
        }(s.Component);
    t.a = x
}