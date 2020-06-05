/*eslint-disable*/
import Vue from 'vue'
import App from './App'
import router from './router/routes'
import 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faSearch, faWindowClose, faComment, faStar, faEdit, faTrash, faFire, faTag, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueJwtDecode from 'vue-jwt-decode'
import Vuex from 'vuex'
 
library.add(faThumbsUp)
library.add(faThumbsDown)
library.add(faSearch)
library.add(faWindowClose)
library.add(faComment)
library.add(faStar)
library.add(faEdit)
library.add(faTrash)
library.add(faFire)
library.add(faTag)
library.add(faUser)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)


// import ES6 style
//import {VueMasonryPlugin} from 'vue-masonry';
//Vue.use(VueMasonryPlugin)

/*Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
*/



// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Vuex)

const MyPlugin = {}
MyPlugin.install = function (Vue, options) {

  // 1. add global method or property
  //Vue.myGlobalMethod = --
  Vue.getToken = function(){
      let token = localStorage.getItem("token");
      if(token != null){
        let currentTime = new Date().getTime();
        let tokenTime = localStorage.getItem("tokenTime");
        let difference = (currentTime - tokenTime) / (1000*60*60)
        if(difference > 1){
          token = null
          localStorage.setItem("token", null);
        }
      }
    //this.$store.dispatch('token', token);
    //this.$store.dispatch('signUserIn', token);
  return token;
  }
  Vue.storeToken= function(token){
    localStorage.setItem("token", token);
    localStorage.setItem("tokenTime", new Date().getTime());
    localStorage.setItem("id", VueJwtDecode.decode(token).sub);

    //this.$store.dispatch('signUserIn', token);
  }

  Vue.logOut=function(){
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTime");
    
    }
  
  Vue.hasBadWords = function(word){
    var r=false;
    var s = "a tomar por culo,a tomar por saco,anda a cagar,apestar,bastardo,basura,bicho,burro,cabron,cabrón,cacorro,cagar,calientapollas,capullo,cara de culo,cara de monda,carajo,chapero,chichi, chimba,un putero,verga,vete a la mierda,vete a la verga,vete al demonio,vete al infierno,zorra,zunga";
    var badWords = s.split(",");
    if(badWords.includes(word)){
      r=true;
    }
    return r;
  }

  Vue.limiteDeFotos = 50;
  
  // 2. add a global asset
  //Vue.directive('isAutenticado', function(){return Vue.getToken !=null;})
  
  // 3. add an instance method
  //Vue.prototype.$myMethod = ...
  //Vue.prototype.$logOut = 
  
  }


  Vue.use(MyPlugin)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
