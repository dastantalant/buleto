 function (e, t, n) {
    function r() {
        if (!window.matchMedia)
            throw new Error("matchMedia not present, legacy browsers require a polyfill");
        this.queries = {},
            this.browserIsIncapable = !window.matchMedia("only all").matches
    }
    var o = n(640),
        a = n(253),
        i = a.each,
        s = a.isFunction,
        l = a.isArray;
    r.prototype = {
        constructor: r,
        register: function (e, t, n) {
            var r = this.queries,
                a = n && this.browserIsIncapable;
            return r[e] || (r[e] = new o(e, a)),
                s(t) && (t = {
                    match: t
                }),
                l(t) || (t = [t]),
                i(t, function (t) {
                    s(t) && (t = {
                        match: t
                    }),
                        r[e].addHandler(t)
                }),
                this
        },
        unregister: function (e, t) {
            var n = this.queries[e];
            return n && (t ? n.removeHandler(t) : (n.clear(),
                delete this.queries[e])),
                this
        }
    },
        e.exports = r
}