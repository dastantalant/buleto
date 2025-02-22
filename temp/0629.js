function(e, t, n) {
    "use strict";
    var r = n(0),
        o = n(629);
    if ("undefined" === typeof r)
        throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");
    var a = (new r.Component).updater;
    e.exports = o(r.Component, r.isValidElement, a)
}