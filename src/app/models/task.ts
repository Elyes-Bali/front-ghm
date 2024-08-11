export interface Task {
    id?: number;
    description?: string;
    state: TaskState;
    projectId: number;
    assignedUserId: number;
    assignedUserName:string;
  }
  export enum TaskState {
    NOT_COMPLETED = 'NOT_COMPLETED',
    ONGOING = 'ONGOING',
    FINISHED = 'FINISHED'
  }
  