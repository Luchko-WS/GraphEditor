var toolbarPlugin = function(mxClient, mxUtils, graph) {
    return {
        createToolbar: function() {
            // Creates the div for the toolbar
            var tbContainer = document.createElement('div');
            tbContainer.style.position = 'absolute';
            tbContainer.style.overflow = 'hidden';
            tbContainer.style.padding = '2px';
            tbContainer.style.left = '0px';
            tbContainer.style.top = '0px';
            tbContainer.style.width = '24px';
            tbContainer.style.bottom = '0px';
            tbContainer.style.backgroundColor = 'gray';

            document.body.appendChild(tbContainer);

            // Creates new toolbar without event processing
            var toolbar = new mxToolbar(tbContainer);
            toolbar.enabled = false

            var addVertex = function(icon, w, h, style) {
                var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
                vertex.setVertex(true);
                addToolbarItem(graph, toolbar, vertex, icon);
            };

            addVertex('images/rectangle.gif', 100, 40, '');
            //addVertex('editors/images/rounded.gif', 100, 40, 'shape=rounded');
            addVertex('images/ellipse.gif', 40, 40, 'shape=ellipse');
            //addVertex('editors/images/rhombus.gif', 40, 40, 'shape=rhombus');
            //addVertex('editors/images/triangle.gif', 40, 40, 'shape=triangle');
            //addVertex('editors/images/cylinder.gif', 40, 40, 'shape=cylinder');
            //addVertex('editors/images/actor.gif', 30, 40, 'shape=actor');

            function addToolbarItem(graph, toolbar, prototype, image) {
                // Function that is executed when the image is dropped on
                // the graph. The cell argument points to the cell under
                // the mousepointer if there is one.
                var funct = function(graph, evt, cell, x, y) {
                    graph.stopEditing(false);

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