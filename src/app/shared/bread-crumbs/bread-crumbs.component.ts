import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: [
  ]
})
export class BreadCrumbsComponent implements OnInit, OnDestroy {
  title: string;
  titleSub$: Subscription;
  constructor( private router: Router) {
    this.getArgumentosRuta();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  getArgumentosRuta(): void {
    this.titleSub$ = this.router.events
                      .pipe(
                        filter( event => event instanceof ActivationEnd ),
                        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
                        map( (event: ActivationEnd ) => event.snapshot.data )
                      )
                      .subscribe( ({ title }) => {
                        this.title = title;
                        document.title = ` AdminPro - ${this.title}`;
                      });
  }

}
