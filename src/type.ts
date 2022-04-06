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
