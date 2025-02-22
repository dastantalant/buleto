function(e, t, n) {
    "use strict";

    function r(e, t) {
        t = t || {},
            i.isArray(e) && (e = e.concat()),
            i.defineProperty(this, "_locale", {
                value: this._resolveLocale(e)
            }),
            i.defineProperty(this, "_options", {
                value: {
                    style: this._resolveStyle(t.style),
                    units: this._isValidUnits(t.units) && t.units
                }
            }),
            i.defineProperty(this, "_locales", {
                value: e
            }),
            i.defineProperty(this, "_fields", {
                value: this._findFields(this._locale)
            }),
            i.defineProperty(this, "_messages", {
                value: i.objCreate(null)
            });
        var n = this;
        this.format = function(e, t) {
            return n._format(e, t)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(243),
        a = n(583),
        i = n(584);
    t.default = r;
    var s = ["second", "second-short", "minute", "minute-short", "hour", "hour-short", "day", "day-short", "month", "month-short", "year", "year-short"],
        l = ["best fit", "numeric"];
    i.defineProperty(r, "__localeData__", {
            value: i.objCreate(null)
        }),
        i.defineProperty(r, "__addLocaleData", {
            value: function() {
                for (var e = 0; e < arguments.length; e++) {
                    var t = arguments[e];
                    if (!t || !t.locale)
                        throw new Error("Locale data provided to IntlRelativeFormat is missing a `locale` property value");
                    r.__localeData__[t.locale.toLowerCase()] = t,
                        o.default.__addLocaleData(t)
                }
            }
        }),
        i.defineProperty(r, "defaultLocale", {
            enumerable: !0,
            writable: !0,
            value: void 0
        }),
        i.defineProperty(r, "thresholds", {
            enumerable: !0,
            value: {
                second: 45,
                "second-short": 45,
                minute: 45,
                "minute-short": 45,
                hour: 22,
                "hour-short": 22,
                day: 26,
                "day-short": 26,
                month: 11,
                "month-short": 11
            }
        }),
        r.prototype.resolvedOptions = function() {
            return {
                locale: this._locale,
                style: this._options.style,
                units: this._options.units
            }
        },
        r.prototype._compileMessage = function(e) {
            var t, n = this._locales,
                r = (this._locale,
                    this._fields[e]),
                a = r.relativeTime,
                i = "",
                s = "";
            for (t in a.future)
                a.future.hasOwnProperty(t) && (i += " " + t + " {" + a.future[t].replace("{0}", "#") + "}");
            for (t in a.past)
                a.past.hasOwnProperty(t) && (s += " " + t + " {" + a.past[t].replace("{0}", "#") + "}");
            var l = "{when, select, future {{0, plural, " + i + "}}past {{0, plural, " + s + "}}}";
            return new o.default(l, n)
        },
        r.prototype._getMessage = function(e) {
            var t = this._messages;
            return t[e] || (t[e] = this._compileMessage(e)),
                t[e]
        },
        r.prototype._getRelativeUnits = function(e, t) {
            var n = this._fields[t];
            if (n.relative)
                return n.relative[e]
        },
        r.prototype._findFields = function(e) {
            for (var t = r.__localeData__, n = t[e.toLowerCase()]; n;) {
                if (n.fields)
                    return n.fields;
                n = n.parentLocale && t[n.parentLocale.toLowerCase()]
            }
            throw new Error("Locale data added to IntlRelativeFormat is missing `fields` for :" + e)
        },
        r.prototype._format = function(e, t) {
            var n = t && void 0 !== t.now ? t.now : i.dateNow();
            if (void 0 === e && (e = n), !isFinite(n))
                throw new RangeError("The `now` option provided to IntlRelativeFormat#format() is not in valid range.");
            if (!isFinite(e))
                throw new RangeError("The date value provided to IntlRelativeFormat#format() is not in valid range.");
            var r = a.default(n, e),
                o = this._options.units || this._selectUnits(r),
                s = r[o];
            if ("numeric" !== this._options.style) {
                var l = this._getRelativeUnits(s, o);
                if (l)
                    return l
            }
            return this._getMessage(o).format({
                0: Math.abs(s),
                when: s < 0 ? "past" : "future"
            })
        },
        r.prototype._isValidUnits = function(e) {
            if (!e || i.arrIndexOf.call(s, e) >= 0)
                return !0;
            if ("string" === typeof e) {
                var t = /s$/.test(e) && e.substr(0, e.length - 1);
                if (t && i.arrIndexOf.call(s, t) >= 0)
                    throw new Error('"' + e + '" is not a valid IntlRelativeFormat `units` value, did you mean: ' + t)
            }
            throw new Error('"' + e + '" is not a valid IntlRelativeFormat `units` value, it must be one of: "' + s.join('", "') + '"')
        },
        r.prototype._resolveLocale = function(e) {
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
            throw new Error("No locale data has been added to IntlRelativeFormat for: " + e.join(", ") + ", or the default locale: " + s)
        },
        r.prototype._resolveStyle = function(e) {
            if (!e)
                return l[0];
            if (i.arrIndexOf.call(l, e) >= 0)
                return e;
            throw new Error('"' + e + '" is not a valid IntlRelativeFormat `style` value, it must be one of: "' + l.join('", "') + '"')
        },
        r.prototype._selectUnits = function(e) {
            var t, n, o, a = s.filter(function(e) {
                return e.indexOf("-short") < 1
            });
            for (t = 0,
                n = a.length; t < n && (o = a[t], !(Math.abs(e[o]) < r.thresholds[o])); t += 1)
            ;
            return o
        }
}