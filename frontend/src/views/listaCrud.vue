<template>
  <div>
    <nav class="navbar navbar-expand-md  bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="../assets/todo.png" alt="Logo"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link text-white">{{correoAutenticado}}</a>
            </li>
          </ul>
          <form class="row d-flex">
            <!-- Btn cerrar sesion -->
            <LogOut />
          </form>
        </div>
      </div>
    </nav>
    <div class="container vh100">
      <br>
      <div class="row">
        <!-- "row justify-content-around" -->
        <div class="row justify-content-between">

          <div class="col-12 col-lg-4 ">
            <br>
            <form class="d-flex ">
             
              <input type="search" class="form-control  my-2 me-sm-2" placeholder="Buscar" aria-label="Search " v-model="searchQuery" @input="filtrarBusqueda"
                aria-describedby="search-addon" />
              <button class="btn btn-outline-light my-3 my-sm-2" type="submit" @click.prevent="filtrarBusqueda" >
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                  <path fill="#ffffff"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 
                    376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </button>
            </form>
            <button type="button" class="btn btn-success  my-3 col-12 boton d-block d-lg-none" @click="cambiarFormulario()">
                {{ mostrarFormulario ?
                  "Ocultar" : "Crear" }}
              </button>
              <CrearTareaComponent :alternative=true />
            <form v-if="mostrarFormulario" >
              <CrearTareaComponent :alternative=false />
            </form>

          </div>
          
          <div class="col-12  col-lg-8 card border-primary  ">
            <h1>Lista de tareas</h1>
            <!-- Lista de Tareas  -->
            <ListaTareasComponent />
          </div>

        </div>
       
      </div>

    </div>
    <Footer />
  </div>

</template>
  
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LogOut from "../components/btnmefui.vue";
import ListaTareasComponent from '../components/ListaTareas.vue';
import CrearTareaComponent from "../components/CrearTarea.vue";
import Footer from "../components/footer.vue";
import { getAuth } from 'firebase/auth';
import { Tarea } from '../utils/Tarea'
import { bus } from '../main';


@Component({
  components: {
    LogOut,
    ListaTareasComponent,
    Footer,
    CrearTareaComponent,
  }
})

export default class Crud extends Vue {
  searchQuery: string ="";
  correoAutenticado: String|null|undefined = getAuth().currentUser?.email;
  mostrarFormulario: boolean = false;
  tarea: Tarea[] = [];
  editandoTarea: string | null = null;

  filtrarBusqueda(): void {
    bus.$emit('actualizarLista', this.searchQuery);
  };

  cambiarFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  };
}


</script>
<style scoped>
.addForm {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
} 

.vh100 {
  min-height: 80vh;
}


</style>