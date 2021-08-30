const JSAPI = require('svgo/lib/svgo/jsAPI.js');

exports.name = 'migrateSegmentStyles';
exports.type = "visitor";

const createStyleNode = (text) => {
    return new JSAPI({
        type: "element",
        name: "style",
        children: [
            new JSAPI({ type: "text", value: text })
        ]
    });
}

exports.fn = (root, params, extra) => {
    if (extra.multipassCount && extra.multipassCount > 0) return {};
    const svgElem = root.querySelector("svg");

    const firstColorElem = root.querySelector("[c='0']"), secondColorElem = root.querySelector("[c='1']");

    const styleNode = createStyleNode(`[c="0"]{${firstColorElem.attributes.style}}[c="1"]{${secondColorElem.attributes.style}}`);
    svgElem.children.push(styleNode);

    return {
        element: {
            enter: (node) => {
                if (node.attributes && node.attributes.c) delete node.attributes.style;
            }
        }
    };
};