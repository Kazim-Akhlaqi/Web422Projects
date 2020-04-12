import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../data/Employee';
import {EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy  {

  employees: Employee[] = [];
  getEmployeesSub: any;
  loadingError = false;
  filteredEmployees: Employee[];


  constructor(private emp: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeesSub = this.emp.getEmployees().subscribe(data => {
      this.employees = data;
    },
      () => {
        this.loadingError = true;
      });
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee/', id]);
  }

  onEmployeeSearchKeyUP(event: any) {
    const substring: string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((emp) =>
    ((emp.FirstName.toLowerCase().indexOf(substring) !== -1) ||
    (emp.LastName.toLowerCase().indexOf(substring) !== -1) ||
// tslint:disable-next-line: no-string-literal
    (emp.Position['PositionName'].toLowerCase().indexOf(substring) !== -1)));
  }

  ngOnDestroy() {
    if (this.getEmployeesSub !== 'undefined') {
      this.getEmployeesSub.unsubscribe();
    }
  }
}
