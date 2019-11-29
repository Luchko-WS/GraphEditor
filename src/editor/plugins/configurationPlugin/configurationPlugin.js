var configurationPlugin = function(graph) {
    return {
        configureConnections: configureConnections(graph),
        configureControls: configureControls(graph),
        configureDynamicGrid: configureDynamicGrid(graph)
    };
}