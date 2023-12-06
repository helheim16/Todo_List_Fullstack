<template>
    <div v-if=alternative class="container my-4 card border-light listita addForm d-none d-lg-block d-xl-block">
        <!-- <div v-if=alternative class="container my-4 card border-light listita addForm boton d-none d-sm d-md-block d-sm-block d-xl-none"> -->
        <div class="mb-4">
            <h5>Agregar Tarea</h5>
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

        <button type="submit" class="btn btn-primary" @click="guardarTarea">Guardar</button>
    </div>

    <div v-else class="container my-4 card border-light listita addForm  boton d-block d-lg-none d-xl-none">
        <div class="mb-4">
            <h5>Agregar Tarea</h5>
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

        <button type="submit" class="btn btn-primary" @click="guardarTarea">Guardar</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import { TareaDatosForm } from '../utils/Tarea';
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
import { bus } from '../main';

@Component({
})

export default class CrearTareaComponent extends Vue {
    // Define propiedades
    @Prop() alternative!: boolean;

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

    async postTarea(): Promise<void> {
        const usuario: String | undefined = getAuth().currentUser?.uid;

        let config = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        await axios.post(`http://127.0.0.1:3000/tarea`, { ...this.datosForm, user: usuario }, config)
            .then(res => {
                this.datosForm.title = '';
                this.datosForm.desc = '';
                this.datosForm.completed = false;
                this.datosForm.important = false;

                switch (res.status) {
                    case 201:
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "center",
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
                        bus.$emit('actualizarLista', '')
                        break;
                    case 500:
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Imposible Crear",
                            iconColor: ' #e04950 ',
                            color: " #44dbeb",
                            background: " #6843c3",
                            confirmButtonColor: "#3df385  ",
                        });
                        // msg error al crear
                        // alert('Error al crear tarea')
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                console.error(`Error en request ${error}`);
            });
    }
}
</script>

<style  scoped>
textarea {
    resize: none;
}
</style>