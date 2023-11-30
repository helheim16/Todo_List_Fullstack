<template>
    <div class="d-flex">
        <button class="btn btn-primary my-2 my-sm-0" @click="logOut">Cerrar Sesion</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebaseconfig";
@Component
export default class LogOut extends Vue {
  logOut(){
    auth.signOut().then(()=>alert('Cerraste sesion'))

  }

}
</script>

<style lang="scss" scoped>

</style>