var configureControls = function(graph) {
    return function(mxCellRenderer) {
        // Specifies the URL and size of the new control
        var deleteImage = new mxImage('images/delete2.png', 10, 10);

        // Overridden to add an additional control to the state at creation time
        mxCellRendererCreateControl = mxCellRenderer.prototype.createControl;
        mxCellRenderer.prototype.createControl = function(state) {
            mxCellRendererCreateControl.apply(this, arguments);

            var graph = state.view.graph;

            if (graph.getModel().isVertex(state.cell)) {
                if (state.deleteControl == null) {
                    var b = new mxRectangle(0, 0, deleteImage.width, deleteImage.height);
                    state.deleteControl = new mxImageShape(b, deleteImage.src);
                    state.deleteControl.dialect = graph.dialect;
                    state.deleteControl.preserveImageAspect = false;

                    this.initControl(state, state.deleteControl, false, function(evt) {
                        if (graph.isEnabled()) {
                            graph.removeCells([state.cell]);
                            mxEvent.consume(evt);
                        }
                    });
                }
            } else if (state.deleteControl != null) {
                state.deleteControl.destroy();
                state.deleteControl = null;
            }
        };

        // Helper function to compute the bounds of the control
        var getDeleteControlBounds = function(state) {
            if (state.deleteControl != null) {
                var oldScale = state.deleteControl.scale;
                var w = state.deleteControl.bounds.width / oldScale;
                var h = state.deleteControl.bounds.height / oldScale;
                var s = state.view.scale;

                return (state.view.graph.getModel().isEdge(state.cell)) ?
                    new mxRectangle(state.x + state.width / 2 - w / 2 * s,
                        state.y + state.height / 2 - h / 2 * s, w * s, h * s) :
                    new mxRectangle(state.x + state.width - w * s,
                        state.y, w * s, h * s);
            }

            return null;
        };

        // Overridden to update the scale and bounds of the control
        mxCellRendererRedrawControl = mxCellRenderer.prototype.redrawControl;
        mxCellRenderer.prototype.redrawControl = function(state) {
            mxCellRendererRedrawControl.apply(this, arguments);

            if (state.deleteControl != null) {
                var bounds = getDeleteControlBounds(state);
                var s = state.view.scale;

                if (state.deleteControl.scale != s || !state.deleteControl.bounds.equals(bounds)) {
                    state.deleteControl.bounds = bounds;
                    state.deleteControl.scale = s;
                    state.deleteControl.redraw();
                }
            }
        };

        // Overridden to remove the control if the state is destroyed
        mxCellRendererDestroy = mxCellRenderer.prototype.destroy;
        mxCellRenderer.prototype.destroy = function(state) {
            mxCellRendererDestroy.apply(this, arguments);

            if (state.deleteControl != null) {
                state.deleteControl.destroy();
                state.deleteControl = null;
            }
        };
    }
}