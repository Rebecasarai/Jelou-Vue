<template>
    
    <div class="container">

          <div class="row text-center">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
    <div class="text-center">
        <h3 class="text-center pb-0 pt-4 mb-0">Crear etiqueta</h3>
        <hr class="new4">
        <h5 class="text-center">Crea una etiqueta para describir imágenes en Jelou! </h5>
        <div class="form-group text-center ">
            <input type="text" class="form-control" id="t" 
            v-model="newTag" placeholder="Inserta aquí etiqueta a crear" style="background-color: white;"  >
          </div>
          <div class="" id="errors-container">
          </div>
          <input type="submit" v-on:click="upload" class="fadeIn third" value="Crear">

          
        </div>
        <a  href="deleteTag.html" class="pb-0 mt-4 fadeIn third text-center" strong>¿Buscas eliminar una etiqueta?<i class="fas fa-tag verde-ico " ></i></a>


        
          <div class="fadeIn fourth pb-4">
          <h3 class="text-center pb-0 pt-4 mb-0">Algunas etiquetas existentes</h3>
        <hr class="new4">
        <h5 class="text-center" v-for="t in this.tags" :key="t">{{t}}</h5>
        </div>
        </div>
        <div class="col-sm-2"></div>
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
      tags:[],
      newTag:"",
    }
  },
  methods:{
     upload: function(){
      event.preventDefault();
      $("#errors-container").empty();

      if(this.tags.includes(this.newTag)){
        $("#errors-container").append(this.getError("Ya existe una etiqueta con ese nombre"));
      }else{
      
      let t = this.newTag;

      // Aquí hacemos el envío
      var ref= this;
      fetch('http://localhost:3000/tags/', {
      method: "POST",
      body: JSON.stringify(t),
      headers:{
      'Content-Type': 'application/json'
      }
      }).then(function(response) {
        if(response.ok){
          console.log(response);
          //ref.$router.go();
        } else {
          $("#errors-container").append(ref.getError(response.statusText));
        }
        }).catch(function(error){
          console.log("Error al editar la foto: " + error);
      });
      }

      },
      getError: function(message){
      return "<div onclick='removeError(this);' class='alert alert-danger' role='alert'><strong><i class='fa fa-times' aria-hidden= 'true'></i > Error! </strong>"+message+"</div>";
      },
      loadTags: function() {
          
            var ref = this;
            axios.get('http://localhost:3000/tags').then(function(response) {
                if (response.status == 200) {
                    ref.tags = Array.from(response.data);
                }
            }).catch(function(error) {
                console.log("Error al pedir las tags: " + error);
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