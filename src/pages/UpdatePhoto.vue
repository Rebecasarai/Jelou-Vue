<template>
    <div class="container">
        

           <!--Login/Sign up-->
           <div class="wrapper fadeInDown">
            <div id="formContent">
              <!-- Tabs Titles -->
          
              <!-- Icon -->
              <div class="fadeIn first">
                <img id="image" :src="foto.url" alt="..." class="img-thumbnail rounded mx-auto d-block">
              </div>
          
              <!-- Login Form -->
              
              <form>
                
                <input type="text" class="fadeIn second" name="title" v-model="foto.title">
                <input type="text" class="fadeIn second" name="login" v-model="foto.description">

                <a class="pb-0 fadeIn third" strong>Añadir etiquetas <i class="fas fa-tag verde-ico " ></i></a>
                <p class="p-0 m-0 fadeIn third">Escribelas separando por comas:</p>
                <input v-model="foto.tags" id="tags-input" type="text" class="fadeIn third" name="login" placeholder="Ejemplo: Planta, Zen..">
                <a href="addTag.html" class="pb-0 fadeIn third" strong>Crear nueva <i class="fas fa-tag verde-ico " ></i></a>
                
                    
                <button v-for="tag in foto.tags" :key="tag" href="#" v-on:click="removeTag"
                 type="button" class="btn btn-light btn-sm mr-2 mt-2">{{tag}} x</button >
                <p strong class="fadeIn third mt-2">Hacer imagen privada 
                    <label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                  </label></p>
                <input type="submit" class="fadeIn fourth" v-on:click="enviar" value="Guardar">
                <div class="col-md" id="errors-container">
                </div>
              </form>
          
          
            </div>
          </div>

        </div> <!--Container-->
</template>


<script>
/*eslint-disable*/
import axios from 'axios'
import $ from 'jquery'
import Vue from 'vue'

export default {
    name: 'Home',
    props: {
        photoId: Number,
    },
    data() {
        return {
            foto: [],
        }
    },
    methods: {
        loadFoto: function() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('photoId');
            var ref =this;
            axios.get('http://localhost:3000/photos/' + id).then(function(response) {
                if (response.status == 200) {
                  ref.foto=response.data;
                    //showPhoto(response.data)
                }
            }).catch(function(error) {
                console.log("Error al pedir la foto: " + error);
            });
        },
        showPhoto: function(photo) {
            let date = new Date(Date.parse(photo.date));
            $("#image").attr("src", photo.url);
            $("#description-input").val(photo.description);
            $("#tags-input").val(photo.tags.join(", "));
        },
        getError: function(message) {
            return "<div onclick='removeError(this);' class='alert alert-danger' role='alert'><strong><i class='fa fa-times' aria-hidden= 'true'></i > Error! </strong>" + message + "</div>";
        },
        removeTag:function(tag){

          this.foto.tags = this.foto.tags.filter(function(e) { return e !== tag });
          console.log(this.foto.tags);


        },
        enviar: function(){
          event.preventDefault();


          $("#errors-container").empty();
          if(!Vue.hasBadWords(title)&&!Vue.hasBadWords(description)){
          let photo = {
          "description":this.foto.description,
          "title": this.foto.title,
          "tags":this.foto.tags,
          }
          let ref= this;
          // Aquí hacemos el envío
          
          fetch('http://localhost:3000/photos/'+ this.foto.id, {
              method: "PATCH",
              body: JSON.stringify(photo),
              headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+Vue.getToken()
              }
              
              }).then(function(response) {
              if(response.ok){
                
                ref.$router.push("/");
                ref.$router.go()
              } else {
                console.log(response);
              $("#errors-container").append(ref.getError(response.statusText));
              }
              }).catch(function(error){
              console.log("Error al editar la foto: " + error);
          });

          }else{
            $("#errors-container").append(this.getError("Palabra inapropiada, cambiela ya."));
          }
        }
    },
    beforeMount() {
      this.loadFoto();
    },
}
</script>