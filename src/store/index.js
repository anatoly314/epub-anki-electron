import Vue from 'vue'
import Vuex from 'vuex'


import markdown from './markdown.store';
Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        markdown
    }
});
