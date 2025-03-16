 function (e, t, n) {
    "use strict";
    var r = n(0),
        o = n.n(r),
        a = n(2),
        i = n.n(a),
        s = n(152),
        l = n.n(s),
        c = function (e) {
            var t = e.title,
                n = e.content,
                r = e.isOpen,
                a = e.onClose,
                i = e.btnText,
                s = e.wide;
            return r ? o.a.createElement("div", {
                className: "modal-overlay"
            }, o.a.createElement("div", {
                className: "modal-info",
                style: s && {
                    maxWidth: "600px"
                }
            }, o.a.createElement("div", {
                className: "modal-info-head"
            }, o.a.createElement("h4", null, t), o.a.createElement("div", {
                className: "modal-info-head-close",
                onClick: a
            }, o.a.createElement("img", {
                src: l.a,
                alt: ""
            }))), o.a.createElement("div", {
                className: "modal-info-body"
            }, o.a.createElement("p", null, n), o.a.createElement("button", {
                onClick: a
            }, i)))) : null
        };
    c.propTypes = {
        title: i.a.string.isRequired,
        content: i.a.string.isRequired,
        btnText: i.a.string.isRequired,
        isOpen: i.a.bool.isRequired,
        onClose: i.a.func.isRequired
    },
        t.a = c
}