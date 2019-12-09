var exportPlugin = function(graph) {
    var exportXmlFunc = function() {
        var encoder = new mxCodec();
        var node = encoder.encode(graph.getModel());
        window.importData = mxUtils.getPrettyXml(node);
        mxUtils.popup(mxUtils.getPrettyXml(node), true);
    };

    var importXmlFunc = function() {
        var xml = window.importData;
        var dec = new mxCodec(xml);
        dec.decode(xml, graph.getModel());
    }

    return {
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Export', 'images/save.gif', exportXmlFunc);
            toolbar.addItem('Import', 'images/diagram.gif', importXmlFunc);
        }
    };
}