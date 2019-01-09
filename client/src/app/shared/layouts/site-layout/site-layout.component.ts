import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

declare let $;

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.less']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  particlesStyle: object = {};
  particlesParams: object = {};
  particlesWidth: number = 100;
  particlesHeight: number = 100;


  constructor() { }

  ngOnInit() {
    this.particlesStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'background-attachment': 'fixed',
      'background-color': 'rgb(80, 26, 26)',
      'transition': 'background-color 1s'
    };

    this.particlesParams = {
      particles: {
        number: {
          value: 150,
        },
        color: {
          value: '#fff'
        },
        shape: {
          type: 'star',
        },
      }
    };

    this.switchBackground();

    window.addEventListener("hashchange", () => {
      this.particlesStyle['transition'] = 'background-color 10s';
      this.switchBackground();
    });

  }

  ngAfterViewInit() {
    this.switchBackground();

    document.addEventListener('click', (event) => {
      if($(event.target).closest('.nav-contacts').length == 0) {
        $('.nav-contacts ul').slideUp(300);
      }
    });
  }

  ngOnDestroy() {

  }

  switchBackground() {
    if(window.location.hash) {
      const hash = window.location.hash.substr(1);

      switch (hash) {
        case 'site-dev':
          this.particlesStyle['background-color'] = 'rgb(80, 26, 26)';
          break;
        case 'seo':
          this.particlesStyle['background-color'] = 'rgb(31, 28, 197)';
          break;
        case 'ads':
          this.particlesStyle['background-color'] = 'rgb(27, 186, 165)';
          break;
        case 'smm':
          this.particlesStyle['background-color'] = 'rgb(167, 191, 31)';
          break;
        default:
          this.particlesStyle['background-color'] = 'rgb(80, 26, 26)';
          break;
      }
    }
  }

  contactsToggle() {
    $('.nav-contacts ul').slideToggle(300);
  }

}
