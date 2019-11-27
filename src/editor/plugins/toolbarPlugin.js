var toolbarPlugin = function(mxClient, mxUtils, graph) {
    return {
        createToolbar: function(tbContainer) {
            if (!tbContainer) {
                console.error('Toolbar container is not created');
                return;
            }

            // Creates new toolbar without event processing
            var toolbar = new mxToolbar(tbContainer);
            toolbar.enabled = false

            var addVertex = function(icon, w, h, style) {
                var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
                vertex.setVertex(true);
                addToolbarItem(graph, toolbar, vertex, icon);
            };

            addVertex('images/rectangle.gif', 100, 40, '');
            addVertex('images/ellipse.gif', 100, 40, 'shape=ellipse');
            addVertex('images/rhombus.gif', 40, 40, 'shape=rhombus');
            addVertex('images/triangle.gif', 40, 40, 'shape=triangle');
            addVertex('images/hexagon.gif', 100, 40, 'shape=hexagon');
            addVertex('images/cloud.gif', 100, 40, 'shape=cloud');
            //addVertex('editors/images/cylinder.gif', 40, 40, 'shape=cylinder');
            //addVertex('editors/images/actor.gif', 30, 40, 'shape=actor');

            function addToolbarItem(graph, toolbar, prototype, image) {
                // Function that is executed when the image is dropped on
                // the graph. The cell argument points to the cell under
                // the mousepointer if there is one.
                var funct = function(graph, evt, cell, x, y) {
                    var vertex = graph.getModel().cloneCell(prototype);
                    vertex.geometry.x = x;
                    vertex.geometry.y = y;

                    /*
                        STYLES

                        dx: 0,
                        dy: 0,
                        scale: 1,
                        alpha: 1,
                        fillAlpha: 1,
                        strokeAlpha: 1,
                        fillColor: null,
                        gradientFillAlpha: 1,
                        gradientColor: null,
                        gradientAlpha: 1,
                        gradientDirection: null,
                        strokeColor: null,
                        strokeWidth: 1,
                        dashed: false,
                        dashPattern: '3 3',
                        fixDash: false,
                        lineCap: 'flat',
                        lineJoin: 'miter',
                        miterLimit: 10,
                        fontColor: '#000000',
                        fontBackgroundColor: null,
                        fontBorderColor: null,
                        fontSize: mxConstants.DEFAULT_FONTSIZE,
                        fontFamily: mxConstants.DEFAULT_FONTFAMILY,
                        fontStyle: 0,
                        shadow: false,
                        shadowColor: mxConstants.SHADOWCOLOR,
                        shadowAlpha: mxConstants.SHADOW_OPACITY,
                        shadowDx: mxConstants.SHADOW_OFFSET_X,
                        shadowDy: mxConstants.SHADOW_OFFSET_Y,
                        rotation: 0,
                        rotationCx: 0,
                        rotationCy: 0
                    */

                    //var shape = vertex.getStyle('shape');
                    //vertex.setStyle(shape + ';fillColor=yellow;strokeColor=black');

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