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
        var t = e.application.get("user"),
            n = e.application.get("opex").toJS();
        return Object.assign({}, n, {
            accountNumber: t && t.accountNumber
        })
    }
    var s = n(0),
        l = n.n(s),
        c = n(6),
        u = n(7),
        d = n(20),
        p = n.n(d),
        h = n(3),
        f = n(246),
        m = n.n(f),
        g = n(106),
        y = n(107),
        v = function () {
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
        b = Object(h.e)({
            deposit_opex_name: {
                id: "deposit.opex.name",
                defaultMessage: "\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0435 \u0437\u0430\u043b\u044b Buleto"
            },
            locations: {
                id: "withdraw.terminals_location",
                defaultMessage: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432"
            },
            locations_hide: {
                id: "withdraw.terminals_location_hide",
                defaultMessage: "\u0421\u043a\u0440\u044b\u0442\u044c \u043a\u0430\u0440\u0442\u0443 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u043e\u0432"
            },
            locations_cashdesks: {
                id: "withdraw.cashdesks_location",
                defaultMessage: "\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u043a\u0430\u0441\u0441"
            },
            locations_cashdesks_hide: {
                id: "withdraw.cashdesks_location_hide",
                defaultMessage: "\u0421\u043a\u0440\u044b\u0442\u044c \u0430\u0434\u0440\u0435\u0441\u0430 \u043a\u0430\u0441\u0441"
            },
            deposit_opex_comission: {
                id: "deposit.opex.comission",
                defaultMessage: "\u041a\u043e\u043c\u0438\u0441\u0441\u0438\u044f \u2014 0"
            },
            deposit_opex_question: {
                id: "deposit.opex.question",
                defaultMessage: "\u0413\u0434\u0435 \u043a\u0443\u043f\u0438\u0442\u044c \u0447\u0435\u043a \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex?"
            },
            deposit_opex_success: {
                id: "deposit.opex.success",
                defaultMessage: "\u0411\u0430\u043b\u0430\u043d\u0441 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d!"
            },
            deposit_opex_start: {
                id: "deposit.opex.start",
                defaultMessage: "\u041d\u0430\u0447\u0430\u0442\u044c \u0442\u043e\u0440\u0433\u043e\u0432\u043b\u044e"
            },
            deposit_opex_check: {
                id: "deposit.opex.check",
                defaultMessage: "\u041d\u043e\u043c\u0435\u0440 \u0447\u0435\u043a\u0430"
            },
            deposit_opex_placeholder: {
                id: "deposit.opex.placeholder",
                defaultMessage: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0447\u0435\u043a\u0430"
            },
            deposit_opex_amount: {
                id: "deposit.opex.amount",
                defaultMessage: "\u0421\u0443\u043c\u043c\u0430"
            },
            deposit_opex_continue: {
                id: "deposit.opex.continue",
                defaultMessage: "\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c"
            },
            deposit_opex_replenish: {
                id: "deposit.opex.replenish",
                defaultMessage: "\u041f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c"
            },
            deposit_opex_course: {
                id: "deposit.opex.course",
                defaultMessage: "\u041e\u0431\u043c\u0435\u043d\u043d\u044b\u0439 \u043a\u0443\u0440\u0441"
            },
            deposit_opex_pin_invalid: {
                id: "deposit.opex.pin_invalid",
                defaultMessage: "\u0427\u0435\u043a \u043d\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439"
            },
            deposit_opex_pin_error: {
                id: "deposit.opex.pin_error",
                defaultMessage: "\u0427\u0435\u043a \u043d\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439, \u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043f\u044b\u0442\u043e\u043a:"
            },
            deposit_opex_atempts_error: {
                id: "deposit.opex.atempts_error",
                defaultMessage: "\u041f\u043e\u043f\u044b\u0442\u043a\u0438 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d\u044b, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430 \u0447\u0435\u0440\u0435\u0437"
            },
            deposit_opex_desc: {
                id: "deposit.opex.desc",
                defaultMessage: "\u041f\u0440\u0438\u043e\u0431\u0440\u0435\u0441\u0442\u0438 \u0447\u0435\u043a\u0438 \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex \u0431\u0435\u0437 \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u0438 \u043c\u043e\u0436\u043d\u043e \u0437\u0430 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0435 \u0434\u0432\u0443\u043c\u044f \u0441\u043f\u043e\u0441\u043e\u0431\u0430\u043c\u0438:"
            },
            deposit_opex_desc_1: {
                id: "deposit.opex.desc_1",
                defaultMessage: "<b> 1. \u0412 \u043a\u0430\u0441\u0441\u0430\u0445 \xabUnipay\xbb </b> <br /> <br /> \u0412\u043d\u0435\u0441\u0438\u0442\u0435 \u0436\u0435\u043b\u0430\u0435\u043c\u0443\u044e \u0441\u0443\u043c\u043c\u0443 \u0438 \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u0435 \u043a\u0430\u0441\u0441\u0438\u0440\u0443 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0441\u043b\u0430\u043d \u0447\u0435\u043a \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b Opex."
            },
            deposit_opex_desc_2: {
                id: "deposit.opex.desc_2",
                defaultMessage: "<b> 2. \u0412 \u043f\u043b\u0430\u0442\u0435\u0436\u043d\u044b\u0445 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430\u0445 \xabUnipay\xbb </b> <br /> <br />\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435 \u0442\u0435\u0440\u043c\u0438\u043d\u0430\u043b\u0430"
            },
            deposit_opex_desc_2_1: {
                id: "deposit.opex.desc_2_1",
                defaultMessage: " \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443 \xab\u0411\u0438\u0440\u043e\u043d\u0435\u043a\u0441\xbb"
            },
            deposit_opex_desc_2_2: {
                id: "deposit.opex.desc_2_2",
                defaultMessage: ", \u0437\u0430\u0442\u0435\u043c \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \xabOPX\xbb, \xab\u041f\u043e\u043a\u0443\u043f\u043a\u0430\xbb. \u0414\u0430\u043b\u0435\u0435 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0441\u043b\u0430\u043d\u043e \u0421\u041c\u0421-\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0441 \u0447\u0435\u043a\u043e\u043c \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b. \u0417\u0430\u0442\u0435\u043c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 (\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0442\u043e\u043b\u044c\u043a\u043e \u0435\u0434\u0438\u043d\u043e\u0436\u0434\u044b). \u041f\u043e\u0441\u043b\u0435 \u0432\u043d\u0435\u0441\u0438\u0442\u0435 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0435 \u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \xab\u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c\xbb."
            },
            deposit_opex_text_1: {
                id: "deposit.opex.text_1",
                defaultMessage: "\u0421 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u0440\u0438\u043f\u0442\u043e\u0432\u0430\u043b\u044e\u0442\u044b \xabOpex\xbb \u043c\u043e\u0436\u043d\u043e \u043f\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u0442\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u0441\u0447\u0451\u0442, \u0430 \u0442\u0430\u043a\u0436\u0435 \u043e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0442\u044c \u043f\u0440\u0438\u0431\u044b\u043b\u044c \u0431\u0435\u0437 \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u0438! \u041a\u0443\u0440\u0441 \u043e\u0431\u043c\u0435\u043d\u0430 1 OPX = 1 KGS <br/> <br/> Opex \u043c\u043e\u0436\u043d\u043e \u043a\u0443\u043f\u0438\u0442\u044c \u0438 \u043e\u0431\u043d\u0430\u043b\u0438\u0447\u0438\u0442\u044c \u0434\u0432\u0443\u043c\u044f \u0441\u043f\u043e\u0441\u043e\u0431\u0430\u043c\u0438:"
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
            }
        }),
        _ = function (e) {
            function t() {
                var e, n, a, i;
                r(this, t);
                for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                    l[c] = arguments[c];
                return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                    a.state = {
                        pin: ""
                    },
                    a.check = function (e) {
                        e.preventDefault();
                        var t = a.props.accountNumber,
                            n = a.state.pin;
                        a.props.checkOpexPinAction({
                            accountNumber: t,
                            pin: n
                        })
                    },
                    a.create = function (e) {
                        e.preventDefault();
                        var t = a.props,
                            n = t.accountNumber,
                            r = t.amount,
                            o = a.state.pin;
                        a.props.createOpexRechargeAction({
                            accountNumber: n,
                            pin: o,
                            amount: r
                        })
                    },
                    a.handleChange = function (e) {
                        var t = e.target.value.replace(/\D/gi, "").substring(0, 12);
                        a.setState({
                            pin: t
                        })
                    },
                    a.componentWillUnmount = function () {
                        a.props.clearOpexAction()
                    },
                    a.toggleAddress = function (e) {
                        a.setState({
                            addressToggled: e
                        })
                    },
                    a.toggleAddressCashdesks = function (e) {
                        a.setState({
                            addressCashdeksToggled: e
                        })
                    },
                    a.toggleModal = function (e) {
                        a.setState({
                            isOpenModal: e
                        })
                    },
                    i = n,
                    o(a, i)
            }
            return a(t, e),
                v(t, [{
                    key: "render",
                    value: function () {
                        var e = this.props,
                            t = e.fetching,
                            n = e.amount,
                            r = e.status,
                            o = e.rechargeCreated,
                            a = e.attempts,
                            i = e.max,
                            s = e.timeout,
                            c = e.accountNumber,
                            d = e.intl,
                            f = this.state.pin,
                            g = 12 !== f.length || t || s > 0,
                            v = r < 0;
                        return c ? l.a.createElement("div", {
                            className: "deposit opex_deposit"
                        }, l.a.createElement("div", {
                            className: "payment_method"
                        }, l.a.createElement("div", {
                            className: "payment_method-header"
                        }, l.a.createElement("div", {
                            className: "payment_method-header-left"
                        }, l.a.createElement("img", {
                            className: "payment_method-header-image",
                            style: {
                                width: 100
                            },
                            src: m.a,
                            alt: ""
                        }), l.a.createElement("div", {
                            className: "payment_method-header-description"
                        }, l.a.createElement("span", {
                            className: "payment_method-header-description-name"
                        }, l.a.createElement(h.b, b.deposit_opex_name)), l.a.createElement("span", {
                            className: "payment_method-header-description-amount"
                        }, l.a.createElement(h.a, b.deposit_opex_comission)))), l.a.createElement("div", {
                            className: "payment_method-header-back",
                            onClick: this.props.openMethod.bind(this, "")
                        })), o ? l.a.createElement("div", null, l.a.createElement("h2", null, l.a.createElement(h.b, b.deposit_opex_success)), l.a.createElement(u.a, {
                            to: "/traderoom"
                        }, l.a.createElement("button", {
                            className: "common-form__submit"
                        }, l.a.createElement(h.b, b.deposit_opex_start)))) : l.a.createElement(l.a.Fragment, null, l.a.createElement("div", {
                            className: "payment_method-content"
                        }, l.a.createElement("div", {
                            className: "payment_method-content-text"
                        }, l.a.createElement("form", {
                            className: "common-form",
                            onSubmit: n ? this.create : this.check
                        }, l.a.createElement("div", {
                            className: "common-form-body"
                        }, n ? l.a.createElement("div", {
                            className: "opex_deposit__amount"
                        }, l.a.createElement("div", null, l.a.createElement("p", null, l.a.createElement(h.b, b.deposit_opex_check)), l.a.createElement("span", null, f)), l.a.createElement("div", null, l.a.createElement("p", null, l.a.createElement(h.b, b.deposit_opex_amount)), l.a.createElement("span", null, n, " \u0443.\u0435."))) : l.a.createElement("div", {
                            className: "opex_deposit__form"
                        }, l.a.createElement("div", {
                            className: p()("common-form__row", {
                                "common-form__row--error": v
                            })
                        }, l.a.createElement("input", {
                            value: f,
                            onChange: this.handleChange,
                            placeholder: d.formatMessage(b.deposit_opex_placeholder),
                            type: "tel",
                            className: p()("common-form__input", {
                                "common-form__input--error": v
                            })
                        }), v && l.a.createElement("div", {
                            className: "common-form__row__message"
                        }, l.a.createElement(h.b, b.deposit_opex_pin_invalid)), a && !s && l.a.createElement("div", {
                            className: "common-form__row__message"
                        }, l.a.createElement(h.b, b.deposit_opex_pin_error), " ", i - a), s > 0 && l.a.createElement(w, {
                            timeout: s
                        })), l.a.createElement("span", null, l.a.createElement(h.b, b.deposit_opex_course), " 1 OPX = 1 \u0423.E.")), l.a.createElement("button", {
                            disabled: g,
                            className: "common-form__submit"
                        }, l.a.createElement(h.b, b[n ? "deposit_opex_replenish" : "deposit_opex_continue"]))))))))) : l.a.createElement(y.a, null)
                    }
                }]),
                t
        }(s.Component);
    t.a = Object(c.b)(i, {
        clearOpexAction: g.c,
        checkOpexPinAction: g.b,
        createOpexRechargeAction: g.d
    })(Object(h.f)(_));
    var w = function (e) {
        function t() {
            var e, n, a, i;
            r(this, t);
            for (var s = arguments.length, l = Array(s), c = 0; c < s; c++)
                l[c] = arguments[c];
            return n = a = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                a.state = {
                    timeout: a.props.timeout
                },
                a.componentDidMount = function () {
                    setInterval(function () {
                        a.setState({
                            timeout: a.state.timeout - 1e3
                        })
                    }, 1e3)
                },
                i = n,
                o(a, i)
        }
        return a(t, e),
            v(t, [{
                key: "render",
                value: function () {
                    if (this.state.timeout < 0)
                        return null;
                    var e = this.state.timeout / 1e3;
                    e %= 3600;
                    var t = parseInt(e / 60, 10);
                    e %= 60,
                        (e = Math.floor(e)) < 10 && (e = "0" + e);
                    var n = t + ":" + e;
                    return l.a.createElement("div", {
                        className: "common-form__row__message"
                    }, l.a.createElement(h.b, b.deposit_opex_atempts_error), " ", n)
                }
            }]),
            t
    }(l.a.Component)
}