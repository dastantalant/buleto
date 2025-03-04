 function (e, t, n) {
    "use strict";
    var r = n(0),
        o = n.n(r),
        a = n(21),
        i = (n.n(a),
            n(3)),
        s = function (e) {
            return o.a.createElement(r.Fragment, null, o.a.createElement(a.Helmet, null, o.a.createElement("title", null, e.intl.formatMessage({
                id: "faq.platform.title"
            })), o.a.createElement("meta", {
                name: "description",
                content: e.intl.formatMessage({
                    id: "faq.platform.description"
                })
            })), o.a.createElement("div", {
                dangerouslySetInnerHTML: e.content
            }))
        };
    t.a = Object(i.f)(s)
}