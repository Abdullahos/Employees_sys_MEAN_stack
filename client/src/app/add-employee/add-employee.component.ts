import { Component, EventEmitter, Input } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  template: `
  <h2 class="text-center m-5">Add a New Employee</h2>
  <app-employee-form (formSubmitted)="addEmployee($event)"></app-employee-form>  `,
  styles: [
  ]
})
export class AddEmployeeComponent {
  constructor(
    private employeeService: EmployeeService,
    private router: Router){}

  addEmployee(employee: Employee) {
    this.employeeService.postEmployee(employee)
    .subscribe({
      next: ()=> {
        this.router.navigate(['/employees']);
      },
      error: (error)=> {
        alert('cannot add employee');
        console.error(error);
      }
    })
  }
}
