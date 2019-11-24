var undoRedoPlugin = function(graph) {
    var undoManager = new mxUndoManager();
    return {
        init: function() {
            var listener = function(sender, event) {
                undoManager.undoableEditHappened(event.getProperty('edit'));
            };
            graph.getModel().addListener(mxEvent.UNDO, listener);
            graph.getView().addListener(mxEvent.UNDO, listener);
        },
        getUndoButton: function(label) {
            return mxUtils.button(label, function() {
                undoManager.undo();
            });
        },
        getRedoButton: function(label) {
            return mxUtils.button(label, function() {
                undoManager.redo();
            });
        }
    };
}