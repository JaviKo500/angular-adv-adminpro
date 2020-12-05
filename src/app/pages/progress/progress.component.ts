import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent implements OnInit {

  progreso1 = 25;
  progreso2 = 35;
  constructor() {
  }
  ngOnInit(): void {
  }

  get getProgreso1(): string {
    return `${this.progreso1}%`;
  }
  get getProgreso2(): string {
    return `${this.progreso2}%`;
  }
  // cambioValorHijo( valor: number): void {
  //   this.progreso1 = valor;
  // }
}
