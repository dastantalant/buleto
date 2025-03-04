 function (e, t) {
    function n(e, t) {
        if (!(this instanceof n))
            return new n(e, t);
        this.per_page = e || 25,
            this.length = t || 10
    }
    e.exports = n,
        n.prototype.build = function (e, t) {
            var n = Math.ceil(e / this.per_page);
            e = parseInt(e, 10),
                t = parseInt(t, 10) || 1,
                t < 1 && (t = 1),
                t > n && (t = n);
            var r = Math.max(1, t - Math.floor(this.length / 2)),
                o = Math.min(n, t + Math.floor(this.length / 2));
            o - r + 1 < this.length && (t < n / 2 ? o = Math.min(n, o + (this.length - (o - r))) : r = Math.max(1, r - (this.length - (o - r)))),
                o - r + 1 > this.length && (t > n / 2 ? r++ : o--);
            var a = this.per_page * (t - 1);
            a < 0 && (a = 0);
            var i = this.per_page * t - 1;
            return i < 0 && (i = 0),
                i > Math.max(e - 1, 0) && (i = Math.max(e - 1, 0)), {
                total_pages: n,
                pages: Math.min(o - r + 1, n),
                current_page: t,
                first_page: r,
                last_page: o,
                previous_page: t - 1,
                next_page: t + 1,
                has_previous_page: t > 1,
                has_next_page: t < n,
                total_results: e,
                results: Math.min(i - a + 1, e),
                first_result: a,
                last_result: i
            }
        }
}