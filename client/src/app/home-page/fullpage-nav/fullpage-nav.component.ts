import {Component, Input, OnInit} from '@angular/core';
import {MnFullpageService} from 'ngx-fullpage';

@Component({
  selector: 'app-fullpage-nav',
  templateUrl: './fullpage-nav.component.html',
  styleUrls: ['./fullpage-nav.component.less']
})
export class FullpageNavComponent implements OnInit {

  @Input() fullpageService: MnFullpageService;

  constructor() { }

  ngOnInit() {
    window.addEventListener("hashchange", () => {this.setCurrentSection()});

    if(window.location.hash) {
      const hash = window.location.hash.substr(1);

      const menu = document.querySelector('.side-menu-wrap');
      let currentSection = '';

      switch (hash) {
        case 'site-dev':
          currentSection = '1';
          break;
        case 'seo':
          currentSection = '2';
          break;
        case 'ads':
          currentSection = '3';
          break;
        case 'smm':
          currentSection = '4';
          break;
        default:
          currentSection = '1';
          break;
      }

      menu.setAttribute('data-order', currentSection)
    }
  }

  changeSection(sectionNumber: number) {
    this.fullpageService.moveTo(sectionNumber);
    this.setCurrentSection();
  }

  getCurrentSection() {
    const activeSection = document.querySelector('.fp-section.active');
    const sectionId = activeSection.getAttribute('id');

    switch (sectionId) {
      case 'site-dev-section':
        return 1;
      case 'seo-section':
        return 2;
      case 'ads-section':
        return 3;
      case 'smm-section':
        return 4;
      default:
        return 1;
    }
  }

  setCurrentSection() {
    const menu = document.querySelector('.side-menu-wrap');
    const currentSection = this.getCurrentSection() + '';
    menu.setAttribute('data-order', currentSection)
  }

}
