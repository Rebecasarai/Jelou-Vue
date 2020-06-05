
<template>
<div class="container">
        <!-- eslint-disable -->

          <!--Login/Sign up-->
          <div class="wrapper fadeInDown">
            <div id="formContent">
              <!-- Tabs Titles -->
          
              <!-- Icon -->
              <div class="fadeIn first">
                <img src="../assets/images/logo.png" class="logoLogin" id="icon" alt="User Icon" />
              </div>
          
              <!-- Login Form -->
              
              <form>
                <h3 class="fadeIn second">Iniciar sesión</h3>
                <p class="fadeIn second">¡Entra y procrastina con nosotros!</p>
                <input type="text" id="email" class="fadeIn third" name="login" placeholder="email">
                <input type="password" id="password" class="fadeIn third" name="login" placeholder="contraseña">
                <input type="submit" class="fadeIn fourth" value="¡Venga!" v-on:click="enviar">
                <div class="" id="errors-container">
                </div>
              </form>
          
              <!-- Remind Passowrd -->
              <div id="formFooter">
                <a class="underlineHover" href="#">¿Olvidó la contraseña?</a>
              </div>
          
            </div>
          </div>
          
        </div> <!--Container-->

        
</template>
<script >
    /*eslint-disable*/
    import $ from 'jquery'
    import Vue from 'vue'
    import Router from 'vue-router'

export default {
    name: 'HelloWorld',
    props: {},
    methods: {
        loadPhotos: function() {},
        removeError: function(error) {
            $(error).remove();
        },
        getError: function(message) {
            return "<div onclick='removeError(this);' class='alert alert-danger' role='alert'><strong><i class='fa fa-times' aria-hidden= 'true'></i > Error! </strong>" + message + "</div>";
        },
        enviar: function() {
            event.preventDefault();
            $("#errors-container").empty();
            
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let login = {
                "email": email,
                "password": password
            }
            // Aquí hacemos el envío de los datos de login
            var ref= this;
            fetch('http://localhost:3000/login/', {
                method: "POST",
                body: JSON.stringify(login),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                if (response.ok) {
                    response.json().then(function(token) {
                        Vue.storeToken(token.accessToken);
                        ref.$router.push("/");
                        ref.$router.go()
                    }).catch(function(error) {
                        $("#errors-container").append(ref.getError("Error durante la autenticación. Por favor, vuelva a enviar los mismos datos"));
                    });
                } else {
                    $("#errors-container").append(ref.getError("Datos de autenticación incorrectos"));
                }
            }).catch(function(error) {
                console.log("Error al enviar los datos: " + error);
            });

        }

    },
    beforeMount() {},
} </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>