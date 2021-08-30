//
// The App Clip generator is a bit inefficient, and attaches an inline style attribute
// to every node making up the 'ridges' of the code, despite them all being the same.
//
// This plugin simply grabs those styles and puts them in an inline CSS node at the top,
// and then removes the style attribute from each of the ridges.
//
// This accounts for the majority of the savings.
//

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
    // We only ever want to run one pass
    if (extra.multipassCount && extra.multipassCount > 0) return {};
    // Get the root <svg> element
    const svgNode = root.querySelector("svg");

    // Grab the first 'ridge' node of each colour
    const firstColourNode = svgNode.querySelector("[c='0']"), secondColourNode = svgNode.querySelector("[c='1']");

    // Add an inline <style> node with the CSS of those nodes
    const styleNode = createStyleNode(`[c="0"]{${firstColourNode.attributes.style}}[c="1"]{${secondColourNode.attributes.style}}`);
    svgNode.children.push(styleNode);

    return {
        element: {
            enter: (node) => {
                // Finally, remove the inline style attribute from all the ridges
                if (node.attributes && node.attributes.c) delete node.attributes.style;
            }
        }
    };
};