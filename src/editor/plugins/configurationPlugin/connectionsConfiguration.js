var configureConnections = function(graph) {
    return function(mxGraph, mxShape, mxPolyline) {
        graph.setConnectable(true);

        // Specifies the default edge style
        var edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();
        edgeStyle['edgeStyle'] = 'loopEdgeStyle';
        edgeStyle['endArrow'] = 'none';
        edgeStyle['fontColor'] = 'black';
        //edgeStyle['strokeColor'] = 'red';
        edgeStyle['strokeWidth'] = 2;

        mxGraph.prototype.getAllConnectionConstraints = function(terminal, source) {
            if (terminal != null && terminal.shape != null) {
                if (terminal.shape.stencil != null) {
                    if (terminal.shape.stencil != null) {
                        return terminal.shape.stencil.constraints;
                    }
                } else if (terminal.shape.constraints != null) {
                    return terminal.shape.constraints;
                }
            }

            return null;
        };

        // Defines the default constraints for all shapes
        mxShape.prototype.constraints = [
            //new mxConnectionConstraint(new mxPoint(0.25, 0), true),
            new mxConnectionConstraint(new mxPoint(0.5, 0), true),
            //new mxConnectionConstraint(new mxPoint(0.75, 0), true),
            //new mxConnectionConstraint(new mxPoint(0, 0.25), true),
            new mxConnectionConstraint(new mxPoint(0, 0.5), true),
            //new mxConnectionConstraint(new mxPoint(0, 0.75), true),
            //new mxConnectionConstraint(new mxPoint(1, 0.25), true),
            new mxConnectionConstraint(new mxPoint(1, 0.5), true),
            //new mxConnectionConstraint(new mxPoint(1, 0.75), true),
            //new mxConnectionConstraint(new mxPoint(0.25, 1), true),
            new mxConnectionConstraint(new mxPoint(0.5, 1), true),
            //new mxConnectionConstraint(new mxPoint(0.75, 1), true)
        ];

        // Edges have no connection points
        mxPolyline.prototype.constraints = null;

        // Enables connect preview for the default edge style
        graph.connectionHandler.createEdgeState = function(me) {
            var edge = graph.createEdge(null, null, null, null, null);
            return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
        };
    }
}