const { removeAppClipAttrs, renameDataColor, migrateSegmentStyles } = require("./plugins")

// All of these work on App Clip codes without making visual differences, for the most part.
const builtInPlugins = [
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",
    "cleanupAttrs",
    "mergeStyles",
    "inlineStyles",
    "cleanupIDs",
    "removeUselessDefs",
    "cleanupNumericValues",
    "convertColors",
    "removeNonInheritableGroupAttrs",
    "removeUselessStrokeAndFill",
    "cleanupEnableBackground",
    "removeHiddenElems",
    "removeEmptyText",
    "convertShapeToPath",
    "convertEllipseToCircle",
    "moveElemsAttrsToGroup",
    "moveGroupAttrsToElems",
    "collapseGroups",
    "convertPathData",
    "convertTransform",
    "removeEmptyAttrs",
    "removeEmptyContainers",
    "mergePaths",
    "sortDefsChildren",
    "removeTitle",
    "removeDesc"
];

const plugins = [
    {
        name: 'removeAttrs',
        params: {
            attrs: ["id", "data-design", "data-payload", "data-logo-type", "name"]
        }
    },
    removeAppClipAttrs,
    renameDataColor,
    migrateSegmentStyles
].concat(builtInPlugins.map((name) => {
    // convertPathData needs a higher precision to avoid offsetting the centre image.
    const floatPrecision = name == "convertPathData" ? 2 : 1;
    return { name, params: { floatPrecision } }
}));

module.exports = {
    multipass: true,
    plugins
};