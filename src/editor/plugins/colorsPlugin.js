var colorsPlugin = function(graph) {

    var fillFunc = function(color) {
        graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, color, [graph.getSelectionCell()]);
    }

    var fillRedFunc = function() {
        fillFunc('red');
    }

    var fillGreenFunc = function() {
        fillFunc('green');
    }

    var fillYellowFunc = function() {
        fillFunc('yellow');
    }

    var fillBlueFunc = function() {
        fillFunc('blue');
    }

    return {
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Fill red', 'images/red.gif', fillRedFunc);
            toolbar.addItem('Fill green', 'images/green.gif', fillGreenFunc);
            toolbar.addItem('Fill yellow', 'images/yellow.gif', fillYellowFunc);
            toolbar.addItem('Fill blue', 'images/blue.gif', fillBlueFunc);
        }
    };
}