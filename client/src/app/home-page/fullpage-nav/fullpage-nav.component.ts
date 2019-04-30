import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MnFullpageService} from 'ngx-fullpage';

declare let $;

@Component({
  selector: 'app-fullpage-nav',
  templateUrl: './fullpage-nav.component.html',
  styleUrls: ['./fullpage-nav.component.less']
})
export class FullpageNavComponent implements OnInit, AfterViewInit {

  @Input() fullpageService: MnFullpageService;

  constructor() { }

  ngOnInit() {
    window.addEventListener("hashchange", () => {
      this.setCurrentSection();

      let switchSound: any = document.getElementById('switcher-sound');
      switchSound.play();
    });

    if(window.location.hash) {
      const hash = window.location.hash.substr(1);

      const menu = document.querySelector('.side-menu-wrap');
      let currentSection = '';

      switch (hash) {
        case 'site-dev':
          currentSection = '2';
          break;
        case 'seo':
          currentSection = '1';
          break;
        case 'ads':
          currentSection = '3';
          break;
        case 'smm':
          currentSection = '4';
          break;
        default:
          currentSection = '2';
          break;
      }

      menu.setAttribute('data-order', currentSection)
    } else {
      setTimeout(() => {
        this.fullpageService.moveTo(2);
      }, 1)
    }
  }

  ngAfterViewInit() {
    $('#slide-out .sub-menu a').click((e) => {
      const hash = $(e.target).attr('fragment');

      let currentSection: number = 0;

      switch (hash) {
        case 'site-dev':
          currentSection = 2;
          break;
        case 'seo':
          currentSection = 1;
          break;
        case 'ads':
          currentSection = 3;
          break;
        case 'smm':
          currentSection = 4;
          break;
        default:
          currentSection = 2;
          break;
      }

      this.changeSection(currentSection);
    });

    let switchSound: any = document.getElementById('switcher-sound');
    if($(window).width() <= 992) {
      switchSound.volume = 0.3;
    } else {
      switchSound.volume = 0.7;
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
        return 2;
      case 'seo-section':
        return 1;
      case 'ads-section':
        return 3;
      case 'smm-section':
        return 4;
      default:
        return 2;
    }
  }

  setCurrentSection() {
    const menu = document.querySelector('.side-menu-wrap');
    const currentSection = this.getCurrentSection() + '';
    menu.setAttribute('data-order', currentSection)
  }

}
