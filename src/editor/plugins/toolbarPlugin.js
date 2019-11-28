var toolbarPlugin = function() {
    return {
        getNewToolbar: function(tbContainer) {
            if (!tbContainer) {
                console.error('Toolbar container is not created');
                return;
            }
            return new mxToolbar(tbContainer);
        }
    }
}