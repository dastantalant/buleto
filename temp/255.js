 function (e, t) {
    t.__esModule = !0;
    var n = (t.ATTRIBUTE_NAMES = {
        BODY: "bodyAttributes",
        HTML: "htmlAttributes",
        TITLE: "titleAttributes"
    },
        t.TAG_NAMES = {
            BASE: "base",
            BODY: "body",
            HEAD: "head",
            HTML: "html",
            LINK: "link",
            META: "meta",
            NOSCRIPT: "noscript",
            SCRIPT: "script",
            STYLE: "style",
            TITLE: "title"
        }),
        r = (t.VALID_TAG_NAMES = Object.keys(n).map(function (e) {
            return n[e]
        }),
            t.TAG_PROPERTIES = {
                CHARSET: "charset",
                CSS_TEXT: "cssText",
                HREF: "href",
                HTTPEQUIV: "http-equiv",
                INNER_HTML: "innerHTML",
                ITEM_PROP: "itemprop",
                NAME: "name",
                PROPERTY: "property",
                REL: "rel",
                SRC: "src"
            },
            t.REACT_TAG_MAP = {
                accesskey: "accessKey",
                charset: "charSet",
                class: "className",
                contenteditable: "contentEditable",
                contextmenu: "contextMenu",
                "http-equiv": "httpEquiv",
                itemprop: "itemProp",
                tabindex: "tabIndex"
            });
    t.HELMET_PROPS = {
        DEFAULT_TITLE: "defaultTitle",
        DEFER: "defer",
        ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
        ON_CHANGE_CLIENT_STATE: "onChangeClientState",
        TITLE_TEMPLATE: "titleTemplate"
    },
        t.HTML_TAG_MAP = Object.keys(r).reduce(function (e, t) {
            return e[r[t]] = t,
                e
        }, {}),
        t.SELF_CLOSING_TAGS = [n.NOSCRIPT, n.SCRIPT, n.STYLE],
        t.HELMET_ATTRIBUTE = "data-react-helmet"
}