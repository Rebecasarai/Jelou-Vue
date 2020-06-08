<template>
<div class="container">
        <!-- eslint-disable -->
              <div class="row">
                <div class="col-md-8">

                  <div class="row">
                    <div class="col-3 col-md-4">
                        <img src="../assets/images/photo-camera.png" class="rounded float-left" alt="Profile pic">
                    </div>

                  <div class="col-6 col-md-4">
                    <h6><i class="fas fa-at fa-sm profileIcons"></i> @{{loggedUser.user}}</h6>
                    <h6><i class="fas fa-user fa-sm profileIcons"></i>  {{loggedUser.name}} {{loggedUser.surname}}</h6>
                    <p><i class="fas fa-envelope fa-sm profileIcons"></i> {{loggedUser.email}}</p>
                  </div>
                    
                  <div class="col-3 col-md-4">
                    <p strong> {{this.follows.following.length}} seguidos</p> 
                    <p strong> {{this.follows.followers.length}} seguidores</p> 
                  </div>
                  </div>

                </div>
                
                
                <div class="col-md-2 centrado mb-4">
                </div>
                
              </div>

              <!--<div v-images-loaded:on.progress="imageProgress" style="height:auto !important">-->
                  <div v-masonry transition-duration="0.3s" item-selector=".grid__item" :origin-top="true" :horizontal-order="false" 
                height="auto" style="height: auto !important; background-color:white;">
                  <div class="row" style="height: auto !important; background-color:white;">
                    <div v-masonry-tile class="col-sm-4" v-for="post in fotos" :key="post.id">
                    <div class="card mt-2" >
                      <img class="card-img-top" :src="post.url" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title"><strong>{{ post.title }}</strong></h5>
                        <div class="item__overlay">
                          <button class="js-button btn btn-secondary-outline center-block" 
                          data-toggle="modal" data-target="#modalPicture" type="button" 
                          v-on:click="expandPhoto(post)"
                          value="Expandir foto" role="button">Expandir foto</button>
                        </div>
                        </div>
                      </div>
                    </div>  
                  </div>
              </div>
              <!--</div>-->


              <!-- Modal -->
          <div id="modalPicture" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalPictureLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <!-- Modal - header -->
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="fa " aria-hidden="true"><font-awesome-icon icon="window-close" /></span>
                    <span class="sr-only">Close</span>
                  </button>
                </div><!-- .end Modal - header -->
                <!-- Modal - body -->
                <div class="modal-body">

                <div class="card">

                <img class="card-img" :src="this.foto.url" :alt="this.foto.title">

                
                <div class="card-img-overlay text-center">
                  <a href="#" class="btn btn-light btn-sm text-center">{{this.foto.title}}</a>
                  
                </div>
                <div class="card-img-overlay text-right">
                  <a v-if="isAutenticado&&(this.foto.userId == loggedUser.id)" href="#"  class="btn btn-light btn-sm text-center"
                  v-on:click="editar(foto)">
                    <font-awesome-icon icon="edit" />
                    <!--<router-link
                    :to="{ path: 'UpdatePhoto',query: { photoId: foto.id }}"
                    exact
                  >
                    Editar
                  </router-link>-->
                    Editar
                    </a>
                    <a href="#" v-if="isAutenticado&&(this.foto.userId == loggedUser.id)" 
                    v-on:click="deletePhoto(this.foto.id)" class="btn btn-light btn-sm text-center">
                    <font-awesome-icon icon="trash" />
                    Borrar
                    </a>
                  
                </div>

                <div class="card-body pb-2">
                <div class="row">
                    <div class="col">
                        <h4 class="card-title">{{this.foto.username}}</h4>
                    </div>
                    <div class="col">
                        <div class="stats text-right">
                            <a href="#" v-on:click="like(foto)" ><font-awesome-icon icon="thumbs-up" /> {{this.foto.upvotes}}</a>
                            <a href="#" v-on:click="dislike(foto)" ><font-awesome-icon icon="thumbs-down" />{{this.foto.downvotes}}</a>
                         <font-awesome-icon icon="comment" /> {{foto.comments.length}}
                       </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <div class="stats text-right mb-2 mt-0">
                      Puntuación: {{this.foto.upvotes - this.foto.downvotes}} <font-awesome-icon icon="star" /> 
                    </div>
                    </div>
                  </div>
                
                <p class="card-text">{{this.foto.description}}</p>
                <small class="text-muted comments">
                    <p v-for="comment in this.foto.comments" :key="comment.id"><strong>@{{comment.username}}</strong> {{comment.commentText}}</p>
                    
                    
                </small>
                <div class="input-group mt-3">
                    <input id="input-comment" type="text" class="form-control m-0 text-center" placeholder="Comentar" aria-label="comment" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                      <button v-on:click="comentar(foto)" class="btn btn-outline-secondary" type="button">Publicar</button>
                    </div>
                  </div>

                  
                  <button v-for="tag in this.foto.tags" :key="tag" href="#" type="button" class="btn btn-light btn-sm mr-2 mt-2">{{tag}}</button >
                  <div class="" id="errors-container">
                </div>
              </div>
               
                <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                  <div class="views">{{getStringDate(this.foto.date)}}
                  </div>
                  <div class="stats text-left">
                     Público
                  </div>
                   
                </div>
              </div>
                </div><!-- .end Modal - body -->
                <!-- Modal - footer -->
                <div class="modal-footer">
                </div><!-- .end Modal - footer -->
              </div>
            </div>
          </div>
          <!-- .end modal -->



        </div> <!--Container-->
