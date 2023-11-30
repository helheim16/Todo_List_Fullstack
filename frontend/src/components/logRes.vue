<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-md-6">

        <img src="../assets/lista2.png" alt="..." class="img-thumbnail">
        <form v-if="mostrarFormulario === 'login'" @submit.prevent="login" action=""
          class="mt-4 login-form  card  border-primary">
          <h1>Iniciar Sesión</h1>
          <div class="form-group">
            <label for="emailLogin" class="form-label mt-4">Email:</label>
            <input type="email" class="form-control" id="emailLogin" v-model="email" />
          </div>
          <div class="form-group">
            <label for="passwordLogin" class="form-label mt-4">Contraseña:</label>
            <input type="password" class="form-control" id="passwordLogin" v-model="password" />
          </div>
          <br>
          <button type="submit" class="btn btn-outline-primary">
            Iniciar Sesión
          </button>
          <p class="mt-2">
            Aquí te puedes
            <a href="#" @click="cambiarFormulario('registro')">Regístrar</a>
          </p>
          <!-- <p class="mt-2">
            <a href="#" @click="cambiarFormulario('recuperar')">¿Olvidaste tu contraseña?</a>
          </p> -->
        </form>

        <form v-else-if="mostrarFormulario === 'registro'" @submit.prevent="register"
          class="mt-4 register-form  card  border-primary">
          <h2 class="form-title">Registrarse</h2>
          <div class="form-group">
            <label for="emailRegister">Email:</label>
            <input type="email" class="form-control" id="emailRegister" v-model="emailSign" />
          </div>
          <div class="form-group">
            <label for="passwordRegister">Contraseña:</label>
            <input type="password" class="form-control" id="passwordRegister" v-model="passwordSign" />
          </div>
          <div class="form-group">
            <label for="passwordRepeat">Repetir Contraseña:</label>
            <input type="password" class="form-control" id="passwordRepeat" v-model="passwordCompare" />
          </div>
          <br>
          <button type="submit" class="btn btn-outline-success">
            Registrarse
          </button>
          <p class="mt-2">
            ¿Ya tienes una cuenta?
            <a href="#" @click="cambiarFormulario('login')">Iniciar Sesión</a>
          </p>
        </form>

        <form v-else @submit.prevent="forgotPassword" class="mt-4 recovery-form">
          <h2 class="form-title">¿Olvidaste tu Contraseña?</h2>
          <div class="form-group">
            <label for="emailForgot">Correo Electrónico:</label>
            <input type="email" class="form-control" id="emailForgot" v-model="emailForgot" />
          </div>
          <button type="submit" class="btn btn-info mt-4 custom-btn">
            Enviar Correo de Recuperación
          </button>
          <p class="mt-2">
            ¿Recuerdas tu contraseña?
            <a href="#" @click="cambiarFormulario('login')">Iniciar Sesión</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebaseconfig";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
} from "firebase/auth";
import Swal from 'sweetalert2';
import router from "../router/index";
@Component
export default class Registro extends Vue {
  mostrarFormulario: string = "login";
  email: string = "";
  emailSign: string = "";
  password: string = "";
  passwordSign: string = "";
  passwordCompare: string = "";
  emailForgot: string = "";

  login() {
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((credenciales) => {
        const user = credenciales.user;
        console.log(user);
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "Inicio de sesión Exitoso",
          icon: "success"
        });
        router.push('/lista');
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fallo el Inicio de Sesión "
        });
        console.error(error);
      });
  }

  register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailSign)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email inválido "
      });
      return;
    }

    if (this.passwordSign === this.passwordCompare) {
      createUserWithEmailAndPassword(auth, this.emailSign, this.passwordSign)
        .then((credenciales) => {
          const user = credenciales.user;
          console.log(user);
          Swal.fire({
            title: "¡Buen trabajo!",
            text: "!Registro Exitoso!",
            icon: "success"
          });
          this.passwordSign = "";
          this.passwordCompare = "";
          this.cambiarFormulario('login');
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "A fallado el registro",
            footer: 'Intente de nuevo'
          });
          console.error(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No coinciden las contraseñas",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
      this.passwordSign = "";
      this.passwordCompare = "";
    }
  }

  forgotPassword() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailForgot)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email inválido "
      });
      return;
    }

    // sendPasswordResetEmail(auth, this.emailForgot)
    //   .then(() => {
    //     Swal.fire({
    //         title: "Perfecto!",
    //         text: "Correo de recuperación enviado exitosamente",
    //         icon: "success"
    //       });
    //     this.emailForgot = "";
    //     this.mostrarFormulario = "login";
    //   })
    //   .catch((error) => {
    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Error al enviar el correo de recuperación"
    //       });
    //     console.error(error);
    //   });
  }

  cambiarFormulario(formulario: string) {
    this.mostrarFormulario = formulario;
  }
}
</script>

<style scoped>
.login-form,
.register-form {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
</style>
