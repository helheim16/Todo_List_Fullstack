<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-md-6">

        <img src="../assets/lista2.png" alt="..." class="img-thumbnail">
        <form v-if="mostrarFormulario === 'login'" @submit.prevent="login" action=""
          class="mt-4 login-form  card  border-primary">
          <!-- seccion iniciar sesion se recibe email  y contraseña-->
          <h1>Iniciar Sesión</h1>
          <br>
          <div class="form-group">
            <input type="email" class="form-control" id="emailLogin" v-model="email" placeholder="Email"/>
          </div>
          <br>
          <div class="form-group">
            <input type="password" class="form-control" id="passwordLogin" v-model="password" placeholder="Contraseña" />
          </div>
          <br>
          <button type="submit" class="btn btn-outline-primary">
            Iniciar Sesión
          </button>
          <!-- Podemos cambiar la vista  registo desde el loguin -->
          <p class="mt-2">
            Aquí te puedes
           <!-- evento click para que se cambie a la seccion deseada -->
            <a href="#" @click="cambiarFormulario('registro')">Regístrar</a>
          </p>
        </form>
          <!-- Aca vamos a la seccion registro, aqui se puede crear usuario y contraseña -->
        <form v-else-if="mostrarFormulario === 'registro'" @submit.prevent="register"
          class="mt-4 register-form  card  border-primary">
          <h2 class="form-title">Registrarse</h2>

          <div class="form-group">
            <input type="email" class="form-control" id="emailRegister" v-model="emailSign" placeholder="Email">
          </div>
          <br>
          <div class="form-group">
            <input type="password" class="form-control" id="passwordRegister" aria-describedby="passwordHelp"
              v-model="passwordSign" placeholder="Contraseña"/>
            <small id="passwordHelp" class="form-text text-muted">Esta debe ser mayor o igual a 6 digitos</small>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="passwordRepeat" v-model="passwordCompare" placeholder="Repetir contraseña"/>
          </div>
          <br>
          <button type="submit" class="btn btn-outline-success">
            Registrarse
          </button>
           <!-- Podemos cambiar la vista Loguin desde el registro -->
          <p class="mt-2">
            ¿Ya tienes una cuenta?
            <!-- evento click para que se cambie a la seccion deseada -->
            <a href="#" @click="cambiarFormulario('login')">Iniciar Sesión</a>
          </p>
        </form>
      </div>
    </div>
   
  </div>
</template>

<script lang="ts">
// Importaciones de dependencias 
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebaseconfig";
import Footer from "../components/footer.vue";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from 'sweetalert2';
import router from "../router/index";

@Component({
  components: {
    Footer,
  }
})
//Metodos
export default class Registro extends Vue {
  // Propiedades
  mostrarFormulario: string = "login";
  email: string = "";
  emailSign: string = "";
  password: string = "";
  passwordSign: string = "";
  passwordCompare: string = "";
  emailForgot: string = "";
  //Metodos
  //Para seccion login y registro
  login() {
    // Comprueba si el inicio de sesion se realizo correctamente
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((credenciales) => {
        const user = credenciales.user;
        console.log(user);
        // Realiza un mensaje de exito al usuario 
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "Inicio de sesión Exitoso",
          icon: "success",
          iconColor: '#3df385',
          color: " #44dbeb",
          background: " #1a0b34",
          confirmButtonColor: " #44dbeb ",
        }).then(result => {
          if (result.isConfirmed) {
            // Te traslada a  la seccion lista,al haber confirmado se un usuario autorizado
            router.push('/lista');
          }
        });

      })
      .catch((error) => {
        // Realiza un mensaje de error al usuario 
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fallo el Inicio de Sesión ",
          iconColor: ' #e04950 ',
          color: " #44dbeb",
          background: " #1a0b34",
          confirmButtonColor: "#3df385  ",
        });
        console.error(error);
      });
  }

  register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailSign)) {
      // Realiza un mensaje de exito al usuario 
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email inválido ",
        iconColor: ' #e04950 ',
        color: " #44dbeb",
        background: " #1a0b34",
        confirmButtonColor: "#3df385  ",
      });
      return;
    }
    //Para la seccion registro se hace la comparacion de que ambas contraseñas sean las correctas  
    if (this.passwordSign === this.passwordCompare) {
      createUserWithEmailAndPassword(auth, this.emailSign, this.passwordSign)
        .then((credenciales) => {
          const user = credenciales.user;
          console.log(user);
        // Realiza un mensaje de exito al usuario 
          Swal.fire({
            title: "¡Buen trabajo!",
            text: "!Registro Exitoso!",
            icon: "success",
            iconColor: '#3df385',
            color: " #44dbeb",
            background: " #1a0b34",
            confirmButtonColor: " #44dbeb ",
          });
          this.passwordSign = "";
          this.passwordCompare = "";
          this.cambiarFormulario('login');
        })
        .catch((error) => {
          Swal.fire({
          // Realiza un mensaje de error al usuario 
            icon: "error",
            title: "Oops...",
            text: "A fallado el registro",
            footer: 'Intente de nuevo',
            iconColor: ' #e04950 ',
            color: " #44dbeb",
            background: " #1a0b34",
            confirmButtonColor: "#3df385  ",
          });
          console.error(error);
        });
    } else {
      // Realiza un mensaje de error al usuario
      //  porque no coincide las contraseñas
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No coinciden las contraseñas",
        iconColor: ' #e04950 ',
        color: " #44dbeb",
        background: " #1a0b34",
        confirmButtonColor: "#3df385  ",
      });
      // declara las contraseñas como vacio
      this.passwordSign = "";
      this.passwordCompare = "";
    }
  }
  // se ve si la estructura del email es la correcta
  forgotPassword() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailForgot)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email inválido ",
        iconColor: ' #e04950 ',
        color: " #44dbeb",
        background: " #1a0b34",
        confirmButtonColor: "#3df385  ",
      });
      return;
    }

  }
//  funcion para aplicar v-if v-else 
// asi pooder cambiar de seccion
  cambiarFormulario(formulario: string) {
    this.mostrarFormulario = formulario;
  }
}
</script>

<style scoped>
/* codigo css para la estructura de las secciones */
.login-form,
.register-form {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
</style>
