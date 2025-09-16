export interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
  salary: number;
}

import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class Employees {
  employees: Employee[] = [
    { id: 1, name: 'Alice Johnson', department: 'HR', email: 'alice@example.com', salary: 50000 },
    { id: 2, name: 'Bob Smith', department: 'IT', email: 'bob@example.com', salary: 60000 }
  ];

  newEmployee: Employee = { id: 0, name: '', department: '', email: '', salary: 0 };
  editMode = false;

  addEmployee() {
    if (!this.newEmployee.name.trim()) return;
    if (this.editMode) {
      this.updateEmployee();
      return;
    }
    this.newEmployee.id = this.employees.length + 1;
    this.employees.push({ ...this.newEmployee });
    this.resetForm();
  }

  editEmployee(emp: Employee) {
    this.newEmployee = { ...emp };
    this.editMode = true;
  }

  updateEmployee() {
    const idx = this.employees.findIndex(e => e.id === this.newEmployee.id);
    if (idx !== -1) {
      this.employees[idx] = { ...this.newEmployee };
    }
    this.resetForm();
    this.editMode = false;
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }

  resetForm() {
    this.newEmployee = { id: 0, name: '', department: '', email: '', salary: 0 };
    this.editMode = false;
  }
}
