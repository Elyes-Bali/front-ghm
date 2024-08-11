import { Task } from "./task";

export interface Project {
    id: number;
    name: string;
    description:string;
    managerId: number;
    tasks: Task[];
    showDetails?: boolean;
  }