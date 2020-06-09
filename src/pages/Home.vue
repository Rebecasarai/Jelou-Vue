<template>
    <div class="">
    
        <h3 class="text-center py-4 mb-0">Imágenes públicas recientes</h3>
        <div class="row">
            <div class="col-12 col-md-3 "></div>
          <div class="col-12 col-md-6 ">

            
            <!--<div class="card">
              <img class="card-img" src="../assets/images/pasta.jpg" alt="Bologna">
              <div class="card-img-overlay text-center">
                <a href="#" class="btn btn-light btn-sm text-center">Dinner date for 1</a>
              </div>
              <div class="card-body pb-2">
                <div class="row">
                    <div class="col">
                        <h4 class="card-title">@AnaMari24</h4>
                    </div>
                    <div class="col">
                        <div class="stats text-right">
                            <a href="" ><font-awesome-icon icon="thumbs-up" /> 147</a>
                            <a href="" ><font-awesome-icon icon="thumbs-down" /> 1</a>
                         <font-awesome-icon icon="comment" /> 2
                       </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <div class="stats text-right mb-2 mt-0">
                      Puntuación: 146 <font-awesome-icon icon="star" /> 
                    </div>
                    </div>
                  </div>
                
                <p class="card-text">I love quick, simple pasta dishes, and this is one of my favorite.</p>
                <small class="text-muted comments">
                    <p><strong>@Titina3</strong> I love it!!</p>
                    <p><strong>@Juan23</strong> That looks so yummyyyyy</p>
                    
                    
                </small>
                <div class="input-group mt-3">
                    <input type="text" class="form-control m-0 text-center" placeholder="Comentar" aria-label="comment" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button">Publicar</button>
                    </div>
                  </div>

                  
                  <button  href="#" type="button" class="btn btn-light btn-sm mr-2 mt-2">Cooking</button >
                    <button  href="#" class="btn btn-light btn-sm mr-2 mt-2">Pasta</button >
                    <button  href="#" class="btn btn-light btn-sm mr-2 mt-2">Food</button >
                  
              </div>
              <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                <div class="views">Abril 2, 12:45PM
                </div>
                <div class="stats text-left">
                   Público
                </div>
                 
              </div>
            </div>-->

            <div v-for="foto in this.fotos" :key="foto.id" class="card">

                <img class="card-img" :src="foto.url" :alt="foto.title">

                
                <div class="card-img-overlay text-center">
                  <a href="#" class="btn btn-light btn-sm text-center">{{foto.title}}</a>
                  
                </div>
                <div class="card-img-overlay text-right">
                  <a v-if="isAutenticado&&(foto.userId == loggedUser.id)" href="#"  class="btn btn-light btn-sm text-center">
                    <font-awesome-icon icon="edit" />
                    <router-link
                    :to="{ path: 'UpdatePhoto',query: { photoId: foto.id }}"
                    exact
                  >
                    Editar
                  </router-link>
                    
                    </a>
                    <a href="#" v-if="isAutenticado&&(foto.userId == loggedUser.id)" 
                    v-on:click="deletePhoto(foto)" class="btn btn-light btn-sm text-center">
                    <font-awesome-icon icon="trash" />
                    Borrar
                    </a>
                  
                </div>

                <div class="card-body pb-2">
                <div class="row">
                    <div class="col">
                        <h4 class="card-title"><router-link
                    :to="{ path: '/user',query: { userId: foto.userId }}"
                    exact
                  >
                    {{foto.username}}
                  </router-link></h4>
                    </div>
                    <div class="col">
                        <div class="stats text-right">
                            <a href="#" v-on:click="like(foto)" ><font-awesome-icon icon="thumbs-up" /> {{foto.upvotes}}</a>
                            <a href="#" v-on:click="dislike(foto)" ><font-awesome-icon icon="thumbs-down" />{{foto.downvotes}}</a>
                         <font-awesome-icon icon="comment" /> {{foto.comments.length}}
                       </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <div class="stats text-right mb-2 mt-0">
                      Puntuación: {{foto.upvotes - foto.downvotes}} <font-awesome-icon icon="star" /> 
                    </div>
                    </div>
                  </div>
                
                <p class="card-text">{{foto.description}}</p>
                <small class="text-muted comments">
                    <p v-for="comment in foto.comments" :key="comment.id"><strong>@{{comment.username}}</strong> {{comment.commentText}}</p>
                    
                    
                </small>
                <div class="input-group mt-3">
                    <input :id="'input-comment-'+foto.id" type="text" class="form-control m-0 text-center input-comment" placeholder="Comentar" aria-label="comment" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                      <button v-on:click="comentar(foto)" class="btn btn-outline-secondary" type="button">Publicar</button>
                    </div>
                  </div>

                  
                  <button v-for="tag in foto.tags" :key="tag" href="#" type="button" class="btn btn-light btn-sm mr-2 mt-2">{{tag}}</button >
                  <div class="" :id="'errors-container'+foto.id">
                </div>
              </div>
               
                <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                  <div class="views">{{getStringDate(foto.date)}}
                  </div>
                  <div class="stats text-left">
                     <span v-if="foto.public">Público</span><span v-else>Privado</span>
                  </div>
                   
                </div>
              </div>
            
          </div>

          <div class="col-12 col-md-3"></div>

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
            users:[],
            loggedUser:{},
            isAutenticado:Vue.getToken()!=null,
            comment:{},
        }
    },
  watch: {
    fotos: function() {
      console.log(this.fotos.upvotes);
    }
  },
    methods: {

        getStringDate(d){
          var dat= new Date(Date.parse(d));
          return dat.getFullYear() +"/"+dat.getMonth()+"/"+dat.getDay();
        },
        loadPhotos: function() {

            var ref = this;
            axios.get('http://localhost:3000/photos').then(function(response) {
                if (response.status == 200) {
                    //ref.muestraFotos(response.data); // Curioso esto. This es sobreescrito dentro de funciones anonimas

                    for (let index = 0; index < response.data.length; index++) {
                      var element= response.data[index];
                        element.username= ref.users.find(u => u.id == element.userId).user;
                      }
                      //let date = new Date(Date.parse(element.date));
                      //element.date=date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay();
                      ref.fotos = Array.from(response.data);

                    }
            }).catch(function(error) {
                console.log("Error al pedir las fotos: " + error);
            });
        },
        loadUsers: function() {

            var ref = this
            axios.get('http://localhost:3000/users').then(function(response) {
                if (response.status == 200) {
                   ref.users= response.data;
                }
            }).catch(function(error) {
                console.log("Error al pedir las fotos: " + error);
            });
        },
        like: function(foto) {
            event.preventDefault();
            $("#errors-container"+foto.id).empty();

            if(!(this.loggedUser.likes.includes(foto.id))){
              var photo = {};
              this.loggedUser.likes.push(foto.id);

                if(this.loggedUser.dislikes.includes(foto.id)){
                  photo = {
                    "upvotes":foto.upvotes + 1,
                    "downvotes":foto.downvotes - 1
                    }

                }else{
                  photo = {
                    "upvotes":foto.upvotes + 1
                    }
                }

            var ref=this;
            fetch('http://localhost:3000/photos/' + foto.id, {
                method: "PATCH",
                body: JSON.stringify(photo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+Vue.getToken()
                }
            }).then(function(response) {
                if (response.ok) {
                    foto.upvotes=foto.upvotes + 1;
                    if(ref.loggedUser.dislikes.includes(foto.id)){
                      
                        foto.downvotes=foto.downvotes -1;
                        let i = ref.loggedUser.dislikes.indexOf(foto.id);
                        if (i > -1) {
                          ref.loggedUser.dislikes.splice(i, 1);
                        }
                    }
                } else {
                    $("#errors-container"+foto.id).append(ref.getError(response.statusText));
                }
            }).catch(function(error) {
                console.log("Error al dar like a la foto: " + error);
            });

          
          var userHistory={
              "dislikes":this.loggedUser.dislikes,
              "likes": this.loggedUser.likes
            }

          // Guardamos en historia de gustados
            fetch('http://localhost:3000/users/' + this.loggedUser.id, {
                method: "PATCH",
                body: JSON.stringify(userHistory),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+Vue.getToken()
                }
            }).then(function(response) {
                if (response.ok) {
                    
                } else {
                    $("#errors-container"+foto.id).append(ref.getError(response.statusText));
                }
            }).catch(function(error) {
                console.log("Error al editar la foto: " + error);
            });

            
            }


        },
        dislike: function(foto) {
          
            event.preventDefault();
            $("#errors-container"+foto.id).empty();

            if(!(this.loggedUser.dislikes.includes(foto.id))){
              var photo = {};

                if(this.loggedUser.likes.includes(foto.id)){
                  photo = {
                    "upvotes":foto.upvotes - 1,
                    "downvotes":foto.downvotes + 1
                    }
                    
                }else{
                  photo = {
                    "downvotes":foto.downvotes + 1
                    }
                }
              
            var ref=this;
            fetch('http://localhost:3000/photos/' + foto.id, {
                method: "PATCH",
                body: JSON.stringify(photo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+Vue.getToken()
                }
            }).then(function(response) {
                if (response.ok) {
                  foto.downvotes=foto.downvotes + 1;
                  if(ref.loggedUser.likes.includes(foto.id)){
                      foto.upvotes=foto.upvotes -1;
                      var i = ref.loggedUser.likes.indexOf(foto.id);
                      if (i > -1) {
                        ref.loggedUser.likes.splice(i, 1);
                      }
                    }
                    
                } else {
                    $("#errors-container"+foto.id).append(ref.getError(response.statusText));
                }
            }).catch(function(error) {
                console.log("Error al editar la foto: " + error);
            });

            
             var userHistory={
              "dislikes":this.loggedUser.dislikes,
              "likes": this.loggedUser.likes
            }

          // Guardamos en historia de gustados
            fetch('http://localhost:3000/users/' + localStorage.getItem('id'), {
                method: "PATCH",
                body: JSON.stringify(userHistory),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+Vue.getToken()
                }
            }).then(function(response) {
                if (response.ok) {
                  ref.loggedUser.dislikes.push(foto.id);
                    
                } else {
                    $("#errors-container"+foto.id).append(ref.getError(response.statusText));
                }
            }).catch(function(error) {
                console.log("Error al editar la foto: " + error);
            });
          }
        },
        deletePhoto: function(foto){
          $("#errors-container"+foto.id).empty();
          if(!foto.comments.length>0){
            var ref= this;
            fetch('http://localhost:3000/photos/'+foto.id, {
            method: "DELETE",
            headers:{
            'Authorization': 'Bearer '+Vue.getToken()
            }

            }).then(function(response) {
            if(response.ok){
              
              ref.$router.push("/");
              ref.$router.go()
            } else {
            console.log("Error al borrar la foto: "+response.statusText);
            }
            }).catch(function(error){
            console.log("Error al borrar la foto: " + error);
            });
          }else{
            
            $("#errors-container"+foto.id).append(this.getError("No se puede eliminar una foto con comentarios"));
            $('html, body').animate({
                scrollTop: $("#errors-container"+foto.id).offset().top
            }, 2000);
          }
          },
          removeError: function(error) {
            $(error).remove();
        },
            comentar: function(foto){
            event.preventDefault();
            $("#errors-container"+foto.id).empty();
            var id= 'input-comment-'+foto.id;

            let comentario={
              "userId":this.loggedUser.id,
              "username": this.loggedUser.user,
              "commentText": document.getElementById(id).value,
            }

            var allComments= foto.comments;
            allComments.push(comentario);
            console.log(allComments);

            let photo = {
              "comments": allComments
              }
            var ref=this;
            fetch('http://localhost:3000/photos/' + foto.id, {
                method: "PATCH",
                body: JSON.stringify(photo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+Vue.getToken()
                }
            }).then(function(response) {
                if (response.ok) {
                  //ref.foto.comments = allComments;
                  $('.input-comment').val('');
                } else {
                    $("#errors-container"+foto.id).append(ref.getError(response.statusText));
                }
            }).catch(function(error) {
                console.log("Error al editar la foto: " + error);
            });


        },
        getLoggedUser(){
          if(this.isAutenticado){
          var ref = this;
            axios.get('http://localhost:3000/users/'+localStorage.getItem('id')).then(function(response) {
                if (response.status == 200) {
                   ref.loggedUser=response.data;
                   console.log(ref.loggedUser);
                }
            }).catch(function(error) {
                console.log("Error al pedir las fotos: " + error);
            });
          }
        },
        
        getError: function(message) {
            return "<div onclick='removeError(this);' class='alert alert-danger' role='alert'><strong><i class='fa fa-times' aria-hidden= 'true'></i > Error! </strong>" + message + "</div>";
        },

    }, 
    async beforeMount() {
      
        this.loadUsers();
        this.loadPhotos();
        this.getLoggedUser();
        //this.getUsername(17);
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.card{
  margin-bottom: 20px;
}
.card-img {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  
  .card-title {
    margin-bottom: 0.3rem;
  }
  
  .cat {
    display: inline-block;
    margin-bottom: 1rem;
  }
  
  .fa-users {
    margin-left: 1rem;
  }
  
  .card-footer {
    font-size: 0.8rem;
  }

  .comments p{
    margin-bottom: 0px !important;
  }


  .list-group-item {
    
    background-color: transparent;
    border: none !important;
  }

  .rojo{
    color: #f16079;
  }

  .rojo-active{
    
    background-color: #f16079;
    color: white;
  }


  .rojo:hover{
    background-color: #f16079;
    color: white;
  }

  .rojoTtl{
    color: black;
  }

  .rojoTtl:hover{
    
    color: black;
    text-decoration: none;
  }

  
  .rojo-ico{
  
    color: #f16079;
  }

  .verde{
    color: #8eaa3b;
    border-color: #8eaa3b;
  }

  .verde:hover{ 
    
    color: white;
    background-color: #62a22f75;
    border-color: #8eaa3b;
  }
  
  .verde:active{ 
    background-color: #62a22fa1;
    border-color: #62a22fa1;
  }

  .verde-active{
    background-color: #62a22fa1;
    border-color: #62a22fa1;
  }

  .verde-ico{
  
    color: #62a22fa1;
  }

  .verdeTtl{
    color: black;
  }

  .verdeTtl:hover{
    
    color: black;
    text-decoration: none;
  }

  
  .whiter{
    padding: 0 1.25rem;
    width: 100%;
  }

  .whiter:hover{
    color: white;
    text-decoration: none;
  }
  .whiter-ico{
    color: inherit;
  }


  .card-body-explore{
    padding: 0 1.25rem;
    background-color: transparent !important;
    border: none;
  }

  .card-explore, .card-header-explore{
    background-color: transparent !important;
    border: none;
  }




  a.list-group-item.list-group-item-action.verde.active{
    background-color: #99c27a;

  }

  
  a.list-group-item.list-group-item-action.rojo.active{
    background-color: #f16079;

  }
</style>
