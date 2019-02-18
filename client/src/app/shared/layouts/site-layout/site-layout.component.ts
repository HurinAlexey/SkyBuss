import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from '../../services/material.service';
import {ParticlesParams} from './particles-params';

declare let $;

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.less']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sidenav') sidenavRef: ElementRef;
  sidenav: MaterialInstance;
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

    this.particlesParams = ParticlesParams;

    // this.particlesParams = {
    //   particles: {
    //     number: {
    //       value: 150,
    //     },
    //     color: {
    //       value: '#fff'
    //     },
    //     shape: {
    //       type: 'star',
    //     },
    //   }
    // };

    this.switchBackground();

    window.addEventListener("hashchange", () => {
      this.particlesStyle['transition'] = 'background-color 10s';
      this.switchBackground();
    });

    let sidenavLinks = document.querySelectorAll('#slide-out li > a');
    $(sidenavLinks).click(() => {
      this.sidenav.close();
    });
  }

  ngAfterViewInit() {
    this.switchBackground();

    document.addEventListener('click', (event) => {
      if($(event.target).closest('.nav-contacts').length == 0) {
        $('.nav-contacts ul').slideUp(300);
      }
    });

    this.sidenav = MaterialService.sidenavInitialize(this.sidenavRef);
  }

  ngOnDestroy() {
    this.sidenav.destroy();
  }

  switchBackground() {
    if(window.location.hash) {
      const hash = window.location.hash.substr(1);

      switch (hash) {
        case 'site-dev':
          this.particlesStyle['background-color'] = 'rgb(80, 26, 26)';
          break;
        case 'seo':
          this.particlesStyle['background-color'] = 'rgb(43, 42, 109)';
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
