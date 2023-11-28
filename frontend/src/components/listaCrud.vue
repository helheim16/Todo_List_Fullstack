<template>
    <div class="">
      <h1>Lista de tareas</h1>
      <ul>
        <li
          v-for="tareaItem in tarea"
          :key="tareaItem._id"
        >
       
          <br />
          <button>Editar</button>
          <button >Eliminar</button>
        </li>
      </ul>
  
      <div v-if="editandoTarea">
        <h3>Editar Tarea</h3>
        <label>Título</label>
        <input v-model="tareaEditada.titulo" />
        <br />
        <label>Fecha</label>
        <input
          type="date"
          v-model="tareaEditada.fecha"
        />
        <br />
        <label>Cuerpo</label>
        <textarea v-model="tareaEditada.cuerpo"></textarea>
        <br />
        <label>Completada</label>
        <input
          type="checkbox"
          v-model="tareaEditada.completado"
        />
        <br />
        <button>Guardar Cambios</button>
      </div>
  
      <div>
        <h3>Nueva Tarea</h3>
        <label>Título</label>
        <input v-model="nuevaTarea.titulo" />
        <br />
        <label>Fecha</label>
        <input
          type="date"
          v-model="nuevaTarea.fecha"
        />
        <br />
        <label>Cuerpo</label>
        <textarea v-model="nuevaTarea.cuerpo"></textarea>
        <br />
        <button >Crear Tarea</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
//   import axios from "axios";
  
  interface Tarea {
    _id: string;
    titulo: string;
    cuerpo: string;
    fecha: string;
    completado: boolean;
  }
  
  @Component
  export default class Hello extends Vue {
    tarea: Tarea[] = [];
    editandoTarea: string | null = null;
    tareaEditada: Tarea = {
      _id: "",
      titulo: "",
      cuerpo: "",
      fecha: "",
      completado: false,
    };
    nuevaTarea: Tarea = {
      _id: "",
      titulo: "",
      cuerpo: "",
      fecha: "",
      completado: false,
    };
  
  }
  </script>
  