import { DELETE, GET, PUT } from '../axios/request';
import { Project, QueryData, User } from '../type';

export async function getUserList() {
  return GET<User[]>('user/list');
}

export async function updateUser(user: User) {
  return PUT<User[]>('user', user);
}

export async function searchUser(queryData: QueryData) {
  return GET<User[]>('user/search', queryData);
}

export async function deleteUser(user: User) {
  return DELETE<User[]>('user', user);
}

export async function deleteProject(project: Project) {
  return DELETE<Project[]>('project', project);
}

export async function getProjectList() {
  return GET<Project[]>('project/list');
}

export async function updateProject(project: Project) {
  return PUT<Project[]>('project', project);
}

export async function searchProject(queryData: QueryData) {
  return GET<Project[]>('project/search', queryData);
}
