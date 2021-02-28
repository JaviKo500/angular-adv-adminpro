import { Usuario } from '../models/usuario.model';
export interface CargarUsuario {
    total: number;
    usuarios: Usuario[];
}
export interface MensajeUsuario {
    ok: boolean;
    msg: string;
}