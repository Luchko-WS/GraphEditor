var undoRedoPlugin = function(graph) {
    var undoManager = new mxUndoManager();

    var undoFunc = function() {
        undoManager.undo();
    };

    var redoFunc = function() {
        undoManager.redo();
    };

    mxEvent.addListener(document, 'keydown', function(evt) {
        // No dialog visible
        var source = mxEvent.getSource(evt);
        if (graph.isEnabled() && !graph.isMouseDown && !graph.isEditing()) {
            if (evt.ctrlKey) {
                if (evt.keyCode == 90 /* Z */ ) {
                    undoFunc();
                } else if (evt.keyCode == 89 /* Y */ ) {
                    redoFunc();
                }
            }
        }
    });

    return {
        init: function() {
            var listener = function(sender, event) {
                undoManager.undoableEditHappened(event.getProperty('edit'));
            };
            graph.getModel().addListener(mxEvent.UNDO, listener);
            graph.getView().addListener(mxEvent.UNDO, listener);
        },
        undo: undoFunc,
        redo: redoFunc,
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Undo', 'images/undo.gif', undoFunc);
            toolbar.addItem('Redo', 'images/redo.gif', redoFunc);
        }
    };
}