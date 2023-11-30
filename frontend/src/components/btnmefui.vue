<template>
    <div class="d-flex">
        <button class="btn btn-primary my-2 my-sm-0" @click="logOut">Cerrar Sesion</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebaseconfig";
import router from "../router/index";
import Swal from 'sweetalert2';
@Component
export default class LogOut extends Vue {
    logOut() {
        auth.signOut().then(() => {
            Swal.fire({
                title: "Usted  ha cerrado la sesion, Hasta la proxima",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(https://sweetalert2.github.io/#themesimages/trees.png)",
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("https://sweetalert2.github.io/#themesimages/nyan-cat.gif")
                    left top
                    no-repeat`
            });
            // alert('Cerraste sesion')
            router.push('/');
        }).catch((error) => {
            console.error('Error al cerrar sesion:', error)
        });

    }

}
</script>

<style lang="scss" scoped></style>