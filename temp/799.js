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
        l = n(2),
        c = n.n(l),
        u = n(40),
        d = n.n(u),
        p = n(292),
        h = n(293),
        f = n.n(h),
        m = n(72),
        g = n(3),
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
        v = Object(g.e)({
            deals_error: {
                id: "deals.error",
                defaultMessage: "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u044f\u044f \u043e\u0448\u0438\u0431\u043a\u0430 \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u0437\u0430\u043f\u0440\u043e\u0441\u0430. \u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u0437\u0436\u0435."
            },
            deals_contract_no: {
                id: "deals.contract_no",
                defaultMessage: "\u2116 \u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u0430"
            },
            deals_closing: {
                id: "deals.closing",
                defaultMessage: "\u0417\u0430\u043a\u0440\u044b\u0442\u0438\u0435"
            },
            deals_deal: {
                id: "deals.deal",
                defaultMessage: "\u0421\u0434\u0435\u043b\u043a\u0430"
            },
            deals_income: {
                id: "deals.income",
                defaultMessage: "\u0414\u043e\u0445\u043e\u0434"
            },
            deals_nodata: {
                id: "deals.nodata",
                defaultMessage: "\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445 \u0437\u0430 \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0439 \u043f\u0435\u0440\u0438\u043e\u0434"
            }
        }),
        b = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        startDate: d()().startOf("month"),
                        endDate: d()().endOf("day")
                    },
                    a.onPageClick = function (e) {
                        a.props.handlePageChange(e)
                    },
                    a.handleStartDateChange = function (e) {
                        a.setState({
                            startDate: e
                        })
                    },
                    a.handleEndDateChange = function (e) {
                        a.setState({
                            endDate: e
                        })
                    },
                    a.handleSubmit = function () {
                        var e = a.state,
                            t = e.startDate,
                            n = e.endDate,
                            r = d()(t).format("YYYY-MM-DDTHH:mm"),
                            o = d()(n).format("YYYY-MM-DDTHH:mm");
                        a.props.getContractsAction({
                            dateFrom: r,
                            dateTo: o
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                y(t, [{
                    key: "componentDidMount",
                    value: function () {
                        var e = this.state,
                            t = e.startDate,
                            n = e.endDate,
                            r = d()(t).format("YYYY-MM-DDTHH:mm"),
                            o = d()(n).format("YYYY-MM-DDTHH:mm");
                        this.props.getContractsAction({
                            dateFrom: r,
                            dateTo: o
                        })
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function (e) {
                        var t = this.state,
                            n = t.startDate,
                            r = t.endDate;
                        if (e.accountNumber !== this.props.accountNumber && void 0 !== e.accountNumber) {
                            var o = d()(n).format("YYYY-MM-DDTHH:mm"),
                                a = d()(r).format("YYYY-MM-DDTHH:mm");
                            this.props.getContractsAction({
                                dateFrom: o,
                                dateTo: a
                            })
                        }
                    }
                }, {
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.data,
                            n = e.fail,
                            r = e.totalItems,
                            o = e.activePage,
                            a = e.chunk,
                            i = e.languageId,
                            l = this.state,
                            c = l.startDate,
                            u = l.endDate,
                            h = {
                                handleStartDateChange: this.handleStartDateChange,
                                handleEndDateChange: this.handleEndDateChange,
                                submitHandler: this.handleSubmit,
                                startDate: c,
                                endDate: u,
                                languageId: i
                            };
                        return s.a.createElement("div", {
                            className: "deals"
                        }, s.a.createElement(p.a, h), n ? s.a.createElement("div", {
                            className: "statistics__server-error"
                        }, s.a.createElement(g.b, v.deals_error)) : s.a.createElement("div", {
                            className: "statistics-wrapper"
                        }, s.a.createElement("div", {
                            className: "statistics statistics--deals"
                        }, s.a.createElement("div", {
                            className: "statistics__block statistics__block--head"
                        }, s.a.createElement("div", {
                            className: "statistics__row"
                        }, s.a.createElement("div", {
                            className: "statistics__box"
                        }, s.a.createElement(g.b, v.deals_contract_no)), s.a.createElement("div", {
                            className: "statistics__box statistics__box--closing"
                        }, s.a.createElement(g.b, v.deals_closing)), s.a.createElement("div", {
                            className: "statistics__box statistics__box--deal"
                        }, s.a.createElement(g.b, v.deals_deal)), s.a.createElement("div", {
                            className: "statistics__box"
                        }, s.a.createElement(g.b, v.deals_income)))), s.a.createElement("div", {
                            className: "statistics__block statistics__block--body"
                        }, 0 === t.length && s.a.createElement("p", {
                            className: "statistics__no-data"
                        }, s.a.createElement(g.b, v.deals_nodata)), t && t.map(function (e, t) {
                            return s.a.createElement("div", {
                                className: "statistics__row",
                                key: t
                            }, s.a.createElement("div", {
                                className: "statistics__box statistics__box--assets"
                            }, s.a.createElement("span", null, e.ContractId)), s.a.createElement("div", {
                                className: "statistics__box statistics__box--closing"
                            }, s.a.createElement("span", null, d()(e.ContractReceptionDate).format("YYYY.MM.DD HH:mm"))), s.a.createElement("div", {
                                className: "statistics__box statistics__box--deal"
                            }, Object(m.a)(e.ContractAmount)), s.a.createElement("div", {
                                className: "statistics__box statistics__box--income"
                            }, Object(m.a)(e.WonAmount)))
                        })))), r > a && s.a.createElement("div", {
                            className: "st-pagination"
                        }, s.a.createElement(f.a, {
                            activePage: o,
                            itemsCountPerPage: a,
                            totalItemsCount: r,
                            pageRangeDisplayed: 3,
                            onChange: this.onPageClick,
                            innerClass: "st-pagination__list",
                            itemClass: "st-pagination__item",
                            itemClassPrev: "st-pagination__arrow st-pagination__arrow--prev",
                            itemClassNext: "st-pagination__arrow st-pagination__arrow--next",
                            linkClass: "st-pagination__link",
                            hideFirstLastPages: !0,
                            prevPageText: "",
                            nextPageText: ""
                        })))
                    }
                }]),
                t
        }(i.Component);
    b.propTypes = {
        handlePageChange: c.a.func.isRequired,
        getContractsAction: c.a.func.isRequired,
        totalItems: c.a.number.isRequired,
        activePage: c.a.number.isRequired,
        data: c.a.array.isRequired,
        fail: c.a.bool.isRequired,
        chunk: c.a.number.isRequired,
        languageId: c.a.number.isRequired
    },
        t.a = b
}