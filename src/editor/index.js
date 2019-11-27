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
            runToolbarPluginPlugin(toolbarPlugin(mxClient, mxUtils, graph));
            runZoomPlugin(zoomPlugin(mxUtils, graph));
            runUndoRedoPlugin(undoRedoPlugin(graph));
            runOutlinePlugin(outlinePlugin(graph));
            addDeleteButton(mxEvent); //TODO: remove this later!
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

        function runToolbarPluginPlugin(toolbarPlugin) {
            toolbarPlugin.createToolbar(shapesToolBarContainer);
        }

        function runZoomPlugin(zoomPlugin) {
            zoomPlugin.setCenterZoom(graph);
            commandToolBarContainer.appendChild(zoomPlugin.getZoomInButton('+'));
            commandToolBarContainer.appendChild(zoomPlugin.getZoomOutButton('-'));
            commandToolBarContainer.appendChild(zoomPlugin.getZoomActualButton('0'));
        }

        function runUndoRedoPlugin(undoRedoPlugin) {
            undoRedoPlugin.init();
            commandToolBarContainer.appendChild(undoRedoPlugin.getUndoButton('undo'));
            commandToolBarContainer.appendChild(undoRedoPlugin.getRedoButton('redo'));
        }

        function runOutlinePlugin(outlinePlugin) {
            outlinePlugin.init(outlineContainer);
        }

        //TODO: move to plugin
        function addDeleteButton(mxEvent) {
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