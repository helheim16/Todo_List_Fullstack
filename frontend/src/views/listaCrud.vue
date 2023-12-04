<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <img src="../assets/todo.png" alt="...">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03"
          aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link text-white" href="#">usuario@usuario.com</a>
            </li>
          </ul>
          <!-- Btn cerrar sesion -->
          <LogOut />
        </div>
      </div>
    </nav>
    <br>
    <div class="container my-4">
      <div class="row   justify-content-center">
        <div class="bg-primary  rounded">
          <div class="form-group row" >
            <div class="input-group rounded buscando">
              <input type="search" class="form-control me-sm-2" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" />
                <button class="btn btn-info my-2 my-sm-0" type="submit">Buscar</button>
                <button type="button" class="ms-2 btn btn-success" @click="cambiarFormulario()">{{mostrarFormulario ? "Ocultar" : "Crear"}}</button>
                
              </div>
              
              <br>
              <br>
              <div  class="d-grid gap-2">
            </div>
            
           
            <div class="bg-primary" data-bs-theme="dark">
            <form v-if="mostrarFormulario" @submit.prevent="newTask()"  >
                <fieldset>
                  <div class="form-group">
                    <label for="" class="col-sm-2 col-form-label ">Titulo</label>
                    <input type="text" class="form-control" id="" />
                  </div>
                  <div class="form-group mt-3">
                    <label for="" class="col-sm-2 col-form-label">Descripcion</label>
                    <input type="text" class="form-control" id="" />
                  </div>
                  <br>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                    <label class="form-check " for="optionsRadios2">
                      ¿Importante?
                    </label>

                  </div>
                  <button type="submit" class="btn  btn-success">Crear</button>
                </fieldset>
              </form>
          </div>
           
           
           
           
           
           
           
            

          </div>
         
          <div class=" card-body  bg-primary text-white">
            <h1>Lista de tareas</h1>
            <ul>
              <!-- v-for="tareaItem in tarea" :key="tareaItem._id"
              <li >
                hola
                <br />
                <button>Editar</button>
                <button>Eliminar</button>
              </li> -->
            </ul>

            <!-- <div>
              <h3>Editar Tarea</h3>
              <div class="form-group">
                    <label for="" class="col-sm-2 col-form-label ">Titulo</label>
                    <input type="text" class="form-control" id="" />
                  </div>
                  <div class="form-group mt-3">
                    <label for="" class="col-sm-2 col-form-label">Descripcion</label>
                    <input type="text" class="form-control" id="" />
                  </div>
                  <br>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                    <label class="form-check" for="optionsRadios2">
                      ¿Importante?
                    </label>

                  </div>
                  <button type="submit" class="btn  btn-success">Guardar Cambios</button>
            </div> -->
            <ListaTareasComponent  />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LogOut from "../components/btnmefui.vue";
import ListaTareasComponent from '../components/ListaTareas.vue';
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
  }
})

export default class Crud extends Vue {
  mostrarFormulario: boolean= false;
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

  newTask(): void{
  }
  cambiarFormulario(): void {
    this.mostrarFormulario= !this.mostrarFormulario;
  }
}
</script>
<style scoped>
.buscando{
width: 30%;
padding:1rem;
float: right;

}
/* input[type="text"],
 input[type="email"],
 input[type="number"], input[type="password"] {
  display: block;
  width: 40%;
  margin-bottom: 20px;
  padding: 15px 10px;
  border: none;
  border-bottom: 2px solid #ccc;
  font-family: "Slabo 27px", serif;
} */
details {
  background: #f2f2f2;
  width: 30%;
  padding: 0.90rem;
  margin: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}

summary {
  list-style: none;
}

summary::before {
  content: '+';
  padding-right: 1rem;
}
i{
  background: black;
}
details[open] summary::before {
  content: '-';
}
</style>