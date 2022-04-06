import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Employee } from '../type';

export const useEmployeeStore = defineStore('useEmployeeStore', () => {
  const employee = ref<Employee>({});
  const setEmployee = (newValue: Employee) => {
    console.log(newValue);
    employee.value = newValue;
  };
  return { employee, setEmployee };
});
