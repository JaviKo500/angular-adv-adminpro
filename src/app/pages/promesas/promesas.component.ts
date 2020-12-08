import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise( ( resolve, reject ) => {
    //   if ( false ) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('algo salio mal');
    //   }
    // });

    // promesa.then( ( mensaje ) => {
    //   console.log(mensaje);
    // })
    // .catch( ( mensaje ) => {
    //   console.log(mensaje);
    // })
    // .finally( () => {
    //   console.log('se accabo');
    // });
    // console.log('Fin del init');

    this.getUsers().then( usuarios => console.log(usuarios));
 }

  getUsers(): Promise<any> {
    // fetch('https://reqres.in/api/users?page=2')
    // .then( ( res ) => {
    //   res.json().then( ( body ) => {
    //     console.log(body);
    //   });
    // });

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users?page=2')
      .then( res  => res.json() )
      .then( body => console.log(body.data) );
    });
  }

}
