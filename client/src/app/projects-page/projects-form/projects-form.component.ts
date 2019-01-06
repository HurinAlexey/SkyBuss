import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../shared/services/material.service';
import {of, Subscription} from 'rxjs/index';
import {switchMap} from 'rxjs/operators';
import {Category, Project} from '../../shared/interfaces';
import {ProjectsService} from '../../shared/services/projects.service';
import {CategoriesService} from '../../shared/services/categories.service';
@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.less']
})
export class ProjectsFormComponent implements OnInit, OnDestroy {

  @ViewChild('uploadFile') uploadFileRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview: any;
  isNew = true;
  project: Project;
  categories: Category[];
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      category: new FormControl(null)
    });

    this.form.disable();

    this.route.params.pipe(
      switchMap((params: Params) => {
        if(params['id']) {
          this.isNew = false;
          return this.projectsService.getById(params['id']);
        }

        return of(null);
      })
    ).subscribe(project => {
      if(project) {
        this.project = project;
        this.form.patchValue({
          name: project.name,
          url: project.url,
          description: project.description,
          category: project.category
        });
        this.imagePreview = project.imageSrc;
        MaterialService.updateTextInputs();
      }
      this.form.enable();
    }, error => {
      MaterialService.toast(error.error.message);
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

  onChange() {
    console.log(this.form.value.category)
  }

  triggerClick() {
    this.uploadFileRef.nativeElement.click();
  }

  deleteProject() {
    const decision = window.confirm(`Вы уверены что хотите удалить проект "${this.project.name}"?`);

    if(decision) {
      this.projectsService.delete(this.project._id).subscribe(response => {
        MaterialService.toast(response.message)
      }, error => {
        MaterialService.toast(error.error.message)
      }, () => {
        this.router.navigate(['/projects'])
      });
    }
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;
    this.form.disable();

    if(this.isNew) {
      obs$ = this.projectsService.create(
        this.form.value.name,
        this.form.value.url,
        this.form.value.description,
        this.image,
        this.form.value.category
      )
    } else  {
      obs$ = this.projectsService.update(
        this.project._id,
        this.form.value.name,
        this.form.value.url,
        this.form.value.description,
        this.image,
        this.form.value.category
      )
    }

    obs$.subscribe(project => {
      this.project = project;
      MaterialService.toast('Изменения сохранены');
      this.form.enable();
    }, error => {
      MaterialService.toast(error.error.message);
      this.form.enable();
    });
  }

}
