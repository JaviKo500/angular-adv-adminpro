import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubscription: Subscription;
  constructor() { }
  ngOnInit(): void {

    // this.retornaObservable().pipe(
    //   // retry(1) para intentar las veces que qeremos
    //   retry()
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.warn('Error: ', error),
    //   () => console.info('obs terminado')
    // );

    this.intervalSubscription = this.retornaIntervalo()
        .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  // retornaIntervalo(): Observable<number> {
  //   return interval( 1000 ) // metodo para volver a llamr un observable
  //                       .pipe(
  //                         take(4), // para repetir o llamar 4 veces
  //                         map( valor => valor + 1)
  //                       );
  // }

  retornaIntervalo(): Observable<number> {
    return interval( 500 ) // metodo para volver a llamr un observable
                        .pipe(
                          map( valor => valor + 1),
                          filter( valor => ( valor % 2 === 0 ? true : false ) ), /// para filtrar los datos

                        );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next( i );
        if ( i === 4) {
          clearInterval( intervalo );
          observer.complete();
        }
        if ( i === 2 ) {
          observer.error( 'i llego al valor 2' );
        }
      }, 1000);
    });
  }

}
