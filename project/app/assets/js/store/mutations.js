export default {
    appGlobalFail(state) {
        state.hasGlobalError = true;
    },

    moduleUpdate(state, module) {
        let moduleIndex = _.findIndex(state.modules, {'name': module.name});

        if (moduleIndex === -1) {
            return;
        }

        state.modules = [
            ...state.modules.splice(moduleIndex, 1, module)
        ];
    }
};