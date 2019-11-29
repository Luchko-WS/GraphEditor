var copyPastePlugin = function(graph) {
    var copyFunc = function() {
        mxClipboard.copy(graph, graph.getSelectionCells());
    };

    var cutFunc = function() {
        mxClipboard.cut(graph, graph.getSelectionCells());
    };

    var pasteFunc = function() {
        mxClipboard.paste(graph);
    };

    mxEvent.addListener(document, 'keydown', function(evt) {
        if (graph.isEnabled() && !graph.isMouseDown && !graph.isEditing()) {
            if (event.ctrlKey) {
                if (evt.keyCode == 67 /* C */ ) {
                    copyFunc();
                } else if (evt.keyCode == 88 /* X */ ) {
                    cutFunc();
                }
            }
        }
    });

    mxEvent.addListener(document, 'keyup', function(event) {
        if (graph.isEnabled() && !graph.isMouseDown && !graph.isEditing()) {
            if (event.ctrlKey && event.keyCode == 86 /* V */ ) {
                pasteFunc();
            }
        }
    });

    return {
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Copy', 'images/copy.gif', copyFunc);
            toolbar.addItem('Cut', 'images/cut.gif', cutFunc);
            toolbar.addItem('Paste', 'images/paste.gif', pasteFunc);
        }
    }
}