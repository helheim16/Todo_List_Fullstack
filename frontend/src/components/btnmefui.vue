<template>
    <div class="d-flex">
        <button type="button" class="btn btn-outline-light" @click="logOut">Cerrar Sesion</button>
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
                title: "Usted  ha cerrado la sesion, Hasta la proxima!!",
                width: 600,
                position: "center-end",
                padding: "3em",
                color: " #44dbeb",
                background: " #1a0b34",
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("https://i.pinimg.com/originals/f3/0e/21/f30e21da146bd3501555eec943a8898e.gif")
                    left top
                    no-repeat`
            }).then(result => {
                if (result.isConfirmed) {
                    try {
                        router.push('/');
                    } catch (error) {
                        console.error;
                    }
                }
            });
            // alert('Cerraste sesion')

        }).catch((error) => {
            console.error('Error al cerrar sesion:', error)
        });

    }

}
</script>

<style lang="scss" scoped></style>