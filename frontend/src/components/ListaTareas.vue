<template>
    <div class="list-group">
        <item-tarea v-for="tarea in tareas" :key="tarea._id" :tarea="tarea" />
    </div>
</template>

<script lang="ts">
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

export default class ListaTareasComponent extends Vue {

    // Define propiedades
    tareas: Tarea[] = [];

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