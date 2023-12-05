<template>
    <!-- <div class="card border-light container">
        <input type="text" class="form-control" id="" placeholder="Titulo" />
        <input type="text" class="form-control" id="" placeholder=" Descripcion" />
        <div class="">
            <div class="form-check form-switch">
                <label class="form-check-label" for="switchCheckCompleted">Compleado</label>
                <input class="form-check-input" type="checkbox" id="switchCheckCompleted">
            </div>
            <div class="form-check form-switch">
                <label class="form-check-label" for="switchCheckImportant">Compleado</label>
                <input class="form-check-input" type="checkbox" id="switchCheckImportant">
            </div>
        </div>
        <button type="submit" class="btn  btn-success">Crear</button>
    </div> -->

    <div class="container mt-5">
        <form>
          <div class="mb-4">
            <h4>Agregar Tarea</h4>
          </div>

          <div class="mb-3">
            <input type="text" class="form-control" id="titulo" placeholder="Ingrese el título">
          </div>

          <div class="mb-3">
            <textarea class="form-control" id="descripcion" rows="3" placeholder="Ingrese la descripción"></textarea>
          </div>
      
          <!-- Switches para Completado e Importante -->
          <div class="mb-3 d-flex align-items-center justify-content-center">
            <div class="form-check form-switch me-3">
              <input class="form-check-input" type="checkbox" id="completado">
              <label class="form-check-label" for="completado">Completado</label>
            </div>
      
            <div class="form-check form-switch ms-4">
              <input class="form-check-input" type="checkbox" id="importante">
              <label class="form-check-label" for="importante">Importante</label>
            </div>
          </div>
          <!-- Botón de envío -->
          <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
      </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import axios from 'axios';
import TareaComponent from './Tarea.vue';
import { Tarea } from '../utils/Tarea';


@Component({
})

export default class CrearTareaComponent extends Vue {

    // Define propiedades
    // tarea: Tarea = ;

    // Define data


    // Define metodos
    async listarTareas(): Promise<void> {
    }

    // Ciclo de vida de componentes
    mounted() {
        this.listarTareas();
    }
}
</script>

<style  scoped>
    textarea {
        resize: none;
    }
</style>