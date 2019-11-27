var outlinePlugin = function(graph) {
    return {
        init: function(outlineContainer) {
            var outln = new mxOutline(graph, outlineContainer);
        }
    };
}