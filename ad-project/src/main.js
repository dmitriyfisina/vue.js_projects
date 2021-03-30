import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import "firebase/auth";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCBZiU6YCR10eQGYVdRFU2frV_qEL2ebFw",
  authDomain: "ad-project-412e4.firebaseapp.com",
  databaseURL: "https://ad-project-412e4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ad-project-412e4",
  storageBucket: "ad-project-412e4.appspot.com",
  messagingSenderId: "147496332196",
  appId: "1:147496332196:web:f98c515b9c4bacd763af31"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
    this.$store.dispatch('fetchAds');
  },
  render: h => h(App),
}).$mount('#app')
