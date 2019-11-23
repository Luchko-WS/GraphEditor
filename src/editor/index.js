var runApp = function(container, document) {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        var graph = new mxGraph(container);
        graph.setPanning(true);
        mxEvent.disableContextMenu(container);
        // Enables rubberband selection
        new mxRubberband(graph);

        try {
            runConfigurationPlugin(configurationPlugin(graph));
            runZoomPlugin(zoomPlugin(mxUtils, graph));
            runToolbarPluginPlugin(toolbarPlugin(mxClient, mxUtils, graph));
        } catch (error) {
            console.error(error);
            return;
        }

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        //var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
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

        function runConfigurationPlugin(configurationPlugin) {
            configurationPlugin.configureControls(mxCellRenderer);
            configurationPlugin.configureConnections(mxGraph, mxShape, mxPolyline);
            configurationPlugin.configureCopyAndPaste(mxEvent);
            configurationPlugin.configureDynamicGrid(container, mxGraphView, document);

        }

        function runZoomPlugin(zoomPlugin) {
            zoomPlugin.setCenterZoom(graph);
            document.body.appendChild(zoomPlugin.getZoomInButton('+'));
            document.body.appendChild(zoomPlugin.getZoomOutButton('-'));
            document.body.appendChild(zoomPlugin.getZoomActualButton('0'));
        }

        function runToolbarPluginPlugin(toolbarPlugin) {
            toolbarPlugin.createToolbar();
        }
    }
};