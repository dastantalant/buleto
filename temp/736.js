 function (e, t, n) {
    "use strict";
    var r = function (e) {
        var t = e.c;
        return 0 === t || 37 === t ? "\n            <span>\n                <span className='green'>&#9650;</span>\n                <span className='red'>&#9660;</span>\n            </span>\n        " : t
    };
    t.a = function (e) {
        var t = e.result,
            n = e.coupon,
            o = e.top,
            a = e.left;
        if (!t)
            return null;
        var i = document.getElementById("tooltip-graph-content");
        if (i)
            i.style.top = o + "px",
                i.style.left = a + "px";
        else {
            var s = 0,
                l = t ? 37 === t.c ? 0 : t.c : null;
            t && n.get(l) && (s = n.get(l).amount);
            var c = document.createElement("DIV");
            c.innerHTML = '\n            <div class="tooltip-graph-content ' + (t.c <= 5 ? "tooltip-graph-content-revers" : "") + "\"}\n                id='tooltip-graph-content'\n                style=\"left: " + a + "px; top: " + o + 'px;">\n                <div class=\'tooltip-graph winning\'>\n                    <div class="sum-winning">' + s + "</div>\n                    <div class='number'>" + r(t) + "</div>\n                    <div class='sum'>" + t.v + "</div>\n                </div>\n            </div>\n        ",
                document.getElementById("graph-content").appendChild(c)
        }
    }
}