</template>


<script>
/* eslint-disable */
import axios from 'axios'
import $ from 'jquery'

import {
    VueMasonryPlugin
} from 'vue-masonry';

//Vue.use(VueMasonryPlugin)
import Vue from 'vue'

//import imagesLoaded from 'vue-images-loaded'


export default {
    name: 'Home',
    props: {
    },
    data() {
        return {
            fotos: [],
            posts: [],
            foto: {
              "comments":[],
            },
            loggedUser:{
              "followers":[],
              "following":[]
            },
            isAutenticado:Vue.getToken()!=null,
            comment:{},
            likes:0,
            follows:[],
        }
    },
    created() {
      
    },
    /*directives: {
        imagesLoaded
    },*/
  watch: {
    foto: function() {
      console.log(this.foto.upvotes);
    },
    loggedUser:function(){
      console.log(this.loggedUser);
    },
    follows:function(){
      console.log("Follows:")
      console.log(this.follows);
      console.log(this.follows.followers);
    },
    fotos: function(){
      console.log(this.fotos);
    }
  },
    methods: {
      showFollwers: function(){
      },
      
        getStringDate(d){
          var dat= new Date(Date.parse(d));
          return dat.getFullYear() +"/"+dat.getMonth()+"/"+dat.getDay();
        },
        loadPhotos: function() {

            var ref = this;
            axios.get('http://localhost:3000/photos').then(function(response) {
                if (response.status == 200) {
                    let pics = response.data.filter(f => f.userId == ref.loggedUser.id);
                    ref.fotos = Array.from(pics);
                }
            }).catch(function(error) {
                //console.log("Error al pedir las fotos: " + error);
            });
        },
        imageProgress(instance, image) {
            const result = image.isLoaded ? 'loaded' : 'broken';
            console.log('image is ' + result + ' for ' + image.img.src);
        },
        expandPhoto(image) {

            //var imageSrc = $(this).parents(".grid__item").find("img").attr("src");
            this.foto = image;
            var imageSrc = image.url;
            $(".js-modal-image").attr("src", imageSrc);
            $(document).on("click", ".js-heart", function() {
                $(this).toggleClass("active");
            });
        },
        like: function(foto) {
            event.preventDefault();
            
            let photo = {
              "upvotes":foto.upvotes + 1
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
                    //ref.$router.go()
                    ref.foto.upvotes=foto.upvotes + 1;
                        
                } else {
                    console.log(response.statusText);
                }
            }).catch(function(error) {
                console.log("Error al editar la foto: " + error);
            });

        },
        dislike: function(foto) {
          
            event.preventDefault();
            let photo = {
              "downvotes":foto.downvotes + 1
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

                    ref.foto.downvotes=foto.downvotes + 1;
                } else {
                   console.log(response.statusText);
                }
            }).catch(function(error) {
                console.log("Error al editar la foto: " + error);
            });
        },
        deletePhoto: function(id){
          var ref= this;
          fetch('http://localhost:3000/photos/'+id, {
          method: "DELETE",
          headers:{
          'Authorization': 'Bearer '+Vue.getToken()
          }

          }).then(function(response) {
          if(response.ok){
            $('#modalPicture').modal('toggle');
            ref.$router.go()
          } else {
          console.log("Error al borrar la foto: "+response.statusText);
          }
          }).catch(function(error){
          console.log("Error al borrar la foto: " + error);
          });
          },
          editar: function(foto){
            /*<router-link
                    :to="{ path: 'UpdatePhoto',query: { photoId: foto.id }}"
                    exact
                  >
                    Editar
                  </router-link>*/
                  $('#modalPicture').modal('toggle');
                  this.$router.push({ path: 'UpdatePhoto', query: { photoId: foto.id } });
          

          },
        comentar: function(foto){
          
            event.preventDefault();

            let comentario={
              "userId":this.loggedUser.id,
              "username": this.loggedUser.user,
              "commentText": document.getElementById("input-comment").value,
            }

            var allComments= foto.comments;
            allComments.push(comentario);

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
                  ref.foto.comments = allComments;
                  $('#input-comment').val('');

                } else {console.log(response.statusText);
                }
            }).catch(function(error) {
                console.log("Error al editar la foto: " + error);
            });


        },
        getFollows(){
          var ref = this;
          axios.get('http://localhost:3000/follows/'+localStorage.getItem('id')).then(function(response) {
                if (response.status == 200) {
                  console.log(response.data);
                  ref.follows=response.data;
                  console.log(ref.follows);

                }
            }).catch(function(error) {
                console.log("Error al pedir los follows: " + error);
            });
        },
        getLoggedUser(){
          if(this.isAutenticado){
            var ref = this;
            axios.get('http://localhost:3000/users/'+localStorage.getItem('id')).then(function(response) {
                if (response.status == 200) {
                   ref.loggedUser=response.data;
                   ref.loggedUser.following=[];
                   ref.loggedUser.followers=[];
                }
            }).catch(function(error) {
                console.log("Error al pedir el user loggeado: " + error);
            });
          
          }
        },
        removeError: function(error) {
            $(error).remove();
        },
    },
    beforeMount() {
      
        this.getLoggedUser();
        this.getFollows();
        this.loadPhotos();
        //ref.$router.go()
        $('data-v-7a2b6835').removeAttr("height").attr("style","height:auto !important");
        

    },
}
</script>

