function(e, t, n) {
    function r(e, t) {
        if (void 0 == e.length)
            throw new Error(e.length + "/" + t);
        for (var n = 0; n < e.length && 0 == e[n];)
            n++;
        this.num = new Array(e.length - n + t);
        for (var r = 0; r < e.length - n; r++)
            this.num[r] = e[r + n]
    }
    var o = n(264);
    r.prototype = {
            get: function(e) {
                return this.num[e]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(e) {
                for (var t = new Array(this.getLength() + e.getLength() - 1), n = 0; n < this.getLength(); n++)
                    for (var a = 0; a < e.getLength(); a++)
                        t[n + a] ^= o.gexp(o.glog(this.get(n)) + o.glog(e.get(a)));
                return new r(t, 0)
            },
            mod: function(e) {
                if (this.getLength() - e.getLength() < 0)
                    return this;
                for (var t = o.glog(this.get(0)) - o.glog(e.get(0)), n = new Array(this.getLength()), a = 0; a < this.getLength(); a++)
                    n[a] = this.get(a);
                for (var a = 0; a < e.getLength(); a++)
                    n[a] ^= o.gexp(o.glog(e.get(a)) + t);
                return new r(n, 0).mod(e)
            }
        },
        e.exports = r
}