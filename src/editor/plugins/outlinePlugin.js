var outlinePlugin = function(graph, outlineContainer) {
    var outln = new mxOutline(graph, outlineContainer);
    var toggleOutlineFunc = function() {
        var hidenClassName = 'hiden';
        if (outlineContainer.classList.contains(hidenClassName)) {
            outlineContainer.classList.remove(hidenClassName);
        } else {
            outlineContainer.classList.add(hidenClassName);
        }
    };

    return {
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Toggle Outline', 'images/outline.gif', toggleOutlineFunc);
        }
    };
}