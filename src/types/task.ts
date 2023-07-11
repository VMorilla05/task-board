export interface TaskType {
  _id: number
  title: string
  priority: TaskPriority
  status: TaskStatus
  progress: number
}

export interface TaskProps {
  task: TaskType
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskStatus {
  TODO = "to do",
  IN_PROGRESS = "in progress",
  DONE = "done",
}

export enum TaskSort {
  TITLE = "title",
  STATUS = "status",
  PRIORITY = "priority",
  PROGRESS = "progress",
}
