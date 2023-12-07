<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- Pasa al home  componente de logRes -->
    <Login msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
// Se importan dependencias
import { Component, Vue } from 'vue-property-decorator';
import Login from '../components/logRes.vue'; // @ is an alias to /src

@Component({
  components: {
    // Se declaran los componentes 
    Login,
  },
})
export default class Registro extends Vue {}
</script>
