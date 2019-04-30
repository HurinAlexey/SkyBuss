import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectsService} from '../shared/services/projects.service';
import {MaterialInstance, MaterialService} from '../shared/services/material.service';
import {Observable, Subscription} from 'rxjs/index';
import {Category, Project} from '../shared/interfaces';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.less']
})
export class ProjectsPageComponent implements OnInit, OnDestroy {

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
        this.projects$.subscribe(() => {
          console.log('Loading success!')
        }, error => {
          console.log(error)
        });
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
}
