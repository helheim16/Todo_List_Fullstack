export interface Tarea {
    _id: string;
    title: string;
    desc: string;
    date: string;
    completed: boolean;
    important: boolean;
    user: string;
};

export interface TareaDatosForm {
    title: string;
    desc: string;
    completed: boolean;
    important: boolean;
}