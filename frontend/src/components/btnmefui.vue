<template>
    <!-- Este componente pertenece al boton sali/cerrar sesion, se le pasa un evento que cuando se seleccione 
    dispare la fincion logOut que lo que hace es cerrar la sesion del usuario y direccionarte a la patalla de 
    incio/login  -->
    <div class="container">
        <a type="button" class="btn  btn-danger btn-lg  boton px-2 py-1 " @click="logOut">Salir</a>
    </div>
</template>

<script lang="ts">
// Importaciones de dependencias 
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebaseconfig";
import router from "../router/index";
import Swal from 'sweetalert2';
@Component
//Metodos
export default class LogOut extends Vue {
    // funcion salir, lo que hace es redirecionarse al home/loguin y cierra la sesion del usuario
    logOut() {
        auth.signOut().then(() => {
            Swal.fire({
                // Realiza un mensaje de exito al usuario 
                title: "Usted  ha cerrado la sesion, Hasta la proxima!!",
                width: 600,
                position: "center",
                padding: "3em",
                color: " #44dbeb",
                background: " #1a0b34",
                // backdrop: `
                //     rgba(0,0,123,0.4)
                //     url("https://usagif.com/wp-content/uploads/gif/outerspace-15.gif")
                //     center
                //     no-repeat`
            }).then(result => {
                // si se confirma que se quiere salir, se direcciona al loguin/home
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
            // mensaje de error
            console.error('Error al cerrar sesion:', error)
        });

    }

}
</script>

<style scoped>

/* .boton{
height: 40px;
width: 150px;
} */
a{
    text-decoration: none;
}

</style>