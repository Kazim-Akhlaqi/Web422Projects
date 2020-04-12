import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Employee } from '../data/Employee';
import {EmployeeService } from '../employee.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit  {

  employees: Employee[] = [];
  getEmployeesSub: any;
  loadingError: false;

  constructor(private emp: EmployeeService) { }

  ngOnInit() {
    this.getEmployeesSub = this.emp.getEmployees().subscribe((data) => {
      this.employees = data;
    });
    }
    /*
    ngOnDestroy() {
      this.getEmployeesSub.unsubscribe();
    }
    */
}
