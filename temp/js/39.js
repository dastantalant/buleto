 function (e, t, n) {
    "use strict";
    var r = n(0),
        o = n.n(r),
        a = n(2),
        i = n.n(a),
        s = n(6),
        l = n(38),
        c = n(21),
        u = (n.n(c),
            n(3)),
        d = function (e) {
            var t = e.intl,
                n = e.pageName,
                r = e.languageId,
                a = e.children,
                i = e.emptyDescr;
            return r !== l.c ? a : o.a.createElement(o.a.Fragment, null, o.a.createElement(c.Helmet, null, o.a.createElement("title", null, t.formatMessage({
                id: n + ".title"
            })), o.a.createElement("meta", {
                name: "description",
                content: i ? "" : t.formatMessage({
                    id: n + ".description"
                })
            })), a)
        };
    d.propTypes = {
        languageId: i.a.number.isRequired,
        pageName: i.a.string.isRequired,
        children: i.a.node.isRequired
    };
    var p = function (e) {
        return {
            languageId: e.application.get("languageId")
        }
    };
    t.a = Object(s.b)(p)(Object(u.f)(d))
}