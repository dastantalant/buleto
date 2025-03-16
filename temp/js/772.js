 function (e, t, n) {
    "use strict";
    var r = TypeError,
        o = Object.getOwnPropertyDescriptor;
    if (o)
        try {
            o({}, "")
        } catch (e) {
            o = null
        }
    var a, i, s = function () {
        throw new r
    },
        l = o ? function () {
            try {
                return arguments.callee,
                    s
            } catch (e) {
                try {
                    return o(arguments, "callee").get
                } catch (e) {
                    return s
                }
            }
        }() : s,
        c = n(773)(),
        u = Object.getPrototypeOf || function (e) {
            return e.__proto__
        },
        d = a ? u(a) : void 0,
        p = i ? u(i) : void 0,
        h = i ? i() : void 0,
        f = "undefined" === typeof Uint8Array ? void 0 : u(Uint8Array),
        m = {
            "%Array%": Array,
            "%ArrayBuffer%": "undefined" === typeof ArrayBuffer ? void 0 : ArrayBuffer,
            "%ArrayBufferPrototype%": "undefined" === typeof ArrayBuffer ? void 0 : ArrayBuffer.prototype,
            "%ArrayIteratorPrototype%": c ? u([][Symbol.iterator]()) : void 0,
            "%ArrayPrototype%": Array.prototype,
            "%ArrayProto_entries%": Array.prototype.entries,
            "%ArrayProto_forEach%": Array.prototype.forEach,
            "%ArrayProto_keys%": Array.prototype.keys,
            "%ArrayProto_values%": Array.prototype.values,
            "%AsyncFromSyncIteratorPrototype%": void 0,
            "%AsyncFunction%": void 0,
            "%AsyncFunctionPrototype%": void 0,
            "%AsyncGenerator%": i ? u(h) : void 0,
            "%AsyncGeneratorFunction%": p,
            "%AsyncGeneratorPrototype%": p ? p.prototype : void 0,
            "%AsyncIteratorPrototype%": h && c && Symbol.asyncIterator ? h[Symbol.asyncIterator]() : void 0,
            "%Atomics%": "undefined" === typeof Atomics ? void 0 : Atomics,
            "%Boolean%": Boolean,
            "%BooleanPrototype%": Boolean.prototype,
            "%DataView%": "undefined" === typeof DataView ? void 0 : DataView,
            "%DataViewPrototype%": "undefined" === typeof DataView ? void 0 : DataView.prototype,
            "%Date%": Date,
            "%DatePrototype%": Date.prototype,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": Error,
            "%ErrorPrototype%": Error.prototype,
            "%eval%": eval,
            "%EvalError%": EvalError,
            "%EvalErrorPrototype%": EvalError.prototype,
            "%Float32Array%": "undefined" === typeof Float32Array ? void 0 : Float32Array,
            "%Float32ArrayPrototype%": "undefined" === typeof Float32Array ? void 0 : Float32Array.prototype,
            "%Float64Array%": "undefined" === typeof Float64Array ? void 0 : Float64Array,
            "%Float64ArrayPrototype%": "undefined" === typeof Float64Array ? void 0 : Float64Array.prototype,
            "%Function%": Function,
            "%FunctionPrototype%": Function.prototype,
            "%Generator%": a ? u(a()) : void 0,
            "%GeneratorFunction%": d,
            "%GeneratorPrototype%": d ? d.prototype : void 0,
            "%Int8Array%": "undefined" === typeof Int8Array ? void 0 : Int8Array,
            "%Int8ArrayPrototype%": "undefined" === typeof Int8Array ? void 0 : Int8Array.prototype,
            "%Int16Array%": "undefined" === typeof Int16Array ? void 0 : Int16Array,
            "%Int16ArrayPrototype%": "undefined" === typeof Int16Array ? void 0 : Int8Array.prototype,
            "%Int32Array%": "undefined" === typeof Int32Array ? void 0 : Int32Array,
            "%Int32ArrayPrototype%": "undefined" === typeof Int32Array ? void 0 : Int32Array.prototype,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": c ? u(u([][Symbol.iterator]())) : void 0,
            "%JSON%": "object" === typeof JSON ? JSON : void 0,
            "%JSONParse%": "object" === typeof JSON ? JSON.parse : void 0,
            "%Map%": "undefined" === typeof Map ? void 0 : Map,
            "%MapIteratorPrototype%": "undefined" !== typeof Map && c ? u((new Map)[Symbol.iterator]()) : void 0,
            "%MapPrototype%": "undefined" === typeof Map ? void 0 : Map.prototype,
            "%Math%": Math,
            "%Number%": Number,
            "%NumberPrototype%": Number.prototype,
            "%Object%": Object,
            "%ObjectPrototype%": Object.prototype,
            "%ObjProto_toString%": Object.prototype.toString,
            "%ObjProto_valueOf%": Object.prototype.valueOf,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": "undefined" === typeof Promise ? void 0 : Promise,
            "%PromisePrototype%": "undefined" === typeof Promise ? void 0 : Promise.prototype,
            "%PromiseProto_then%": "undefined" === typeof Promise ? void 0 : Promise.prototype.then,
            "%Promise_all%": "undefined" === typeof Promise ? void 0 : Promise.all,
            "%Promise_reject%": "undefined" === typeof Promise ? void 0 : Promise.reject,
            "%Promise_resolve%": "undefined" === typeof Promise ? void 0 : Promise.resolve,
            "%Proxy%": "undefined" === typeof Proxy ? void 0 : Proxy,
            "%RangeError%": RangeError,
            "%RangeErrorPrototype%": RangeError.prototype,
            "%ReferenceError%": ReferenceError,
            "%ReferenceErrorPrototype%": ReferenceError.prototype,
            "%Reflect%": "undefined" === typeof Reflect ? void 0 : Reflect,
            "%RegExp%": RegExp,
            "%RegExpPrototype%": RegExp.prototype,
            "%Set%": "undefined" === typeof Set ? void 0 : Set,
            "%SetIteratorPrototype%": "undefined" !== typeof Set && c ? u((new Set)[Symbol.iterator]()) : void 0,
            "%SetPrototype%": "undefined" === typeof Set ? void 0 : Set.prototype,
            "%SharedArrayBuffer%": "undefined" === typeof SharedArrayBuffer ? void 0 : SharedArrayBuffer,
            "%SharedArrayBufferPrototype%": "undefined" === typeof SharedArrayBuffer ? void 0 : SharedArrayBuffer.prototype,
            "%String%": String,
            "%StringIteratorPrototype%": c ? u(""[Symbol.iterator]()) : void 0,
            "%StringPrototype%": String.prototype,
            "%Symbol%": c ? Symbol : void 0,
            "%SymbolPrototype%": c ? Symbol.prototype : void 0,
            "%SyntaxError%": SyntaxError,
            "%SyntaxErrorPrototype%": SyntaxError.prototype,
            "%ThrowTypeError%": l,
            "%TypedArray%": f,
            "%TypedArrayPrototype%": f ? f.prototype : void 0,
            "%TypeError%": r,
            "%TypeErrorPrototype%": r.prototype,
            "%Uint8Array%": "undefined" === typeof Uint8Array ? void 0 : Uint8Array,
            "%Uint8ArrayPrototype%": "undefined" === typeof Uint8Array ? void 0 : Uint8Array.prototype,
            "%Uint8ClampedArray%": "undefined" === typeof Uint8ClampedArray ? void 0 : Uint8ClampedArray,
            "%Uint8ClampedArrayPrototype%": "undefined" === typeof Uint8ClampedArray ? void 0 : Uint8ClampedArray.prototype,
            "%Uint16Array%": "undefined" === typeof Uint16Array ? void 0 : Uint16Array,
            "%Uint16ArrayPrototype%": "undefined" === typeof Uint16Array ? void 0 : Uint16Array.prototype,
            "%Uint32Array%": "undefined" === typeof Uint32Array ? void 0 : Uint32Array,
            "%Uint32ArrayPrototype%": "undefined" === typeof Uint32Array ? void 0 : Uint32Array.prototype,
            "%URIError%": URIError,
            "%URIErrorPrototype%": URIError.prototype,
            "%WeakMap%": "undefined" === typeof WeakMap ? void 0 : WeakMap,
            "%WeakMapPrototype%": "undefined" === typeof WeakMap ? void 0 : WeakMap.prototype,
            "%WeakSet%": "undefined" === typeof WeakSet ? void 0 : WeakSet,
            "%WeakSetPrototype%": "undefined" === typeof WeakSet ? void 0 : WeakSet.prototype
        },
        g = n(170),
        y = g.call(Function.call, String.prototype.replace),
        v = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
        b = /\\(\\)?/g,
        _ = function (e) {
            var t = [];
            return y(e, v, function (e, n, r, o) {
                t[t.length] = r ? y(o, b, "$1") : n || e
            }),
                t
        },
        w = function (e, t) {
            if (!(e in m))
                throw new SyntaxError("intrinsic " + e + " does not exist!");
            if ("undefined" === typeof m[e] && !t)
                throw new r("intrinsic " + e + " exists, but is not available. Please file an issue!");
            return m[e]
        };
    e.exports = function (e, t) {
        if ("string" !== typeof e || 0 === e.length)
            throw new TypeError("intrinsic name must be a non-empty string");
        if (arguments.length > 1 && "boolean" !== typeof t)
            throw new TypeError('"allowMissing" argument must be a boolean');
        for (var n = _(e), a = w("%" + (n.length > 0 ? n[0] : "") + "%", t), i = 1; i < n.length; i += 1)
            if (null != a)
                if (o && i + 1 >= n.length) {
                    var s = o(a, n[i]);
                    if (!t && !(n[i] in a))
                        throw new r("base intrinsic for " + e + " exists, but the property is not available.");
                    a = s ? s.get || s.value : a[n[i]]
                } else
                    a = a[n[i]];
        return a
    }
}