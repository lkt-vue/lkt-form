import {App, Plugin} from 'vue';
import {default as libComponent} from './lib-components/LktForm.vue';

import "./../styles.css";
import {setModalCanvas} from "lkt-vue-kernel";

const LktForm: Plugin = {
    install: (app: App) => {
        // Register plugin components
        if (app.component('lkt-form') === undefined) app.component('lkt-form', libComponent);
    }
};

export default LktForm;

/** @deprecated */
export const setCanvas = (component: any): void => {
    //@ts-ignore
    setModalCanvas(component);
};
