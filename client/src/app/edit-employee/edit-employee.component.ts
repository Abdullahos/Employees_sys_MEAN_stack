import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as e from 'express';

@Component({
  selector: 'app-edit-employee',
  template: `
  <h2 class="text-center m-5">Add a New Employee</h2>
  <app-employee-form
  [initialState]=employee 
  (formSubmitted)="editEmployee($event)"></app-employee-form>
  `,
  styles: [
  ]
})
export class EditEmployeeComponent implements OnInit{
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute){
  }
  employee: BehaviorSubject<Employee> =  new BehaviorSubject({});
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.employeeService.getEmployee(id !).subscribe((employee) => {
      this.employee.next(employee);
    });
  }
  editEmployee(employee: Employee) {
    this.employeeService.updateEmployee(this.employee.value._id || '', employee)
    .subscribe({
      next: ()=> {
        this.router.navigate(['/employees']);
      },
      error: (error)=> {
        alert('Faild to update employee');
        console.log(error);
      }
    })
  }
}
