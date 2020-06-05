<template>
    <div class="container">
        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#" ><strong>Jelou</strong>
            <img src="images/logo.png" alt="Logo" style="width:40px;">
          </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                
                <li class="nav-item active">
                  <a class="nav-link" href="index.html">Inicio <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="signUp.html">Registro  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="logIn.html">Entrar</a>
                </li>
                  <li class="nav-item">
                    <a class="nav-link" href="profile.html">Perfil </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="explore.html">Explorar</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="addPhoto.html">Añadir</a>
                  </li>
                  
                  <li class="nav-item ">
                    <a class="nav-link" href="updatePhoto.html">Modificar <span class="sr-only">(current)</span></a>
                  </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2 searchInput" type="search" placeholder="Buscar" aria-label="Buscar">
                <button class="btn btn-outline-success my-2 my-sm-0 searchBtn" type="submit"> 

                  <i class="fas fa-search"></i>

                </button>
              </form>
            </div>
          </nav><!--Navigation menu-->


          

          <div class="row text-center">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
    <div class="text-center">
        <h3 class="text-center pb-0 pt-4 mb-0">Crear etiqueta</h3>
        <hr class="new4">
        <h5 class="text-center">Crea una etiqueta para describir imágenes en Jelou! </h5>
        <div class="form-group text-center ">
            <input type="text" class="form-control" id="s" placeholder="Inserta aquí etiqueta a crear" style="background-color: white;"  >
          </div>
          <input type="submit" class="fadeIn third" value="Crear">

          
        </div>
        <a  href="deleteTag.html" class="pb-0 mt-4 fadeIn third text-center" strong>¿Buscas eliminar una etiqueta?<i class="fas fa-tag verde-ico " ></i></a>


        
          <div class="fadeIn fourth pb-4">
          <h3 class="text-center pb-0 pt-4 mb-0">Algunas etiquetas existentes</h3>
        <hr class="new4">
        <h5 class="text-center">Vegano</h5>
        <h5 class="text-center">Escapada</h5>
        <h5 class="text-center">Playa</h5>
        <h5 class="text-center">Verano</h5>
        <h5 class="text-center">Monada</h5>
        <h5 class="text-center">Ver más</h5>
        </div>
    </div>
    <div class="col-sm-2"></div>
    </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  data() {
    return {
      fotos: [],
    }
  },
  methods:{
     loadPhotos: function() {

       var ref = this
       axios.get('http://localhost:3000/photos').then(function(response){
        if(response.status==200){
          ref.muestraFotos(response.data); // Curioso esto. This es sobreescrito dentro de funciones anonimas
        }
        }).catch(function(error){
        console.log("Error al pedir las fotos: " + error);
        });
     },

     muestraFotos: function(data){
        console.log(data);

        this.fotos = Array.from(data);
        console.log(this.fotos);
     },

 },
 beforeMount(){
    this.loadPhotos()
 },
}
</script>