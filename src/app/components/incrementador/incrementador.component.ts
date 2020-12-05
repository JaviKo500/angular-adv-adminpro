import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // @Input( 'valor' ) progreso: number;
  @Input() progreso: number;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  @Input() btnClass = 'btn-primary';
  constructor() {
    this.progreso = 10;
  }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor = ( valor: number ): any => {
    if ( this.progreso >= 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if ( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );
  }

  onChange( valor: number ): void {
    if ( valor >= 100){
      this.progreso = 100;
    } else if ( valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    this.valorSalida.emit( this.progreso );
  }
}
