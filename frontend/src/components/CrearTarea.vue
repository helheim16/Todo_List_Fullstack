<template>
    <!-- Se muestra al costado de la lista -->
    <div v-if=alternative class="container my-4 card border-light listita addForm d-none d-lg-block d-xl-block">
        <!-- <div v-if=alternative class="container my-4 card border-light listita addForm boton d-none d-sm d-md-block d-sm-block d-xl-none"> -->
        <div class="mb-4">
            <h5 v-if="editar">Editar Tarea</h5>
            <h5 v-else>Agregar Tarea</h5>
        </div>

        <!-- Input Titulo -->
        <div class="mb-3">
            <input v-model="datosForm.title" type="text" class="form-control" id="titulo" placeholder="Ingrese el título">
        </div>

        <!-- Textarea descripcion -->
        <div class="mb-3">
            <textarea v-model="datosForm.desc" class="form-control" id="descripcion" rows="3"
                placeholder="Ingrese la descripción"></textarea>
        </div>

        <!-- Switcher completar, importante -->
        <div class="mb-3 d-flex align-items-center justify-content-center flex-wrap">
            <div class="form-check form-switch text-start mx-3">
                <input v-model="datosForm.completed" class="form-check-input" type="checkbox" id="completado">
                <label class="form-check-label" for="completado">Completado</label>
            </div>
            <div class="form-check form-switch text-start mx-3">
                <input v-model="datosForm.important" class="form-check-input" type="checkbox" id="importante">
                <label class="form-check-label" for="importante">Importante</label>
            </div>
        </div>
        <div class="row  justify-content-center">
            <!-- se pasa evento click a los botones, tanto para guardar, editar y cancelar 
            cada uno enlazado con su accion en cuestion -->
            <button v-if="editar" type="submit" class="btn  btn-outline-primary col-4  mx-2"
                @click="editarTarea">Guardar</button>
            <button v-else type="submit" class="btn btn-primary col-6" @click="guardarTarea">Guardar</button>
            <button v-if="editar" type="submit" class="btn  btn-outline-danger col-5 mx-1 mx-lg-2" @click="cancelar">Cancelar</button>
        </div>
    </div>
    <!-- cambia a la vista para resolucion de pantallas más pequeñas  -->
    <div v-else class="container my-4 card border-light listita addForm  boton d-block d-lg-none d-xl-none">
        <div class="mb-4">
            <h5 v-if="editar">Editar Tarea</h5>
            <h5 v-else>Agregar Tarea</h5>
        </div>

        <!-- Input Titulo -->
        <div class="mb-3">
            <input v-model="datosForm.title" type="text" class="form-control" id="titulo" placeholder="Ingrese el título">
        </div>

        <!-- Textarea descripcion -->
        <div class="mb-3">
            <textarea v-model="datosForm.desc" class="form-control" id="descripcion" rows="3"
                placeholder="Ingrese la descripción"></textarea>
        </div>

        <!-- Switcher completar, importante -->
        <div class="mb-3 d-flex align-items-center justify-content-center flex-wrap">
            <div class="form-check form-switch text-start mx-3">
                <input v-model="datosForm.completed" class="form-check-input" type="checkbox" id="completado">
                <label class="form-check-label" for="completado">Completado</label>
            </div>
            <div class="form-check form-switch text-start mx-3">
                <input v-model="datosForm.important" class="form-check-input" type="checkbox" id="importante">
                <label class="form-check-label" for="importante">Importante</label>
            </div>
        </div>

        <button v-if="editar" type="submit" class="btn  btn-outline-primary col-4  mx-2"
            @click="editarTarea">Guardar</button>
        <!-- se pasa evento click a los botones, tanto para guardar, editar y cancelar 
            cada uno enlazado con su accion en cuestion -->
        <button v-else type="submit" class="btn btn-primary col-6" @click="guardarTarea">Guardar</button>
        <button v-if="editar" type="submit" class="btn  btn-outline-danger col-4  mx-2" @click="cancelar">Cancelar</button>
    </div>
</template>

