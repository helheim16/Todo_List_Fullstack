<template>
    <a href="#" class="list-group-item list-group-item-action d-flex">
        <div class="p-2 flex-fill bd-highlight">
            <input class="form-check-input me-2" type="checkbox" value="" id="flexCheckChecked" v-model="tarea.completed">
            <label class="form-check-label" for="flexCheckChecked">{{tarea.completed ? 'Completa' : 'Pendiente'}}</label>
        </div>
            <!-- {{tarea._id}} -->
            <p class="p-2 flex-fill bd-highlight">{{tarea.title}}</p>
            <p class="p-2 flex-fill bd-highlight">{{tarea.desc}}</p>
   </a>
</template>

<script lang="ts">
import Vue from 'vue';
// import Component from 'vue-class-component';
import {Component, Prop} from 'vue-property-decorator';
import {Tarea}  from '../utils/Tarea';

@Component({
})

export default class TareaComponent extends Vue {
    @Prop() tarea!: Tarea;
}
</script>

<style lang="scss" scoped>

</style>