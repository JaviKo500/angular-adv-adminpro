import { environment } from "src/environments/environment";

const BASE_URL = environment.BASE_URL;
export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ){}
    get getImagenURL(){
        if ( this.img.includes('https') ) { 
            return `${this.img}`;    
        }
        if ( this.img ) {
            return `${BASE_URL}/upload/usuarios/${this.img}`;    
        }
        return `${BASE_URL}/upload/usuarios/no-image`;
    }
}