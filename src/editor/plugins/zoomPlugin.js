var zoomPlugin = function(mxUtils, graph) {
    return {
        setCenterZoom: function() {
            graph.centerZoom = true;
        },
        getZoomInButton: function(label) {
            return mxUtils.button(label, function() {
                graph.zoomIn();
            });
        },
        getZoomOutButton: function(label) {
            return mxUtils.button(label, function() {
                graph.zoomOut();
            });
        },
        getZoomActualButton: function(label) {
            return mxUtils.button('0', function() {
                graph.zoomActual();
            });
        }
    };
}