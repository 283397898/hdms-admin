import { DELETE, GET, POST, PUT } from '../axios/request';
import { Employee, QueryData } from '../type';

export async function getEmployeeList() {
  return GET<Employee[]>('employee/list');
}

export async function updateEmployee(employee: Employee) {
  return PUT<Employee[]>('employee', employee);
}

export async function searchEmployee(queryData: QueryData) {
  return GET<Employee[]>('employee/search', queryData);
}

export async function deleteEmployee(employee: Employee) {
  return DELETE<Employee[]>('employee', employee);
}

export async function postEmployee(employeeList: Employee[]) {
  return POST<Employee[]>('employee', employeeList);
}
