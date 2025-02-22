function(e, t, n) {
    "use strict";
    t.a = function(e) {
        return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function() {
            return setTimeout(e, 0)
        })(e)
    }
}