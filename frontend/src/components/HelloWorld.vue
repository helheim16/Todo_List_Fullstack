<template>
  <div class="">
    <div>
      <button class="">Iniciar Sesion</button>
      <button class="">Registrarse</button>
      <form action="">
        <h2>Iniciar Secion</h2>
        <div>
          <label for="emailogin">Email</label>
          <input type="email" name="" id="emailLogin">
        </div>
        <div>
          <label for="passwordLogin">Email</label>
          <input type="password" id="passwordLogin">
        </div>

        <button type="submit">Iniciar Sesión</button>
      </form>
      <form action="">
        <h2>Registrarse</h2>
        <div>
          <label for="emaiRegis">Email</label>
          <input type="email" name="" id="emailRegis">
        </div>
        <div>
          <label for="passwordRegis">Email</label>
          <input type="password" id="passwordRegis">
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>


    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {

}

</script>

<style></style>
