var cellsManagementPlugin = function(graph) {
    var selectAllFunc = function() {
        graph.selectAll();
    }

    var deleteFunc = function() {
        graph.removeCells();
    };

    mxEvent.addListener(document, 'keydown', function(event) { //change event listener target
        // No dialog visible
        var source = mxEvent.getSource(event);
        if (graph.isEnabled() && !graph.isMouseDown && !graph.isEditing() && source.nodeName != 'INPUT') {
            if (event.ctrlKey) {
                if (event.keyCode == 65 /* A*/ ) {
                    selectAllFunc();
                }
            } else {
                if (event.keyCode == 46 /* Delete*/ ) {
                    deleteFunc();
                }
            }
        }
    });

    return {
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Delete', 'images/delete.gif', deleteFunc);
        }
    }
}