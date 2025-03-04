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
        l = n(21),
        c = (n.n(l),
            n(2)),
        u = n.n(c),
        d = n(6),
        p = n(3),
        h = n(246),
        f = n.n(h),
        m = n(820),
        g = n.n(m),
        y = n(271),
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
        b = Object(p.e)({
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
                defaultMessage: "\u041a\u043e\u043c\u0438\u0441\u0441\u0438\u044f \u2014 0 c"
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
                        addressToggled: !1,
                        addressCashdeksToggled: !1
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
                        var e = this,
                            t = this.props.intl,
                            n = this.state,
                            r = n.addressToggled,
                            o = n.addressCashdeksToggled;
                        return s.a.createElement("div", {
                            className: "deposit-wrapper"
                        }, s.a.createElement(l.Helmet, null, s.a.createElement("title", null, t.formatMessage({
                            id: "deposit.title"
                        })), s.a.createElement("meta", {
                            name: "description",
                            content: t.formatMessage({
                                id: "deposit.description"
                            })
                        })), s.a.createElement("div", {
                            className: "deposit opex_deposit"
                        }, s.a.createElement("div", {
                            className: "payment_method"
                        }, s.a.createElement("div", {
                            className: "payment_method-header"
                        }, s.a.createElement("div", {
                            className: "payment_method-header-left"
                        }, s.a.createElement("img", {
                            className: "payment_method-header-image",
                            style: {
                                width: 100
                            },
                            src: f.a,
                            alt: ""
                        }), s.a.createElement("div", {
                            className: "payment_method-header-description"
                        }, s.a.createElement("span", {
                            className: "payment_method-header-description-name"
                        }, s.a.createElement(p.b, b.deposit_opex_name)), s.a.createElement("span", {
                            className: "payment_method-header-description-amount"
                        }, s.a.createElement(p.a, b.deposit_opex_comission)))))), s.a.createElement("div", {
                            className: "opex_deposit__instruction"
                        }, s.a.createElement(p.a, b.deposit_opex_text_1), s.a.createElement("br", null), s.a.createElement("br", null), s.a.createElement(p.a, b.deposit_opex_text_2), s.a.createElement("br", null), s.a.createElement("p", {
                            className: "unipay-locations-link",
                            onClick: function () {
                                return e.toggleAddressCashdesks(!e.state.addressCashdeksToggled)
                            },
                            style: {
                                cursor: "pointer",
                                marginTop: 30
                            }
                        }, !this.state.addressCashdeksToggled && s.a.createElement(p.b, b.locations_cashdesks), this.state.addressCashdeksToggled && s.a.createElement(p.b, b.locations_cashdesks_hide)), s.a.createElement("br", null), o && s.a.createElement("ul", {
                            className: "locations-list"
                        }, "\u0433.\u0411\u0438\u0448\u043a\u0435\u043a:", s.a.createElement("li", null, "\u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u0427\u0443\u0439 52/3 (\u043f\u0435\u0440\u0435\u0441\u0435\u043a\u0430\u0435\u0442 \u0443\u043b. \u041a\u0430\u0440\u043f\u0438\u043d\u0441\u043a\u043e\u0433\u043e)"), s.a.createElement("li", null, "\u0443\u043b. \u0410\u0431\u0434\u0440\u0430\u0445\u043c\u0430\u043d\u043e\u0432\u0430 182 (\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f x \u041a\u0438\u0435\u0432\u0441\u043a\u0430\u044f)"), s.a.createElement("li", null, "\u0443\u043b. \u0411\u0435\u0439\u0448\u0435\u043d\u0430\u043b\u0438\u0435\u0432\u043e\u0439 33 (\u043f\u0435\u0440\u0435\u0441\u0435\u043a\u0430\u0435\u0442 \u0443\u043b. \u041a\u0438\u0435\u0432\u0441\u043a\u0430\u044f)"), s.a.createElement("li", null, "\u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041c\u0438\u0440\u0430 35 (\u043f\u0435\u0440\u0435\u0441\u0435\u043a\u0430\u0435\u0442 \u0443\u043b. \u0410\u0439\u043d\u0438)"), s.a.createElement("li", null, "\u0443\u043b. \u0410\u0445\u0443\u043d\u0431\u0430\u0435\u0432\u0430 116a (\u043f\u0435\u0440\u0435\u0441\u0435\u043a\u0430\u0435\u0442 \u0443\u043b. \u0422\u043e\u043a\u0442\u043e\u043d\u0430\u043b\u0438\u0435\u0432\u0430)"), s.a.createElement("li", null, "\u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u0416\u0438\u0431\u0435\u043a \u0416\u043e\u043b\u0443 183 (\u043f\u0435\u0440\u0435\u0441\u0435\u043a\u0430\u0435\u0442 \u0443\u043b. \u0411\u0443\u0434\u0451\u043d\u043d\u043e\u0433\u043e)"), s.a.createElement("li", null, "\u0443\u043b. \u0421\u0443\u0435\u0440\u043a\u0443\u043b\u043e\u0432\u0430 20/20 (\u041e\u0440\u0442\u043e-\u0441\u0430\u0439\u0441\u043a\u0438\u0439 \u0440\u044b\u043d\u043e\u043a)"), "\u0433.\u041e\u0448:", s.a.createElement("li", null, "\u0443\u043b. \u041b\u0435\u043d\u0438\u043d\u0430 357"), s.a.createElement("li", null, "\u0443\u043b. \u041c\u0430\u0441\u0430\u043b\u0438\u0435\u0432\u0430 2")), s.a.createElement("br", null), s.a.createElement(p.a, b.deposit_opex_text_3), s.a.createElement("span", {
                            className: "bironex",
                            onClick: function () {
                                return e.toggleModal(!e.state.isOpenModal)
                            }
                        }, s.a.createElement(p.a, b.deposit_opex_text_3_1)), s.a.createElement(p.a, b.deposit_opex_text_3_2), s.a.createElement("span", {
                            className: "bironex",
                            onClick: function () {
                                return e.toggleModal(!e.state.isOpenModal)
                            }
                        }, s.a.createElement(p.a, b.deposit_opex_text_3_2_1)), s.a.createElement(p.a, b.deposit_opex_text_3_2_2), s.a.createElement("br", null), s.a.createElement("p", {
                            className: "unipay-locations-link",
                            onClick: function () {
                                return e.toggleAddress(!e.state.addressToggled)
                            },
                            style: {
                                cursor: "pointer",
                                marginTop: 30
                            }
                        }, !this.state.addressToggled && s.a.createElement(p.b, b.locations), this.state.addressToggled && s.a.createElement(p.b, b.locations_hide)), s.a.createElement("br", null), r && s.a.createElement(y.a, null), s.a.createElement("br", null), this.state.isOpenModal && s.a.createElement("div", {
                            className: "modal-hint",
                            onClick: function () {
                                return e.toggleModal(!e.state.isOpenModal)
                            }
                        }, s.a.createElement("img", {
                            src: g.a,
                            alt: "",
                            style: {
                                height: "auto"
                            }
                        })))))
                    }
                }]),
                t
        }(s.a.Component);
    _.propTypes = {
        languageId: u.a.number.isRequired,
        user: u.a.object.isRequired,
        intl: u.a.object.isRequired
    };
    var w = function (e) {
        return {
            languageId: e.application.get("languageId"),
            user: e.application.get("user")
        }
    };
    t.a = Object(d.b)(w, null)(Object(p.f)(_))
}