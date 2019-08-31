import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';
import VueMeta from 'vue-meta';
import VueFormGenerator from 'vue-form-generator';

// Plugins
Vue.use(BootstrapVue);
Vue.use(VueMeta);
Vue.use(VueFormGenerator);


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
