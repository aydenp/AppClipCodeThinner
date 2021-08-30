//
// To save a tiny bit more space, rename 'data-color' to 'c' on the ridges.
//

exports.name = 'renameDataColor';
exports.type = "visitor";

exports.fn = (root, params) => {
    return {
        element: {
            enter: (node) => {
                const dataColor = node.attributes["data-color"];
                if (!dataColor) return;
                node.attributes.c = dataColor;
                delete node.attributes["data-color"];
            }
        }
    };
};