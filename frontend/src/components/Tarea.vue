<template>
    <a href="#" class="list-group-item list-group-item-action d-flex bd-highlight overflow-hidden">
        <details class="list-group-item d-flex bd-highlight p-0 overflow-hidden">

            <summary class="row container list-group-item d-flex text-start align-items-center justify-content-between">
                <div class=" col-lg-3  col-6 flex-d bd-highlight ">
                    <input class="form-check-input me-3" type="checkbox" value="" id="flexCheckChecked"
                        v-model="tarea.completed" @change="completarTarea">
                    <label class="form-check-label" for="flexCheckChecked">{{ tarea.completed ? 'Completa' : 'Pendiente'
                    }}</label>
                </div>

                <div class="col-lg-5 col-6 overflow-hidden flex-d bd-highlight">
                    <h5 class="form-check">{{ tarea.title }}</h5>
                </div>
           
                <a id="importante" class="col" href="#" v-if="tarea.important" @click="toggleImportante">
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 576 512">
                        <path fill="#fcc405" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3
                             23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
                             150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                    </svg>
                </a>
                <a id="importante" class="col" href="#" v-else @click="toggleImportante">
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 576 512">
                        <path fill="#ffffff"
                            d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2
                                 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 
                                 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 
                                 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" />
                    </svg>
                </a>
                <a id="editar" class="col" href="#" @click="actualizarTarea">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                        <path fill="#3df385"
                            d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9
                         0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 
                         6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6
                          6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4
                           64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 
                           40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                    </svg>
                </a>

                <a id="borrar" class="col" href="#" @click="eliminarTarea">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512">
                        <path fill="#e04950"
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 
                            0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </a>
                
            </summary>
            <hr>
            <div class="container  form-text">
                <p class="p-2 flex-fill bd-highlight">{{ tarea.desc }}</p>
            </div>
        </details>
    </a>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import { Component, Prop } from 'vue-property-decorator';
import { Tarea } from '../utils/Tarea';
import { bus } from '../main';
import Swal from 'sweetalert2';


@Component({

})

export default class TareaComponent extends Vue {
    @Prop() tarea!: Tarea;


    async eliminarTarea(): Promise<void> {
        let config = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        await axios.delete(`http://127.0.0.1:3000/tarea/${this.tarea._id}`, config)
            .then(res => {
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
                        Toast.fire({
                            icon: "success",
                            iconColor: '#3df385',
                            color: "  #240a37  ",
                            background: " #e35963 ",
                            title: "¡Buen trabajo!",
                            text: "Se ha eliminado con exito",
                        });
                        bus.$emit('actualizarLista', '')
                        break;
                    case 500:
                    Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Imposible borar",
                            iconColor: ' #e04950 ',
                            color: " #44dbeb",
                            background: " #6843c3",
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

    async toggleImportante(): Promise<void> {
        let config = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        await axios.put(`http://127.0.0.1:3000/tarea/${this.tarea._id}`, { important: !this.tarea.important }, config)
            .then(res => {
                switch (res.status) {
                    case 200:
                        bus.$emit('actualizarLista', )
                        break;
                    case 500:
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                console.error(`Error en request ${error}`);
            });
    }

    async completarTarea(): Promise<void> {
        let config = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        await axios.put(`http://127.0.0.1:3000/tarea/${this.tarea._id}`, { completed: this.tarea.completed }, config)
            .then(res => {
                switch (res.status) {
                    case 200:
                        bus.$emit('actualizarLista', )
                        break;
                    case 500:
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                console.error(`Error en request ${error}`);
            });
    }

    async actualizarTarea(): Promise<void> {
        bus.$emit('editarTarea', {...this.tarea})

    }
}
</script>

<style scoped>
details {
    width: 100%;
    border-radius: 6px;
    cursor: pointer;
}

input[type=checkbox] {
    /* Double-sized Checkboxes */
    -ms-transform: scale(1.5);
    /* IE */
    -moz-transform: scale(1.5);
    /* FF */
    -webkit-transform: scale(1.5);
    /* Safari and Chrome */
    -o-transform: scale(1.5);
    /* Opera */
    transform: scale(1.5);
}

summary {
    list-style: none;
}

i {
    background: black;
}
</style> 