import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees-list',
  template: `
  <h2 class="text-center m-5">Employees List</h2>
 
  <table class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Level</th>
              <th>Action</th>
          </tr>
      </thead>
      <tbody>
        <tr *ngFor= "let employee of employees$ | async"></tr>
          <td>{{employee.name}}</td>
          <td>{{employee.position}}</td>
          <td>{{employee.level}}</td>
          <td>
            <button class="btn btn-primary me-1" [routerLink]="['edit/', employee._id]">Edit</button>
            <button class="btn btn-danger" (click)="deleteEmployee(employee._id || '')">Delete</button>
         </td>     
       </tbody>
    `,
  styles: [
  ]
})
export class EmployeesListComponent implements OnInit{
  constructor(private employeeService: EmployeeService) {}
  
  employees$: Observable<Employee[]> = new Observable();
  
  ngOnInit(): void {
    this.fetchEmployees();
  }
  
  private deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees() //call back function to complete the routine
    })
  }
  private fetchEmployees() {
    this.employees$ = this.employeeService.getEmployees();
  }
}
