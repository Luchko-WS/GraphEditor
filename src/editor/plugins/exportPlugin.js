var exportPlugin = function(graph) {
    var exportImgFunc = function() {
        /*var xmlDoc = mxUtils.createXmlDocument();
        var root = xmlDoc.createElement('output');
        xmlDoc.appendChild(root);

        var xmlCanvas = new mxXmlCanvas2D(root);
        var imgExport = new mxImageExport();
        imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);

        var bounds = graph.getGraphBounds();
        var w = Math.ceil(bounds.x + bounds.width);
        var h = Math.ceil(bounds.y + bounds.height);

        var xml = mxUtils.getXml(root);
        console.log(xml);*/
        /*new mxXmlRequest('export', 'format=png&w=' + w +
                '&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml))
            .simulate(document, '_blank');*/

        /*var outputSvg = graph.getSvg("#FFFFFF", 1, null, null, true, null, null);
        console.log(outputSvg);*/
    };

    return {
        addCommandsToToolbar: function(toolbar) {
            /*toolbar.addItem('Save image', 'images/export.gif', exportImgFunc);*/
        }
    };

    //mxUtils.show(editor.graph, null, 10, 10);
}