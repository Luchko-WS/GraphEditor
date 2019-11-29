var configurationPlugin = function(graph) {
    return {
        configureConnections: configureConnections(graph),
        configureDynamicGrid: configureDynamicGrid(graph)
    };
}