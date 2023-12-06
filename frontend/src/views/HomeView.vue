<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Login msg="Welcome to Your Vue.js + TypeScript App"/>

  </div>
  
</template>

<script lang="ts">
import Footer from "../components/footer.vue";
import { Component, Vue } from 'vue-property-decorator';
import Login from '../components/logRes.vue'; // @ is an alias to /src

@Component({
  components: {
    Login,
    Footer,
  },
})
export default class Registro extends Vue {}
</script>
