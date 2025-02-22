function(e, t, n) {
    "use strict";
    var r = n(0),
        o = n.n(r),
        a = n(2),
        i = n.n(a),
        s = n(704),
        l = n.n(s),
        c = n(654),
        u = n.n(c),
        d = n(3),
        p = function(e) {
            var t = void 0 === e.selectedSalepoint.Name ? {
                    color: "#BFC0C2"
                } : {
                    color: "#0c1728"
                },
                n = e.salepoints.length <= 1;
            return n ? o.a.createElement("div", null, o.a.createElement("div", {
                className: "select-replacement-head"
            }, o.a.createElement("span", {
                style: {
                    margin: "0 auto",
                    color: "#0c1728"
                }
            }, void 0 === e.selectedSalepoint.Name ? e.intl.formatMessage({
                id: "withdraw.choose_cashbox"
            }) : e.selectedSalepoint.Address))) : o.a.createElement("div", {
                className: e.selectClass
            }, o.a.createElement("div", {
                className: "select-replacement-head",
                onClick: n ? null : e.toggleSelect
            }, o.a.createElement("img", {
                src: l.a,
                alt: "location icon",
                className: "location"
            }), o.a.createElement("span", {
                style: t
            }, void 0 === e.selectedSalepoint.Name ? e.intl.formatMessage({
                id: "withdraw.choose_cashbox"
            }) : e.selectedSalepoint.Address), o.a.createElement("img", {
                src: u.a,
                alt: "down icon",
                className: "down"
            })), o.a.createElement("div", {
                className: "select-replacement-options"
            }, e.salepoints.map(function(t) {
                return o.a.createElement("div", {
                    className: "select-replacement-options-item",
                    key: t.Id,
                    onClick: function() {
                        return e.select(t)
                    }
                }, t.Address)
            })))
        };
    p.propTypes = {
            selectOpened: i.a.bool.isRequired,
            selectedSalepoint: i.a.object.isRequired,
            intl: i.a.object.isRequired,
            selectClass: i.a.string.isRequired,
            toggleSelect: i.a.func.isRequired,
            select: i.a.func.isRequired
        },
        t.a = Object(d.f)(p)
}