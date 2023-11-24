<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form v-if="mostrarFormulario === 'login'" @submit.prevent="login" action="" class="mt-4 login-form">
          <h2 class="form-title">Iniciar Sesión</h2>
          <div class="form-group">
            <label for="emailLogin">Correo Electrónico:</label>
            <input type="email" class="form-control" id="emailLogin" v-model="email" />
          </div>
          <div class="form-group">
            <label for="passwordLogin">Contraseña:</label>
            <input type="password" class="form-control" id="passwordLogin" v-model="password" />
          </div>
          <button type="submit" class="btn btn-success mt-4">
            Iniciar Sesión
          </button>
          <p class="mt-2">
            ¿No tienes una cuenta?
            <a href="#" @click="cambiarFormulario('registro')">Regístrate</a>
          </p>
          <!-- <p class="mt-2">
            <a href="#" @click="cambiarFormulario('recuperar')">¿Olvidaste tu contraseña?</a>
          </p> -->
        </form>

        <form v-else-if="mostrarFormulario === 'registro'" @submit.prevent="register" class="mt-4 register-form">
          <h2 class="form-title">Registrarse</h2>
          <div class="form-group">
            <label for="emailRegister">Correo Electrónico:</label>
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
          <button type="submit" class="btn btn-success mt-4">
            Registrarse
          </button>
          <p class="mt-2">
            ¿Ya tienes una cuenta?
            <a href="#" @click="cambiarFormulario('login')">Iniciar Sesión</a>
          </p>
        </form>

        <!-- <form v-else @submit.prevent="forgotPassword" class="mt-4 recovery-form">
          <h2 class="form-title">¿Olvidaste tu Contraseña?</h2>
          <div class="form-group">
            <label for="emailForgot">Correo Electrónico:</label>
            <input type="email" class="form-control" id="emailForgot" v-model="emailForgot" />
          </div>
          <button type="submit" class="btn btn-info mt-4 custom-btn">
            Enviar Correo de Recuperación
          </button> -->
          <!-- <p class="mt-2">
            ¿Recuerdas tu contraseña?
            <a href="#" @click="cambiarFormulario('login')">Iniciar Sesión</a>
          </p>
        </form> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebaseconfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
} from "firebase/auth";

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
        window.alert("Inicio de sesión Exitoso");
      })
      .catch((error) => {
        window.alert("Fallo el Inicio de Sesión");
        console.error(error);
      });
  }

  register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailSign)) {
      window.alert("Correo electrónico inválido");
      return;
    }

    if (this.passwordSign === this.passwordCompare) {
      createUserWithEmailAndPassword(auth, this.emailSign, this.passwordSign)
        .then((credenciales) => {
          const user = credenciales.user;
          console.log(user);
          window.alert("Registro Exitoso");

          this.passwordSign = "";
          this.passwordCompare = "";
        })
        .catch((error) => {
          window.alert("Fallo el Registro");
          console.error(error);
        });
    } else {
      window.alert("Las contraseñas no coinciden");
      this.passwordSign = "";
      this.passwordCompare = "";
    }
  }

  forgotPassword() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailForgot)) {
      window.alert("Correo electrónico inválido");
      return;
    }

    // sendPasswordResetEmail(auth, this.emailForgot)
    //   .then(() => {
    //     window.alert("Correo de recuperación enviado exitosamente");
    //     this.emailForgot = "";
    //     this.mostrarFormulario = "login";
    //   })
    //   .catch((error) => {
    //     window.alert("Error al enviar el correo de recuperación");
    //     console.error(error);
    //   });
  }

  cambiarFormulario(formulario: string) {
    this.mostrarFormulario = formulario;
  }
}
</script>

<style scoped>

</style>