<style scoped>
data-v-7a2b6835{
  height: auto !important;
}
#footerId{
  display: none;
}
</style>


































<style scoped>
/**
 * Base styles
 */
 body {
    font: 100% / 1.414 "Poiret One", "Roboto", sans-serif;
  }
  
  /**
   * Layout styles
   */
  header {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  /**
   * Button component
   */
  .js-button {
    position: relative;
    top: 0;
    margin-top: 50%;
    opacity: 0;
    font-size: 1rem;
    color: #fff;
    border-radius: 2.1875rem;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    -webkit-transition: all .25s ease-in-out;
    transition: all .25s ease-in-out;
  }
  .js-button:focus, .js-button:hover {
    color: #111;
    background-color: #fff;
    border-color: #fff;
  }
  
  /**
   * Grid styles
   */
  .item__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(17, 17, 17, 0.45);
    -webkit-transition: background-color .55s ease-in-out;
    transition: background-color .55s ease-in-out;
    text-align: center;
  }
  .item__overlay:focus, .item__overlay:hover {
    background-color: rgba(17, 17, 17, 0.05);
  }
  .item__overlay:focus > button, .item__overlay:hover > button {
    opacity: 1;
  }
  
  .grid__sizer,
  .grid__item {
    position: relative;
    width: 19.35%;
    min-width: 16.25rem;
  }
  
  .grid__item {
    margin-bottom: .9375rem;
    border-radius: 0.12rem;
    overflow: hidden;
  }
  
  .grid__item--high,
  .grid__item--high img {
    height: 30rem;
  }
  
  img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
  
  /**
   * Link styles
   */
  a,
  .fa {
    color: #bbb;
    -webkit-transition: color .25s ease-in-out;
    transition: color .25s ease-in-out;
  }
  a:focus, a:hover,
  .fa:focus,
  .fa:hover {
    text-decoration: none;
    color: #666;
  }
  
  .active .fa {
    color: #f62459;
  }
  
  
  @media (max-width: 767.98px) { 
    .grid__item{
        margin-bottom: .9375rem;
    border-radius: 0.25rem;
    overflow: hidden;
    display: block;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    }
   }






















