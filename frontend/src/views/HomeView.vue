<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- Pasa al home  componente de logRes -->
    <Login msg="Welcome to Your Vue.js + TypeScript App"/>
    <!--Pasa al home componente footer, este esta limitado 
    a que se vean en alginas pantallas  -->
    <Footer class="d-none  d-xl-block"/>
  </div>
</template>

<script lang="ts">
// Se importan dependencias
import Footer from "../components/footer.vue";
import { Component, Vue } from 'vue-property-decorator';
import Login from '../components/logRes.vue'; // @ is an alias to /src

@Component({
  components: {
    // Se declaran los componentes 
    Login,
    Footer,
  },
})
export default class Registro extends Vue {}
</script>
