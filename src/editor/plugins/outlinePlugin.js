var outlinePlugin = function(graph) {
    var outlineContainerInner;

    var toggleOutlineFunc = function() {
        var hidenClassName = 'hiden';
        if (outlineContainerInner.classList.contains(hidenClassName)) {
            outlineContainerInner.classList.remove(hidenClassName);
        } else {
            outlineContainerInner.classList.add(hidenClassName);
        }
    };

    return {
        init: function(outlineContainer) {
            outlineContainerInner = outlineContainer;
            var outln = new mxOutline(graph, outlineContainer);
        },
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Toggle Outline', 'images/outline.gif', toggleOutlineFunc);
        }
    };
}