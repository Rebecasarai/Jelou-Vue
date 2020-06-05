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
              
              <b-form lazy-validation>
                <h3 class="fadeIn first">Registro</h3>
                <p class="fadeIn first signUpText">Únete a nuestra increíble comunidad y entérate si a tus amigos les gusta lo que haces o no.</p>
                
                <input type="text" id="nombre" v-model="name" class="fadeIn second half-size-input" name="nombre" placeholder="nombre">
                <input type="text" id="apellidos" v-model="lastname" class="fadeIn second half-size-input" name="apellidos" placeholder="apellidos">
                
                <input type="text" id="usuario" v-model="username" class="fadeIn second" name="usuario" placeholder="@usuario">
                <input type="text" id="telefono" v-model="phone" class="fadeIn second" name="telefono" placeholder="telefono">
                <input type="text" id="email" v-model="email" class="fadeIn third" name="email" placeholder="email">
                <input type="password" id="password" v-model="password" class="fadeIn third" name="password" placeholder="contraseña">
                <input type="submit" class="fadeIn fourth" value="¡Venga!" v-on:click="enviar" :disabled='isDisabled'>
                <div class="" id="errors-container">
                </div>
              </b-form>
              
          
              <!-- Remind Passowrd -->
              <div id="formFooter">
                <a class="underlineHover" href="#">¿Olvidó la contraseña?</a>
              </div>
          
            </div>
          </div>
        </div> <!--Container-->

</template>

<script>
/*eslint-disable*/
import $ from 'jquery' 
import Vue from 'vue'

export default {
    name: 'Singup',
    props: {
        msg: String
    },
    data() {
        return {
            valid: false,
            name: '',
            lastname: '',
            phone: '',
            username: '',
            email: '',
            password: '',
        }
    },
    beforeMount() {

    },
    computed: {
        isDisabled: function() {
            return !this.name.length > 0 && !this.lastname.length > 0 && !this.phone.length > 0;
        }
    },

    methods: {
        enviar: function() {
            event.preventDefault();
            $("#errors-container").empty();
            let num_errors = 0
            let nombre = document.getElementById("nombre").value;
            let apellidos = document.getElementById("apellidos").value;
            let telefono = document.getElementById("telefono").value;
            let email = document.getElementById("email").value;
            let usuario = document.getElementById("usuario").value;
            let password = document.getElementById("password").value;
            if (nombre.trim().length < 3) {
                $("#errors-container").append(this.getError("El nombre debe tener al menos 3 caracteres de longitud"));
                num_errors++;
            }
            if (apellidos.trim().length < 6) {
                $("#errors-container").append(this.getError("Los apellidos deben tener al menos 6 caracteres de longitud"));
                num_errors++;
            }
            if (!(new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$").test(telefono))) {
                $("#errors-container").append(this.getError("El telefono esta mal formateado"));
                num_errors++;
            }
            if (num_errors == 0) {
                /*let user = {
                    "name": nombre,
                    "surname": apellidos,
                    "phone": telefono,
                    "email": email,
                    "password": password,
                    "user": usuario
                }*/
                let user ={
                "email": email,
                "password": password,
                "name": nombre,
                "surname": apellidos,
                "phone": telefono,
                "user": usuario,
                "followers":[],
                "following":[],
                "likes":[],
                "dislikes":[]
                }

                

                // Aquí hacemos el envío del usuario
                var ref = this
                fetch('http://localhost:3000/register/', {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function(response) {
                    if (response.ok) {
                        response.json().then(function(token) {
                            console.log(token);
                            // Aquí añadiremos el guardado del login
                            //localStorage.setItem("token", token.accessToken);
                            Vue.storeToken(token.accessToken);
                            //window.location.href = "index.php";
                            // router.push({ name: 'user', params: { userId: 123 }})
                            console.log(user);
                            var updatedInfo = {
                            "id": localStorage.getItem('id'),
                            "followers": [
                            ],
                            "following": [
                            ]
                            }

                        // actualizamos usuario A Seguir
                        fetch('http://localhost:3000/follows/', {
                            method: "POST",
                            body: JSON.stringify(updatedInfo),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+Vue.getToken()
                            }
                        }).then(function(response) {
                            if (response.ok) {
                            
                                        ref.$router.push("/login");
                            } else {
                            console.log(response.statusText);
                            }
                        }).catch(function(error) {
                            console.log("Error al crear los followers: " + error);
                        });




                        }).catch(function(error) {
                            console.log("Error al leer el json con el token de la respuesta: " + error)
                            //window.location.href = "index.php";

                        });
                    } else {
                        $("#errors-container").append(ref.getError(response.statusText));
                    }
                }).catch(function(error) {
                    console.log("Error al realizar el registro: " + error);
                });
            }
        },
        getError: function(message) {
            return "<div onclick='removeError(this);' class='alert alert-danger' role='alert'> <strong><i class='fa fa-times' aria-hidden= 'true'></i > Error! </strong>" + message + "</div>";
        },
        removeError: function(error) {
            $(error).remove();
        },


    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
