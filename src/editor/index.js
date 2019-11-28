var runApp = function(graphContainer, shapesToolBarContainer, commandToolBarContainer, outlineContainer) {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        var graph = new mxGraph(graphContainer);
        graph.setPanning(true);
        mxEvent.disableContextMenu(graphContainer);
        // Enables rubberband selection
        new mxRubberband(graph);

        try {
            runConfigurationPlugin(configurationPlugin(graph));
            runShapesToolbarPluginPlugin(shapesToolbarPlugin(mxUtils, graph));

            var commandsToolbar = toolbarPlugin().getNewToolbar(commandToolBarContainer);
            runZoomPlugin(zoomPlugin(graph), commandsToolbar);
            runUndoRedoPlugin(undoRedoPlugin(graph), commandsToolbar);
            runOutlinePlugin(outlinePlugin(graph), commandsToolbar);
            addDeleteButton(mxEvent, commandsToolbar); //TODO: remove this later!
        } catch (error) {
            console.error(error);
            return;
        }

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        //var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();

        /*graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, null, '1,', 20, 20, 80, 30);
            var v2 = graph.insertVertex(parent, null, '2', 200, 150, 80, 30);
            var v3 = graph.insertVertex(parent, null, '3', 300, 250, 80, 30);
            var v4 = graph.insertVertex(parent, null, '4', 200, 250, 80, 30);
            var v5 = graph.insertVertex(parent, null, '5', 100, 50, 80, 30);
            var e1 = graph.insertEdge(parent, null, '', v1, v2);
            var e2 = graph.insertEdge(parent, null, '', v2, v3);
            var e3 = graph.insertEdge(parent, null, '', v3, v4);
            var e4 = graph.insertEdge(parent, null, '', v4, v5);
        } finally {
            graph.getModel().endUpdate();
        }*/

        graph.getModel().endUpdate();

        function runConfigurationPlugin(configurationPlugin) {
            configurationPlugin.configureControls(mxCellRenderer);
            configurationPlugin.configureConnections(mxGraph, mxShape, mxPolyline);
            configurationPlugin.configureCopyAndPaste(mxEvent);
            configurationPlugin.configureDynamicGrid(graphContainer, mxGraphView, document);

        }

        function runShapesToolbarPluginPlugin(shapesToolbarPlugin) {
            shapesToolbarPlugin.createToolbar(shapesToolBarContainer);
        }

        function runZoomPlugin(zoomPlugin, commandsToolbar) {
            zoomPlugin.setCenterZoom(graph);
            zoomPlugin.addCommandsToToolbar(commandsToolbar);
        }

        function runUndoRedoPlugin(undoRedoPlugin, commandsToolbar) {
            undoRedoPlugin.init();
            undoRedoPlugin.addCommandsToToolbar(commandsToolbar);
        }

        function runOutlinePlugin(outlinePlugin, commandsToolbar) {
            outlinePlugin.init(outlineContainer);
            outlinePlugin.addCommandsToToolbar(commandsToolbar);
        }

        //TODO: move to plugin
        function addDeleteButton(mxEvent, commandsToolbar) {
            var deleteFunc = function() {
                graph.removeCells();
            };

            commandToolBarContainer.appendChild(mxUtils.button('Delete', deleteFunc));
            mxEvent.addListener(document, 'keydown', function(evt) { //change event listener target
                // No dialog visible
                var source = mxEvent.getSource(evt);

                if (graph.isEnabled() && !graph.isMouseDown && !graph.isEditing() && source.nodeName != 'INPUT') {
                    if (evt.keyCode == 46 /* Delete*/ ) {
                        deleteFunc();
                    }
                }
            });
        }
    }
};