export interface Task {
    titulo : string,
    descripcion : string,
    prioridad : 'Media' | "Baja" | "Alta",
    completada : boolean
}