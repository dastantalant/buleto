function(e, t, n) {
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
        l = n(6),
        c = n(3),
        u = n(727),
        d = n(7),
        p = n(728),
        h = n.n(p),
        f = n(729),
        m = n.n(f),
        g = n(730),
        y = n.n(g),
        v = n(731),
        b = n.n(v),
        _ = n(31),
        w = n(149),
        x = n(109),
        E = n(275),
        k = n(278),
        S = n.n(k),
        O = n(732),
        C = n.n(O),
        T = n(733),
        M = n.n(T),
        A = function() {
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
        P = function(e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.onClick = function(e) {
                        return function() {
                            a.props.changeBetAmount(e)
                        }
                    },
                    a.onClear = function() {
                        a.props.clearCouponAction()
                    },
                    a.onPrevClick = function() {
                        a.props.repeatNavigateAction({
                            direction: "prev"
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                A(t, [{
                    key: "render",
                    value: function() {
                        var e = this,
                            t = this.props,
                            n = t.config,
                            r = t.amount,
                            o = t.balance,
                            a = t.couponAmount,
                            i = t.lastBet,
                            l = t.coupon,
                            c = t.status,
                            u = t.repeatArray,
                            p = t.repeatIndex,
                            f = t.toggleGraph,
                            g = t.contractReceived,
                            v = t.wonAmount,
                            x = t.intl,
                            k = t.toggleMix,
                            O = t.mixMode,
                            T = t.toggleModal,
                            A = !g || c !== _.c && c !== _.d ? 0 : v,
                            P = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                            N = o.balance,
                            j = i.reduce(function(e, t) {
                                return e + t.amount
                            }, 0),
                            D = j / w.a,
                            R = D <= N && i.size > 0 && c === _.e && 0 === l.size,
                            I = c === _.e && l.size > 0,
                            L = u.length > 0,
                            B = L && p - 1 >= 0,
                            F = N < 10,
                            q = F ? C.a : M.a;
                        return s.a.createElement(s.a.Fragment, null, s.a.createElement("div", {
                            className: "graph-icon",
                            onClick: f
                        }, s.a.createElement("img", {
                            src: h.a,
                            alt: ""
                        })), s.a.createElement("div", {
                            className: "graph-icon reveal",
                            onClick: function() {
                                return k(!O)
                            }
                        }, s.a.createElement("img", {
                            src: S.a,
                            alt: ""
                        })), R && s.a.createElement("div", {
                            className: "control-btn refresh",
                            onClick: function() {
                                return e.props.repeatCouponAction(D)
                            }
                        }, s.a.createElement("img", {
                            src: y.a,
                            alt: ""
                        })), I && B && s.a.createElement("div", {
                            className: "control-btn undo",
                            onClick: this.onPrevClick
                        }, s.a.createElement("img", {
                            src: b.a,
                            alt: ""
                        })), I && !B && s.a.createElement("div", {
                            className: "control-btn cancel",
                            onClick: this.onClear
                        }, s.a.createElement("img", {
                            src: m.a,
                            alt: ""
                        })), s.a.createElement("div", {
                            className: "amounts"
                        }, F && s.a.createElement(s.a.Fragment, null, P ? s.a.createElement("button", {
                            className: "dep-port-btn " + (F ? "dep-port-btn_active" : ""),
                            onClick: function() {
                                return T(!0)
                            }
                        }, s.a.createElement("img", {
                            src: q,
                            alt: ""
                        }), " ", x.formatMessage({
                            id: "traderoom.recharge"
                        })) : s.a.createElement(d.a, {
                            className: "dep-port-btn " + (F ? "dep-port-btn_active" : ""),
                            to: "/payments?opex"
                        }, s.a.createElement("img", {
                            src: q,
                            alt: ""
                        }), " ", x.formatMessage({
                            id: "traderoom.recharge"
                        }))), F && s.a.createElement("div", {
                            className: "not-money-alert not-money-alert_visible"
                        }, s.a.createElement("div", null, x.formatMessage({
                            id: "traderoom.insufficient_balance"
                        }))), s.a.createElement("span", {
                            className: "title"
                        }, x.formatMessage({
                            id: "controls.summ"
                        })), s.a.createElement("div", {
                            className: "amount deposit-btn " + (F ? "deposit-btn_active" : ""),
                            onClick: function() {
                                return T(!0)
                            }
                        }, s.a.createElement("img", {
                            src: q,
                            alt: ""
                        })), n.amountLimit.map(function(t) {
                            return s.a.createElement("div", {
                                key: t,
                                onClick: e.onClick(t),
                                className: "amount " + (r === t ? "active" : "")
                            }, t)
                        })), s.a.createElement(E.a, {
                            title: x.formatMessage({
                                id: "controls.income"
                            }),
                            value: A
                        }), s.a.createElement(E.a, {
                            title: x.formatMessage({
                                id: "controls.contract2"
                            }),
                            value: a
                        }), s.a.createElement(E.a, {
                            title: x.formatMessage({
                                id: "controls.balance"
                            }),
                            value: N,
                            style: {
                                cursor: "pointer"
                            },
                            isHidable: !0
                        }))
                    }
                }]),
                t
        }(i.Component),
        N = function(e) {
            var t = 0,
                n = e.traderoom.getIn(["round", "result"]),
                r = n ? 37 === n.c ? 0 : n.c : null;
            return n && e.traderoom.getIn(["coupon", "prev", r]) && (t = e.traderoom.getIn(["coupon", "prev", r]).amount), {
                balance: e.application.get("balance"),
                couponAmount: e.application.get("balance").couponAmount,
                amount: e.traderoom.get("amount"),
                status: e.traderoom.getIn(["round", "status"]),
                coupon: e.traderoom.getIn(["coupon", "actual"]),
                config: e.traderoom.get("config"),
                contractReceived: e.traderoom.getIn(["round", "contractReceived"]),
                lastBet: e.traderoom.getIn(["coupon", "repeat"]),
                repeatArray: e.traderoom.getIn(["coupon", "repeatArray"]),
                repeatIndex: e.traderoom.getIn(["coupon", "repeatIndex"]),
                wonAmount: t
            }
        };
    t.a = Object(l.b)(N, {
        changeBetAmount: u.a,
        clearCouponAction: x.b,
        repeatCouponAction: x.c,
        repeatNavigateAction: x.d
    })(Object(c.f)(P))
}