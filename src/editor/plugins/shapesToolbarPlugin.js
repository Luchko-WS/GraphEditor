var shapesToolbarPlugin = function(graph) {
    return {
        createToolbar: function(toolbar) {
            toolbar.enabled = false;

            var addVertex = function(icon, w, h, style) {
                var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
                vertex.setVertex(true);
                addToolbarItem(graph, toolbar, vertex, icon);
            };

            addVertex('images/rectangle.gif', 100, 40, '');
            addVertex('images/ellipse.gif', 100, 100, 'shape=ellipse');
            addVertex('images/rhombus.gif', 40, 40, 'shape=rhombus');
            addVertex('images/triangle.gif', 40, 40, 'shape=triangle');

            function addToolbarItem(graph, toolbar, prototype, image) {
                var funct = function(graph, evt, cell, x, y) {
                    var vertex = graph.getModel().cloneCell(prototype);
                    vertex.geometry.x = x;
                    vertex.geometry.y = y;

                    graph.addCell(vertex);
                    graph.setSelectionCell(vertex);
                }

                // Creates the image which is used as the drag icon (preview)
                var img = toolbar.addMode(null, image, function(evt, cell) {
                    var pt = this.graph.getPointForEvent(evt);
                    funct(graph, evt, cell, pt.x, pt.y);
                });

                mxUtils.makeDraggable(img, graph, funct);
                return img;
            }
        }
    }
}