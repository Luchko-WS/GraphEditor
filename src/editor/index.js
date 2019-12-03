var runApp = function(
    graphContainer,
    shapesToolBarContainer,
    commandToolBarContainer,
    outlineContainer,
    colorsToolBarContainer) {

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

            var shapesToolbar = toolbarPlugin().getNewToolbar(shapesToolBarContainer);
            runShapesToolbarPluginPlugin(shapesToolbarPlugin(graph), shapesToolbar);

            var commandsToolbar = toolbarPlugin().getNewToolbar(commandToolBarContainer);
            runCopyPastePlugin(copyPastePlugin(graph), commandsToolbar);
            runCellsManagementPlugin(cellsManagementPlugin(graph), commandsToolbar);
            runUndoRedoPlugin(undoRedoPlugin(graph), commandsToolbar);
            runZoomPlugin(zoomPlugin(graph), commandsToolbar);
            runOutlinePlugin(outlinePlugin(graph, outlineContainer), commandsToolbar);
            runExportPlugin(exportPlugin(graph), commandsToolbar);

            var colorsToolbar = toolbarPlugin().getNewToolbar(colorsToolBarContainer);
            runColorsPlugin(colorsPlugin(graph), colorsToolbar);
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
            configurationPlugin.configureConnections(mxGraph, mxShape, mxPolyline);
            configurationPlugin.configureDynamicGrid(graphContainer, mxGraphView, document);
        }

        function runShapesToolbarPluginPlugin(shapesToolbarPlugin, shapesToolbar) {
            shapesToolbarPlugin.createToolbar(shapesToolbar);
        }

        function runCopyPastePlugin(copyPastePlugin, commandsToolbar) {
            copyPastePlugin.addCommandsToToolbar(commandsToolbar);
        }

        function runCellsManagementPlugin(cellsManagementPlugin, commandsToolbar) {
            cellsManagementPlugin.addCommandsToToolbar(commandsToolbar);
        }

        function runUndoRedoPlugin(undoRedoPlugin, commandsToolbar) {
            undoRedoPlugin.init();
            undoRedoPlugin.addCommandsToToolbar(commandsToolbar);
        }

        function runZoomPlugin(zoomPlugin, commandsToolbar) {
            zoomPlugin.setCenterZoom(graph);
            zoomPlugin.addCommandsToToolbar(commandsToolbar);
        }

        function runOutlinePlugin(outlinePlugin, commandsToolbar) {;
            outlinePlugin.addCommandsToToolbar(commandsToolbar);
        }

        function runExportPlugin(exportPlugin, commandsToolbar) {;
            exportPlugin.addCommandsToToolbar(commandsToolbar);
        }

        function runColorsPlugin(colorsPlugin, colorsToolBarContainer) {
            colorsPlugin.addCommandsToToolbar(colorsToolBarContainer);
        }
    }
};

/*NOTES
LOOK AT  mxEditor
*/