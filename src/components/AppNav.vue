<!-- src/components/AppNav.vue -->
<template>


        <nav class="navbar navbar-expand-lg navbar-light bg-light" white>
            <a class="navbar-brand" href="#" ><strong>Jelou</strong>
            <img src="../assets/images/logo.png" alt="Logo" style="width:40px;">
          </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                
                <li class="nav-item">
                  <!--<a class="nav-link" href="index.html">Inicio <span class="sr-only">(current)</span></a>-->
                  <router-link
                    to="/"
                    class="nav-item nav-link"
                    active-class="active"
                   
                    exact
                  >
                    Inicio
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="signup"
                    class="nav-item nav-link"
                    active-class="active"
                    exact
                     v-if="!isAutenticado"
                  >
                    Registro
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="login"
                    class="nav-item nav-link"
                    active-class="active"
                    exact
                     v-if="!isAutenticado"
                  >
                    Entrar
                  </router-link>
                </li>
                
                  <li v-if="isAutenticado" class="nav-item">
                    <router-link
                    to="homeFollowing"
                    class="nav-item nav-link"
                    active-class="active"
                    exact
                     v-if="isAutenticado"
                  >
                    Los que sigo
                  </router-link>
                  </li>
                  <li v-if="isAutenticado" class="nav-item">
                    <router-link
                    to="profile"
                    class="nav-item nav-link"
                    active-class="active"
                    exact
                     v-if="isAutenticado"
                  >
                    Perfil
                  </router-link>
                  </li>
                  <li v-if="isAutenticado" class="nav-item">
                    <router-link
                    to="explore"
                    class="nav-item nav-link"
                    active-class="active"
                    exact
                  >
                    Explorar
                  </router-link>
                  </li>
                  <li v-if="isAutenticado" class="nav-item">
                    <router-link
                    to="upload"
                    class="nav-item nav-link"
                    active-class="active"
                    exact
                  >
                    Añadir
                  </router-link>
                  </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2 searchInput" type="search" placeholder="Buscar" aria-label="Buscar">
                <button class="btn btn-outline-success my-2 my-sm-0 searchBtn" type="submit"> 

                  <font-awesome-icon icon="search" />

                </button>
              </form>
            </div>
          </nav><!--Navigation menu-->

</template>

<script>
import Vue from 'vue'

export default {
  name: 'AppNav',
  data() {
        return {
          isAutenticado:Vue.getToken()!=null,
        }
    },
    /*watch: {
    isAutenticado: function () {
      //if (isLocalStorage() // function to detect if localstorage is supported) {
        return Vue.getToken()!=null;
      //}
    },
    }*/
}
</script>