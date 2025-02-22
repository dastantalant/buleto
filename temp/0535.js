function(e, t, n) {
    var r = n(5),
        o = n(1),
        a = n(98),
        i = [].slice,
        s = /MSIE .\./.test(a),
        l = function(e) {
            return function(t, n) {
                var r = arguments.length > 2,
                    o = !!r && i.call(arguments, 2);
                return e(r ? function() {
                        ("function" == typeof t ? t : Function(t)).apply(this, o)
                    } :
                    t, n)
            }
        };
    o(o.G + o.B + o.F * s, {
        setTimeout: l(r.setTimeout),
        setInterval: l(r.setInterval)
    })
}