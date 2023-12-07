<template>
    <!-- realiza la seccion de cada tarea y trae el componente de CrearTarea -->
    <div class="list-group">
        <item-tarea v-for="tarea in tareas" :key="tarea._id" :tarea="tarea" />
    </div>
</template>

<script lang="ts">
// Importaciones de dependencias 
import Vue from 'vue';
import Component from "vue-class-component";
import axios from 'axios';
import TareaComponent from './Tarea.vue';
import {Tarea}  from '../utils/Tarea';
import { getAuth } from 'firebase/auth';
import { bus } from '../main';

@Component({
    components: {
        'item-tarea': TareaComponent
    }
})
//Metodos
export default class ListaTareasComponent extends Vue {

    // Define propiedades
    tareas: Tarea[] = [];

    // Define metodos
    // async listarTareas(filter?: String): Promise<void> {
    //     if (!filter) {
    //         this.obtenerTareas(filter);
    //     } else {
    //     }
    // }
    // funcion que obtiene las taras desde la base de datos
    async obtenerTareas(filter?: String): Promise<void> {
       const usuario: String|undefined = getAuth().currentUser?.uid;
       
        let config = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        await axios.get(`http://127.0.0.1:3000/tarea/${usuario}${filter ? '/'+filter : ''}`, config)
        .then(res => {
            this.tareas = res.data
        })
        .catch(error => {
            console.error(`Error en request ${error}`);
        });
    }

    // Ciclo de vida de componentes
    mounted() {
        this.obtenerTareas();
        bus.$on('actualizarLista', this.obtenerTareas);
    }  
}
</script>

<style scoped>
</style>