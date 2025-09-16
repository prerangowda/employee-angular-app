// employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private storageKey = 'employees';
  private employees: Employee[] = [];

  constructor(private http: HttpClient) {}

  loadEmployees(): Observable<Employee[]> {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.employees = JSON.parse(data);
      return of(this.employees);
    } else {
      return this.http.get<Employee[]>('assets/employees.json');
    }
  }

  saveEmployees() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.employees));
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  addEmployee(emp: Employee) {
    this.employees.push(emp);
    this.saveEmployees();
  }

  updateEmployee(emp: Employee) {
    const index = this.employees.findIndex(e => e.id === emp.id);
    if (index > -1) {
      this.employees[index] = emp;
      this.saveEmployees();
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
    this.saveEmployees();
  }
}
