import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  serverURL='http://localhost:8090/';
  constructor(private http: HttpClient) { }
  
  createStudent(student:Student): Observable<boolean> {
    return this.http.post<boolean>(`${Configuration.serverURL}students`, student);
  }

  
  getStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(`${Configuration.serverURL}students`);
  }

  
  updateStudent(student: Student): Observable<boolean> {
    return this.http.put<boolean>(`${Configuration.serverURL}students`, student);
  }

  deleteStudent(studentId: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${Configuration.serverURL}students/${studentId}`);
    } 

}
