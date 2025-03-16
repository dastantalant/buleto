 function (e, t, n) {
    "use strict";

    function r(e, t, n) {
        var o = "string" === typeof e ? r.__parse(e) : e;
        if (!o || "messageFormatPattern" !== o.type)
            throw new TypeError("A message must be provided as a String or AST.");
        n = this._mergeFormats(r.formats, n),
            a.defineProperty(this, "_locale", {
                value: this._resolveLocale(t)
            });
        var i = this._findPluralRuleFunction(this._locale),
            s = this._compilePattern(o, t, n, i),
            l = this;
        this.format = function (t) {
            try {
                return l._format(s, t)
            } catch (t) {
                throw t.variableId ? new Error("The intl string context variable '" + t.variableId + "' was not provided to the string '" + e + "'") : t
            }
        }
    }
    var o = n(244),
        a = n(574),
        i = n(575),
        s = n(576);
    t.default = r,
        a.defineProperty(r, "formats", {
            enumerable: !0,
            value: {
                number: {
                    currency: {
                        style: "currency"
                    },
                    percent: {
                        style: "percent"
                    }
                },
                date: {
                    short: {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit"
                    },
                    medium: {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    },
                    long: {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    },
                    full: {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    }
                },
                time: {
                    short: {
                        hour: "numeric",
                        minute: "numeric"
                    },
                    medium: {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric"
                    },
                    long: {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        timeZoneName: "short"
                    },
                    full: {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        timeZoneName: "short"
                    }
                }
            }
        }),
        a.defineProperty(r, "__localeData__", {
            value: a.objCreate(null)
        }),
        a.defineProperty(r, "__addLocaleData", {
            value: function (e) {
                if (!e || !e.locale)
                    throw new Error("Locale data provided to IntlMessageFormat is missing a `locale` property");
                r.__localeData__[e.locale.toLowerCase()] = e
            }
        }),
        a.defineProperty(r, "__parse", {
            value: s.default.parse
        }),
        a.defineProperty(r, "defaultLocale", {
            enumerable: !0,
            writable: !0,
            value: void 0
        }),
        r.prototype.resolvedOptions = function () {
            return {
                locale: this._locale
            }
        },
        r.prototype._compilePattern = function (e, t, n, r) {
            return new i.default(t, n, r).compile(e)
        },
        r.prototype._findPluralRuleFunction = function (e) {
            for (var t = r.__localeData__, n = t[e.toLowerCase()]; n;) {
                if (n.pluralRuleFunction)
                    return n.pluralRuleFunction;
                n = n.parentLocale && t[n.parentLocale.toLowerCase()]
            }
            throw new Error("Locale data added to IntlMessageFormat is missing a `pluralRuleFunction` for :" + e)
        },
        r.prototype._format = function (e, t) {
            var n, r, a, i, s, l, c = "";
            for (n = 0,
                r = e.length; n < r; n += 1)
                if ("string" !== typeof (a = e[n])) {
                    if (i = a.id, !t || !o.hop.call(t, i))
                        throw l = new Error("A value must be provided for: " + i),
                        l.variableId = i,
                        l;
                    s = t[i],
                        a.options ? c += this._format(a.getOption(s), t) : c += a.format(s)
                } else
                    c += a;
            return c
        },
        r.prototype._mergeFormats = function (e, t) {
            var n, r, i = {};
            for (n in e)
                o.hop.call(e, n) && (i[n] = r = a.objCreate(e[n]),
                    t && o.hop.call(t, n) && o.extend(r, t[n]));
            return i
        },
        r.prototype._resolveLocale = function (e) {
            "string" === typeof e && (e = [e]),
                e = (e || []).concat(r.defaultLocale);
            var t, n, o, a, i = r.__localeData__;
            for (t = 0,
                n = e.length; t < n; t += 1)
                for (o = e[t].toLowerCase().split("-"); o.length;) {
                    if (a = i[o.join("-")])
                        return a.locale;
                    o.pop()
                }
            var s = e.pop();
            throw new Error("No locale data has been added to IntlMessageFormat for: " + e.join(", ") + ", or the default locale: " + s)
        }
}