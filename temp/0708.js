function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
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
        c = n(2),
        u = n.n(c),
        d = n(73),
        p = n(19),
        h = n(105),
        f = n.n(h),
        m = n(3),
        g = n(39),
        y = n(708),
        v = function() {
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
        b = Object(m.e)({
            opex_restriction: {
                id: "withdraw.opex_restriction",
                defaultMessage: "\u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u044f \u0447\u0435\u043a\u0430 \u041e\u0440\u0435\u0445"
            },
            withdraw_withdraw_issue: {
                id: "withdraw.withdraw_issue",
                defaultMessage: "\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432"
            },
            withdraw_total: {
                id: "withdraw.total",
                defaultMessage: "\u0412\u0441\u0435\u0433\u043e"
            },
            withdraw_available: {
                id: "withdraw.available",
                defaultMessage: "\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e"
            },
            withdraw_specify_amount: {
                id: "withdraw.specify_amount",
                defaultMessage: "\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u0434\u043b\u044f \u0432\u044b\u0432\u043e\u0434\u0430"
            },
            withdraw_not_enough_funds: {
                id: "withdraw.not_enough_funds",
                defaultMessage: "\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043d\u0430 \u0431\u0430\u043b\u0430\u043d\u0441\u0435"
            },
            withdraw_create_issue: {
                id: "withdraw.create_issue",
                defaultMessage: "\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443"
            },
            locations: {
                id: "withdraw.terminals_location",
                defaultMessage: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432"
            },
            locations_hide: {
                id: "withdraw.terminals_location_hide",
                defaultMessage: "\u0421\u043a\u0440\u044b\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432"
            },
            locations_cashdesks: {
                id: "withdraw.cashdesks_location",
                defaultMessage: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u043a\u0430\u0441\u0441"
            },
            locations_cashdesks_hide: {
                id: "withdraw.cashdesks_location_hide",
                defaultMessage: "\u0421\u043a\u0440\u044b\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u043a\u0430\u0441\u0441"
            },
            withdraw_get_funds: {
                id: "withdraw.get_funds",
                defaultMessage: "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u0441\u0432\u043e\u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430, \u043f\u043e\u0441\u043b\u0435 \u0447\u0435\u0433\u043e \u0412\u044b \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0437\u0430\u044f\u0432\u043a\u0443."
            },
            withdraw_sum: {
                id: "withdraw.sum",
                defaultMessage: "\u0421\u0443\u043c\u043c\u0430"
            },
            withdraw_requisite: {
                id: "training.phone",
                defaultMessage: "\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430"
            },
            withdraw_issue_active: {
                id: "withdraw.issue_active",
                defaultMessage: "\u0423 \u0412\u0430\u0441 \u0438\u043c\u0435\u0435\u0442\u0441\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u0441\u0440\u0435\u0434\u0441\u0442\u0432"
            },
            withdraw_error: {
                id: "withdraw.error",
                defaultMessage: "\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435!"
            },
            withdraw_trading: {
                id: "withdraw.trading",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u0441\u0447\u0451\u0442"
            },
            withdraw_min: {
                id: "withdraw.min_200",
                defaultMessage: "\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0443\u043c\u043c\u0430 200"
            },
            withdraw_max: {
                id: "withdraw.max_2000000",
                defaultMessage: "\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0443\u043c\u043c\u0430 50 000"
            },
            withdraw_divide: {
                id: "withdraw.divide",
                defaultMessage: "\u0423\u043a\u0430\u0437\u044b\u0432\u0430\u0439\u0442\u0435 \u0441\u0443\u043c\u043c\u0443, \u043a\u0440\u0430\u0442\u043d\u0443\u044e 200 (200, 400, 600\u2026)"
            },
            withdraw_password_empty: {
                id: "profile.enter_pass",
                defaultMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043f\u0430\u0440\u043e\u043b\u044c"
            },
            withdraw_password: {
                id: "withdraw.withdraw_password_error",
                defaultMessage: "\u041f\u0430\u0440\u043e\u043b\u044c \u0443\u043a\u0430\u0437\u0430\u043d \u043d\u0435\u0432\u0435\u0440\u043d\u043e"
            },
            withdraw_opex_instruction: {
                id: "withdraw.opex_instruction",
                defaultMessage: "\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u0434\u043b\u044f \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u0421\u041c\u0421 \u0441 \u043d\u043e\u043c\u0435\u0440\u043e\u043c \u0447\u0435\u043a\u0430 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex."
            },
            withdraw_opex_instruction_link: {
                id: "withdraw.opex_instruction_link",
                defaultMessage: "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u044b\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043a\u0446\u0438\u0438"
            },
            deposit_opex_name: {
                id: "deposit.opex.name",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0435 \u0437\u0430\u043b\u044b Buleto"
            },
            deposit_opex_comission: {
                id: "deposit.opex.comission",
                defaultMessage: "\u041a\u043e\u043c\u0438\u0441\u0441\u0438\u044f \u2014 0"
            },
            deposit_opex_text_1: {
                id: "deposit.opex.text_1",
                defaultMessage: "\u0421 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b \xabOpex\xbb \u043c\u043e\u0436\u043d\u043e \u043f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u0442\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u0441\u0447\u0451\u0442, \u0430 \u0442\u0430\u043a\u0436\u0435 \u043e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0442\u044c \u043f\u0440\u0438\u0431\u044b\u043b\u044c \u0431\u0435\u0437 \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u0438! \u041a\u0443\u0440\u0441 \u043e\u0431\u043c\u0435\u043d\u0430 1 OPX = 1 \u043d\u0430\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0439 \u0432\u0430\u043b\u044e\u0442\u0435 <br/> <br/> Opex \u043c\u043e\u0436\u043d\u043e \u043a\u0443\u043f\u0438\u0442\u044c \u0438 \u043e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0442\u044c \u0434\u0432\u0443\u043c\u044f \u0441\u043f\u043e\u0441\u043e\u0431\u0430\u043c\u0438:"
            },
            deposit_opex_text_2: {
                id: "deposit.opex.text_2",
                defaultMessage: "<b>1. \u0412 \u043a\u0430\u0441\u0441\u0430\u0445 \xabUnipay\xbb </b> <br/><br/>\u041f\u043e\u043a\u0443\u043f\u043a\u0430 Opex<br/><br/>\u0412\u043d\u0435\u0441\u0438\u0442\u0435 \u0436\u0435\u043b\u0430\u0435\u043c\u0443\u044e \u0441\u0443\u043c\u043c\u0443 \u0438 \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043a\u0430\u0441\u0441\u0438\u0440\u0443 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0441\u043b\u0430\u043d\u043e \u0421\u041c\u0421 \u0441 \u0447\u0435\u043a\u043e\u043c \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex. \u0414\u0430\u043b\u0435\u0435 \u0432\u0432\u043e\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0447\u0435\u043a\u0430 \u043d\u0430 \u0441\u0430\u0439\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435 \u201c\u041f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c\u201d.<br/><br/>\u041e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0432\u0430\u043d\u0438\u0435 Opex<br/><br/>\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u044f\u0432\u043a\u0443 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u043d\u0430 \u0441\u0430\u0439\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435 \u201c\u0412\u044b\u0432\u0435\u0441\u0442\u0438\u201d. \u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0441\u043b\u0430\u043d\u043e \u0421\u041c\u0421 \u0441 \u0447\u0435\u043a\u043e\u043c Opex. \u0414\u0430\u043b\u0435\u0435 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u0438 \u043f\u0430\u0440\u043e\u043b\u044c \u0442\u043e\u0440\u0433\u043e\u0432\u043e\u0433\u043e \u0441\u0447\u0435\u0442\u0430. \u041d\u0430 \u043a\u0430\u0441\u0441\u0435 \u043f\u0440\u0435\u0434\u044a\u044f\u0432\u0438\u0442\u0435 \u043a\u0430\u0441\u0441\u0438\u0440\u0443 \u0443\u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u0435\u043d\u0438\u0435 \u043b\u0438\u0447\u043d\u043e\u0441\u0442\u0438 \u0438 \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0447\u0435\u043a\u0430 \u0438\u0437 \u0421\u041c\u0421."
            },
            deposit_opex_text_3: {
                id: "deposit.opex.text_3",
                defaultMessage: "<b>2. \u0412 \u043f\u043b\u0430\u0442\u0435\u0436\u043d\u044b\u0445 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430\u0445 \xabUnipay\xbb</b> <br/><br/><b>\u041f\u043e\u043a\u0443\u043f\u043a\u0430 Opex</b><br/><br/>\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430 "
            },
            deposit_opex_text_3_1: {
                id: "deposit.opex.text_3_1",
                defaultMessage: "\u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443 \xab\u0411\u0438\u0440\u043e\u043d\u0435\u043a\u0441\xbb"
            },
            deposit_opex_text_3_2: {
                id: "deposit.opex.text_3_2",
                defaultMessage: ", \u0437\u0430\u0442\u0435\u043c \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \xabOPX\xbb, \xab\u041f\u043e\u043a\u0443\u043f\u043a\u0430\xbb. \u0414\u0430\u043b\u0435\u0435 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0441\u043b\u0430\u043d\u043e \u0421\u041c\u0421 \u0441 \u0447\u0435\u043a\u043e\u043c \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex. \u0417\u0430\u0442\u0435\u043c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 (\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0442\u043e\u043b\u044c\u043a\u043e \u0435\u0434\u0438\u043d\u043e\u0436\u0434\u044b). \u041f\u043e\u0441\u043b\u0435 \u0432\u043d\u0435\u0441\u0438\u0442\u0435 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0435 \u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \xab\u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c\xbb.<br/><br/><br/><br/>\u041e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0432\u0430\u043d\u0438\u0435 Opex<br/><br/>\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u044f\u0432\u043a\u0443 \u043d\u0430 \u0432\u044b\u0432\u043e\u0434 \u043d\u0430 \u0441\u0430\u0439\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043b\u0435 \xab\u0412\u044b\u0432\u0435\u0441\u0442\u0438\xbb. \u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0441\u043b\u0430\u043d\u043e \u0421\u041c\u0421 \u0441 \u0447\u0435\u043a\u043e\u043c Opex. \u0414\u0430\u043b\u0435\u0435 \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430 \xabUnipay\xbb "
            },
            deposit_opex_text_3_2_1: {
                id: "deposit.opex.text_3_2_1",
                defaultMessage: "\u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443 \xab\u0411\u0438\u0440\u043e\u043d\u0435\u043a\u0441\xbb"
            },
            deposit_opex_text_3_2_2: {
                id: "deposit.opex.text_3_2_2",
                defaultMessage: ", \u0437\u0430\u0442\u0435\u043c \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \xabOPX\xbb, \xab\u041f\u0440\u043e\u0434\u0430\u0436\u0430\xbb. \u0417\u0430\u0442\u0435\u043c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 (\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0442\u043e\u043b\u044c\u043a\u043e \u0435\u0434\u0438\u043d\u043e\u0436\u0434\u044b). \u041f\u043e\u0441\u043b\u0435 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0447\u0435\u043a\u0430 \u0432 \u043f\u043e\u043b\u0435 \xab\u041a\u043e\u0434 \u0432\u044b\u0434\u0430\u0447\u0438\xbb \u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u0434\u0435\u043d\u0435\u0436\u043d\u044b\u0435 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430."
            },
            deposit_opex_amount_alert_text: {
                id: "deposit.opex.amount_alert_text",
                defaultMessage: "\u0415\u0441\u043b\u0438 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u043e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0442\u044c \u0432 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0435 \u0441\u0443\u043c\u043c\u0443 \u0431\u043e\u043b\u044c\u0448\u0435 50 000, \u0442\u043e \u0441\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0437\u0430\u044f\u0432\u043e\u043a \u043d\u0435 \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u044e\u0449\u0438\u0445 50 000 \u0441\u043e\u043c."
            },
            deposit_opex_amount_alert_btn: {
                id: "deposit.opex.amount_alert_btn",
                defaultMessage: "\u041f\u043e\u043d\u044f\u0442\u043d\u043e"
            },
            deposit_opex_amount_alert_label: {
                id: "deposit.opex.amount_alert_label",
                defaultMessage: "\u0411\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u044d\u0442\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"
            }
        }),
        _ = "REQUISITE_KEY_NAME",
        w = 200,
        x = 5e4,
        E = function(e) {
            function t() {
                var e, n, i, s;
                o(this, t);
                for (var l = arguments.length, c = Array(l), u = 0; u < l; u++)
                    c[u] = arguments[u];
                return n = i = a(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                    i.state = {
                        amount: "",
                        agree: !0,
                        amountError: !1,
                        password: "",
                        passwordError: !1,
                        amountIsMoreThanBalance: !1,
                        amountIsMoreThan: !1,
                        amountIsLessThan: !1,
                        amountDivide: !1,
                        requisite: localStorage.getItem(_) || "",
                        requisiteError: !1,
                        addressToggled: !1,
                        amountAlert: !1,
                        amountAlertUnvisible: localStorage.getItem("amountAlertUnvisible") || !1,
                        unvisibleChecked: !1
                    },
                    i.toggleAddress = function(e) {
                        i.setState({
                            addressToggled: e
                        })
                    },
                    i.toggleModal = function(e) {
                        i.setState({
                            isOpenModal: e
                        })
                    },
                    i.toggleAlert = function(e) {
                        i.setState({
                            amountAlert: e
                        })
                    },
                    i.unvisibleToggle = function(e) {
                        i.setState({
                                unvisibleChecked: e
                            }),
                            localStorage.setItem("amountAlertUnvisible", "true")
                    },
                    i.handleChange = function(e) {
                        i.setState(r({}, e.target.name, e.target.value.replace(/\D/gi, "").replace(/^996[0]/, "996")))
                    },
                    i.handleChangeAmount = function(e) {
                        var t = e.target.value.replace(/\D/gi, ""),
                            n = parseInt(t, 10) > x;
                        i.setState({
                            amount: t,
                            amountError: !1,
                            amountIsMoreThanBalance: !1,
                            amountIsMoreThan: n,
                            amountIsLessThan: !1
                        })
                    },
                    i.onSubmit = function() {
                        var e = i.state,
                            t = e.requisite,
                            n = e.password,
                            r = e.amount,
                            o = e.agree,
                            a = i.props.withdraw,
                            s = a.get("fetching"),
                            l = parseInt(r, 10) < w && "0" !== r[0],
                            c = parseInt(r, 10) > x,
                            u = parseInt(r, 10) % 200 !== 0;
                        i.setState({
                                amountError: "" === r || "0" === r[0],
                                amountIsMoreThanBalance: parseInt(r, 10) > i.props.balance,
                                amountIsMoreThan: c,
                                amountDivide: u,
                                amountIsLessThan: l,
                                requisiteError: !t,
                                passwordError: !n
                            }),
                            "" !== r && parseInt(r, 10) <= i.props.balance && !l && !c && !u && "0" !== r[0] && t && n && !s && (localStorage.setItem(_, t),
                                i.props.createWithdrawAction({
                                    amount: Number(r),
                                    providerId: 5,
                                    requisite: t,
                                    password: n,
                                    IsSafe: o
                                }))
                    },
                    i.onBlurRequisite = function(e) {
                        var t = e.target.value;
                        i.setState({
                            requisiteError: !t
                        })
                    },
                    i.onBlurAmount = function(e) {
                        var t = e.target.value;
                        i.setState({
                            amountError: "0" === t[0],
                            amountIsMoreThanBalance: parseInt(t, 10) > i.props.balance,
                            amountIsLessThan: parseInt(t, 10) < w && "0" !== t[0],
                            amountIsMoreThan: parseInt(t, 10) > x,
                            amountDivide: parseInt(t, 10) % 200 !== 0,
                            amountAlert: parseInt(t, 10) > 5e4
                        })
                    },
                    i.onFocusPassword = function() {
                        i.setState({
                            passwordError: !1
                        })
                    },
                    i.handleChangePassword = function(e) {
                        i.setState({
                            password: e.target.value
                        })
                    },
                    i.handleClick = function() {
                        i.state.selectOpened ? document.removeEventListener("click", i.handleOutsideClick, !1) : document.addEventListener("click", i.handleOutsideClick, !1),
                            i.setState(function(e) {
                                return {
                                    selectOpened: !e.selectOpened
                                }
                            })
                    },
                    i.handleOutsideClick = function(e) {
                        i.node.contains(e.target) && i.handleClick()
                    },
                    i.handleCheckboxChange = function(e) {
                        e.stopPropagation(),
                            i.setState({
                                agree: !i.state.agree
                            })
                    },
                    s = n,
                    a(i, s)
            }
            return i(t, e),
                v(t, [{
                    key: "render",
                    value: function() {
                        var e = this,
                            t = this.props,
                            n = t.withdraw,
                            r = t.balance,
                            o = t.intl,
                            a = t.tradingBalance,
                            i = this.state,
                            s = i.amount,
                            c = i.amountError,
                            u = i.password,
                            h = i.passwordError,
                            v = i.amountIsMoreThanBalance,
                            _ = i.amountIsLessThan,
                            w = i.amountIsMoreThan,
                            x = i.amountDivide,
                            E = i.requisiteError,
                            k = i.requisite,
                            S = i.agree,
                            O = "" === s || "" === k || _ || w || x,
                            C = n.get("withdrawStatus"),
                            T = n.get("fetching"),
                            M = "",
                            A = void 0 !== C && -4 !== C,
                            P = -4 === C || -6 === C;
                        return A && (-2 === C ? M = l.a.createElement("span", {
                                className: "withdraw-status-title-text"
                            }, l.a.createElement(m.b, b.withdraw_issue_active), l.a.createElement("span", {
                                className: "withdraw-status-title-text-sub"
                            }, l.a.createElement("br", null), l.a.createElement(m.b, b.withdraw_get_funds))) : -4 === C ? M = "" : -6 === C ? (A = !1,
                                M = "") : M = l.a.createElement("span", {
                                className: "withdraw-status-title-text"
                            }, l.a.createElement(m.b, b.withdraw_error))),
                            l.a.createElement(g.a, {
                                pageName: "withdraw.unipay",
                                emptyDescr: !0
                            }, l.a.createElement("div", {
                                className: "withdraw",
                                ref: function(t) {
                                    e.node = t
                                }
                            }, T && l.a.createElement(p.a, null), A && l.a.createElement("h2", {
                                className: "withdraw-status-title"
                            }, l.a.createElement("img", {
                                className: "withdraw-status-title-icon",
                                src: f.a,
                                alt: ""
                            }), M), l.a.createElement("h2", null, l.a.createElement(m.b, b.withdraw_withdraw_issue)), l.a.createElement("div", {
                                className: "withdraw-content"
                            }, l.a.createElement("div", {
                                className: "withdraw-content-left"
                            }, l.a.createElement("div", {
                                className: "withdraw-stats"
                            }, l.a.createElement("div", {
                                className: "withdraw-stats-item"
                            }, l.a.createElement("div", {
                                className: "withdraw-stats-item-title"
                            }, l.a.createElement(m.b, b.withdraw_total)), l.a.createElement("div", {
                                className: "withdraw-stats-item-amount"
                            }, r, "\xa0")), l.a.createElement("div", {
                                className: "withdraw-stats-item"
                            }, l.a.createElement("div", {
                                className: "withdraw-stats-item-title"
                            }, l.a.createElement(m.b, b.withdraw_trading)), l.a.createElement("div", {
                                className: "withdraw-stats-item-amount"
                            }, a.toFixed(2), "\xa0"))), l.a.createElement("div", {
                                className: "withdraw-form"
                            }, l.a.createElement("input", {
                                type: "hidden"
                            }), l.a.createElement("input", {
                                type: "password",
                                style: {
                                    display: "none"
                                }
                            }), l.a.createElement("div", {
                                className: "withdraw-form-item" + (E ? " withdraw-form-item--error" : "")
                            }, l.a.createElement(d.a, {
                                className: "form-control-input",
                                placeholder: o.formatMessage(b.withdraw_requisite),
                                name: "requisite",
                                value: k,
                                mask: "996 (***) **-**-**",
                                maskChar: "",
                                id: "requisite",
                                autoComplete: "tel",
                                type: "tel",
                                formatChars: {
                                    "*": "[0-9]"
                                },
                                onBlur: this.onBlurRequisite,
                                onChange: this.handleChange
                            }), E && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(m.b, b.withdraw_specify_amount))), l.a.createElement("div", {
                                className: "withdraw-form-item" + (x || c || v || _ ? " withdraw-form-item--error" : "")
                            }, l.a.createElement(d.a, {
                                className: "form-control-input",
                                placeholder: o.formatMessage(b.withdraw_sum),
                                name: "amount",
                                value: s,
                                mask: "*******",
                                maskChar: "",
                                id: "amount",
                                autoComplete: "transaction-amount",
                                type: "tel",
                                formatChars: {
                                    "*": "[0-9]"
                                },
                                onBlur: this.onBlurAmount,
                                onChange: this.handleChangeAmount
                            }), c && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(m.b, b.withdraw_specify_amount)), v && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(m.b, b.withdraw_not_enough_funds)), w && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(m.b, b.withdraw_max)), _ && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(m.b, b.withdraw_min)), x && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(m.b, b.withdraw_divide))), l.a.createElement("div", {
                                className: "withdraw-form-item" + (h || P ? " withdraw-form-item--error" : "")
                            }, l.a.createElement("input", {
                                id: "password",
                                autoComplete: "current-password",
                                className: "form-control-input",
                                type: "password",
                                value: u,
                                placeholder: o.formatMessage({
                                    id: "auth.form.pass"
                                }),
                                onFocus: this.onFocusPassword,
                                onChange: this.handleChangePassword
                            }), h && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(m.b, b.withdraw_password_empty)), P && l.a.createElement("div", {
                                className: "common-form__row__message"
                            }, l.a.createElement(m.b, b.withdraw_password))), l.a.createElement("div", {
                                className: "withdraw-form-item"
                            }, l.a.createElement("div", {
                                className: "custom-checkbox"
                            }, l.a.createElement("div", {
                                className: S ? "custom-checkbox-input active" : "custom-checkbox-input",
                                onClick: this.handleCheckboxChange,
                                style: {
                                    width: "45px",
                                    cursor: "pointer"
                                }
                            }), l.a.createElement("div", {
                                className: "custom-checkbox-text",
                                style: {
                                    width: "initial"
                                }
                            }, l.a.createElement("h4", {
                                onClick: this.handleCheckboxChange,
                                style: {
                                    cursor: "pointer"
                                }
                            }, l.a.createElement(m.b, {
                                id: "opex.restriction.title"
                            })), l.a.createElement("p", {
                                className: "desc"
                            }, l.a.createElement(m.b, {
                                id: "opex.restriction.short_text"
                            }), "\xa0"), l.a.createElement("span", {
                                className: "modal-trigger"
                            }, l.a.createElement(y.a, null))))), l.a.createElement("button", {
                                disabled: O,
                                className: "common-form__submit",
                                onClick: this.onSubmit
                            }, l.a.createElement(m.b, b.withdraw_create_issue)))), l.a.createElement("div", {
                                className: "withdraw-content-right"
                            }, l.a.createElement("div", {
                                className: "withdraw-content-right-logo opex"
                            }), l.a.createElement(m.a, b.withdraw_opex_instruction)))), this.state.amountAlert && !this.state.amountAlertUnvisible && l.a.createElement("div", {
                                className: "withdraw-alert-wrapper"
                            }, l.a.createElement("div", {
                                className: "withdraw-alert"
                            }, l.a.createElement("span", null, l.a.createElement(m.a, b.deposit_opex_amount_alert_text)), l.a.createElement("button", {
                                className: "common-form__submit",
                                onClick: function() {
                                    return e.toggleAlert(!e.state.amountAlert)
                                }
                            }, l.a.createElement(m.a, b.deposit_opex_amount_alert_btn)), l.a.createElement("div", {
                                className: "withdraw-alert-confirm"
                            }, l.a.createElement("input", {
                                type: "checkbox",
                                id: "scales",
                                name: "unvisible",
                                checked: this.state.unvisibleChecked,
                                onChange: function() {
                                    return e.unvisibleToggle(!e.state.unvisibleChecked)
                                }
                            }), l.a.createElement("label", {
                                htmlFor: "scales"
                            }, l.a.createElement(m.a, b.deposit_opex_amount_alert_label)))), l.a.createElement("div", {
                                className: "withdraw-alert-overlay"
                            })))
                    }
                }]),
                t
        }(s.Component);
    E.propTypes = {
            createWithdrawAction: u.a.func.isRequired,
            clearWithdrawalAction: u.a.func.isRequired,
            withdraw: u.a.object.isRequired,
            languageId: u.a.number.isRequired,
            intl: u.a.object.isRequired,
            balance: u.a.number.isRequired,
            tradingBalance: u.a.number.isRequired
        },
        t.a = Object(m.f)(E)
}