<script lang="ts">
// Importaciones de dependencias 
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import { Tarea } from '../utils/Tarea';
import { TareaDatosForm } from '../utils/Tarea';
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
import { bus } from '../main';

@Component({
})
//Metodos
export default class CrearTareaComponent extends Vue {
    // Define propiedades
    @Prop() alternative!: boolean;

    editar: boolean = false;

    tarea: Tarea | undefined;

    datosForm: TareaDatosForm = {
        title: '',
        desc: '',
        completed: false,
        important: false,
    }

    // Define metodos
    guardarTarea(): void {
        this.postTarea()
    }

    verificar(): boolean {
        if (!this.datosForm.title.trim() || !this.datosForm.desc.trim()) {
            return (false);
        } else {
            return (true);
        }
    }




    // funcion que comprueba que los campos estan vacios si lo estan salta un mensaje de error
    async postTarea(): Promise<void> {
        const usuario: String | undefined = getAuth().currentUser?.uid;
        if (!this.verificar()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hay campos vacios",
                iconColor: ' #e04950 ',
                color: " #44dbeb",
                background: " #381a76 ",
                confirmButtonColor: "#3df385  ",
            });
            return;
        }
        let config = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        // funcion que devuelve que se ha creado la nota con exito o no
        await axios.post(`http://127.0.0.1:3000/tarea`, { ...this.datosForm, user: usuario }, config)
            .then(res => {
                this.datosForm.title = '';
                this.datosForm.desc = '';
                this.datosForm.completed = false;
                this.datosForm.important = false;

                switch (res.status) {
                    case 201:
                    // Realiza un mensaje de exito al usuario 
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "bottom-right",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            iconColor: '#3df385',
                            color: " #44dbeb",
                            background: "#6843c3",
                            title: "¡Buen trabajo!",
                            text: "Se ha creado con exito",
                        });
                        bus.$emit('actualizarLista');
                        break;
                    case 500:
                    // Realiza un mensaje de error al usuario 
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Imposible Crear",
                            iconColor: ' #e04950 ',
                            color: " #44dbeb",
                            background: " #381a76 ",
                            confirmButtonColor: "#3df385  ",
                        });
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                console.error(`Error en request ${error}`);
            });
    }
        // funcion que realiza la edicion de la tarea
    async editarTarea(): Promise<void> {
        const usuario: String | undefined = getAuth().currentUser?.uid;

        let config = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        await axios.put(`http://127.0.0.1:3000/tarea/${this.tarea?._id}`, { ...this.datosForm, user: usuario }, config)
            .then(res => {
                this.datosForm.title = '';
                this.datosForm.desc = '';
                this.datosForm.completed = false;
                this.datosForm.important = false;

                switch (res.status) {
                    case 200:
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "bottom-right",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        // Realiza un mensaje de exito al usuario 
                        Toast.fire({
                            icon: "success",
                            iconColor: '#3df385',
                            color: " #6c43c3 ",
                            background: " #1ba2f4 ",
                            title: "¡Buen trabajo!",
                            text: "Se ha editado correctamente",
                        });
                        bus.$emit('actualizarLista')
                        break;
                    case 500:
                    // Realiza un mensaje de error al usuario 
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Imposible editar",
                            iconColor: ' #e04950 ',
                            color: " #44dbeb",
                            background: "#381a76 ",
                            confirmButtonColor: "#3df385  ",
                        });
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                console.error(`Error en request ${error}`);
            });
    }

    cancelar(): void {
        bus.$emit('actualizarLista', '');
    }

    // Ciclo de vida de componentes
    mounted() {
        bus.$on('editarTarea', (tarea: Tarea) => {
            this.editar = true;
            this.tarea = {...tarea};
            this.datosForm = {...tarea};
        });
        bus.$on('actualizarLista', () => {
            this.editar = false;
            this.tarea = undefined;
            this.datosForm = {
                title: '',
                desc: '',
                completed: false,
                important: false,
            };
        });
    }
}
</script>

<style  scoped>
textarea {
    resize: none;
}
</style>