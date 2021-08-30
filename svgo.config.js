const { removeAppClipAttrs, renameDataColor, migrateSegmentStyles } = require("./plugins")

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
    const floatPrecision = name == "convertPathData" ? 2 : 1;
    return { name, params: { floatPrecision } }
}));

module.exports = {
    multipass: true,
    plugins
};