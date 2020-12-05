import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input() title = 'Sin Título';
  // tslint:disable-next-line: no-input-rename
  @Input('label') doughnutChartLabels: Label[] = ['error', 'error', 'error'];
  // tslint:disable-next-line: no-input-rename
  @Input('data') doughnutChartData: MultiDataSet = [
    [10, 10, 10]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {backgroundColor: [ '#9E120E', '#009FEE', '#F02059']}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
