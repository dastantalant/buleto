 function (e, t, n) {
    function r(e, t) {
        this.typeNumber = e,
            this.errorCorrectLevel = t,
            this.modules = null,
            this.moduleCount = 0,
            this.dataCache = null,
            this.dataList = []
    }
    var o = n(689),
        a = n(690),
        i = n(691),
        s = n(692),
        l = n(263),
        c = r.prototype;
    c.addData = function (e) {
        var t = new o(e);
        this.dataList.push(t),
            this.dataCache = null
    },
        c.isDark = function (e, t) {
            if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t)
                throw new Error(e + "," + t);
            return this.modules[e][t]
        },
        c.getModuleCount = function () {
            return this.moduleCount
        },
        c.make = function () {
            if (this.typeNumber < 1) {
                var e = 1;
                for (e = 1; e < 40; e++) {
                    for (var t = a.getRSBlocks(e, this.errorCorrectLevel), n = new i, r = 0, o = 0; o < t.length; o++)
                        r += t[o].dataCount;
                    for (var o = 0; o < this.dataList.length; o++) {
                        var l = this.dataList[o];
                        n.put(l.mode, 4),
                            n.put(l.getLength(), s.getLengthInBits(l.mode, e)),
                            l.write(n)
                    }
                    if (n.getLengthInBits() <= 8 * r)
                        break
                }
                this.typeNumber = e
            }
            this.makeImpl(!1, this.getBestMaskPattern())
        },
        c.makeImpl = function (e, t) {
            this.moduleCount = 4 * this.typeNumber + 17,
                this.modules = new Array(this.moduleCount);
            for (var n = 0; n < this.moduleCount; n++) {
                this.modules[n] = new Array(this.moduleCount);
                for (var o = 0; o < this.moduleCount; o++)
                    this.modules[n][o] = null
            }
            this.setupPositionProbePattern(0, 0),
                this.setupPositionProbePattern(this.moduleCount - 7, 0),
                this.setupPositionProbePattern(0, this.moduleCount - 7),
                this.setupPositionAdjustPattern(),
                this.setupTimingPattern(),
                this.setupTypeInfo(e, t),
                this.typeNumber >= 7 && this.setupTypeNumber(e),
                null == this.dataCache && (this.dataCache = r.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
                this.mapData(this.dataCache, t)
        },
        c.setupPositionProbePattern = function (e, t) {
            for (var n = -1; n <= 7; n++)
                if (!(e + n <= -1 || this.moduleCount <= e + n))
                    for (var r = -1; r <= 7; r++)
                        t + r <= -1 || this.moduleCount <= t + r || (this.modules[e + n][t + r] = 0 <= n && n <= 6 && (0 == r || 6 == r) || 0 <= r && r <= 6 && (0 == n || 6 == n) || 2 <= n && n <= 4 && 2 <= r && r <= 4)
        },
        c.getBestMaskPattern = function () {
            for (var e = 0, t = 0, n = 0; n < 8; n++) {
                this.makeImpl(!0, n);
                var r = s.getLostPoint(this);
                (0 == n || e > r) && (e = r,
                    t = n)
            }
            return t
        },
        c.createMovieClip = function (e, t, n) {
            var r = e.createEmptyMovieClip(t, n);
            this.make();
            for (var o = 0; o < this.modules.length; o++)
                for (var a = 1 * o, i = 0; i < this.modules[o].length; i++) {
                    var s = 1 * i,
                        l = this.modules[o][i];
                    l && (r.beginFill(0, 100),
                        r.moveTo(s, a),
                        r.lineTo(s + 1, a),
                        r.lineTo(s + 1, a + 1),
                        r.lineTo(s, a + 1),
                        r.endFill())
                }
            return r
        },
        c.setupTimingPattern = function () {
            for (var e = 8; e < this.moduleCount - 8; e++)
                null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
            for (var t = 8; t < this.moduleCount - 8; t++)
                null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0)
        },
        c.setupPositionAdjustPattern = function () {
            for (var e = s.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++)
                for (var n = 0; n < e.length; n++) {
                    var r = e[t],
                        o = e[n];
                    if (null == this.modules[r][o])
                        for (var a = -2; a <= 2; a++)
                            for (var i = -2; i <= 2; i++)
                                this.modules[r + a][o + i] = -2 == a || 2 == a || -2 == i || 2 == i || 0 == a && 0 == i
                }
        },
        c.setupTypeNumber = function (e) {
            for (var t = s.getBCHTypeNumber(this.typeNumber), n = 0; n < 18; n++) {
                var r = !e && 1 == (t >> n & 1);
                this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = r
            }
            for (var n = 0; n < 18; n++) {
                var r = !e && 1 == (t >> n & 1);
                this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = r
            }
        },
        c.setupTypeInfo = function (e, t) {
            for (var n = this.errorCorrectLevel << 3 | t, r = s.getBCHTypeInfo(n), o = 0; o < 15; o++) {
                var a = !e && 1 == (r >> o & 1);
                o < 6 ? this.modules[o][8] = a : o < 8 ? this.modules[o + 1][8] = a : this.modules[this.moduleCount - 15 + o][8] = a
            }
            for (var o = 0; o < 15; o++) {
                var a = !e && 1 == (r >> o & 1);
                o < 8 ? this.modules[8][this.moduleCount - o - 1] = a : o < 9 ? this.modules[8][15 - o - 1 + 1] = a : this.modules[8][15 - o - 1] = a
            }
            this.modules[this.moduleCount - 8][8] = !e
        },
        c.mapData = function (e, t) {
            for (var n = -1, r = this.moduleCount - 1, o = 7, a = 0, i = this.moduleCount - 1; i > 0; i -= 2)
                for (6 == i && i--; ;) {
                    for (var l = 0; l < 2; l++)
                        if (null == this.modules[r][i - l]) {
                            var c = !1;
                            a < e.length && (c = 1 == (e[a] >>> o & 1));
                            var u = s.getMask(t, r, i - l);
                            u && (c = !c),
                                this.modules[r][i - l] = c,
                                o--, -1 == o && (a++,
                                    o = 7)
                        }
                    if ((r += n) < 0 || this.moduleCount <= r) {
                        r -= n,
                            n = -n;
                        break
                    }
                }
        },
        r.PAD0 = 236,
        r.PAD1 = 17,
        r.createData = function (e, t, n) {
            for (var o = a.getRSBlocks(e, t), l = new i, c = 0; c < n.length; c++) {
                var u = n[c];
                l.put(u.mode, 4),
                    l.put(u.getLength(), s.getLengthInBits(u.mode, e)),
                    u.write(l)
            }
            for (var d = 0, c = 0; c < o.length; c++)
                d += o[c].dataCount;
            if (l.getLengthInBits() > 8 * d)
                throw new Error("code length overflow. (" + l.getLengthInBits() + ">" + 8 * d + ")");
            for (l.getLengthInBits() + 4 <= 8 * d && l.put(0, 4); l.getLengthInBits() % 8 != 0;)
                l.putBit(!1);
            for (; ;) {
                if (l.getLengthInBits() >= 8 * d)
                    break;
                if (l.put(r.PAD0, 8),
                    l.getLengthInBits() >= 8 * d)
                    break;
                l.put(r.PAD1, 8)
            }
            return r.createBytes(l, o)
        },
        r.createBytes = function (e, t) {
            for (var n = 0, r = 0, o = 0, a = new Array(t.length), i = new Array(t.length), c = 0; c < t.length; c++) {
                var u = t[c].dataCount,
                    d = t[c].totalCount - u;
                r = Math.max(r, u),
                    o = Math.max(o, d),
                    a[c] = new Array(u);
                for (var p = 0; p < a[c].length; p++)
                    a[c][p] = 255 & e.buffer[p + n];
                n += u;
                var h = s.getErrorCorrectPolynomial(d),
                    f = new l(a[c], h.getLength() - 1),
                    m = f.mod(h);
                i[c] = new Array(h.getLength() - 1);
                for (var p = 0; p < i[c].length; p++) {
                    var g = p + m.getLength() - i[c].length;
                    i[c][p] = g >= 0 ? m.get(g) : 0
                }
            }
            for (var y = 0, p = 0; p < t.length; p++)
                y += t[p].totalCount;
            for (var v = new Array(y), b = 0, p = 0; p < r; p++)
                for (var c = 0; c < t.length; c++)
                    p < a[c].length && (v[b++] = a[c][p]);
            for (var p = 0; p < o; p++)
                for (var c = 0; c < t.length; c++)
                    p < i[c].length && (v[b++] = i[c][p]);
            return v
        },
        e.exports = r
}