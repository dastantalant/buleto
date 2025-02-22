function(e, t, n) {
    var r = n(201),
        o = n(121).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function(e) {
        return r(e, o)
    }
}