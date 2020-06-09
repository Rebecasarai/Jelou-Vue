<template>
    
    <div class="container">
        

           <!--Login/Sign up-->
           <div class="wrapper fadeInDown">
            <div id="formContent">
              <!-- Tabs Titles -->
          
              <!-- Icon 
              <div class="fadeIn first">
                <img src="../assets/images/upload.jpg" alt="..." class="img-thumbnail rounded mx-auto d-block">
              </div>-->

              
          
              <!-- Login Form -->
              
              <form >
                  
                <h3 class="fadeIn first" style="margin-bottom:30px;margin-top:30px;">Sube una nueva foto</h3>
                
                <input type="text" id="url-input" class="fadeIn second" name="url" placeholder="URL de imagen">
                <input type="text" id="title-input" class="fadeIn second" name="title" placeholder="Titulo">
                <input type="text" id="description-input" class="fadeIn second" name="login" placeholder="Descripción">
                <!--<input type="text" id="url-input" class="fadeIn third" name="login" placeholder="URL Personalizada">-->

                <a class="pb-0 fadeIn third" strong>Añadir etiquetas: <i class="fas fa-tag verde-ico " ></i></a>
                <button v-for="tag in tagsSelected" :key="tag.tag" @click="removeTag(tag)" type="button" class="btn btn-light btn-sm mr-2 mt-2">{{tag.tag}}</button >
                
                <p class="p-0 m-0 fadeIn third">Escribelas para buscar en el sistema:</p>
                
                <input type="text" id="tags-input" v-model="tagsInput" @keyup="searchTags()" class="fadeIn third" name="login" placeholder="Ejemplo: Planta, Zen..">
                <button v-for="tag in tagsToShow" :key="tag.id" @click="selecTag(tag)" type="button" class="btn btn-light btn-sm mr-2 mt-2">{{tag.tag}}</button >
                
                <a href="#" class="pb-0 fadeIn third" strong>
                  <router-link
                    to="addTag"
                    exact
                  >
                    Crear nueva <font-awesome-icon icon="tag" />
                  </router-link></a>
                <p strong class="fadeIn third">Hacer imagen privada 
                    <label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                  </label></p>
                <input type="submit" class="fadeIn fourth"  v-on:click="upload" value="Publicar">
                <div class="" id="errors-container">
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
    msg: String
  },
  data() {
    return {
      fotos: [],
      tagsInput:"",
      tags:[],
      tagsToShow:[],
      tagsSelected:[],
    }
  },
  methods:{
    removeTag(tag){
      var index = this.tagsSelected.indexOf(tag);

      if (index > -1) {
        this.tagsSelected.splice(index, 1);
      }
    },
    selecTag(tag){
      var index = this.tagsSelected.indexOf(tag);

      if (!(index > -1)) {
        this.tagsSelected.push(tag);
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
     upload: function(){
      event.preventDefault();
      $("#errors-container").empty();
      let url = $("#url-input").val();
      let title = $("#title-input").val();
      let description = $("#description-input").val();
      /* t = $("#tags-input").val().split(",").map(tag => tag.trim());*/
      let t = this.tagsSelected.map(t=> t.tag);

      let date = new Date().toString();

      if(!Vue.hasBadWords(title)&&!Vue.hasBadWords(description)){
        if(!(this.fotos.length >= Vue.limiteFotos)){
      let photo = 
      
    {
      "url": url,
      "title": title,
      "description":description ,
      "date": date,
      "upvotes": 0,
      "downvotes": 0,
      "tags": t,
      "userId": localStorage.getItem("id"),
      "comments": []
    }

    console.log(photo);
      // Aquí hacemos el envío
      var ref= this;
      fetch('http://localhost:3000/photos/', {
      method: "POST",
      body: JSON.stringify(photo),
      headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+Vue.getToken()
      }
      }).then(function(response) {
        if(response.ok){
          console.log(response);
          ref.$router.push("/");
          //ref.$router.go();
        } else {
          $("#errors-container").append(ref.getError(response.statusText));
        }
        }).catch(function(error){
          console.log("Error al editar la foto: " + error);
      });
          
          }else{
             $("#errors-container").append(this.getError("Ha llegado al limite de fotos que es "+Vue.limiteFotos));
          
          }
      }else{
        $("#errors-container").append(this.getError("Palabra inapropiada, cambiela ya."));
      }

      },
      getError: function(message){
      return "<div onclick='removeError(this);' class='alert alert-danger' role='alert'><strong><i class='fa fa-times' aria-hidden= 'true'></i > Error! </strong>"+message+"</div>";
      },
      loadPhotos: function() {
          
            var ref = this;
            axios.get('http://localhost:3000/photos?userId='+localStorage.getItem("id")).then(function(response) {
                if (response.status == 200) {
                    ref.fotos = Array.from(response.data);
                }
            }).catch(function(error) {
                console.log("Error al pedir las fotos: " + error);
            });
        },
        removeError: function(error) {
            $(error).remove();
        },
      

 },
 beforeMount(){
    this.loadTags();
 },
}
</script>