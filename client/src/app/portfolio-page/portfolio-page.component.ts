import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from '../shared/services/projects.service';
import {Category, Project} from '../shared/interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs/index';
import {CategoriesService} from '../shared/services/categories.service';
import {MaterialService} from '../shared/services/material.service';


declare let $;

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.less']
})
export class PortfolioPageComponent implements OnInit, OnDestroy {

  projects$: Observable<Project[]>;
  categories: Category[];
  sub: Subscription;
  categoryId: string;

  constructor(
    private projectsService: ProjectsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if(params['id']) {
        this.categoryId = params['id'];
        this.projects$ = this.projectsService.getByCategoryId(params['id']);
      } else {
        this.projects$ = this.projectsService.fetch();
      }
    });

    this.sub = this.categoriesService.fetch().subscribe((categories: Category[]) => {
      this.categories = categories
    }, error => {
      MaterialService.toast(error.error.message)
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  toggleList() {
    $('.mobile-list ul').slideToggle(300);
  }

}
