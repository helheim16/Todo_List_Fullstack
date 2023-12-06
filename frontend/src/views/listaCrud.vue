<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="../assets/todo.png" alt="Logo"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
          aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link text-white" href="#">{{correoAutenticado}}</a>
            </li>
          </ul>
          <form class="">
            <!-- Btn cerrar sesion -->
            <LogOut />
          </form>
        </div>
      </div>
    </nav>
    <div class="container">
      <br>
      <div class="row">
        <!-- "row justify-content-around" -->
        <div class="row justify-content-between">

          <div class="col-12 col-lg-4 ">
            <br>
            <form class="d-flex ">
              <button type="button" class="btn btn-success  me-sm-2  boton d-none  d-sm d-md-block  d-sm-block d-xl-none" @click="cambiarFormulario()">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                  <path fill="#f1f4f9" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32
                     14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0
                      32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                {{ mostrarFormulario ?
                  "Ocultar" : "Crear" }}
              </button>
              <input type="search" class="form-control  my-2 me-sm-2" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" />
              <button class="btn btn-outline-light my-3 my-sm-2" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                  <path fill="#ffffff"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 
                    376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </button>
            </form>
              <CrearTareaComponent :alternative=true />
            <!-- <div class="card border-light listita addForm d-none d-lg-block d-xl-block">
                  <br>
                  <input type="text" class="form-control" id="" placeholder="Titulo" />
                  <br>
                  <input type="text" class="form-control" id="" placeholder=" Descripcion" />
                  <br>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                    <label class="form-check-label" for="flexCheckChecked">
                      Checked checkbox
                    </label>
                  </div>
                  <br>
                  <button type="submit" class="btn  btn-success">Crear</button>
                </div>
                <br>
            <br> -->
            <form v-if="mostrarFormulario" @submit.prevent="newTask()">
              <!-- <fieldset>
                Nueva tarea borde celeste
                <div class="card border-light listita addForm  boton d-none  d-sm d-md-block  d-sm-block d-xl-none">
                  <br>
                  <input type="text" class="form-control" id="" placeholder="Titulo" />
                  <br>
                  <input type="text" class="form-control" id="" placeholder=" Descripcion" />
                  <br>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                    <label class="form-check-label" for="flexCheckChecked">
                      Checked checkbox
                    </label>
                  </div>
                  <br>
                  <button type="submit" class="btn  btn-success">Crear</button>
                </div>
                
              </fieldset> -->
              <CrearTareaComponent :alternative=false />
            </form>

          </div>
          <!-- col-12 col-md-6 col-lg  -->
          <div class="col-12  col-lg-8 card border-primary  ">
            <h1>Lista de tareas</h1>
            <!-- Lista de Tareas  -->
            <ListaTareasComponent />
          </div>

        </div>
        <Footer />
      </div>

    </div>
  </div>
</template>
  
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LogOut from "../components/btnmefui.vue";
import ListaTareasComponent from '../components/ListaTareas.vue';
import Footer from "../components/footer.vue";
import CrearTareaComponent from "@/components/CrearTarea.vue";
import { getAuth } from 'firebase/auth';

// import axios from "axios";

interface Tarea {
  _id: string;
  titulo: string;
  cuerpo: string;
  completado: boolean;
}

@Component({
  components: {
    LogOut,
    ListaTareasComponent,
    Footer,
    CrearTareaComponent,
  }
})

export default class Crud extends Vue {
  correoAutenticado: String|null|undefined = getAuth().currentUser?.email;
  mostrarFormulario: boolean = false;
  tarea: Tarea[] = [];
  editandoTarea: string | null = null;
  tareaEditada: Tarea = {
    _id: "",
    titulo: "",
    cuerpo: "",
    completado: false,
  };
  nuevaTarea: Tarea = {
    _id: "",
    titulo: "",
    cuerpo: "",
    completado: false,
  };

  newTask(): void {
  }
  cambiarFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

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


</style>