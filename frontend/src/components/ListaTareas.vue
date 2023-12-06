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

@Component({
    components: {
        'item-tarea': TareaComponent
    }
})

export default class ListaTareasComponent extends Vue {

    // Define propiedades
    tareas: Tarea[] = [

    ];

    // Define data


    // Define metodos
    async listarTareas(): Promise<void> {
        this.obtenerTareas()
    }

    async obtenerTareas(): Promise<void> {
       const usuario: String|undefined = getAuth().currentUser?.uid;
       
        let config = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        await axios.get(`http://127.0.0.1:3000/tarea/${usuario}`, config)
        .then(res => {
            this.tareas = res.data
        })
        .catch(error => {
            console.error(`Error en request ${error}`);
        });
    }

    // Ciclo de vida de componentes
    mounted() {
        this.listarTareas();
    }  
}

// export default Vue.extend({
//     props: [
//         {}
//     ],
//     components: {
//         'item-tarea': TareaComponent
//     },
//     data() {
//         return {
            
//         }
//     }
// });
</script>

<style  scoped>
/* // .listita{
//     min-height: 300px;
// } */
</style>