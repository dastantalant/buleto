 function (e, t) {
    e.exports = Math.scale || function (e, t, n, r, o) {
        return 0 === arguments.length || e != e || t != t || n != n || r != r || o != o ? NaN : e === 1 / 0 || e === -1 / 0 ? e : (e - t) * (o - r) / (n - t) + r
    }
}