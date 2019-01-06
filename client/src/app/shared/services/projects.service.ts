import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message, Project} from '../interfaces';

@Injectable()
export class ProjectsService {
  constructor(
    private http: HttpClient
  ) {}

  fetch(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects')
  }

  getByCategoryId(id: string): Observable<Project[]> {
    return this.http.get<Project[]>(`/api/projects/${id}`)
  }

  getById(id: string) {
    return this.http.get<Project>(`/api/projects/project/${id}`)
  }

  create(name: string, url: string, description: string, image?: File, category?: string): Observable<Project> {
    if(category) console.log(category);

    const fd = new FormData();

    if(image) {
      fd.append('image', image, image.name)
    }
    if(category) {
      fd.append('category', category)
    }
    fd.append('name', name);
    fd.append('url', url);
    fd.append('description', description);

    return this.http.post<Project>('/api/projects', fd);
  }

  update(id: string, name: string, url: string, description: string, image?: File, category?: string): Observable<Project> {
    const fd = new FormData();

    if(image) {
      fd.append('image', image, image.name)
    }
    if(category) {
      fd.append('category', category)
    }
    fd.append('name', name);
    fd.append('url', url);
    fd.append('description', description);

    return this.http.patch<Project>(`/api/projects/${id}`, fd);

  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/projects/${id}`)
  }
}
