 function (e, t, n) {
    (function (t) {
        t.IntlPolyfill = n(824),
            n(825),
            t.Intl || (t.Intl = t.IntlPolyfill,
                t.IntlPolyfill.__applyLocaleSensitivePrototypes()),
            e.exports = t.IntlPolyfill
    }).call(t, n(25))
}