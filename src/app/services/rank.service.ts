import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rank } from '../models/rank';

@Injectable({
  providedIn: 'root'
})
export class RankService {

  URL='http://localhost:8090/';

  constructor(private http: HttpClient) { }

  createRank(rank: Rank): Observable<boolean> {
    return this.http.post<boolean>(`${this.URL}ranks`, rank);
  }
  getRank(): Observable<Rank[]> {
    return this.http.get<Rank[]>(`${this.URL}ranks`);
  }

}
