import { AggregateRoot, BaseEntity } from "./AggregateRoot";

export interface Todo {
    readonly title: string;
    readonly description: string;
    readonly dueDate: string;
    readonly status: Status;
}

export default interface TodoEntity extends Todo, Partial<BaseEntity>, AggregateRoot {
    readonly userId?: string;
}

export enum Status {
    Todo = 'ToDo',
    InProgress = 'In Progress',
    Done = 'Done'
}
