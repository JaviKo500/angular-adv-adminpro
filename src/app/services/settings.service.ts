import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private  linkThemeCss = document.querySelector('#theme');
  constructor() { }

  setColorGlobalTheme(): void {
    const baseThemeCss = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkThemeCss.setAttribute('href', baseThemeCss);
  }

  changeTheme( theme: string ): void {
    const baseCss = `./assets/css/colors/${theme}.css`;
    this.linkThemeCss.setAttribute('href', baseCss);
    localStorage.setItem('theme', baseCss);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const links = document.querySelectorAll('.selector');;
    links.forEach( elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkThemeCss.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working')
      }
    });
  }
}
