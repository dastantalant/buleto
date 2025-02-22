function(e, t, n) {
    function r(e, t) {
        this.query = e,
            this.isUnconditional = t,
            this.handlers = [],
            this.mql = window.matchMedia(e);
        var n = this;
        this.listener = function(e) {
                n.mql = e.currentTarget || e,
                    n.assess()
            },
            this.mql.addListener(this.listener)
    }
    var o = n(641),
        a = n(253).each;
    r.prototype = {
            constuctor: r,
            addHandler: function(e) {
                var t = new o(e);
                this.handlers.push(t),
                    this.matches() && t.on()
            },
            removeHandler: function(e) {
                var t = this.handlers;
                a(t, function(n, r) {
                    if (n.equals(e))
                        return n.destroy(), !t.splice(r, 1)
                })
            },
            matches: function() {
                return this.mql.matches || this.isUnconditional
            },
            clear: function() {
                a(this.handlers, function(e) {
                        e.destroy()
                    }),
                    this.mql.removeListener(this.listener),
                    this.handlers.length = 0
            },
            assess: function() {
                var e = this.matches() ? "on" : "off";
                a(this.handlers, function(t) {
                    t[e]()
                })
            }
        },
        e.exports = r
}