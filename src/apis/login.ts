import axios from 'axios';
import { GET, POST } from '../axios/request';
import { Employee } from '../type';

interface AuthDto {
  token: string;
  employee: Employee;
}

export async function getPublicKey() {
  return (await axios.get('rsa_public_key.pem')).data;
}

export async function postLogin(bodyData: any) {
  return POST<AuthDto>('auth/login', bodyData);
}

export async function getLogin() {
  return GET<Employee>('auth/login');
}
