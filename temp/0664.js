function(e, t, n) {
    "use strict";
    var r = n(0),
        o = n.n(r),
        a = n(2),
        i = n.n(a),
        s = n(3),
        l = Object(s.e)({
            success_email_go_to: {
                id: "success_email.go_to",
                defaultMessage: "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430"
            }
        }),
        c = function(e) {
            return o.a.createElement("div", {
                className: "common-form drop-shadow"
            }, o.a.createElement("div", {
                className: "common-form-body"
            }, o.a.createElement("div", {
                className: "common-form__row"
            }, o.a.createElement("div", {
                className: "recover-success__icon"
            })), o.a.createElement("div", {
                className: "common-form__row text-center recover-success__description"
            }, e.description, "\xa0"), "" !== e.emailDomain && o.a.createElement("div", {
                className: "common-form__row"
            }, o.a.createElement("a", {
                href: "https://" + e.emailDomain,
                target: "_blank",
                className: "common-form__submit"
            }, o.a.createElement(s.b, l.success_email_go_to), " ", e.emailDomain))))
        };
    c.propTypes = {
            description: i.a.any,
            emailDomain: i.a.any
        },
        t.a = c
}