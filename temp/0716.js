function(e, t, n) {
    "use strict";

    function r(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    function o(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== typeof t && "function" !== typeof t ? e : t
    }

    function i(e, t) {
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
    var s = n(0),
        l = n.n(s),
        c = n(6),
        u = n(3),
        d = n(20),
        p = n.n(d),
        h = n(716),
        f = n.n(h),
        m = n(717),
        g = n.n(m),
        y = n(272),
        v = n.n(y),
        b = n(273),
        _ = n.n(b),
        w = n(75),
        x = n(161),
        E = n(274),
        k = n(109),
        S = n(718),
        O = n(110),
        C = n(31),
        T = n(719),
        M = n(723),
        A = n(725),
        P = n(726),
        N = n(276),
        j = n(734),
        D = n(162),
        R = n(277),
        I = n(738),
        L = (n.n(I),
            n(278)),
        B = n.n(L),
        F = n(739),
        q = n.n(F),
        z = n(740),
        W = n.n(z),
        U = n(741),
        H = n(279),
        Y = function() {
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
        G = function(e) {
            function t() {
                var e, n, r, i;
                o(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = r = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    r.state = {
                        graphShown: !1,
                        sideMenuActive: !1,
                        mixMode: !1,
                        isOpenDepositModal: !1,
                        animated: 2
                    },
                    r.componentDidMount = function() {
                        document.body.classList.add("dark", "hide_jivo"),
                            document.addEventListener("dblclick", r.stopPropagation)
                    },
                    r.componentWillUnmount = function() {
                        document.body.classList.remove("dark", "hide_jivo"),
                            document.removeEventListener("dblclick", r.stopPropagation)
                    },
                    r.stopPropagation = function(e) {
                        e.stopPropagation()
                    },
                    r.onClick = function(e) {
                        for (var t = r.props, n = t.amount, o = t.balance, a = t.coupon, i = t.status, s = t.couponAmount, l = t.config, c = [], u = 0; u < e.length; u++)
                            c.push({
                                cell: e[u]
                            });
                        Object(O.a)(a, c.length, e, n, o, i, s, l) && r.props.addToCouponFactors({
                            factors: c,
                            amount: n
                        })
                    },
                    r.toggleGraph = function(e) {
                        return r.setState(function(t) {
                            return Object.assign({}, t, {
                                graphShown: e,
                                mixMode: !1,
                                animated: t.animated - 1
                            })
                        })
                    },
                    r.toggleMix = function(e) {
                        return r.setState({
                            mixMode: e
                        })
                    },
                    r.toggleModal = function(e) {
                        return r.setState({
                            isOpenDepositModal: e
                        })
                    },
                    r.toggleMenu = function() {
                        return r.setState({
                            sideMenuActive: !r.state.sideMenuActive
                        })
                    },
                    r.getActiveFactor = function(e, t) {
                        return t ? Object(I.findIndex)(e, function(e) {
                            return t.v >= e.vf && t.v < e.vt
                        }) : -1
                    },
                    i = n,
                    a(r, i)
            }
            return i(t, e),
                Y(t, [{
                    key: "render",
                    value: function() {
                        var e = this,
                            t = this.state,
                            n = t.graphShown,
                            o = t.sideMenuActive,
                            a = t.mixMode,
                            i = t.isOpenDepositModal,
                            s = t.animated,
                            c = this.props,
                            u = c.user,
                            d = c.languageId,
                            h = c.pair,
                            m = void 0 === h ? {} : h,
                            y = c.round,
                            b = c.factors,
                            w = c.isInCouponZero,
                            E = c.coupon,
                            k = c.prevCoupon,
                            O = c.results,
                            I = c.showZeroFactorAmount,
                            L = c.status,
                            F = [],
                            z = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                            H = window.innerHeight <= window.innerWidth;
                        !H && a && this.setState({
                            mixMode: !1
                        });
                        for (var Y = m.Name, G = this.getActiveFactor(y.get("factors"), b[b.length - 1]), K = 1; K <= 36; K++)
                            ! function(e) {
                                var t = y.get("factors").find(function(t) {
                                    return t.c === e
                                });
                                t && F.push(l.a.createElement(M.a, Object.assign({
                                    key: e
                                }, {
                                    i: e,
                                    factor: t
                                }, {
                                    activeFactor: G
                                })))
                            }(K);
                        var V = l.a.createElement("div", {
                                className: "trade-ver"
                            }, "ver ", S.a),
                            X = b.length > 0 ? l.a.createElement(j.a, {
                                toggleGraph: function() {
                                    return e.toggleGraph(!1)
                                },
                                round: y,
                                factors: b,
                                coupon: E,
                                prevCoupon: k
                            }) : null,
                            J = l.a.createElement("div", {
                                className: "controls"
                            }, l.a.createElement(P.a, {
                                graphShown: n,
                                toggleGraph: this.toggleGraph,
                                mixMode: a,
                                toggleMix: this.toggleMix,
                                toggleModal: this.toggleModal
                            }), l.a.createElement(N.a, {
                                size: 100
                            })),
                            Z = l.a.createElement("div", {
                                className: p()("grid", {
                                    blocked: L !== C.e
                                })
                            }, l.a.createElement("div", {
                                className: "cell div0 " + (w ? "is-in-coupon" : "") + " " + ([3, 4, 5].some(function(e) {
                                    return e === L
                                }) && "dis-cell")
                            }, l.a.createElement("div", {
                                className: "zero-images",
                                onClick: function() {
                                    return e.onClick([0])
                                }
                            }, l.a.createElement("img", {
                                src: v.a,
                                alt: ""
                            }), l.a.createElement("img", {
                                src: _.a,
                                alt: ""
                            })), I > 0 && l.a.createElement("span", {
                                className: "cell__stake cell__stake--zero"
                            }, I), l.a.createElement("div", {
                                className: "choose-btn__zero"
                            }, l.a.createElement("button", {
                                className: "choose-btn",
                                onClick: function() {
                                    return e.onClick([0, 1, 2, 3])
                                }
                            }), l.a.createElement("button", {
                                className: "choose-btn",
                                onClick: function() {
                                    return e.onClick([0, 1])
                                }
                            }), l.a.createElement("button", {
                                className: "choose-btn",
                                onClick: function() {
                                    return e.onClick([0, 1, 2])
                                }
                            }), l.a.createElement("button", {
                                className: "choose-btn",
                                onClick: function() {
                                    return e.onClick([0, 2])
                                }
                            }), l.a.createElement("button", {
                                className: "choose-btn",
                                onClick: function() {
                                    return e.onClick([0, 2, 3])
                                }
                            }), l.a.createElement("button", {
                                className: "choose-btn",
                                onClick: function() {
                                    return e.onClick([0, 3])
                                }
                            }), l.a.createElement("button", {
                                className: "choose-btn",
                                onClick: function() {
                                    return e.onClick([0, 1, 2, 3])
                                }
                            }))), F, l.a.createElement(A.a, null));
                        return z ? l.a.createElement("div", {
                            className: "traderoom-wrapper"
                        }, i && l.a.createElement("div", {
                            className: "deposit-wrapper"
                        }, l.a.createElement("div", {
                            className: "dep"
                        }, l.a.createElement("button", {
                            className: "close-btn",
                            onClick: function() {
                                return e.toggleModal(!i)
                            }
                        }, l.a.createElement("img", {
                            src: q.a,
                            alt: ""
                        })), l.a.createElement(U.a, {
                            toggleModal: this.toggleModal
                        }))), l.a.createElement("section", {
                            className: "traderoom-container " + (H ? "landscape" : "portrait") + " " + (n ? "graph-shown" : "") + " " + (H && a ? "mix-mode" : "")
                        }, n && l.a.createElement("img", {
                            src: W.a,
                            alt: "",
                            className: "rotation-icon " + (s > 0 ? "rotation-icon_anim" : "")
                        }), o && l.a.createElement(D.a, {
                            toggleMenu: this.toggleMenu,
                            user: u,
                            loseAuthAction: this.props.loseAuthAction,
                            getTradologicAction: this.props.getTradologicAction,
                            changeLocaleAction: x.a,
                            languageId: d
                        }), l.a.createElement(T.a, {
                            pairName: Y,
                            isMobile: z,
                            toggleMenu: this.toggleMenu
                        }), H && a && l.a.createElement(l.a.Fragment, null, l.a.createElement("div", {
                            className: "mix-mode__wrapper"
                        }, X, J), Z), !a && (n ? l.a.createElement(l.a.Fragment, null, X, l.a.createElement("div", {
                            className: "graph-controls"
                        }, l.a.createElement(R.a, {
                            results: O
                        }), l.a.createElement("div", {
                            className: "graph-icon",
                            onClick: function() {
                                return e.toggleGraph(!1)
                            }
                        }, l.a.createElement("img", {
                            src: g.a,
                            alt: ""
                        })), H && l.a.createElement("div", {
                            className: "graph-icon reveal",
                            onClick: function() {
                                return e.toggleMix(!a)
                            }
                        }, l.a.createElement("img", {
                            src: B.a,
                            alt: ""
                        })))) : l.a.createElement("div", {
                            className: "traderoom",
                            style: n ? {
                                padding: "60px 0 0 0"
                            } : {}
                        }, Z, J)), V)) : l.a.createElement("section", {
                            className: "traderoom-container desktop portrait"
                        }, l.a.createElement("div", {
                            className: "pair-name"
                        }, l.a.createElement("img", {
                            src: f.a,
                            alt: Y
                        }), Y), l.a.createElement(N.a, {
                            size: 150
                        }), l.a.createElement("div", {
                            className: "desktop-graph"
                        }, X, l.a.createElement(R.a, {
                            results: [].concat(r(O)).reverse()
                        })), l.a.createElement("div", {
                            className: "traderoom"
                        }, Z, J), V)
                    }
                }]),
                t
        }(s.Component),
        K = function(e) {
            var t = e.traderoom.getIn(["coupon", "actual"]).has(0),
                n = e.traderoom.get("pairs") || [],
                r = n.find(function(e) {
                    return "Primecoin(XPM)/RUB" === e.Name
                }),
                o = 0;
            return t && (o = Object(O.b)(e.traderoom.getIn(["coupon", "actual", 0]).amount / 36, 2)), {
                couponAmount: e.application.get("balance").couponAmount,
                config: e.traderoom.get("config"),
                user: e.application.get("user"),
                languageId: e.application.get("languageId"),
                isInCouponZero: t,
                amount: e.traderoom.get("amount"),
                status: e.traderoom.getIn(["round", "status"]),
                round: e.traderoom.get("round"),
                results: e.traderoom.get("lastRounds"),
                factors: e.traderoom.get("factors"),
                balance: e.application.get("balance").balance,
                trainingBalance: e.application.get("balance").trainingBalance,
                time: e.application.get("time"),
                coupon: e.traderoom.getIn(["coupon", "actual"]),
                prevCoupon: e.traderoom.getIn(["coupon", "prev"]),
                pair: r,
                showZeroFactorAmount: o
            }
        };
    t.a = Object(c.b)(K, {
        addToCouponFactors: k.a,
        loseAuthAction: w.b,
        getTradologicAction: E.a,
        changeLocaleAction: x.a
    })(Object(u.f)(Object(H.a)(G)))
}