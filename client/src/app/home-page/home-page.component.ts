import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MnFullpageService} from 'ngx-fullpage';
import {Category} from '../shared/interfaces';
import {CategoriesService} from '../shared/services/categories.service';
import {MaterialInstance, MaterialService} from '../shared/services/material.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Title} from '@angular/platform-browser';
import {OwlCarousel} from 'ngx-owl-carousel';

declare let $;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('categoriesSlider') categoriesSlider: OwlCarousel;
  @ViewChild('adsCollapsible') adsCollapsibleRef: ElementRef;
  @ViewChild('info') infoRef: ElementRef;
  @ViewChild('consultationForm') consultationFormRef: ElementRef;
  @ViewChild('briefForm') briefFormRef: ElementRef;
  @ViewChild('callbackForm') callbackFormRef: ElementRef;
  categories: Category[];
  fpAnchors = ['seo', 'site-dev', 'ads', 'smm'];
  categoriesSliderOptions = {
    margin: 0,
    loop: true,
    dots: false,
    nav: true,
    navText: ['<i class="material-icons">chevron_left</i>', '<i class="material-icons">chevron_right</i>'],
    callbacks: true,
    onInitialized: (e) => {
      this.showCurrentSlide(e, 'categories-slider')
    },
    onTranslate: (e) => {
      this.showCurrentSlide(e, 'categories-slider')
    },
    responsive: {
      0: {
        items: 1
      },
      769: {
        items: 3
      }
    }
  };
  seoSliderOptions = {
    dots: false,
    navText: ['<i class="material-icons">chevron_left</i>', '<i class="material-icons">chevron_right</i>'],
    responsive: {
      0: {
        margin: 10,
        nav: true,
        loop: true,
        items: 1
      },
      769: {
        margin: 20,
        nav: false,
        loop: false,
        items: 3
      }
    }
  };
  adsCollapsible: MaterialInstance;
  briefForm: MaterialInstance;
  callbackForm: MaterialInstance;
  info: MaterialInstance;
  obs$: Subscription;

  constructor(
    public fullpageService: MnFullpageService,
    private categoriesService: CategoriesService,
    private title: Title
  ) {
  }

  ngOnInit() {
    this.obs$ = this.categoriesService.fetch().subscribe(categories => {
      this.categories = categories;
    }, error => {
      MaterialService.toast(error.message.message);
    });

    this.title.setTitle('SkyBuss - Главная');
  }

  ngAfterViewInit() {
    this.adsCollapsible = MaterialService.collapsibleInitialize(this.adsCollapsibleRef);
    this.adsCollapsible.open(0);
    this.briefForm = MaterialService.modalInitialize(this.briefFormRef, {
      onOpenStart: () => {
        this.fullpageService.setMouseWheelScrolling(false)
      },
      onCloseStart: () => {
        this.fullpageService.setMouseWheelScrolling(true)
      }
    });
    this.callbackForm = MaterialService.modalInitialize(this.callbackFormRef, {
      onOpenStart: () => {
        this.fullpageService.setMouseWheelScrolling(false)
      },
      onCloseStart: () => {
        this.fullpageService.setMouseWheelScrolling(true)
      }
    });
  }

  ngOnDestroy() {
    this.adsCollapsible.destroy();
    this.briefForm.destroy();
    this.callbackForm.destroy();
    this.fullpageService.destroy('all');

    if(this.obs$) {
      this.obs$.unsubscribe()
    }
  }

  showCurrentSlide(e, id: string) {
    let idx = e.item.index + 1;
    let slides = $(`#${id} .owl-item`);
    let currentSlide = $(`#${id} .owl-item.current`);
    $(currentSlide).removeClass('current');
    $(slides[idx]).addClass('current');
  }

  infoOpen() {
    this.info.open();
  }

  formToggle() {
    $(this.consultationFormRef.nativeElement).toggleClass('active');
  }

  formClose() {
    $(this.consultationFormRef.nativeElement).removeClass('active');
  }

  briefFormOpen() {
    this.briefForm.open();
  }

  callbackFormOpen() {
    this.callbackForm.open();
  }
}
