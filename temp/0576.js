function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        this.locales = e,
            this.formats = t,
            this.pluralFn = n
    }

    function o(e) {
        this.id = e
    }

    function a(e, t, n, r, o) {
        this.id = e,
            this.useOrdinal = t,
            this.offset = n,
            this.options = r,
            this.pluralFn = o
    }

    function i(e, t, n, r) {
        this.id = e,
            this.offset = t,
            this.numberFormat = n,
            this.string = r
    }

    function s(e, t) {
        this.id = e,
            this.options = t
    }
    t.default = r,
        r.prototype.compile = function(e) {
            return this.pluralStack = [],
                this.currentPlural = null,
                this.pluralNumberFormat = null,
                this.compileMessage(e)
        },
        r.prototype.compileMessage = function(e) {
            if (!e || "messageFormatPattern" !== e.type)
                throw new Error('Message AST is not of type: "messageFormatPattern"');
            var t, n, r, o = e.elements,
                a = [];
            for (t = 0,
                n = o.length; t < n; t += 1)
                switch (r = o[t],
                    r.type) {
                    case "messageTextElement":
                        a.push(this.compileMessageText(r));
                        break;
                    case "argumentElement":
                        a.push(this.compileArgument(r));
                        break;
                    default:
                        throw new Error("Message element does not have a valid type")
                }
            return a
        },
        r.prototype.compileMessageText = function(e) {
            return this.currentPlural && /(^|[^\\])#/g.test(e.value) ? (this.pluralNumberFormat || (this.pluralNumberFormat = new Intl.NumberFormat(this.locales)),
                new i(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, e.value)) : e.value.replace(/\\#/g, "#")
        },
        r.prototype.compileArgument = function(e) {
            var t = e.format;
            if (!t)
                return new o(e.id);
            var n, r = this.formats,
                i = this.locales,
                l = this.pluralFn;
            switch (t.type) {
                case "numberFormat":
                    return n = r.number[t.style], {
                        id: e.id,
                        format: new Intl.NumberFormat(i, n).format
                    };
                case "dateFormat":
                    return n = r.date[t.style], {
                        id: e.id,
                        format: new Intl.DateTimeFormat(i, n).format
                    };
                case "timeFormat":
                    return n = r.time[t.style], {
                        id: e.id,
                        format: new Intl.DateTimeFormat(i, n).format
                    };
                case "pluralFormat":
                    return n = this.compileOptions(e),
                        new a(e.id, t.ordinal, t.offset, n, l);
                case "selectFormat":
                    return n = this.compileOptions(e),
                        new s(e.id, n);
                default:
                    throw new Error("Message element does not have a valid format type")
            }
        },
        r.prototype.compileOptions = function(e) {
            var t = e.format,
                n = t.options,
                r = {};
            this.pluralStack.push(this.currentPlural),
                this.currentPlural = "pluralFormat" === t.type ? e : null;
            var o, a, i;
            for (o = 0,
                a = n.length; o < a; o += 1)
                i = n[o],
                r[i.selector] = this.compileMessage(i.value);
            return this.currentPlural = this.pluralStack.pop(),
                r
        },
        o.prototype.format = function(e) {
            return e || "number" === typeof e ? "string" === typeof e ? e : String(e) : ""
        },
        a.prototype.getOption = function(e) {
            var t = this.options;
            return t["=" + e] || t[this.pluralFn(e - this.offset, this.useOrdinal)] || t.other
        },
        i.prototype.format = function(e) {
            var t = this.numberFormat.format(e - this.offset);
            return this.string.replace(/(^|[^\\])#/g, "$1" + t).replace(/\\#/g, "#")
        },
        s.prototype.getOption = function(e) {
            var t = this.options;
            return t[e] || t.other
        }
}