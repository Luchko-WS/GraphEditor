var cellsManagementPlugin = function(graph, mxEvent) {
    var deleteFunc = function() {
        graph.removeCells();
    };

    mxEvent.addListener(document, 'keydown', function(evt) { //change event listener target
        // No dialog visible
        var source = mxEvent.getSource(evt);

        if (graph.isEnabled() && !graph.isMouseDown && !graph.isEditing() && source.nodeName != 'INPUT') {
            if (evt.keyCode == 46 /* Delete*/ ) {
                deleteFunc();
            }
        }
    });

    return {
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Delete', 'images/delete.gif', deleteFunc);
        }
    }
}