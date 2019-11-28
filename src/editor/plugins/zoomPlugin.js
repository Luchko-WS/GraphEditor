var zoomPlugin = function(graph) {
    var setCenterZoomFunc = function() {
        graph.centerZoom = true;
    };

    var zoomInFunc = function() {
        graph.zoomIn();
    };

    var zoomOutFunc = function() {
        graph.zoomOut();
    };

    var zoomActualFunc = function() {
        graph.zoomActual();
    };

    return {
        setCenterZoom: setCenterZoomFunc,
        zoomIn: zoomInFunc,
        zoomOut: zoomOutFunc,
        zoomActual: zoomActualFunc,
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Zoom In', 'images/zoomin.gif', zoomInFunc);
            toolbar.addItem('Zoom Out', 'images/zoomout.gif', zoomOutFunc);
            toolbar.addItem('Actual Zoom', 'images/zoomactual.gif', zoomActualFunc);
        }
    };
}