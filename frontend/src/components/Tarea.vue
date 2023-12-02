<template>
    <a href="#" class="list-group-item list-group-item-action">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" v-model="tarea.completed">
        <!-- {{tarea._id}} -->
        <h4>{{tarea.title}}</h4>
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