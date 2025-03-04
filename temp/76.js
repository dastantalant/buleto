 function (e, t, n) {
    var r = n(33),
        o = n(5),
        a = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
    (e.exports = function (e, t) {
        return a[e] || (a[e] = void 0 !== t ? t : {})
    })("versions", []).push({
        version: r.version,
        mode: n(50) ? "pure" : "global",
        copyright: "\xa9 2019 Denis Pushkarev (zloirock.ru)"
    })
}