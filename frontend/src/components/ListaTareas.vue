<template>
    <div class="list-group">
        <item-tarea v-for="tarea in tareas" :key="tarea._id" :tarea="tarea" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import TareaComponent from './Tarea.vue';
import {Tarea}  from '../utils/Tarea';


@Component({
    components: {
        'item-tarea': TareaComponent
    }
})

export default class ListaTareasComponent extends Vue {

    // Define propiedades
    tareas: Tarea[] = [
        {
            _id: 'asd123', title: 'pepe', desc: 'epep epep', date: '2023-11-12', completed: true, important: true, user: 'user1'
        },
        {
            _id: 'dd0999', title: 'juan', desc: 'nauj nauh', date: '2033-11-12', completed: false, important: false, user: 'user1'
        }
    ];

    // Define data


    // Define metodos

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

<style lang="scss" scoped>

</style>