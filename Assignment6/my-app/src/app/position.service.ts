import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from './data/Position';


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  herokuUrl = 'https://glacial-hollows-29191.herokuapp.com';

  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.herokuUrl + '/positions');
  }

  savePosition(position: Position): Observable<any> {
    return this.http.put<any>(
      this.herokuUrl + '/position/' + position._id, position
    );
  }

  getPosition(id: string): Observable<Position[]> {
    return this.http.get<Position[]>(
      this.herokuUrl + '/position/' + id
    );
  }
}
