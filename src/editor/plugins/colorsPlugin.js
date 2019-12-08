var colorsPlugin = function(graph) {

    var fillFunc = function(fillColor, fontColor) {
        var selectedCells = graph.getSelectionCells();
        for (var i = 0; i < selectedCells.length; i++) {
            var cell = selectedCells[i];
            if (cell.edge) {
                graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, fillColor, [cell]);
            } else if (cell.vertex) {
                graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, fillColor, [cell]);
                graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, fontColor, [cell]);
            }
        }
    }

    var fillRedFunc = function() {
        fillFunc('red', 'white');
    }

    var fillGreenFunc = function() {
        fillFunc('green', 'white');
    }

    var fillYellowFunc = function() {
        fillFunc('yellow', 'black');
    }

    var fillBlueFunc = function() {
        fillFunc('#3671bf', 'white');
    }

    return {
        setDefaultStyle: fillBlueFunc,
        addCommandsToToolbar: function(toolbar) {
            toolbar.addItem('Fill red', 'images/red.gif', fillRedFunc);
            toolbar.addItem('Fill green', 'images/green.gif', fillGreenFunc);
            toolbar.addItem('Fill yellow', 'images/yellow.gif', fillYellowFunc);
            toolbar.addItem('Fill blue', 'images/blue.gif', fillBlueFunc);
        }
    };
}

/*
    check('fontStyle', mxConstants.STYLE_FONTSTYLE, mxConstants.DEFAULT_FONTSTYLE) ||
    check('family', mxConstants.STYLE_FONTFAMILY, mxConstants.DEFAULT_FONTFAMILY) ||
    check('size', mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE) ||
    check('color', mxConstants.STYLE_FONTCOLOR, 'black') ||
    check('align', mxConstants.STYLE_ALIGN, '') ||
    check('valign', mxConstants.STYLE_VERTICAL_ALIGN, '') ||
    check('spacing', mxConstants.STYLE_SPACING, 2) ||
    check('spacingTop', mxConstants.STYLE_SPACING_TOP, 0) ||
    check('spacingRight', mxConstants.STYLE_SPACING_RIGHT, 0) ||
    check('spacingBottom', mxConstants.STYLE_SPACING_BOTTOM, 0) ||
    check('spacingLeft', mxConstants.STYLE_SPACING_LEFT, 0) ||
    check('horizontal', mxConstants.STYLE_HORIZONTAL, true) ||
    check('background', mxConstants.STYLE_LABEL_BACKGROUNDCOLOR) ||
    check('border', mxConstants.STYLE_LABEL_BORDERCOLOR) ||
    check('opacity', mxConstants.STYLE_TEXT_OPACITY, 100) ||
    check('textDirection', mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION);
*/