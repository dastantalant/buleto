 function (e, t, n) {
    for (var r, o = n(5), a = n(22), i = n(56), s = i("typed_array"), l = i("view"), c = !(!o.ArrayBuffer || !o.DataView), u = c, d = 0, p = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); d < 9;)
        (r = o[p[d++]]) ? (a(r.prototype, s, !0),
            a(r.prototype, l, !0)) : u = !1;
    e.exports = {
        ABV: c,
        CONSTR: u,
        TYPED: s,
        VIEW: l
    }
}