import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from './employee';
/*
The HttpClient service is provided by Angular through the HttpClientModule.
It's not part of the application by default—we need to import it in the ‘app.module.ts’ file
*/
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private base_url = 'http://localhost:5200';
  private employees$: Subject<Employee[]> = new Subject();    

  constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<Employee[]>(this.base_url + '/employees').subscribe(
      employees => {
        this.employees$.next(employees);
      }
    )
  }

  getEmployees() : Subject<Employee[]>{
    this.refreshEmployees();
    return this.employees$;
  }

  getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.base_url}/employees/${id}`);
  }

  postEmployee(employee: Employee) : Observable<string> {
    return this.httpClient.post(`${this.base_url}/employees`, employee, { responseType: 'text' });
  }

  updateEmployee(id: string, employee: Employee): Observable<string> {
    return this.httpClient.put(`${this.base_url}/employees/${id}`, employee, {responseType: 'text'});
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete(`${this.base_url}/employees/${id}`, {responseType: 'text'});
  } 
}
