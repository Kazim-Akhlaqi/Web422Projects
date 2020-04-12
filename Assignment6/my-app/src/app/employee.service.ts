import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './data/Employee';
import { EmployeeRaw } from './data/employeeRaw';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  herokuUrl = 'https://glacial-hollows-29191.herokuapp.com';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.herokuUrl + '/employees');
  }

  saveEmployee(employee: EmployeeRaw): Observable<any> {
    return this.http.put<any>(
      this.herokuUrl + '/employee/' + employee._id, employee
    );
  }

  getEmployee(id: string): Observable<EmployeeRaw[]> {
    return this.http.get<EmployeeRaw[]>(
      this.herokuUrl + '/employee-raw/' + id
    );
  }
}
