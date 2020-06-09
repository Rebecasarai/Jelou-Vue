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


                 <a class="pb-0 fadeIn third" strong>Etiquetas: <i class="fas fa-tag verde-ico " ></i></a>
                 <button v-for="tag in foto.tags" :key="tag" @click="removeTag(tag)" type="button" class="btn btn-light btn-sm mr-2 mt-2">{{tag}}</button >
                
                <p class="p-0 m-0 fadeIn third">Escribelas para buscar en el sistema:</p>
                
                <input type="text" id="tags-input" v-model="tagsInput" @keyup="searchTags()" class="fadeIn third" name="login" placeholder="Ejemplo: Planta, Zen..">
                <button v-for="tag in tagsToShow" :key="tag.id" @click="selecTag(tag.tag)" type="button" class="btn btn-light btn-sm mr-2 mt-2">{{tag.tag}}</button >
                
                <a href="#" class="pb-0 fadeIn third" strong>
                  <router-link
                    to="addTag"
                    exact
                  >
                    Crear nueva <font-awesome-icon icon="tag" />
                  </router-link></a>
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
            tagsInput:"",
            tags:[],
            tagsToShow:[],
        }
    },
    methods: {
        selecTag(tag){
          var index = this.foto.tags.indexOf(tag);

          if (!(index > -1)) {
            this.foto.tags.push(tag);
          }

          this.tagsInput = [];
        },
        loadTags: function() {
            var ref = this;
            axios.get('http://localhost:3000/tags').then(function(response) {
                if (response.status == 200) {
                    ref.tags= response.data;
                    }
            }).catch(function(error) {
                console.log("Error al pedir las tags: " + error);
            });
        },
        searchTags(){
          let tagsInputArray = this.tagsInput.split(",").map(tag => tag.trim());
          console.log(tagsInputArray);
          this.tagsToShow = this.tags.filter(t => this.tagsInput== t.tag || t.tag.startsWith(this.tagsInput) );
          console.log(this.tagsToShow);
        },
        loadFoto: function() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('photoId');
            var ref =this;
            axios.get('http://localhost:3000/photos/' + id).then(function(response) {
                if (response.status == 200) {
                  ref.foto=response.data;
                    //showPhoto(response.data)
                    console.log(ref.foto.tags);
                }
            }).catch(function(error) {
                console.log("Error al pedir la foto: " + error);
            });
        },
        showPhoto: function() {
          console.log("showPhoto");
          console.log(this.foto);
            //let date = new Date(Date.parse(this.foto.date));
            //$("#image").attr("src", this.foto.url);
            //$("#description-input").val(this.foto.description);
            $("#tags-input").val(this.foto.tags.join(", "));
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
          if(!Vue.hasBadWords(this.foto.title)&&!Vue.hasBadWords(this.foto.description)){
          
          
          let photo = {
          "description":this.foto.description,
          "title": this.foto.title,
          "tags": this.foto.tags,
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
      this.loadTags();
      this.loadFoto();
      this.showPhoto();
      
    },
}
</script>