import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '../models/section';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  
  URL='http://localhost:8090/';

  constructor(private http: HttpClient) { }

  createSection(section: Section): Observable<boolean> {
    return this.http.post<boolean>(`${this.URL}sections`, section);
  }
  getSection(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.URL}sections`);
  }

  
}
