export interface Employee {
  empId?: number | null;
  empName?: string | null;
  empRole?: Role | null;
  empUsername?: string | null;
  empPassword?: string | null;
}

export enum Role {
  ADMIN = 'ADMIN',
  PERSONNEL = 'PERSONNEL',
  BUILDER = 'BUILDER',
  DESIGNER = 'DESIGNER',
  SERVICE = 'SERVICE',
  POWERLESS = 'POWERLESS',
}

export interface QueryData {
  type: string;
  data: string;
}

export interface Label<T> {
  label: string;
  value: T;
}

export interface User {
  userId?: number | null;
  username?: string | null;
  phone?: string | null;
  nickname?: string | null;
}

export interface Project {
  projectId?: number | null;
  address?: string | null;
  progress?: string | null;
  username?: string | null;
  area?: string | null;
  structure?: Structure | null;
}
export interface Structure {
  厅: number;
  室: number;
  厨: number;
  卫: number;
}
