var configurationPlugin = function(graph) {
    return {
        configureConnections: configureConnections(graph),
        configureControls: configureControls(graph),
        configureCopyAndPaste: configureCopyAndPaste(graph),
        configureDynamicGrid: configureDynamicGrid(graph)
    };
}