/* CUSTOM*/
.navbar{
    background-color: white !important;
    border-left: #f8f9fa solid 1px;
    border-right: #f8f9fa solid 1px;
}

.searchBtn{

  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  color: #8eaa3b;
  border-color: #8eaa3b;
}

.searchBtn:hover{
  background-color: #8eaa3b;
  border-color: #8eaa3b;
}

.searchBtn:focus{
  
  border-color: #8eaa3b;
  outline: 0;
  box-shadow: 0 0 0 0.2rem #8eaa3b96;
}
.searchBtn:active{
  background-color: #8eaa3b !important;
  border-color: #8eaa3b !important;
}

.searchInput{
  margin-right: 0px !important;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}

.searchInput:hover{
border-color: #8eaa3b;
}

.searchInput:focus{
  
  border-color: #8eaa3b;
  outline: 0;
  box-shadow: 0 0 0 0.2rem #8eaa3b96;
}

.container{
    background-color: #f8f9fa!important;
    padding-right: 0px;
    padding-left: 0px;
}


.centrado{
  text-align: center;
}

/* Login and sign up*/

body {
    /*font-family: "Poppins", sans-serif;*/
  }
  


a {
    color: #f160797a;
    display:inline-block;
    text-decoration: none;
    font-weight: 400;
  }
  
  h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display:inline-block;
    margin: 40px 8px 10px 8px; 
    color: #cccccc;
  }
  
  
  
  /* STRUCTURE */
  
  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column; 
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 20px;
  }
  
  #formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 90%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    text-align: center;
  }
  
  #formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
  }
  
  
  
  /* TABS */
  
  h2.inactive {
    color: #cccccc;
  }
  
  h2.active {
    color: #0d0d0d;
    border-bottom: 2px solid #e42d56;
  }
  
  
  
  /* FORM TYPOGRAPHY*/
  
  input[type=button], input[type=submit], input[type=reset]  {
    background-color: #f16079;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 #f160797a;
    box-shadow: 0 10px 30px 0 #f160797a;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  
  input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
    background-color: #e42d56;
  }
  
  input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }
  
  input[type=text] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
  }
  
  input[type=text]:focus {
    background-color: #fff;
    border-bottom: 2px solid #f16079;
  }
  
  input[type=text]:placeholder {
    color: #cccccc;
  }
  
  
  
  /* ANIMATIONS */
  
  /* Simple CSS3 Fade-in-down Animation */
  .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  
  @-webkit-keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  
  /* Simple CSS3 Fade-in Animation */
  @-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  
  .fadeIn {
    opacity:0;
    -webkit-animation:fadeIn ease-in 1;
    -moz-animation:fadeIn ease-in 1;
    animation:fadeIn ease-in 1;
  
    -webkit-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    animation-fill-mode:forwards;
  
    -webkit-animation-duration:1s;
    -moz-animation-duration:1s;
    animation-duration:1s;
  }
  
  .fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  
  .fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  
  .fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }
  
  .fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
  }
  
  /* Simple CSS3 Fade-in Animation */
  .underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #f160797a;
    content: "";
    transition: width 0.2s;
  }
  
  .underlineHover:hover {
    color: #0d0d0d;
    text-decoration: none;
  }
  
  .underlineHover:hover:after{
    width: 100%;
  }
  
  
  
  /* OTHERS */
  
  *:focus {
      outline: none;
  } 
  
  #icon {
    max-width: 100px;
  }
  

  .signUpText{
    margin: 16px 30px;
  }


  @media (min-width: 767.98px) { 
    .half-size-input{
      width: 41% !important;
    }
  
   }

     
   

  @media (max-width: 767.98px) { 
    
   .btn-follow{
    padding-top: 0.7em !important;
    padding-bottom: 0.7em !important;
    margin-top: 20px !important;
  }

  
   }



   /* Profile icons*/

   .profileIcons{
     width: 12px;
   }
   

   .btn-follow{
      background-color: #f16079;
      border: none;
      color: white;
      -webkit-box-shadow: 0 10px 30px 0 #f160797a;
      box-shadow: 0 10px 30px 0 #f160797a;
      -webkit-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      padding-top: 0.8em;
    padding-bottom: 0.8em;
   }



   
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


hr.new4 {
  border: 2px solid gray;
  width:20%;
}

footer.a{
  color: black;
   text-align: center;
}
</style>